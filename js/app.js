/* Shotokan Kata app: hash router, NL/EN switch, kata and kihon pages.
   All content lives in data/*.json; this file only has the interface text. */
(function () {
  'use strict';

  var UI = {
    nl: {
      homeTitle: 'Shotokan karate',
      homeSub: 'Alle kata en basistechnieken op één plek.',
      kata: 'Kata', kihon: 'Kihon',
      kataSub: 'Alle 26 Shotokan-kata, op bandvolgorde, met video.',
      kihonSub: 'Standen, stoten, slagen, weringen en trappen.',
      items: 'onderdelen', open: 'Openen',
      search: 'Zoeken…', noResults: 'Niets gevonden.',
      meaning: 'Betekenis', exam: 'KBN-danexamen', kyu: 'Kyu-graad',
      kyuTodo: 'Nog niet ingevuld. De kyu-examens regelt je eigen club: vraag je leraar bij welke band deze kata hoort.',
      noVideo: 'Geen video', videoComing: 'Er is nog geen video gekozen voor deze kata.',
      videoBy: 'Video', prev: 'Vorige', next: 'Volgende',
      sources: 'Bron bandvolgorde: KBN-examenprogramma’s Shotokan (dan-graden).',
      playPause: 'Afspelen / pauzeren', position: 'Positie in de video',
      back1: '1 seconde terug', fwd1: '1 seconde vooruit', backSmall: 'Klein stapje terug', fwdSmall: 'Klein stapje vooruit',
      speed: 'Snelheid', loop: 'Stuk herhalen',
      setA: 'Begin (A)', setB: 'Eind (B)', loopOn: 'Herhaal', loopOff: 'Stop herhalen', clear: 'Wis',
      nowSetB: 'zet nu het eindpunt (B)', nowSetA: 'zet nu het beginpunt (A)', bAfterA: 'Het eindpunt (B) moet na het beginpunt (A) liggen.',
      fullscreen: 'Volledig scherm',
      videoError: 'Deze video kan niet worden afgespeeld.', offline: 'Video niet beschikbaar. Ben je online?',
      notFound: 'Niet gevonden.', loadError: 'De inhoud kon niet worden geladen.',
      privacy: 'Geen account, geen tracking. Video’s via YouTube in privacymodus.'
    },
    en: {
      homeTitle: 'Shotokan karate',
      homeSub: 'All kata and basic techniques in one place.',
      kata: 'Kata', kihon: 'Kihon',
      kataSub: 'All 26 Shotokan kata, in belt order, with video.',
      kihonSub: 'Stances, punches, strikes, blocks and kicks.',
      items: 'items', open: 'Open',
      search: 'Search…', noResults: 'Nothing found.',
      meaning: 'Meaning', exam: 'KBN dan exam', kyu: 'Kyu grade',
      kyuTodo: 'Not filled in yet. Kyu exams are set by your own club: ask your instructor which belt this kata belongs to.',
      noVideo: 'No video', videoComing: 'No video has been chosen for this kata yet.',
      videoBy: 'Video', prev: 'Previous', next: 'Next',
      sources: 'Belt order source: KBN Shotokan exam programmes (dan grades).',
      playPause: 'Play / pause', position: 'Position in the video',
      back1: 'Back 1 second', fwd1: 'Forward 1 second', backSmall: 'Small step back', fwdSmall: 'Small step forward',
      speed: 'Speed', loop: 'Repeat a section',
      setA: 'Start (A)', setB: 'End (B)', loopOn: 'Repeat', loopOff: 'Stop repeat', clear: 'Clear',
      nowSetB: 'now set the end point (B)', nowSetA: 'now set the start point (A)', bAfterA: 'The end point (B) must come after the start point (A).',
      fullscreen: 'Fullscreen',
      videoError: 'This video can’t be played.', offline: 'Video not available. Are you online?',
      notFound: 'Not found.', loadError: 'The content could not be loaded.',
      privacy: 'No account, no tracking. Videos via YouTube in privacy-enhanced mode.'
    }
  };

  var app = document.getElementById('app');
  var lang = 'nl';
  try {
    lang = localStorage.getItem('lang') || ((navigator.language || '').toLowerCase().indexOf('nl') === 0 ? 'nl' : 'en');
  } catch (e) { /* storage blocked: use default */ }
  if (!UI[lang]) lang = 'nl';

  var data = { kata: null, kihon: null };
  var currentPlayer = null;
  var listQuery = { kata: '', kihon: '' };

  function t(key) { return UI[lang][key] || key; }
  function L(obj) { return obj ? (obj[lang] || obj.nl || obj.en || '') : ''; }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function norm(s) { return String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[-\s]+/g, ' '); }

  function setLang(l) {
    lang = l;
    document.documentElement.lang = l;
    try { localStorage.setItem('lang', l); } catch (e) { /* ignore */ }
    render();
  }
  document.documentElement.lang = lang;
  document.getElementById('lang-toggle').addEventListener('click', function () { setLang(lang === 'nl' ? 'en' : 'nl'); });

  function loadJson(path) {
    return fetch(path, { cache: 'no-cache' }).then(function (r) {
      if (!r.ok) throw new Error(path + ' ' + r.status);
      return r.json();
    });
  }

  /* ---------- Views ---------- */

  function viewHome() {
    document.title = 'Shotokan Kata';
    return '<div class="wrap">' +
      '<h1 class="home-title">' + esc(t('homeTitle')) + '</h1>' +
      '<p class="home-sub">' + esc(t('homeSub')) + '</p>' +
      '<div class="choices">' +
        '<a class="choice" href="#/kata"><div class="ph"><span class="ph-glyph" lang="ja">型</span></div>' +
          '<h2>' + esc(t('kata')) + '</h2><p>' + esc(t('kataSub')) + ' <span class="count">· ' + data.kata.kata.length + ' kata</span></p>' +
          '<span class="go">' + esc(t('open')) + ' <span class="ar">&rarr;</span></span></a>' +
        '<a class="choice" href="#/kihon"><div class="ph"><span class="ph-glyph" lang="ja">基本</span></div>' +
          '<h2>' + esc(t('kihon')) + '</h2><p>' + esc(t('kihonSub')) + ' <span class="count">· ' + countKihon() + ' ' + esc(t('items')) + '</span></p>' +
          '<span class="go">' + esc(t('open')) + ' <span class="ar">&rarr;</span></span></a>' +
      '</div>' +
      '<p class="footer-note">' + esc(t('privacy')) + '</p>' +
    '</div>';
  }

  function countKihon() {
    return data.kihon.groups.reduce(function (n, g) { return n + g.items.length; }, 0);
  }

  function kataRows(q) {
    var list = data.kata.kata;
    var html = '';
    var anyShown = false;
    data.kata.levels.forEach(function (lvl) {
      var rows = '';
      list.forEach(function (k, i) {
        if (k.level !== lvl.id) return;
        if (q && norm(k.name + ' ' + L(k.meaning)).indexOf(q) === -1) return;
        rows += '<li><a class="row" href="#/kata/' + esc(k.id) + '">' +
          '<span class="num">' + (i + 1) + '</span>' +
          '<span class="main"><span class="title">' + esc(k.name) + '</span><span class="sub">' + esc(L(k.meaning)) + '</span></span>' +
          (k.video && k.video.youtubeId ? '' : '<span class="novideo">' + esc(t('noVideo')) + '</span>') +
          '<span class="chev" aria-hidden="true">&rsaquo;</span></a></li>';
      });
      if (!rows) return;
      anyShown = true;
      html += '<h2 class="section-title">' + esc(L(lvl.title)) + '</h2>' +
        (q ? '' : '<p class="section-note">' + esc(L(lvl.note)) + '</p>') +
        '<ul class="list">' + rows + '</ul>';
    });
    return anyShown ? html : '<p class="empty">' + esc(t('noResults')) + '</p>';
  }

  function viewKataList() {
    document.title = t('kata') + ' · Shotokan';
    return '<div class="wrap">' +
      '<div class="page-head"><a class="back" href="#/" aria-label="Home">&lsaquo;</a><h1>' + esc(t('kata')) + '</h1></div>' +
      '<input class="search" type="search" data-list="kata" placeholder="' + esc(t('search')) + '" value="' + esc(listQuery.kata) + '" autocomplete="off" enterkeyhint="search">' +
      '<div data-results>' + kataRows(norm(listQuery.kata).trim()) + '</div>' +
      '<p class="footer-note">' + esc(t('sources')) + ' ' +
        data.kata.sources.map(function (s, i) { return '<a href="' + esc(s.url) + '" target="_blank" rel="noopener noreferrer">[' + (i + 1) + ']</a>'; }).join(' ') +
      '</p>' +
    '</div>';
  }

  function viewKata(id) {
    var list = data.kata.kata;
    var idx = list.findIndex(function (k) { return k.id === id; });
    if (idx === -1) return viewNotFound('#/kata');
    var k = list[idx];
    var lvl = data.kata.levels.find(function (l) { return l.id === k.level; });
    var prev = list[idx - 1], next = list[idx + 1];
    document.title = k.name + ' · Shotokan';
    var hasVideo = k.video && k.video.youtubeId;
    return '<div class="wrap">' +
      '<div class="page-head"><a class="back" href="#/kata" aria-label="' + esc(t('kata')) + '">&lsaquo;</a>' +
        '<span class="sub" style="color:var(--muted);font-size:14px">' + (idx + 1) + ' / ' + list.length + ' · ' + esc(lvl ? L(lvl.title) : '') + '</span></div>' +
      '<h1 class="detail-name">' + esc(k.name) + '</h1>' +
      '<p class="meaning">' + esc(L(k.meaning)) + '</p>' +
      (hasVideo
        ? '<div data-player></div>' +
          (k.video.channel ? '<p class="credit">' + esc(t('videoBy')) + ': <a href="https://www.youtube.com/watch?v=' + esc(k.video.youtubeId) + '" target="_blank" rel="noopener noreferrer">' + esc(k.video.title || k.name) + '</a> · ' + esc(k.video.channel) + '</p>' : '')
        : '<div class="novideo-box">' + esc(t('videoComing')) + '</div>') +
      '<div class="facts">' +
        '<div class="fact"><b>' + esc(t('exam')) + '</b>' + esc(L(k.exam)) + '</div>' +
        (k.kyu == null
          ? '<div class="fact todo"><b>' + esc(t('kyu')) + '</b>' + esc(t('kyuTodo')) + '</div>'
          : '<div class="fact"><b>' + esc(t('kyu')) + '</b>' + esc(k.kyu) + (lang === 'nl' ? 'e kyu' : ' kyu') + '</div>') +
      '</div>' +
      '<nav class="pager">' +
        (prev ? '<a class="prev" href="#/kata/' + esc(prev.id) + '"><small>&lsaquo; ' + esc(t('prev')) + '</small>' + esc(prev.name) + '</a>' : '') +
        (next ? '<a class="next" href="#/kata/' + esc(next.id) + '"><small>' + esc(t('next')) + ' &rsaquo;</small>' + esc(next.name) + '</a>' : '') +
      '</nav>' +
    '</div>';
  }

  /* Kihon image: uses "image" from kihon.json if set, otherwise img/kihon/<id>.jpg.
     If the file isn't there (yet), a neutral placeholder with the name is shown. */
  function kihonImage(it, big) {
    var src = it.image || ('img/kihon/' + it.id + '.jpg');
    return '<div class="ph' + (big ? ' big' : '') + '">' +
      '<span class="ph-name">' + esc(it.name) + '</span>' +
      '<img src="' + esc(src) + '" alt="' + esc(it.name) + '"' + (big ? '' : ' loading="lazy"') + ' data-kihon-img>' +
    '</div>';
  }
  document.addEventListener('load', function (e) {
    if (e.target.hasAttribute && e.target.hasAttribute('data-kihon-img')) e.target.parentNode.classList.add('has-img');
  }, true);
  document.addEventListener('error', function (e) {
    if (e.target.hasAttribute && e.target.hasAttribute('data-kihon-img')) e.target.remove();
  }, true);

  function kihonRows(q) {
    var html = '';
    data.kihon.groups.forEach(function (g) {
      var rows = '';
      g.items.forEach(function (it) {
        if (q && norm(it.name + ' ' + L(it.translation) + ' ' + g.name + ' ' + L(g.title)).indexOf(q) === -1) return;
        rows += '<a class="card" href="#/kihon/' + esc(it.id) + '">' + kihonImage(it, false) +
          '<span class="meta"><span class="title">' + esc(it.name) + '</span><span class="sub">' + esc(L(it.translation)) + '</span></span></a>';
      });
      if (!rows) return;
      html += '<h2 class="section-title">' + esc(L(g.title)) + ' <span>' + esc(g.name) + '</span></h2><div class="grid">' + rows + '</div>';
    });
    return html || '<p class="empty">' + esc(t('noResults')) + '</p>';
  }

  function viewKihonList() {
    document.title = t('kihon') + ' · Shotokan';
    return '<div class="wrap">' +
      '<div class="page-head"><a class="back" href="#/" aria-label="Home">&lsaquo;</a><h1>' + esc(t('kihon')) + '</h1></div>' +
      '<input class="search" type="search" data-list="kihon" placeholder="' + esc(t('search')) + '" value="' + esc(listQuery.kihon) + '" autocomplete="off" enterkeyhint="search">' +
      '<div data-results>' + kihonRows(norm(listQuery.kihon).trim()) + '</div>' +
    '</div>';
  }

  function viewKihon(id) {
    var flat = [];
    data.kihon.groups.forEach(function (g) { g.items.forEach(function (it) { flat.push({ g: g, it: it }); }); });
    var idx = flat.findIndex(function (x) { return x.it.id === id; });
    if (idx === -1) return viewNotFound('#/kihon');
    var cur = flat[idx], prev = flat[idx - 1], next = flat[idx + 1];
    var it = cur.it;
    document.title = it.name + ' · Shotokan';
    return '<div class="wrap">' +
      '<div class="page-head"><a class="back" href="#/kihon" aria-label="' + esc(t('kihon')) + '">&lsaquo;</a></div>' +
      '<div class="kihon-card">' +
        '<div class="group">' + esc(L(cur.g.title)) + ' · ' + esc(cur.g.name) + '</div>' +
        '<h1 class="detail-name">' + esc(it.name) + '</h1>' +
        '<p class="translation">' + esc(L(it.translation)) + '</p>' +
        kihonImage(it, true) +
        '<p>' + esc(L(it.explanation)) + '</p>' +
      '</div>' +
      '<nav class="pager">' +
        (prev ? '<a class="prev" href="#/kihon/' + esc(prev.it.id) + '"><small>&lsaquo; ' + esc(t('prev')) + '</small>' + esc(prev.it.name) + '</a>' : '') +
        (next ? '<a class="next" href="#/kihon/' + esc(next.it.id) + '"><small>' + esc(t('next')) + ' &rsaquo;</small>' + esc(next.it.name) + '</a>' : '') +
      '</nav>' +
    '</div>';
  }

  function viewNotFound(back) {
    return '<div class="wrap"><div class="page-head"><a class="back" href="' + back + '">&lsaquo;</a><h1>' + esc(t('notFound')) + '</h1></div></div>';
  }

  /* ---------- Router ---------- */

  var lastRoute = null;
  function render() {
    if (currentPlayer) { currentPlayer.destroy(); currentPlayer = null; }
    var parts = (location.hash.replace(/^#\/?/, '') || '').split('/').filter(Boolean).map(decodeURIComponent);
    var html;
    if (parts[0] === 'kata' && parts[1]) html = viewKata(parts[1]);
    else if (parts[0] === 'kata') html = viewKataList();
    else if (parts[0] === 'kihon' && parts[1]) html = viewKihon(parts[1]);
    else if (parts[0] === 'kihon') html = viewKihonList();
    else html = viewHome();
    app.innerHTML = html;

    var route = parts.join('/');
    if (route !== lastRoute) { window.scrollTo(0, 0); lastRoute = route; }

    var slot = app.querySelector('[data-player]');
    if (slot && parts[0] === 'kata') {
      var k = data.kata.kata.find(function (x) { return x.id === parts[1]; });
      currentPlayer = window.KataPlayer.mount(slot, { videoId: k.video.youtubeId, t: t });
    }
    var search = app.querySelector('.search');
    if (search) {
      search.addEventListener('input', function () {
        var which = search.getAttribute('data-list');
        listQuery[which] = search.value;
        var q = norm(search.value).trim();
        app.querySelector('[data-results]').innerHTML = which === 'kata' ? kataRows(q) : kihonRows(q);
      });
    }
  }

  window.addEventListener('hashchange', render);

  Promise.all([loadJson('data/kata.json'), loadJson('data/kihon.json')]).then(function (res) {
    data.kata = res[0];
    data.kihon = res[1];
    render();
  }).catch(function (err) {
    app.innerHTML = '<div class="wrap"><p>' + esc(t('loadError')) + '</p><p class="empty">' + esc(err.message) + '</p></div>';
  });

  if ('serviceWorker' in navigator && location.protocol === 'https:') {
    window.addEventListener('load', function () { navigator.serviceWorker.register('sw.js').catch(function () {}); });
  }
})();
