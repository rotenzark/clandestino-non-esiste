/* ===== CLANDESTINO NON ESISTE · main.js ===== */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var intro = document.getElementById('intro');
  function closeIntro() { if (intro) { intro.classList.add('done'); setTimeout(function () { intro.style.display = 'none'; }, 800); } }
  if (intro) { if (reduce) intro.style.display = 'none'; else { document.getElementById('intro-skip').addEventListener('click', closeIntro); setTimeout(closeIntro, 2800); } }

  var header = document.getElementById('site-header');
  function onScroll() { header.classList.toggle('scrolled', window.scrollY > 40); }
  onScroll(); window.addEventListener('scroll', onScroll, { passive: true });

  var burger = document.getElementById('burger'), nav = document.querySelector('.nav');
  burger.addEventListener('click', function () { var o = nav.classList.toggle('open'); burger.setAttribute('aria-expanded', o); document.body.style.overflow = o ? 'hidden' : ''; });
  nav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { nav.classList.remove('open'); burger.setAttribute('aria-expanded', false); document.body.style.overflow = ''; }); });

  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (r) { io.observe(r); });
    setTimeout(function () { reveals.forEach(function (r) { if (r.getBoundingClientRect().top < window.innerHeight) r.classList.add('in'); }); }, 1500);
  } else reveals.forEach(function (r) { r.classList.add('in'); });

  var TABLE = { 2: [[8, 13], [16, 19]], 3: [[8, 13], [16, 19]], 4: [[8, 13], [16, 19]], 5: [[8, 13], [16, 19]], 6: [[9, 13]], 0: [[9, 13]] }; // Mon closed
  var DAYS_IT = ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'];
  var DAYS_EN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  function romeNow() { return new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Rome' })); }
  function openClose(d) { var w = TABLE[d.getDay()] || [], h = d.getHours() + d.getMinutes() / 60; for (var i = 0; i < w.length; i++) if (h >= w[i][0] && h < w[i][1]) return w[i][1]; return null; }
  function updateLive() {
    var d = romeNow(), close = openClose(d), dot = document.getElementById('live-dot'), txt = document.getElementById('live-text');
    if (!dot) return; var en = LANG === 'en', day = d.getDay(), h = d.getHours() + d.getMinutes() / 60;
    if (close !== null) { dot.className = 'open'; txt.textContent = (en ? 'Open now · closes at ' : 'Aperto ora · chiude alle ') + close + ':00'; return; }
    dot.className = 'closed'; var info = null, w = TABLE[day] || [];
    for (var i = 0; i < w.length; i++) if (h < w[i][0]) { info = { d: day, t: w[i][0], off: 0 }; break; }
    if (!info) for (var k = 1; k <= 7; k++) { var nd = (day + k) % 7; if (TABLE[nd]) { info = { d: nd, t: TABLE[nd][0][0], off: k }; break; } }
    var name = info.off === 0 ? (en ? 'today' : 'oggi') : (en ? DAYS_EN[info.d] : DAYS_IT[info.d]);
    txt.textContent = (en ? 'Closed · opens ' + name + ' at ' : 'Chiuso · apre ' + name + ' alle ') + info.t + ':00';
  }

  var lb = document.getElementById('lightbox'), lbImg = document.getElementById('lb-img');
  document.querySelectorAll('.g-item').forEach(function (fig) { fig.addEventListener('click', function () { lbImg.src = fig.getAttribute('data-full'); lbImg.alt = (fig.querySelector('img') || {}).alt || ''; lb.classList.add('open'); lb.setAttribute('aria-hidden', 'false'); }); });
  function closeLb() { lb.classList.remove('open'); lb.setAttribute('aria-hidden', 'true'); setTimeout(function () { lbImg.src = ''; }, 300); }
  document.getElementById('lb-close').addEventListener('click', closeLb);
  lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeLb(); });

  var LANG = 'it';
  var EN = {
    'intro.skip': 'Enter →', 'brand.sub': 'Bakery · Lambrate',
    'nav.forno': 'The bakery', 'nav.cosa': "What's on", 'nav.gallery': 'Gallery', 'nav.dove': 'Find us', 'cta.ig': 'Instagram',
    'hero.label': '// Via Conte Rosso 18 · Lambrate · from the Onest bakery',
    'hero.sub': "Yet there it is, on Via Conte Rosso: a micro-bakery deliberately different from the usual. Bread, pizza, focaccia, pastry and specialty coffee — with a strong identity you can see in everything.",
    'hero.cta1': "What's on today", 'hero.cta2': 'Find us', 'hero.live': 'Checking hours…',
    'forno.kicker': 'The manifesto', 'forno.h2': 'A bakery deliberately different from the usual.',
    'forno.p1': "Born from the Onest kitchen, Clandestino non esiste brings to Lambrate an idea of a bakery you can see in everything: from the look to the products. Long-fermented bread, pizza, focaccia and a pastry that doesn't go unnoticed.",
    'forno.p2': "Small, and well-known — so yes, sometimes a bit of a queue. But that's exactly the proof that the clandestine, deep down, very much exists.",
    'cosa.kicker': "What's on", 'cosa.h2': 'From the counter.',
    'c.1t': 'Bread', 'c.1p': 'Naturally leavened, crust and crumb as they should be. Everyday bread, done for real.',
    'c.2t': 'Pizza & Focaccia', 'c.2p': 'By the slice and in the pan, seasonal toppings. The focaccia is already a small classic.',
    'c.3t': 'Pastry', 'c.3p': 'Croissants, danishes, leavened treats and sweets with a strong identity. Sweet, but never predictable.',
    'c.4t': 'Specialty coffee', 'c.4p': 'Quality coffee and careful extractions. To grab on the go or sit by the window.',
    'cosa.note': 'The counter changes every day. Follow @clandestinononesiste for the latest bake.',
    'gallery.kicker': 'Gallery', 'gallery.h2': 'Proof of existence',
    'rev.kicker': 'Voices', 'rev.h2': "4.5★ · and there's a queue",
    'dove.kicker': 'Find us', 'dove.h2': 'In Lambrate,<br>on Via Conte Rosso.',
    'dove.addr': 'Address', 'dove.hours': 'Hours', 'dove.hoursv': 'Tue–Fri 8–13 & 16–19 · Sat–Sun 9–13 · Mon closed', 'dove.phone': 'Phone', 'dove.route': 'Get directions', 'dove.ig': 'Follow on Instagram',
    'faq.h2': 'Frequently asked',
    'faq.q1': 'Where are you?', 'faq.a1': 'At Via Conte Rosso 18, in Lambrate (Milan).',
    'faq.q2': 'When are you open?', 'faq.a2': 'Tuesday to Friday 8–13 and 16–19, Saturday and Sunday 9–13. Closed Monday.',
    'faq.q3': 'What do you make?', 'faq.a3': 'Bread, pizza, focaccia, pastry and specialty coffee — a bakery deliberately different from the usual.',
    'faq.q4': 'Can I order?', 'faq.a4': 'Drop by the bakery or call 02 4547 1097. You can also find us on Instagram, @clandestinononesiste.',
    'foot.sub': 'Bakery · Lambrate · Milan', 'foot.where': 'Where', 'foot.hours': 'Hours', 'foot.contact': 'Contact',
    'foot.disclaimer': 'Demo website. Content and photos gathered from public sources (Google Maps, Instagram); hours, products and prices are indicative, to be confirmed with the bakery.',
    'ab.call': 'Call', 'ab.route': 'Directions'
  };
  var IT = {};
  document.querySelectorAll('[data-i18n]').forEach(function (el) { IT[el.getAttribute('data-i18n')] = el.innerHTML; });
  function setLang(lang) {
    LANG = lang; var dict = lang === 'en' ? EN : IT;
    document.querySelectorAll('[data-i18n]').forEach(function (el) { var k = el.getAttribute('data-i18n'), v = dict[k]; if (v == null && lang === 'en') v = IT[k]; if (v != null) el.innerHTML = v; });
    document.documentElement.lang = lang;
    document.querySelectorAll('.lang button').forEach(function (b) { b.classList.toggle('active', b.getAttribute('data-lang') === lang); });
    updateLive();
  }
  document.querySelectorAll('.lang button').forEach(function (b) { b.addEventListener('click', function () { setLang(b.getAttribute('data-lang')); }); });
  updateLive(); setInterval(updateLive, 60000);
})();
