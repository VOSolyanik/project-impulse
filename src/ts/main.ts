import { MobileMenu } from '@/components/mobile-menu';
import { QuoteOfTheDay } from '@/components/quote-of-day';
import { initializeScrollToTopButton } from '@/utils/scroll-to-top';

const openMenuBtn = document.querySelector<HTMLElement>('.js-menu-open');
const closeMenuBtn = document.querySelector<HTMLElement>('.js-menu-close');
const menu = document.querySelector<HTMLElement>('.js-mobile-menu');
const backdrop = document.querySelector<HTMLElement>(
  '.js-mobile-menu-backdrop'
);

new MobileMenu({
  openMenuBtn: openMenuBtn!,
  closeMenuBtn: closeMenuBtn!,
  menu: menu!,
  backdrop: backdrop!,
});

const quoteOfTheDay = new QuoteOfTheDay();
quoteOfTheDay.initialize();

initializeScrollToTopButton();
