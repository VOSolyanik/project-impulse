function lockBodyScroll(): void {
  const scrollbarWidth =
    window.innerWidth - document.documentElement.clientWidth;
  document.documentElement.style.setProperty(
    '--scroll-padding-right',
    `${scrollbarWidth}px`
  );
}

setTimeout(lockBodyScroll, 1000);
