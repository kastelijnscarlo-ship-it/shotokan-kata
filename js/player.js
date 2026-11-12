/* Kata video player: YouTube (privacy-enhanced, youtube-nocookie.com) with custom controls.
   Play/pause, speed 0.25x–1.5x, small steps back/forward, A–B loop, fullscreen. */
(function () {
  'use strict';

  var apiPromise = null;
  function loadYouTubeApi() {
    if (window.YT && window.YT.Player) return Promise.resolve(window.YT);
    if (apiPromise) return apiPromise;
    apiPromise = new Promise(function (resolve, reject) {
      var prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = function () {
        if (typeof prev === 'function') prev();
        resolve(window.YT);
      };
      var s = document.createElement('script');
      s.src = 'https://www.youtube.com/iframe_api';
      s.async = true;
      s.onerror = function () { apiPromise = null; reject(new Error('YouTube API failed to load')); };
      document.head.appendChild(s);
    });
    return apiPromise;
  }

  var SPEEDS = [0.25, 0.5, 0.75, 1, 1.25, 1.5];
  var SMALL_STEP = 0.2;  // seconds
  var BIG_STEP = 1;      // seconds

  function fmt(t) {
    if (!isFinite(t) || t < 0) t = 0;
    var m = Math.floor(t / 60);
    var s = Math.floor(t % 60);
    var d = Math.floor((t % 1) * 10);
    return m + ':' + (s < 10 ? '0' : '') + s + '.' + d;
  }

  function el(tag, attrs, html) {
    var e = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) { e.setAttribute(k, attrs[k]); });
    if (html != null) e.innerHTML = html;
    return e;
  }

  /**
   * mount(container, { videoId, t: function(key) -> label })
   * Returns { destroy() }.
   */
  function mount(container, opts) {
    var t = opts.t;
    var root = el('div', { 'class': 'player paused' });
    var box = el('div', { 'class': 'video-box' });
    var target = el('div');
    var tap = el('button', { 'class': 'tap-layer', type: 'button', 'aria-label': t('playPause') }, '<span class="flash">&#9654;</span>');
    box.appendChild(target);
    box.appendChild(tap);
    root.appendChild(box);

    var controls = el('div', { 'class': 'controls' });
    controls.innerHTML =
      '<div class="timeline">' +
        '<span data-ref="cur">0:00.0</span>' +
        '<div class="track"><div class="loop-band" data-ref="band"></div>' +
        '<input type="range" min="0" max="100" step="0.1" value="0" data-ref="seek" aria-label="' + t('position') + '"></div>' +
        '<span data-ref="dur">0:00.0</span>' +
      '</div>' +
      '<div class="btn-row">' +
        '<button class="btn" type="button" data-act="back-big" aria-label="' + t('back1') + '">&minus;1s</button>' +
        '<button class="btn" type="button" data-act="back-small" aria-label="' + t('backSmall') + '">&lsaquo; 0.2</button>' +
        '<button class="btn big" type="button" data-act="toggle" data-ref="playBtn" aria-label="' + t('playPause') + '">&#9654;</button>' +
        '<button class="btn" type="button" data-act="fwd-small" aria-label="' + t('fwdSmall') + '">0.2 &rsaquo;</button>' +
        '<button class="btn" type="button" data-act="fwd-big" aria-label="' + t('fwd1') + '">+1s</button>' +
      '</div>' +
      '<div class="label">' + t('speed') + '</div>' +
      '<div class="btn-row speed" data-ref="speeds">' +
        SPEEDS.map(function (s) {
          return '<button class="btn' + (s === 1 ? ' on' : '') + '" type="button" data-speed="' + s + '">' + s + '&times;</button>';
        }).join('') +
      '</div>' +
      '<div class="label">' + t('loop') + '</div>' +
      '<div class="btn-row">' +
        '<button class="btn" type="button" data-act="set-a">' + t('setA') + '</button>' +
        '<button class="btn" type="button" data-act="set-b">' + t('setB') + '</button>' +
        '<button class="btn" type="button" data-act="loop" data-ref="loopBtn" disabled>' + t('loopOn') + '</button>' +
        '<button class="btn" type="button" data-act="clear">' + t('clear') + '</button>' +
        '<button class="btn" type="button" data-act="fs" aria-label="' + t('fullscreen') + '">&#x26F6;</button>' +
      '</div>' +
      '<div class="loop-status" data-ref="loopStatus"></div>';
    root.appendChild(controls);
    container.appendChild(root);

    function ref(name) { return controls.querySelector('[data-ref="' + name + '"]'); }
    var seek = ref('seek'), cur = ref('cur'), dur = ref('dur'), band = ref('band');
    var playBtn = ref('playBtn'), loopBtn = ref('loopBtn'), loopStatus = ref('loopStatus');

    var player = null, ready = false, timer = null, destroyed = false;
    var duration = 0, dragging = false, playing = false;
    var loopA = null, loopB = null, loopOn = false;

    function now() { return ready ? (player.getCurrentTime() || 0) : 0; }
    function clamp(x) { return Math.max(0, Math.min(duration || x, x)); }

    function seekTo(time) {
      if (!ready) return;
      time = clamp(time);
      player.seekTo(time, true);
      updateTime(time);
    }

    function step(delta) {
      if (!ready) return;
      if (playing) player.pauseVideo();
      seekTo(now() + delta);
    }

    function updateTime(time) {
      if (time == null) time = now();
      if (!duration && ready) {
        duration = player.getDuration() || 0;
        if (duration) { seek.max = duration.toFixed(1); dur.textContent = fmt(duration); drawLoop(); }
      }
      cur.textContent = fmt(time);
      if (!dragging) seek.value = time.toFixed(1);
    }

    function drawLoop() {
      var txt = '';
      if (loopA != null && loopB != null && duration) {
        band.style.left = (loopA / duration * 100) + '%';
        band.style.width = ((loopB - loopA) / duration * 100) + '%';
        band.classList.add('show');
        txt = 'A ' + fmt(loopA) + ' → B ' + fmt(loopB);
      } else {
        band.classList.remove('show');
        if (loopA != null) txt = 'A ' + fmt(loopA) + ' — ' + t('nowSetB');
        else if (loopB != null) txt = 'B ' + fmt(loopB) + ' — ' + t('nowSetA');
      }
      loopStatus.textContent = txt;
      var valid = loopA != null && loopB != null;
      loopBtn.disabled = !valid;
      loopBtn.classList.toggle('on', loopOn && valid);
      loopBtn.textContent = loopOn && valid ? t('loopOff') : t('loopOn');
    }

    function tick() {
      if (!ready || destroyed) return;
      var time = now();
      if (loopOn && loopA != null && loopB != null && playing && (time >= loopB || time < loopA - 0.5)) {
        player.seekTo(loopA, true);
        time = loopA;
      }
      updateTime(time);
    }

    function setPlaying(p) {
      playing = p;
      playBtn.innerHTML = p ? '&#10074;&#10074;' : '&#9654;';
      root.classList.toggle('paused', !p);
      tap.querySelector('.flash').innerHTML = p ? '&#10074;&#10074;' : '&#9654;';
    }

    function toggle() {
      if (!ready) return;
      if (playing) player.pauseVideo(); else player.playVideo();
    }

    function setSpeed(s) {
      if (!ready) return;
      player.setPlaybackRate(s);
    }

    function markSpeed(s) {
      controls.querySelectorAll('[data-speed]').forEach(function (b) {
        b.classList.toggle('on', Number(b.getAttribute('data-speed')) === s);
      });
    }

    // Fullscreen: real fullscreen where supported, otherwise a CSS "fill the screen" mode (iPhone).
    function isFs() { return document.fullscreenElement === root || document.webkitFullscreenElement === root || root.classList.contains('pseudo-fs'); }
    function toggleFs() {
      if (isFs()) {
        if (root.classList.contains('pseudo-fs')) { root.classList.remove('pseudo-fs'); document.body.classList.remove('no-scroll'); }
        else if (document.exitFullscreen) document.exitFullscreen();
        else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
        return;
      }
      var req = root.requestFullscreen || root.webkitRequestFullscreen;
      if (req) {
        try {
          var r = req.call(root);
          if (r && r.catch) r.catch(function () { pseudo(); });
        } catch (e) { pseudo(); }
      } else pseudo();
      function pseudo() { root.classList.add('pseudo-fs'); document.body.classList.add('no-scroll'); }
    }

    controls.addEventListener('click', function (e) {
      var b = e.target.closest('button');
      if (!b) return;
      var sp = b.getAttribute('data-speed');
      if (sp) { setSpeed(Number(sp)); return; }
      switch (b.getAttribute('data-act')) {
        case 'toggle': toggle(); break;
        case 'back-small': step(-SMALL_STEP); break;
        case 'fwd-small': step(SMALL_STEP); break;
        case 'back-big': step(-BIG_STEP); break;
        case 'fwd-big': step(BIG_STEP); break;
        case 'set-a':
          loopA = now();
          if (loopB != null && loopB <= loopA) loopB = null;
          if (loopB != null) loopOn = true;
          drawLoop(); break;
        case 'set-b':
          var tb = now();
          if (loopA != null && tb <= loopA) { loopStatus.textContent = t('bAfterA'); return; }
          loopB = tb;
          if (loopA != null) { loopOn = true; seekTo(loopA); }
          drawLoop(); break;
        case 'loop':
          loopOn = !loopOn;
          if (loopOn) seekTo(loopA);
          drawLoop(); break;
        case 'clear': loopA = loopB = null; loopOn = false; drawLoop(); break;
        case 'fs': toggleFs(); break;
      }
    });
    tap.addEventListener('click', toggle);
    seek.addEventListener('input', function () { dragging = true; cur.textContent = fmt(Number(seek.value)); });
    seek.addEventListener('change', function () { dragging = false; seekTo(Number(seek.value)); });
    function onKey(e) {
      if (!ready || /input|textarea/i.test(e.target.tagName)) return;
      if (e.key === ' ' || e.key === 'k') { e.preventDefault(); toggle(); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); step(e.shiftKey ? -BIG_STEP : -SMALL_STEP); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); step(e.shiftKey ? BIG_STEP : SMALL_STEP); }
      else if (e.key === 'Escape' && root.classList.contains('pseudo-fs')) toggleFs();
    }
    document.addEventListener('keydown', onKey);

    loadYouTubeApi().then(function (YT) {
      if (destroyed) return;
      player = new YT.Player(target, {
        host: 'https://www.youtube-nocookie.com',
        videoId: opts.videoId,
        width: '100%', height: '100%',
        playerVars: {
          controls: 0, playsinline: 1, rel: 0, modestbranding: 1,
          iv_load_policy: 3, disablekb: 1, fs: 0, cc_load_policy: 0,
          origin: location.origin
        },
        events: {
          onReady: function () {
            ready = true;
            updateTime(0);
            timer = setInterval(tick, 100);
          },
          onStateChange: function (ev) {
            if (ev.data === YT.PlayerState.PLAYING) { root.classList.add('started'); setPlaying(true); }
            else if (ev.data === YT.PlayerState.PAUSED || ev.data === YT.PlayerState.CUED) setPlaying(false);
            else if (ev.data === YT.PlayerState.ENDED) {
              setPlaying(false);
              if (loopOn && loopA != null) { player.seekTo(loopA, true); player.playVideo(); }
            }
          },
          onPlaybackRateChange: function (ev) { markSpeed(ev.data); },
          onError: function () {
            box.innerHTML = '<div class="novideo-box" style="position:absolute;inset:0;display:grid;place-items:center;border-radius:0">' + t('videoError') + '</div>';
          }
        }
      });
    }).catch(function () {
      box.innerHTML = '<div class="novideo-box" style="position:absolute;inset:0;display:grid;place-items:center;border-radius:0">' + t('offline') + '</div>';
    });

    return {
      destroy: function () {
        destroyed = true;
        if (timer) clearInterval(timer);
        document.removeEventListener('keydown', onKey);
        document.body.classList.remove('no-scroll');
        if (document.fullscreenElement === root && document.exitFullscreen) document.exitFullscreen();
        try { if (player && player.destroy) player.destroy(); } catch (e) { /* ignore */ }
      }
    };
  }

  window.KataPlayer = { mount: mount };
})();
