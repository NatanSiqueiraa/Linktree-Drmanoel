/* =====================================================
   Escola Estadual Doutor Manoel Firmino de Almeida
   Interações e animações da página de acesso rápido
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
    ).matches;

    /* Saudação dinâmica conforme o horário de quem visita */
    const greetingEl = document.getElementById('greeting');
    if (greetingEl) {
        const hour = new Date().getHours();
        let greeting = 'Boa noite';
        if (hour >= 5 && hour < 12) {
            greeting = 'Bom dia';
        } else if (hour >= 12 && hour < 18) {
            greeting = 'Boa tarde';
        }
        greetingEl.textContent = `${greeting}, seja bem-vindo(a)`;
    }

    /* Ano atual no rodapé, sempre atualizado automaticamente */
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    /* Escalona a entrada de cada link, criando um efeito cascata */
    const links = document.querySelectorAll('#links .link');
    links.forEach((link, index) => {
        link.style.setProperty('--delay', `${0.45 + index * 0.1}s`);
    });

    /* Efeito de ondulação (ripple) ao tocar/clicar em um link */
    if (!prefersReducedMotion) {
        links.forEach((link) => {
            link.addEventListener('click', (event) => {
                const rect = link.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const originX = event.clientX || rect.left + rect.width / 2;
                const originY = event.clientY || rect.top + rect.height / 2;

                const ripple = document.createElement('span');
                ripple.className = 'ripple';
                ripple.style.width = ripple.style.height = `${size}px`;
                ripple.style.left = `${originX - rect.left - size / 2}px`;
                ripple.style.top = `${originY - rect.top - size / 2}px`;

                link.appendChild(ripple);
                ripple.addEventListener('animationend', () => ripple.remove());
            });
        });
    }
});