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
    if (!emailInput) {
      // Email input field not found
      return;
    }

    const email = emailInput.value;

    // Email validity check
    if (!email || !this.validateEmail(email)) {
      alert('Please provide a valid email address.');
      return;
    }

    try {
      // Sending subscription using `sendSubscription`
      const response = await sendEmailSubscription(email);
      // Subscription successful
      // Notify the user of success
      alert(response.message);
    } catch (error: unknown
      ) {
      // Error while sending subscription
      // Notify about an error
      if (error instanceof AxiosError) {
        alert(error.response?.data?.message || 'Error while sending subscription.');
      } else {
        alert('An unexpected error occurred while sending the subscription.');
      }

    }
  }

  // Method to check email validity
  private validateEmail(email: string): boolean {
    const emailRegex = /^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    return emailRegex.test(email);
  }
}