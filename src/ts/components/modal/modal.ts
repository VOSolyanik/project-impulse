export default class Modal {
  protected dialog!: HTMLDialogElement;
  protected dialogTemplate: HTMLDialogElement;

  constructor(selector: string) {
    const modalElement = document.querySelector(selector);
    if (!(modalElement instanceof HTMLDialogElement)) {
      throw new Error('Modal element not found or is not a dialog');
    }
    this.dialogTemplate = modalElement;
  }

  public show(props?: any): void {
    this.dialog.showModal();
  }

  public close = (): void => {
    this.dialog.close();
    document.removeEventListener('keydown', this.closeEvent);
  };

  protected closeEvent = (event: KeyboardEvent): void => {
    if (event.key === 'Escape') this.close();
  };
}
