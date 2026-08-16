/* ============ Soma Pragnya — portfolio interactions ============ */
(function () {
    'use strict';

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---- year ---- */
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    /* ---- typed role text ---- */
    if (window.Typed && document.getElementById('typed')) {
        new Typed('#typed', {
            strings: [
                'a Software Engineer @ Bank of America',
                'a full-stack &amp; frontend developer',
                'an explorer of AI &amp; the startup world',
                'a photography &amp; video enthusiast'
            ],
            typeSpeed: 55,
            backSpeed: 28,
            backDelay: 1600,
            loop: true,
            showCursor: false
        });
    }

    /* ---- navbar background on scroll + progress bar ---- */
    const navbar = document.getElementById('navbar');
    const progress = document.getElementById('scrollProgress');
    function onScroll() {
        const y = window.scrollY;
        navbar.classList.toggle('scrolled', y > 40);
        const h = document.documentElement.scrollHeight - window.innerHeight;
        if (progress) progress.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* ---- mobile menu ---- */
    const toggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    function closeMenu() {
        navLinks.classList.remove('open');
        toggle.innerHTML = '<i class="fas fa-bars"></i>';
    }
    if (toggle) {
        toggle.addEventListener('click', function () {
            const open = navLinks.classList.toggle('open');
            toggle.innerHTML = open ? '<i class="fas fa-xmark"></i>' : '<i class="fas fa-bars"></i>';
        });
        navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
    }

    /* ---- active nav link via scroll spy ---- */
    const sections = [...document.querySelectorAll('main section[id]')];
    const linkMap = {};
    document.querySelectorAll('.nav-link').forEach(l => {
        linkMap[l.getAttribute('href').slice(1)] = l;
    });
    const spy = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                Object.values(linkMap).forEach(l => l.classList.remove('active'));
                if (linkMap[e.target.id]) linkMap[e.target.id].classList.add('active');
            }
        });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(s => spy.observe(s));

    /* ---- reveal on scroll, with a staggered cascade per group ---- */
    const revealer = new IntersectionObserver((entries, obs) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                obs.unobserve(e.target);
            }
        });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(el => {
        // siblings that reveal together cascade in ~80ms apart
        const sibs = [...el.parentElement.children].filter(c => c.classList.contains('reveal'));
        const i = sibs.indexOf(el);
        if (i > 0) el.style.transitionDelay = Math.min(i * 0.08, 0.4) + 's';
        revealer.observe(el);
    });

    /* ---- gentle parallax drift on the floating motifs ---- */
    if (!prefersReduced && window.matchMedia('(pointer: fine)').matches) {
        const decor = [...document.querySelectorAll('.decor')];
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => {
                const y = window.scrollY;
                decor.forEach((el, i) => {
                    const depth = (i % 3 + 1) * 0.06;
                    el.style.translate = `0 ${y * depth}px`;
                });
                ticking = false;
            });
        }, { passive: true });
    }
})();
