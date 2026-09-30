document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {
    /* expandable project details (unchanged) */
    document.querySelectorAll('.project-toggle').forEach(button => {
        button.addEventListener('click', () => {
            const card = button.closest('.project-card');
            const expanded = card.classList.toggle('expanded');
            button.setAttribute('aria-expanded', String(expanded));
            button.textContent = expanded ? 'Show less' : 'Learn more';
        });
    });

    /* scroll reveal (unchanged) */
    const revealTargets = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && revealTargets.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
        revealTargets.forEach((el, i) => {
            el.style.transitionDelay = `${Math.min(i % 5, 4) * 60}ms`;
            observer.observe(el);
        });
    } else {
        revealTargets.forEach(el => el.classList.add('is-visible'));
    }

    /* hero nodes react to the mouse */
    const visual = document.querySelector('.hero-visual');
    const hero = document.querySelector('.hero-split');
    if (visual && hero && matchMedia('(hover: hover)').matches) {
        const nodes = visual.querySelectorAll('.node');
        hero.addEventListener('mousemove', e => {
            const r = hero.getBoundingClientRect();
            const x = (e.clientX - r.left) / r.width - 0.5;
            const y = (e.clientY - r.top) / r.height - 0.5;
            nodes.forEach((n, i) => {
                const d = (i + 1) * 6;
                n.style.transform = `rotateX(${48 - y * 10}deg) rotateZ(${-22 + x * 10}deg) translate(${x * d}px, ${y * d}px)`;
            });
        });
        hero.addEventListener('mouseleave', () => nodes.forEach(n => n.style.transform = ''));
    }

    /* projects: cursor pill + full-screen viewer */
    const cards = [...document.querySelectorAll('.project-card')];
    if (!cards.length) return;

    const pill = document.createElement('div');
    pill.className = 'cursor-pill'; pill.textContent = 'View project';
    document.body.appendChild(pill);

    const viewer = document.createElement('div');
    viewer.className = 'viewer';
    viewer.setAttribute('role', 'dialog');
    viewer.setAttribute('aria-modal', 'true');
    viewer.innerHTML = `
        <div class="viewer-img"><button class="viewer-close" type="button">Close</button><img alt=""></div>
        <div class="viewer-bar">
            <div><h3></h3><div class="card-tags"></div></div>
            <div><p class="v-short"></p><p class="v-long" style="margin-top:10px"></p><a class="viewer-link" target="_blank" rel="noreferrer">View on GitHub</a></div>
            <div class="viewer-nav"><button type="button" data-dir="-1">Prev</button><button type="button" data-dir="1">Next</button></div>
        </div>`;
    document.body.appendChild(viewer);

    const img = viewer.querySelector('img');
    let current = 0;

    const show = (i, animate = true) => {
        current = (i + cards.length) % cards.length;
        const c = cards[current];
        const fill = () => {
            img.src = c.querySelector('img').src;
            img.alt = c.querySelector('img').alt;
            viewer.querySelector('h3').textContent = c.querySelector('h3').textContent;
            viewer.querySelector('.card-tags').innerHTML = c.querySelector('.card-tags').innerHTML;
            viewer.querySelector('.v-short').textContent = c.querySelector(':scope > p').textContent;
            viewer.querySelector('.v-long').textContent = c.querySelector('.project-details p').textContent;
            viewer.querySelector('.viewer-link').href = c.querySelector('h3 a').href;
            img.classList.remove('swap');
        };
        if (animate) { img.classList.add('swap'); setTimeout(fill, 250); } else fill();
    };
    const open = i => { show(i, false); viewer.classList.add('open'); document.body.classList.add('locked'); };
    const close = () => { viewer.classList.remove('open'); document.body.classList.remove('locked'); };

    cards.forEach((card, i) => {
        const media = card.querySelector('.card-media');
        media.addEventListener('click', () => open(i));
        media.addEventListener('mouseenter', () => pill.classList.add('on'));
        media.addEventListener('mouseleave', () => pill.classList.remove('on'));
        media.addEventListener('mousemove', e => {
            pill.style.transform = `translate(${e.clientX + 14}px, ${e.clientY + 14}px)`;
        });
    });
    viewer.querySelector('.viewer-close').addEventListener('click', close);
    viewer.querySelectorAll('[data-dir]').forEach(b => b.addEventListener('click', () => show(current + Number(b.dataset.dir))));
    document.addEventListener('keydown', e => {
        if (!viewer.classList.contains('open')) return;
        if (e.key === 'Escape') close();
        if (e.key === 'ArrowRight') show(current + 1);
        if (e.key === 'ArrowLeft') show(current - 1);
    });
});

function toggleMenu() {
    document.querySelector('.nav-menu').classList.toggle('active');
    document.querySelector('.hamburger').classList.toggle('open');
}