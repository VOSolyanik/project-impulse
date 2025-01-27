function smoothScrollToTop(duration: number): void {
  const startPosition = window.scrollY;
  const startTime = performance.now();

  function easeOutQuad(t: number): number {
    return t * (2 - t);
  }

  function animateScroll(currentTime: number): void {
    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / duration, 1);
    const easing = easeOutQuad(progress);

    const scrollPosition = startPosition * (1 - easing);
    window.scrollTo(0, scrollPosition);

    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    }
  }

  requestAnimationFrame(animateScroll);
}

function toggleScrollToTopButton(button: HTMLElement, threshold: number): void {
  if (window.scrollY > threshold) {
    button.style.opacity = '1';
    button.style.right = '';
  } else {
    button.style.opacity = '0';
    setTimeout(() => {
      button.style.right = '-100px';
    }, 200);
  }
}

export function initializeScrollToTopButton(
  threshold: number = window.innerHeight,
  duration: number = 100
): void {
  const button = document.getElementById('scroll-to-top-btn');

  if (!button) {
    console.error(`Button with id "${'scroll-to-top-btn'}" not found.`);
    return;
  }

  toggleScrollToTopButton(button, threshold);

  button.addEventListener('click', () => {
    smoothScrollToTop(duration);
  });

  window.addEventListener('scroll', () => {
    toggleScrollToTopButton(button, threshold);
  });
}
