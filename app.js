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

    /* ---- reveal on scroll ---- */
    const revealer = new IntersectionObserver((entries, obs) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                obs.unobserve(e.target);
            }
        });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(el => revealer.observe(el));

    /* ---- 3D tilt on project cards ---- */
    if (!prefersReduced && window.matchMedia('(pointer: fine)').matches) {
        const MAX = 9; // degrees
        document.querySelectorAll('.tilt').forEach(card => {
            card.addEventListener('mousemove', (ev) => {
                const r = card.getBoundingClientRect();
                const px = (ev.clientX - r.left) / r.width - 0.5;
                const py = (ev.clientY - r.top) / r.height - 0.5;
                card.style.transform =
                    `perspective(800px) rotateY(${px * MAX}deg) rotateX(${-py * MAX}deg) translateY(-6px)`;
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });

        /* subtle parallax tilt on the hero */
        const heroScene = document.querySelector('.hero .tilt-scene');
        if (heroScene) {
            document.querySelector('.hero').addEventListener('mousemove', (ev) => {
                const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
                const rx = (ev.clientY - cy) / cy * -3;
                const ry = (ev.clientX - cx) / cx * 3;
                heroScene.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
            });
            document.querySelector('.hero').addEventListener('mouseleave', () => {
                heroScene.style.transform = '';
            });
        }
    }
})();
