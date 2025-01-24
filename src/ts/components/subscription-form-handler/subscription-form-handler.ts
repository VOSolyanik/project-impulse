import { sendEmailSubscription } from '@/api/subscription.api';
import { AxiosError } from 'axios';

export class SubscriptionFormHandler {
  private readonly form: HTMLFormElement | null;

  constructor(formSelector: string) {
    this.form = document.querySelector<HTMLFormElement>(formSelector);

    if (!this.form) {
      // Form not found with selector
      return;
    }

    this.init();
  }

  // Form handler initialization
  private init(): void {
    if (this.form) {
      this.form.addEventListener('submit', (event) => this.handleSubmit(event));
    }
  }

  // Form submit handler
  private async handleSubmit(event: Event): Promise<void> {
    event.preventDefault();

    if (!this.form) {
      // Subscription form is not initialized.
      return;
    }

    const emailInput = this.form.querySelector<HTMLInputElement>('#email');
    const submitButton = this.form.querySelector<HTMLButtonElement>('#subscribe-button');

    if (!emailInput || !submitButton) {
      return;
    }

    const email = emailInput.value;

    // Email validity check
    if (!email || !this.validateEmail(email)) {
      alert('Please provide a valid email address.');
      return;
    }

    const buttonText = submitButton.querySelector<HTMLSpanElement>('.button-text');
    const buttonLoader = submitButton.querySelector<HTMLSpanElement>('.button-loader');

    if (buttonText && buttonLoader) {
      buttonText.style.display = 'none';
      buttonLoader.style.display = 'inline';
    }


    try {
      // Sending subscription using `sendSubscription`
      const response = await sendEmailSubscription(email);
      // Subscription successful
      // Notify the user of success

      // Artificial delay for displaying the loader
      await new Promise((resolve) => setTimeout(resolve, 1000));

      alert(response.message);
    } catch (error: unknown
      ) {

      // Artificial delay for displaying the loader
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Error while sending subscription
      // Notify about an error
      if (error instanceof AxiosError) {
        alert(error.response?.data?.message || 'Error while sending subscription.');
      } else {
        alert('An unexpected error occurred while sending the subscription.');
      }

    } finally {
      if (buttonText && buttonLoader) {
        buttonText.style.display = 'inline';
        buttonLoader.style.display = 'none';
      }
    }

  }

  // Method to check email validity
  private validateEmail(email: string): boolean {
    const emailRegex = /^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    return emailRegex.test(email);
  }
}