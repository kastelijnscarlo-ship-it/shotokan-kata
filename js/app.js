/* Shotokan Kata app: hash router, NL/EN switch, exam, kata, kihon and theory pages.
   All content lives in data/*.json; this file only has the interface text. */
(function () {
  'use strict';

  var UI = {
    nl: {
      homeTitle: 'Shotokan karate',
      homeSub: 'Examenstof per band, kata, kihon en theorie op één plek.',
      exams: 'Examens', kata: 'Kata', kihon: 'Kihon', theory: 'Theorie',
      examsSub: 'Het examenprogramma per band: kihon, kata en kumite.',
      kataSub: 'Alle 26 Shotokan-kata, op bandvolgorde, met video.',
      kihonSub: 'Standen, stoten, slagen, weringen en trappen.',
      theorySub: 'Groeten, tellen, begrippen en geschiedenis.',
      items: 'onderdelen', belts: 'graden', terms: 'begrippen', open: 'Openen',
      search: 'Zoeken…', noResults: 'Niets gevonden.',
      meaning: 'Betekenis', exam: 'KBN-danexamen', kyuExam: 'Kyu-examen',
      inExams: 'In het examen',
      noVideo: 'Geen video', videoComing: 'Er is nog geen video gekozen voor deze kata.',
      videoBy: 'Video', prev: 'Vorige', next: 'Volgende',
      sources: 'Bron bandvolgorde: KBN-examenprogramma’s Shotokan (dan-graden) en het Shin-ju-examenprogramma (kyu-graden).',
      examSources: 'Bronnen: examenprogramma’s van Shin-ju Karate-do Amsterdam (Shotokan 4e platform) en KBN.',
      theorySources: 'Bronnen:',
      examIntro: 'Wat je per band op het examen laat zien. Tik op een techniek voor uitleg en plaatje, of op een kata voor de video.',
      nextExam: 'Jouw volgende examen', setMyExam: 'Markeer als mijn volgende examen', isMyExam: 'Mijn volgende examen', tagMine: 'Volgende',
      newHere: 'Nieuw',
      secKihon: 'A · Kihon', secKata: 'B · Kata', secKumite: 'C · Kumite',
      focus: 'Aandachtspunten', termsHere: 'Begrippen in dit examen', toTheory: 'Alle theorie',
      source: 'Bron', officialProgramme: 'Officieel examenprogramma',
      choiceOf: 'Eén naar keuze', start: 'Begin', end: 'Einde',
      dir: { V: 'Voorwaarts', A: 'Achterwaarts', Z: 'Zijwaarts' },
      move: { h: 'Heen', t: 'Terug', ht: 'Heen en terug' },
      legend: 'V = voorwaarts · A = achterwaarts · Z = zijwaarts · Heen = naar de examentafel · Terug = van de tafel af',
      kataCount: 'kata',
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
      homeSub: 'Exam material per belt, kata, kihon and theory in one place.',
      exams: 'Exams', kata: 'Kata', kihon: 'Kihon', theory: 'Theory',
      examsSub: 'The exam programme per belt: kihon, kata and kumite.',
      kataSub: 'All 26 Shotokan kata, in belt order, with video.',
      kihonSub: 'Stances, punches, strikes, blocks and kicks.',
      theorySub: 'Bowing, counting, terms and history.',
      items: 'items', belts: 'grades', terms: 'terms', open: 'Open',
      search: 'Search…', noResults: 'Nothing found.',
      meaning: 'Meaning', exam: 'KBN dan exam', kyuExam: 'Kyu exam',
      inExams: 'In the exam',
      noVideo: 'No video', videoComing: 'No video has been chosen for this kata yet.',
      videoBy: 'Video', prev: 'Previous', next: 'Next',
      sources: 'Belt order sources: KBN Shotokan exam programmes (dan grades) and the Shin-ju exam programme (kyu grades).',
      examSources: 'Sources: exam programmes of Shin-ju Karate-do Amsterdam (Shotokan 4e platform) and KBN.',
      theorySources: 'Sources:',
      examIntro: 'What you show at the exam for each belt. Tap a technique for its explanation and picture, or a kata for the video.',
      nextExam: 'Your next exam', setMyExam: 'Mark as my next exam', isMyExam: 'My next exam', tagMine: 'Next',
      newHere: 'New',
      secKihon: 'A · Kihon', secKata: 'B · Kata', secKumite: 'C · Kumite',
      focus: 'Points of attention', termsHere: 'Terms in this exam', toTheory: 'All theory',
      source: 'Source', officialProgramme: 'Official exam programme',
      choiceOf: 'One of your choice', start: 'Start', end: 'End',
      dir: { V: 'Forward', A: 'Backward', Z: 'Sideways' },
      move: { h: 'Towards the table', t: 'Away from the table', ht: 'There and back' },
      legend: 'V = forward · A = backward · Z = sideways · Heen = towards the examiners’ table · Terug = away from it',
      kataCount: 'kata',
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

  var myExam = null;
  try { myExam = localStorage.getItem('myExam'); } catch (e) { /* ignore */ }

  var data = { kata: null, kihon: null, exams: null, theory: null };
  var currentPlayer = null;
  var listQuery = { kata: '', kihon: '', theory: '' };

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

  /* ---------- Lookups ---------- */

  function kihonById(id) {
    var found = null;
    data.kihon.groups.forEach(function (g) { g.items.forEach(function (it) { if (it.id === id) found = it; }); });
    return found;
  }
  function kataById(id) { return data.kata.kata.find(function (k) { return k.id === id; }) || null; }
  function beltById(id) { return data.exams.belts.find(function (b) { return b.id === id; }) || null; }
  function beltLabel(b) { return L(b.belt) + ' · ' + L(b.grade); }
  function kataIds(entry) { return entry.id ? [entry.id] : (entry.choice || []); }
  function beltParts(b) { return (b.kihon || []).concat(b.kumite || []); }

  // All links (kihon ids and 'kata:<id>') used anywhere in a belt's programme.
  function beltLinks(b) {
    var out = {};
    beltParts(b).forEach(function (pid) {
      var p = data.exams.parts[pid];
      (p && p.steps || []).forEach(function (s) { (s.links || []).forEach(function (l) { out[l] = true; }); });
    });
    (b.kata || []).forEach(function (e) { kataIds(e).forEach(function (id) { out['kata:' + id] = true; }); });
    return out;
  }
  // Belts whose programme mentions a kihon id or 'kata:<id>'.
  function beltsUsing(link) {
    return data.exams.belts.filter(function (b) { return beltLinks(b)[link]; });
  }

  function beltSwatch(b, cls) {
    return '<span class="' + (cls || 'belt-swatch') + '" style="background:' + esc(b.color) + '" aria-hidden="true"></span>';
  }

  /* ---------- Home ---------- */

  function choice(href, glyph, title, sub, count) {
    return '<a class="choice" href="' + href + '"><div class="ph"><span class="ph-glyph" lang="ja">' + glyph + '</span></div>' +
      '<h2>' + esc(title) + '</h2><p>' + esc(sub) + ' <span class="count">· ' + esc(count) + '</span></p>' +
      '<span class="go">' + esc(t('open')) + ' <span class="ar">&rarr;</span></span></a>';
  }

  function viewHome() {
    document.title = 'Shotokan Kata';
    var mine = myExam && beltById(myExam);
    var termCount = data.theory.groups.reduce(function (n, g) { return n + (g.terms ? g.terms.length : 0); }, 0);
    return '<div class="wrap">' +
      '<h1 class="home-title">' + esc(t('homeTitle')) + '</h1>' +
      '<p class="home-sub">' + esc(t('homeSub')) + '</p>' +
      (mine ? '<a class="next-exam" href="#/exam/' + esc(mine.id) + '">' + beltSwatch(mine, 'belt-bar') +
        '<span class="label-sm">' + esc(t('nextExam')) + '</span><span class="title">' + esc(beltLabel(mine)) + ' <span class="ar">&rarr;</span></span></a>' : '') +
      '<div class="choices">' +
        choice('#/exam', '帯', t('exams'), t('examsSub'), data.exams.belts.length + ' ' + t('belts')) +
        choice('#/kata', '型', t('kata'), t('kataSub'), data.kata.kata.length + ' kata') +
        choice('#/kihon', '基本', t('kihon'), t('kihonSub'), countKihon() + ' ' + t('items')) +
        choice('#/theory', '理論', t('theory'), t('theorySub'), termCount + ' ' + t('terms')) +
      '</div>' +
      '<p class="footer-note">' + esc(t('privacy')) + '</p>' +
    '</div>';
  }

  function countKihon() {
    return data.kihon.groups.reduce(function (n, g) { return n + g.items.length; }, 0);
  }

  /* ---------- Exams ---------- */

  function viewExamList() {
    document.title = t('exams') + ' · Shotokan';
    var rows = data.exams.belts.map(function (b) {
      var kata = (b.kata || []).map(function (e) {
        if (e.id) { var k = kataById(e.id); return k ? k.name : e.id; }
        var allHeian = e.choice.every(function (id) { return id.indexOf('heian-') === 0; });
        return allHeian ? 'Heian (' + (lang === 'nl' ? 'keuze' : 'choice') + ')' : e.choice.map(function (id) { var k = kataById(id); return k ? k.name : id; }).join(' / ');
      }).join(', ');
      return '<li><a class="row" href="#/exam/' + esc(b.id) + '">' + beltSwatch(b) +
        '<span class="main"><span class="title">' + esc(L(b.belt)) + ' <span class="grade">' + esc(L(b.grade)) + '</span></span>' +
        '<span class="sub">' + esc(kata) + '</span></span>' +
        (b.id === myExam ? '<span class="tag">' + esc(t('tagMine')) + '</span>' : '') +
        '<span class="chev" aria-hidden="true">&rsaquo;</span></a></li>';
    }).join('');
    return '<div class="wrap">' +
      '<div class="page-head"><a class="back" href="#/" aria-label="Home">&lsaquo;</a><h1>' + esc(t('exams')) + '</h1></div>' +
      '<p class="section-note">' + esc(t('examIntro')) + '</p>' +
      '<ul class="list">' + rows + '</ul>' +
      '<p class="footer-note">' + esc(t('examSources')) + ' ' + sourceLinks(data.exams.sources) + '</p>' +
    '</div>';
  }

  function sourceLinks(list) {
    return list.map(function (s, i) { return '<a href="' + esc(s.url) + '" target="_blank" rel="noopener noreferrer" title="' + esc(s.title) + '">[' + (i + 1) + ']</a>'; }).join(' ');
  }

  // Is this part / kata new at belt index i (not in any earlier belt)?
  function isNewPart(pid, i) {
    if (i === 0) return false;
    return !data.exams.belts.slice(0, i).some(function (b) { return beltParts(b).indexOf(pid) !== -1; });
  }
  function isNewKata(entry, i) {
    if (i === 0) return false;
    var earlier = {};
    data.exams.belts.slice(0, i).forEach(function (b) { (b.kata || []).forEach(function (e) { kataIds(e).forEach(function (id) { earlier[id] = true; }); }); });
    return !kataIds(entry).some(function (id) { return earlier[id]; });
  }

  function chips(links) {
    var html = (links || []).map(function (l) {
      if (l.indexOf('kata:') === 0) {
        var k = kataById(l.slice(5));
        return k ? '<a class="chip kata" href="#/kata/' + esc(k.id) + '">' + esc(k.name) + ' <span aria-hidden="true">&#9654;</span></a>' : '';
      }
      var it = kihonById(l);
      return it ? '<a class="chip" href="#/kihon/' + esc(it.id) + '">' + esc(it.name) + '</a>' : '';
    }).join('');
    return html ? '<div class="chips">' + html + '</div>' : '';
  }

  function notesHtml(notes) {
    if (!notes || !notes.length) return '';
    return '<dl class="notes">' + notes.map(function (n) {
      return (n.label ? '<dt>' + esc(L(n.label)) + '</dt>' : '') + '<dd' + (n.label ? '' : ' class="plain"') + '>' + esc(L(n)) + '</dd>';
    }).join('') + '</dl>';
  }

  function stepHtml(s) {
    if (s.heading) return '<li class="step-heading">' + esc(L(s.heading)) + '</li>';
    var dir = s.dir ? '<span class="dir" title="' + esc(t('dir')[s.dir] || s.dir) + '">' + esc(s.dir) + '</span>' : '<span class="dir empty" aria-hidden="true"></span>';
    var move = s.move ? '<span class="move">' + esc(t('move')[s.move] || s.move) + '</span>' : '';
    var body = s.tori
      ? '<dl class="tu"><dt>Tori</dt><dd>' + esc(L(s.tori)) + '</dd><dt>Uke</dt><dd>' + esc(L(s.uke)) + '</dd></dl>'
      : (s.desc ? '<p>' + esc(L(s.desc)) + '</p>' : '');
    return '<li class="step">' + dir + '<div class="step-body"><div class="step-name">' + esc(s.name) + move + '</div>' + body + chips(s.links) + '</div></li>';
  }

  function partHtml(pid, i) {
    var p = data.exams.parts[pid];
    if (!p) return '';
    return '<section class="part">' +
      '<h3>' + esc(p.name) + ' <span>' + esc(L(p.title)) + '</span>' + (isNewPart(pid, i) ? ' <span class="new">' + esc(t('newHere')) + '</span>' : '') + '</h3>' +
      (p.reps ? '<p class="reps">' + esc(L(p.reps)) + '</p>' : '') +
      (p.start ? '<p class="startend"><b>' + esc(t('start')) + '</b> ' + esc(L(p.start)) + '</p>' : '') +
      (p.steps ? '<ol class="steps">' + p.steps.map(stepHtml).join('') + '</ol>' : '') +
      (p.end ? '<p class="startend"><b>' + esc(t('end')) + '</b> ' + esc(L(p.end)) + '</p>' : '') +
      notesHtml(p.notes) +
    '</section>';
  }

  function kataEntryHtml(e, i) {
    var badge = isNewKata(e, i) ? '<span class="new">' + esc(t('newHere')) + '</span>' : '';
    if (e.id) {
      var k = kataById(e.id);
      if (!k) return '';
      return '<li><a class="row" href="#/kata/' + esc(k.id) + '"><span class="main"><span class="title">' + esc(k.name) + '</span>' +
        '<span class="sub">' + esc(L(k.meaning)) + (e.note ? ' · ' + esc(L(e.note)) : '') + '</span></span>' + badge +
        '<span class="chev" aria-hidden="true">&rsaquo;</span></a></li>';
    }
    return '<li class="choice-row"><div class="title-sm">' + esc(e.note ? L(e.note) : t('choiceOf')) + ' ' + badge + '</div>' +
      chips(e.choice.map(function (id) { return 'kata:' + id; })) + '</li>';
  }

  // Theory terms that occur in this belt's programme text.
  function termsInBelt(b) {
    var txt = [];
    function add(o) { if (!o) return; if (typeof o === 'string') txt.push(o); else { if (o.nl) txt.push(o.nl); if (o.en) txt.push(o.en); } }
    beltParts(b).forEach(function (pid) {
      var p = data.exams.parts[pid]; if (!p) return;
      txt.push(p.name); add(p.title); add(p.reps); add(p.start); add(p.end);
      (p.steps || []).forEach(function (s) { add(s.name); add(s.desc); add(s.tori); add(s.uke); });
      (p.notes || []).forEach(add);
    });
    (b.focus || []).forEach(add);
    var hay = ' ' + norm(txt.join(' ')).replace(/[^a-z0-9]+/g, ' ') + ' ';
    var seen = {}, out = [];
    data.theory.groups.forEach(function (g) {
      (g.terms || []).forEach(function (tm) {
        if (tm.scan === false) return;
        var key = norm(tm.term).replace(/[^a-z0-9]+/g, ' ').trim();
        if (!key || seen[key]) return;
        if (hay.indexOf(' ' + key + ' ') !== -1) { seen[key] = true; out.push(tm); }
      });
    });
    return out;
  }

  function termList(terms) {
    return '<dl class="terms">' + terms.map(function (tm) {
      return '<div><dt>' + esc(tm.term) + (tm.say ? ' <span class="say">(' + esc(tm.say) + ')</span>' : '') + '</dt><dd>' + esc(L(tm)) + '</dd></div>';
    }).join('') + '</dl>';
  }

  function viewExam(id) {
    var list = data.exams.belts;
    var i = list.findIndex(function (b) { return b.id === id; });
    if (i === -1) return viewNotFound('#/exam');
    var b = list[i], prev = list[i - 1], next = list[i + 1];
    document.title = beltLabel(b) + ' · Shotokan';
    var terms = termsInBelt(b);
    var kihon = (b.kihon || []).map(function (pid) { return partHtml(pid, i); }).join('');
    var kumite = (b.kumite || []).map(function (pid) { return partHtml(pid, i); }).join('');
    return '<div class="wrap exam">' +
      '<div class="page-head"><a class="back" href="#/exam" aria-label="' + esc(t('exams')) + '">&lsaquo;</a>' +
        '<span class="sub" style="color:var(--muted);font-size:14px">' + esc(t('exams')) + '</span></div>' +
      beltSwatch(b, 'belt-bar') +
      '<h1 class="detail-name">' + esc(L(b.belt)) + '</h1>' +
      '<p class="meaning">' + esc(L(b.grade)) + '</p>' +
      '<button type="button" class="btn mine' + (b.id === myExam ? ' on' : '') + '" data-mine="' + esc(b.id) + '" aria-pressed="' + (b.id === myExam) + '">' +
        esc(b.id === myExam ? '✓ ' + t('isMyExam') : t('setMyExam')) + '</button>' +
      (b.incomplete ? '<div class="fact todo">' + esc(L(b.incomplete)) + '</div>' : '') +
      (kihon ? '<h2 class="section-title">' + esc(t('secKihon')) + '</h2><p class="legend">' + esc(t('legend')) + '</p>' + kihon : '') +
      (b.kata && b.kata.length ? '<h2 class="section-title">' + esc(t('secKata')) + '</h2><ul class="list">' +
        b.kata.map(function (e) { return kataEntryHtml(e, i); }).join('') + '</ul>' : '') +
      (kumite ? '<h2 class="section-title">' + esc(t('secKumite')) + '</h2>' + kumite : '') +
      (b.focus ? '<h2 class="section-title">' + esc(t('focus')) + '</h2>' + notesHtml(b.focus) : '') +
      (terms.length ? '<h2 class="section-title">' + esc(t('termsHere')) + '</h2>' + termList(terms) +
        '<p><a class="more" href="#/theory">' + esc(t('toTheory')) + ' &rarr;</a></p>' : '') +
      '<p class="footer-note">' + esc(t('source')) + ': <a href="' + esc(b.source) + '" target="_blank" rel="noopener noreferrer">' + esc(t('officialProgramme')) + ' ' + esc(L(b.grade)) + '</a></p>' +
      '<nav class="pager">' +
        (prev ? '<a class="prev" href="#/exam/' + esc(prev.id) + '"><small>&lsaquo; ' + esc(t('prev')) + '</small>' + esc(L(prev.grade)) + '</a>' : '') +
        (next ? '<a class="next" href="#/exam/' + esc(next.id) + '"><small>' + esc(t('next')) + ' &rsaquo;</small>' + esc(L(next.grade)) + '</a>' : '') +
      '</nav>' +
    '</div>';
  }

  // Links to the belts where a kata / technique is part of the exam.
  function examFact(link) {
    var belts = beltsUsing(link);
    if (!belts.length) return '';
    return '<div class="fact"><b>' + esc(t('inExams')) + '</b><span class="belt-links">' + belts.map(function (b) {
      return '<a href="#/exam/' + esc(b.id) + '">' + beltSwatch(b) + esc(L(b.grade)) + '</a>';
    }).join('') + '</span></div>';
  }

  /* ---------- Theory ---------- */

  function theoryHtml(q) {
    var html = '';
    data.theory.groups.forEach(function (g) {
      if (g.terms) {
        var terms = g.terms.filter(function (tm) { return !q || norm(tm.term + ' ' + tm.nl + ' ' + tm.en + ' ' + (tm.say || '')).indexOf(q) !== -1; });
        if (!terms.length) return;
        html += '<h2 class="section-title" id="t-' + esc(g.id) + '">' + esc(L(g.title)) + '</h2>' +
          (g.intro && !q ? '<p class="section-note">' + esc(L(g.intro)) + '</p>' : '') + termList(terms);
      } else if (g.text && !q) {
        html += '<h2 class="section-title" id="t-' + esc(g.id) + '">' + esc(L(g.title)) + '</h2>' +
          '<div class="prose">' + g.text.map(function (p) { return '<p>' + esc(L(p)) + '</p>'; }).join('') + '</div>';
      }
    });
    return html || '<p class="empty">' + esc(t('noResults')) + '</p>';
  }

  function viewTheory() {
    document.title = t('theory') + ' · Shotokan';
    return '<div class="wrap">' +
      '<div class="page-head"><a class="back" href="#/" aria-label="Home">&lsaquo;</a><h1>' + esc(t('theory')) + '</h1></div>' +
      '<input class="search" type="search" data-list="theory" placeholder="' + esc(t('search')) + '" value="' + esc(listQuery.theory) + '" autocomplete="off" enterkeyhint="search">' +
      '<div data-results>' + theoryHtml(norm(listQuery.theory).trim()) + '</div>' +
      '<p class="footer-note">' + esc(t('theorySources')) + ' ' + sourceLinks(data.theory.sources) + '</p>' +
    '</div>';
  }

  /* ---------- Kata ---------- */

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
          '<span class="main"><span class="title">' + esc(k.name) + '</span><span class="sub">' + esc(L(k.meaning)) +
            (k.kyu != null ? ' · ' + esc(k.kyu) + (lang === 'nl' ? 'e kyu' : ' kyu') : '') + '</span></span>' +
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
      '<p class="footer-note">' + esc(t('sources')) + ' ' + sourceLinks(data.kata.sources) + '</p>' +
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
        examFact('kata:' + k.id) +
        '<div class="fact"><b>' + esc(t('exam')) + '</b>' + esc(L(k.exam)) + '</div>' +
      '</div>' +
      '<nav class="pager">' +
        (prev ? '<a class="prev" href="#/kata/' + esc(prev.id) + '"><small>&lsaquo; ' + esc(t('prev')) + '</small>' + esc(prev.name) + '</a>' : '') +
        (next ? '<a class="next" href="#/kata/' + esc(next.id) + '"><small>' + esc(t('next')) + ' &rsaquo;</small>' + esc(next.name) + '</a>' : '') +
      '</nav>' +
    '</div>';
  }

  /* ---------- Kihon ---------- */

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
    var inExam = examFact(it.id);
    return '<div class="wrap">' +
      '<div class="page-head"><a class="back" href="#/kihon" aria-label="' + esc(t('kihon')) + '">&lsaquo;</a></div>' +
      '<div class="kihon-card">' +
        '<div class="group">' + esc(L(cur.g.title)) + ' · ' + esc(cur.g.name) + '</div>' +
        '<h1 class="detail-name">' + esc(it.name) + '</h1>' +
        '<p class="translation">' + esc(L(it.translation)) + '</p>' +
        kihonImage(it, true) +
        '<p>' + esc(L(it.explanation)) + '</p>' +
      '</div>' +
      (inExam ? '<div class="facts">' + inExam + '</div>' : '') +
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
    if (parts[0] === 'exam' && parts[1]) html = viewExam(parts[1]);
    else if (parts[0] === 'exam') html = viewExamList();
    else if (parts[0] === 'kata' && parts[1]) html = viewKata(parts[1]);
    else if (parts[0] === 'kata') html = viewKataList();
    else if (parts[0] === 'kihon' && parts[1]) html = viewKihon(parts[1]);
    else if (parts[0] === 'kihon') html = viewKihonList();
    else if (parts[0] === 'theory') html = viewTheory();
    else html = viewHome();
    app.innerHTML = html;

    var route = parts.join('/');
    if (route !== lastRoute) { window.scrollTo(0, 0); lastRoute = route; }

    var slot = app.querySelector('[data-player]');
    if (slot && parts[0] === 'kata') {
      var k = kataById(parts[1]);
      currentPlayer = window.KataPlayer.mount(slot, { videoId: k.video.youtubeId, t: t });
    }
    var mine = app.querySelector('[data-mine]');
    if (mine) {
      mine.addEventListener('click', function () {
        var id = mine.getAttribute('data-mine');
        myExam = myExam === id ? null : id;
        try { if (myExam) localStorage.setItem('myExam', myExam); else localStorage.removeItem('myExam'); } catch (e) { /* ignore */ }
        render();
      });
    }
    var search = app.querySelector('.search');
    if (search) {
      search.addEventListener('input', function () {
        var which = search.getAttribute('data-list');
        listQuery[which] = search.value;
        var q = norm(search.value).trim();
        app.querySelector('[data-results]').innerHTML = which === 'kata' ? kataRows(q) : which === 'kihon' ? kihonRows(q) : theoryHtml(q);
      });
    }
  }

  window.addEventListener('hashchange', render);

  Promise.all(['data/kata.json', 'data/kihon.json', 'data/exams.json', 'data/theory.json'].map(loadJson)).then(function (res) {
    data.kata = res[0];
    data.kihon = res[1];
    data.exams = res[2];
    data.theory = res[3];
    render();
  }).catch(function (err) {
    app.innerHTML = '<div class="wrap"><p>' + esc(t('loadError')) + '</p><p class="empty">' + esc(err.message) + '</p></div>';
  });

  if ('serviceWorker' in navigator && location.protocol === 'https:') {
    window.addEventListener('load', function () { navigator.serviceWorker.register('sw.js').catch(function () {}); });
  }
})();
