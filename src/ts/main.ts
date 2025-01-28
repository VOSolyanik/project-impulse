import { MobileMenu } from '@/components/mobile-menu';
import { QuoteOfTheDay } from '@/components/quote-of-day';
import { DarkMode } from '@/components/darkmode/darkmode';
import { initScrollToTopButton } from '@/utils/scroll-to-top';

const openMenuBtn = document.querySelector<HTMLElement>('.js-menu-open');
const closeMenuBtn = document.querySelector<HTMLElement>('.js-menu-close');
const menu = document.querySelector<HTMLElement>('.js-mobile-menu');
const backdrop = document.querySelector<HTMLElement>(
  '.js-mobile-menu-backdrop'
);

const currentYearElement = document.querySelector<HTMLElement>('.js-current-year');

if (currentYearElement) {
  currentYearElement!.textContent = new Date().getFullYear().toString();
}

new MobileMenu({
  openMenuBtn: openMenuBtn!,
  closeMenuBtn: closeMenuBtn!,
  menu: menu!,
  backdrop: backdrop!,
});

const quoteOfTheDay = new QuoteOfTheDay();
quoteOfTheDay.initialize();

new DarkMode('.dark-mode-toggle');

initScrollToTopButton();

