# ttmik-webhook

Secure TTMIK progress webhook handler for Vercel and other serverless Node runtimes.

## Install

```bash
npm install ttmik-webhook
```

## Vercel

Create `api/ttmik-webhook.js`:

```js
export { default } from 'ttmik-webhook';
```

Set environment variables:

- `WEBHOOK_SECRET` (required)
- `TWITTER_BEARER_TOKEN` (optional)

## License

MIT