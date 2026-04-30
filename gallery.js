// gallery.js — Logika halaman Galeri (info gambar + audio player)

// ── IMAGE INFO ──────────────────────────────────────────────
function showInfo(name, desc) {
    var box  = document.getElementById('info-box');
    var text = document.getElementById('info-text');

    box.style.display = 'block';

    if (name) {
        text.innerHTML =
            '<strong style="color:var(--gold-light);font-family:\'Cinzel\',serif;">'
            + name + '</strong><br>' + desc;
    } else {
        text.textContent = 'Klik salah satu gambar untuk melihat informasi.';
    }
}

// ── AUDIO PLAYER ────────────────────────────────────────────
var audio    = document.getElementById('myAudio');
var playBtn  = document.getElementById('playBtn');
var fill     = document.getElementById('progressFill');
var dot      = document.getElementById('progressDot');
var timeEl   = document.getElementById('audioTime');
var statusEl = document.getElementById('audio-status');

function fmt(s) {
    var m   = Math.floor(s / 60);
    var sec = Math.floor(s % 60);
    return m + ':' + (sec < 10 ? '0' : '') + sec;
}

function togglePlay() {
    if (audio.paused) {
        audio.play()
            .then(function() {
                playBtn.textContent  = '❚❚ Pause';
                statusEl.textContent = '▶ Sedang diputar…';
            })
            .catch(function() {
                statusEl.textContent = '⚠ File audio tidak ditemukan.';
                alert('⚠ File audio tidak ditemukan.\nLetakkan file audio.mp3 di folder yang sama dengan gallery.html.');
            });
    } else {
        audio.pause();
        playBtn.textContent  = '▶ Play';
        statusEl.textContent = '— Dijeda —';
    }
}

function stopAudio() {
    audio.pause();
    audio.currentTime    = 0;
    playBtn.textContent  = '▶ Play';
    statusEl.textContent = '— Dihentikan —';
    fill.style.width     = '0%';
    dot.style.left       = '0%';
    timeEl.textContent   = '0:00 / 0:00';
}

function seekAudio(e) {
    if (!audio.duration) return;
    var rect = e.currentTarget.getBoundingClientRect();
    var pct  = (e.clientX - rect.left) / rect.width;
    audio.currentTime = pct * audio.duration;
}

audio.addEventListener('timeupdate', function() {
    if (!audio.duration) return;
    var pct          = (audio.currentTime / audio.duration) * 100;
    fill.style.width = pct + '%';
    dot.style.left   = pct + '%';
    timeEl.textContent = fmt(audio.currentTime) + ' / ' + fmt(audio.duration);
});

audio.addEventListener('ended', function() {
    playBtn.textContent  = '▶ Play';
    statusEl.textContent = '— Selesai —';
});