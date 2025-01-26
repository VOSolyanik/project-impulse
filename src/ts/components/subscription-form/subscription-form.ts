import { AxiosError } from 'axios';
import iziToast from 'izitoast';
import { sendSubscriptionRequest } from '@/api/subscription.api';
export class SubscriptionForm {
  private readonly submitButton!: HTMLButtonElement;
  constructor(private readonly form: HTMLFormElement) {
    if (!this.form) {
      // Form not found with selector
      return;
    }

    this.submitButton = this.form.querySelector<HTMLButtonElement>('button[type="submit"]')!;

    this.init();
  }

  // Form handler initialization
  private init(): void {
    this.form.addEventListener('submit', (event) => this.handleSubmit(event));
  }

  // Form submit handler
  private async handleSubmit(event: Event): Promise<void> {
    event.preventDefault();

    if (!this.form) {
      // Subscription form is not initialized.
      return;
    }

    // this.form.elements['email'].

    const formData = new FormData(this.form);

    const email = formData.get('email') as string;

    this.toggleButtonLoader(true);

    try {
      // Sending subscription using `sendSubscription`
      const response = await sendSubscriptionRequest(email);
      // Subscription successful

      // Notify the user of success
      iziToast.success({
        message: response.message,
        position: 'topRight',
      });
      this.form.reset();
    } catch (error: unknown
      ) {

      // Artificial delay for displaying the loader
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Error while sending subscription
      const message = error instanceof AxiosError
        ? error.response?.data?.message || 'Error while sending subscription.'
        : 'An unexpected error occurred while sending the subscription.';
      // Notify about an error
      iziToast.error({
        message,
        position: 'topRight',
      });

    } finally {
      this.toggleButtonLoader(false);
    }
  }

  private toggleButtonLoader(show: boolean): void {
    const buttonText = this.submitButton.querySelector<HTMLSpanElement>('.button-text');
    const buttonLoader = this.submitButton.querySelector<HTMLSpanElement>('.button-loader');

    if (show) {
      buttonText?.classList.add('hidden');
      buttonLoader?.classList.remove('hidden');
    } else {
      buttonText?.classList.remove('hidden');
      buttonLoader?.classList.add('hidden');
    }
  }
}