export default class Modal {
  protected dialog!: HTMLDialogElement;
  protected dialogTemplate: HTMLDialogElement;
  private onClose?: CallableFunction;

  constructor(selector: string) {
    const modalElement = document.querySelector(selector);
    if (!(modalElement instanceof HTMLDialogElement)) {
      throw new Error('Modal element not found or is not a dialog');
    }
    this.dialogTemplate = modalElement;
  }

  public show(callbackOnClose?: CallableFunction): void {
    this.dialog.showModal();
    this.onClose = callbackOnClose;
  }

  public close = (props?: any): void => {
    this.dialog.close();
    document.removeEventListener('keydown', this.closeEvent);
    if (this.onClose) this.onClose(props);
  };

  protected closeEvent = (event: KeyboardEvent): void => {
    if (event.key === 'Escape') this.close();
  };
}
