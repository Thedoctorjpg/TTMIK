/**
 * Social sharing and webhook integration (from TTMIK Tweet app)
 */

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
    const title = lesson?.title || 'Korean practice';
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
    if (webhookUrl) {
        fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        }).catch(err => console.warn('Webhook error:', err));
    }

    console.log('Tweet payload:', payload);
}

function configureWebhook() {
    const current = localStorage.getItem('ttmik_webhook_url') || '';
    const url = prompt(
        'Webhook URL for progress events (leave blank to disable):',
        current
    );
    if (url === null) return;
    if (url.trim()) {
        localStorage.setItem('ttmik_webhook_url', url.trim());
        alert('Webhook URL saved.');
    } else {
        localStorage.removeItem('ttmik_webhook_url');
        alert('Webhook disabled.');
    }
}