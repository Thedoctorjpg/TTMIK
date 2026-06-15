/**
 * Social sharing and webhook integration (from TTMIK Tweet app)
 */

function isValidWebhookUrl(url) {
    try {
        if (url.startsWith('/')) {
            return /^\/[\w./-]+$/.test(url) && !url.includes('..');
        }
        const parsed = new URL(url);
        return parsed.origin === window.location.origin;
    } catch {
        return false;
    }
}

function getPlaybackProgressPercent() {
    const slider = document.getElementById('progress');
    if (!slider || !audio || !audio.duration || !isFinite(audio.duration)) {
        return 0;
    }
    return Math.round((audio.currentTime / audio.duration) * 100);
}

function tweetProgress() {
    const lesson = lessons[currentLesson];
    const pct = getPlaybackProgressPercent();
    const title = sanitizeLessonText(lesson?.title, 200) || 'Korean practice';
    const text = `Just finished "${title}" with TTMIK! \u{1F1F0}\u{1F1F7}\u{1F525} Progress: ${pct}% #LearnKorean #TTMIK`;

    window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,
        '_blank',
        'noopener,noreferrer'
    );

    const payload = {
        event: 'ttmik_progress',
        lesson: title,
        progress: pct,
        timestamp: new Date().toISOString(),
        platform: 'TTMIK Audio Lab'
    };

    const webhookUrl = localStorage.getItem('ttmik_webhook_url');
    if (webhookUrl && isValidWebhookUrl(webhookUrl)) {
        const headers = { 'Content-Type': 'application/json' };
        const webhookSecret = localStorage.getItem('ttmik_webhook_secret');
        if (webhookSecret) headers['X-Webhook-Secret'] = webhookSecret;

        fetch(webhookUrl, {
            method: 'POST',
            headers,
            body: JSON.stringify(payload)
        }).catch(() => {});
    }
}

function configureWebhook() {
    const currentUrl = localStorage.getItem('ttmik_webhook_url') || '';
    const url = prompt(
        'Webhook URL (same-origin only, e.g. /api/ttmik-webhook — leave blank to disable):',
        currentUrl
    );
    if (url === null) return;

    const trimmed = url.trim();
    if (!trimmed) {
        localStorage.removeItem('ttmik_webhook_url');
        localStorage.removeItem('ttmik_webhook_secret');
        alert('Webhook disabled.');
        return;
    }

    if (!isValidWebhookUrl(trimmed)) {
        alert('Invalid URL. Use a same-origin path (e.g. /api/ttmik-webhook) or your site origin.');
        return;
    }

    const secret = prompt(
        'Webhook secret (optional — must match server WEBHOOK_SECRET):',
        localStorage.getItem('ttmik_webhook_secret') || ''
    );
    if (secret === null) return;

    localStorage.setItem('ttmik_webhook_url', trimmed);
    if (secret.trim()) {
        localStorage.setItem('ttmik_webhook_secret', secret.trim());
    } else {
        localStorage.removeItem('ttmik_webhook_secret');
    }
    alert('Webhook saved.');
}