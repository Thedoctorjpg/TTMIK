/**
 * TTMIK Tweet → Shopify + X (Twitter) Webhook
 *
 * Deploy as a Vercel serverless function or Express route.
 * Receives progress events from the TTMIK Tweet app and optionally:
 *   1. Posts to X (Twitter) via the v2 API
 *   2. Creates a Shopify draft order / metafield for tracking
 *
 * Environment variables:
 *   WEBHOOK_SECRET         — shared secret for request auth (required in prod)
 *   TWITTER_BEARER_TOKEN   — X API v2 bearer token (for automated tweets)
 *   SHOPIFY_STORE_URL      — e.g. https://your-store.myshopify.com
 *   SHOPIFY_ACCESS_TOKEN   — Shopify Admin API access token
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

  // Auth check: require WEBHOOK_SECRET in production
  const secret = process.env.WEBHOOK_SECRET;
  if (secret) {
    const authHeader = req.headers['x-webhook-secret'] || req.headers['authorization'];
    if (!authHeader || (authHeader !== secret && authHeader !== `Bearer ${secret}`)) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  }

  // Body size guard
  const rawLength = req.headers['content-length'];
  if (rawLength && parseInt(rawLength, 10) > MAX_BODY_SIZE) {
    return res.status(413).json({ error: 'Payload too large' });
  }

  try {
    const validationError = validatePayload(req.body);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const { event, lesson, progress, timestamp, platform, user, shopifyOrderId } = req.body;

    console.log(`[TTMIK Webhook] ${event}: "${lesson}" — ${progress}% at ${timestamp}`);

    // ---- Post to X (Twitter) ----
    if (process.env.TWITTER_BEARER_TOKEN) {
      const safeName = (user || 'A learner').slice(0, 50);
      const safeLesson = lesson.slice(0, 100);
      const tweetText = `📚 ${safeName} just completed "${safeLesson}" (${progress}%) on ${platform || 'TTMIK'}! #LearnKorean #TTMIK`;

      const twitterRes = await fetch('https://api.twitter.com/2/tweets', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: tweetText }),
      });

      if (!twitterRes.ok) {
        console.warn('[TTMIK Webhook] Twitter API error:', await twitterRes.text());
      } else {
        console.log('[TTMIK Webhook] Tweet posted successfully');
      }
    }

    // ---- Shopify integration ----
    if (process.env.SHOPIFY_STORE_URL && process.env.SHOPIFY_ACCESS_TOKEN) {
      const shopifyUrl = `${process.env.SHOPIFY_STORE_URL}/admin/api/2024-01/metafields.json`;

      const metafield = {
        metafield: {
          namespace: 'ttmik_progress',
          key: `lesson_${Date.now()}`,
          value: JSON.stringify({ lesson, progress, timestamp, platform }),
          type: 'json',
        },
      };

      // If we have an order ID, attach to the order instead
      const endpoint = shopifyOrderId
        ? `${process.env.SHOPIFY_STORE_URL}/admin/api/2024-01/orders/${shopifyOrderId}/metafields.json`
        : shopifyUrl;

      const shopifyRes = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'X-Shopify-Access-Token': process.env.SHOPIFY_ACCESS_TOKEN,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(metafield),
      });

      if (!shopifyRes.ok) {
        console.warn('[TTMIK Webhook] Shopify API error:', await shopifyRes.text());
      } else {
        console.log('[TTMIK Webhook] Shopify metafield created');
      }
    }

    return res.status(200).json({
      success: true,
      received: { event, lesson, progress },
    });
  } catch (err) {
    console.error('[TTMIK Webhook] Error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
