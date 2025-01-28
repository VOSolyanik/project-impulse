const toggleScrollToTopButton = (
  button: HTMLElement,
  threshold: number
): void => {
  if (window.scrollY > threshold) {
    showButton(button);
  } else {
    hideButton(button);
  }
};

const hideButton = (button: HTMLElement): void => {
  button.classList.remove('scroll-btn-visible');
  button.setAttribute('aria-hidden', 'true');
  button.setAttribute('tabindex', '-1');
};

const showButton = (button: HTMLElement): void => {
  button.classList.add('scroll-btn-visible');
  button.setAttribute('aria-hidden', 'false');
  button.setAttribute('tabindex', '0');
};

export const initScrollToTopButton = (
  threshold: number = window.innerHeight / 4
): void => {
  const button = document.getElementById('scroll-to-top-btn');

  if (!button) {
    console.error(`Button with id "${'scroll-to-top-btn'}" not found.`);
    return;
  }

  toggleScrollToTopButton(button, threshold);

  button.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  });

  window.addEventListener('scroll', () => {
    toggleScrollToTopButton(button, threshold);
  });
};
