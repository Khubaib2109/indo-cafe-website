
/*
  Indo Cafe site interactions
  Keep JavaScript small and dependency-free for easy maintenance.
*/

const navToggle = document.querySelector('[data-nav-toggle]');
const primaryNav = document.querySelector('[data-primary-nav]');
const header = document.querySelector('[data-header]');
const year = document.querySelector('[data-year]');

if (year) {
  year.textContent = new Date().getFullYear();
}

// Mobile navigation toggle with accessible aria-expanded state.
if (navToggle && primaryNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = primaryNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close the mobile menu after a navigation link is selected.
  primaryNav.addEventListener('click', (event) => {
    const link = event.target.closest('a');
    if (!link) return;

    primaryNav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });

  // Close the mobile menu when Escape is pressed.
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    primaryNav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.focus();
  });
}

// Add a small shadow to the sticky header after scrolling.
if (header) {
  const setHeaderState = () => {
    header.classList.toggle('has-shadow', window.scrollY > 8);
  };

  setHeaderState();
  window.addEventListener('scroll', setHeaderState, { passive: true });
}
