/**
 * TTMIK progress webhook (Vercel serverless / Express route)
 *
 * Environment variables:
 *   WEBHOOK_SECRET       - required shared secret for request auth
 *   TWITTER_BEARER_TOKEN - X API v2 bearer token (optional)
 */

const MAX_BODY_SIZE = 4096;
const ALLOWED_EVENTS = new Set(['ttmik_progress']);

function sanitizeLessonForTweet(lesson) {
    if (typeof lesson !== 'string') return 'Korean practice';
    const cleaned = lesson
        .replace(/[\r\n\u0000-\u001f]/g, ' ')
        .replace(/["'`]/g, '')
        .replace(/[^\w\s\u0080-\uFFFF.,!?#%-]/g, '')
        .trim()
        .slice(0, 100);
    return cleaned || 'Korean practice';
}

function validatePayload(body) {
    if (!body || typeof body !== 'object') return 'Missing request body';
    if (typeof body.event !== 'string' || !ALLOWED_EVENTS.has(body.event)) {
        return 'Missing or invalid "event"';
    }
    if (typeof body.lesson !== 'string' || !body.lesson.trim()) return 'Missing or invalid "lesson"';
    if (typeof body.progress !== 'number' || body.progress < 0 || body.progress > 100) {
        return '"progress" must be a number between 0 and 100';
    }
    if (body.lesson.length > 200) return '"lesson" exceeds 200 characters';
    return null;
}

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const secret = process.env.WEBHOOK_SECRET;
    if (!secret) {
        return res.status(503).json({ error: 'Webhook not configured' });
    }

    const authHeader = req.headers['x-webhook-secret'] || req.headers['authorization'];
    if (!authHeader || (authHeader !== secret && authHeader !== `Bearer ${secret}`)) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const rawLength = req.headers['content-length'];
    if (rawLength && parseInt(rawLength, 10) > MAX_BODY_SIZE) {
        return res.status(413).json({ error: 'Payload too large' });
    }

    try {
        const validationError = validatePayload(req.body);
        if (validationError) {
            return res.status(400).json({ error: validationError });
        }

        const { event, lesson, progress, platform } = req.body;
        console.log(`[TTMIK Webhook] ${event} — ${progress}%`);

        if (process.env.TWITTER_BEARER_TOKEN) {
            const safeLesson = sanitizeLessonForTweet(lesson);
            const safePlatform = sanitizeLessonForTweet(platform || 'TTMIK');
            const tweetText = `📚 Just completed ${safeLesson} (${progress}%) on ${safePlatform}! #LearnKorean #TTMIK`;
            const twitterRes = await fetch('https://api.twitter.com/2/tweets', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text: tweetText })
            });
            if (!twitterRes.ok) {
                console.warn('[TTMIK Webhook] Twitter API error:', twitterRes.status);
            }
        }

        return res.status(200).json({
            success: true,
            received: { event, progress }
        });
    } catch (err) {
        console.error('[TTMIK Webhook] Error:', err.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
}