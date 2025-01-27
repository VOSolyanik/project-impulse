function toggleScrollToTopButton(button: HTMLElement, threshold: number): void {
  console.log(window.scrollY, threshold);
  if (window.scrollY > threshold) {
    button.style.opacity = '1';
    button.style.right = '';
  } else {
    button.style.opacity = '0';
    button.style.right = '-100px';
  }
}

export function initializeScrollToTopButton(
  threshold: number = window.innerHeight / 4,
  duration: number = 100
): void {
  const button = document.getElementById('scroll-to-top-btn');

  if (!button) {
    console.error(`Button with id "${'scroll-to-top-btn'}" not found.`);
    return;
  }

  toggleScrollToTopButton(button, threshold);

  button.addEventListener('click', () => {
    window.scrollTo(0, 0);
  });

  window.addEventListener('scroll', () => {
    toggleScrollToTopButton(button, threshold);
  });
}
