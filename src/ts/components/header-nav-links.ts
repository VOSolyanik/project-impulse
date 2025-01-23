const setActiveNavLink = () => {
  const navLinks = document.querySelectorAll('.nav-link') as NodeListOf<HTMLAnchorElement>;

  const currentPath = window.location.pathname;

  navLinks.forEach(link => {
    const href = link.getAttribute('href');

    if (href && currentPath.endsWith(href.replace('../', ''))) {
      link.classList.add('js-active');
    } else {
      link.classList.remove('js-active');
    }
  });
};

setActiveNavLink();