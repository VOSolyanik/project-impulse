// Знаходимо всі посилання у меню
const navLinks = document.querySelectorAll('.nav-link') as NodeListOf<HTMLAnchorElement>;

// Отримуємо поточний шлях (без домену)
const currentPath = window.location.pathname;

// Перевіряємо кожне посилання
navLinks.forEach(link => {
  const href = link.getAttribute('href'); // Отримуємо href посилання

  // Порівнюємо шлях у href з поточним шляхом
  if (href && currentPath.endsWith(href)) {
    link.classList.add('is-active');
  } else {
    link.classList.remove('is-active');
  }
});
