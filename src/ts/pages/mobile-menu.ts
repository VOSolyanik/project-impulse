const menuToggleOpen = document.querySelector('.js-menu-toggle-open') as HTMLElement;
const menuToggleClose = document.querySelector('.js-menu-toggle-close') as HTMLElement;
const mobileMenu = document.querySelector('.js-mobile-menu') as HTMLElement;

if (menuToggleOpen && menuToggleClose && mobileMenu) {
  menuToggleOpen.addEventListener('click', () => {
    mobileMenu.classList.add('mobile-menu-open');
    document.body.style.overflow = 'hidden';
  });

  menuToggleClose.addEventListener('click', () => {
    mobileMenu.classList.remove('mobile-menu-open');
    document.body.style.overflow = '';
  });
}