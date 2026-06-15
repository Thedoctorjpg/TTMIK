/**
 * TTMIK Tweet → Shopify + X (Twitter) Webhook
 *
 * Deploy as a Vercel serverless function or Express route.
 * Receives progress events from the TTMIK Tweet app and optionally:
 *   1. Posts to X (Twitter) via the v2 API
 *   2. Creates a Shopify draft order / metafield for tracking
 *
 * Environment variables:
 *   TWITTER_BEARER_TOKEN  — X API v2 bearer token (for automated tweets)
 *   SHOPIFY_STORE_URL     — e.g. https://your-store.myshopify.com
 *   SHOPIFY_ACCESS_TOKEN  — Shopify Admin API access token
 */

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { event, lesson, progress, timestamp, platform, user, shopifyOrderId } = req.body;

    console.log(`[TTMIK Webhook] ${event}: "${lesson}" — ${progress}% at ${timestamp}`);

    // ---- Post to X (Twitter) ----
    if (process.env.TWITTER_BEARER_TOKEN) {
      const tweetText = `📚 ${user || 'A learner'} just completed "${lesson}" (${progress}%) on ${platform}! #LearnKorean #TTMIK`;

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
