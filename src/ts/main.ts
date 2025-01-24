import { MobileMenu } from "@/components/mobile-menu";
import { QuoteOfTheDay } from "@/components/quote-of-day/index"
import { SubscriptionFormHandler } from '@/components/subscription-form-handler';

const openMenuBtn = document.querySelector('.js-menu-open') as HTMLElement;
const closeMenuBtn = document.querySelector('.js-menu-close') as HTMLElement;
const menu = document.querySelector('.js-mobile-menu') as HTMLElement;
const backdrop = document.querySelector('.js-mobile-menu-backdrop') as HTMLElement;

new MobileMenu({
  openMenuBtn,
  closeMenuBtn,
  menu,
  backdrop
})

const quoteOfTheDay = new QuoteOfTheDay();
quoteOfTheDay.initialize();


new SubscriptionFormHandler('.subscribe-form');
