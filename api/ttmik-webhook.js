/**
 * TTMIK progress webhook (Vercel serverless / Express route)
 *
 * Environment variables:
 *   WEBHOOK_SECRET       - shared secret for request auth
 *   TWITTER_BEARER_TOKEN - X API v2 bearer token (optional)
 *   SHOPIFY_STORE_URL    - Shopify store URL (optional)
 *   SHOPIFY_ACCESS_TOKEN - Shopify Admin API token (optional)
 */

const MAX_BODY_SIZE = 4096;

function validatePayload(body) {
    if (!body || typeof body !== 'object') return 'Missing request body';
    if (typeof body.event !== 'string' || !body.event) return 'Missing or invalid "event"';
    if (typeof body.lesson !== 'string' || !body.lesson) return 'Missing or invalid "lesson"';
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
    if (secret) {
        const authHeader = req.headers['x-webhook-secret'] || req.headers['authorization'];
        if (!authHeader || (authHeader !== secret && authHeader !== `Bearer ${secret}`)) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
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

        const { event, lesson, progress, timestamp, platform } = req.body;
        console.log(`[TTMIK Webhook] ${event}: "${lesson}" — ${progress}% at ${timestamp}`);

        if (process.env.TWITTER_BEARER_TOKEN) {
            const tweetText = `📚 Just completed "${lesson.slice(0, 100)}" (${progress}%) on ${platform || 'TTMIK'}! #LearnKorean #TTMIK`;
            const twitterRes = await fetch('https://api.twitter.com/2/tweets', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text: tweetText })
            });
            if (!twitterRes.ok) {
                console.warn('[TTMIK Webhook] Twitter API error:', await twitterRes.text());
            }
        }

        return res.status(200).json({
            success: true,
            received: { event, lesson, progress }
        });
    } catch (err) {
        console.error('[TTMIK Webhook] Error:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}