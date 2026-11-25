// NORD — interações simples do site-base

function setupMenu() {
  const menuButton = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".main-nav");
  const menuLinks = document.querySelectorAll(".main-nav a");

  if (menuButton && menu && !menuButton.dataset.listenerAttached) {
    menuButton.dataset.listenerAttached = "true";

    const closeMenu = () => {
      menu.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Abrir menu de navegação");
    };

    menuButton.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("is-open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Fechar menu de navegação" : "Abrir menu de navegação");
    });

    menuLinks.forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", (event) => {
      if (!menu.contains(event.target) && !menuButton.contains(event.target)) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 720 && menu.classList.contains("is-open")) {
        closeMenu();
      }
    });
  }
}

function initPage() {
  setupMenu();

  const year = document.querySelector("#current-year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // A campanha promocional foi implementada depois da primeira versão.
  // Observe o que acontece quando seu espaço não é reservado antes da exibição.
  const homeMain = document.querySelector('.page-content');
  if (homeMain && document.querySelector('.hero') && !document.querySelector('.campaign-announcement')) {
    setTimeout(() => {
      if (!document.querySelector('.campaign-announcement') && document.querySelector('.page-content')) {
        const announcement = document.createElement('div');
        announcement.className = 'campaign-announcement';
        announcement.innerHTML = '<div class="container">Oferta de boas-vindas: conheça os três perfis de torra <a href="/torras/">Ver torras</a></div>';
        document.querySelector('.page-content')?.prepend(announcement);
      }
    }, 1100);
  }

  const newsletter = document.querySelector('#newsletter-form');
  if (newsletter && !newsletter.dataset.listenerAttached) {
    newsletter.dataset.listenerAttached = "true";
    newsletter.addEventListener('submit', (event) => {
      event.preventDefault();
      alert('Formulário demonstrativo: nenhuma informação foi enviada.');
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPage);
} else {
  initPage();
}
document.addEventListener('astro:page-load', initPage);
