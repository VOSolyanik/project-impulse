import spriteUrl from "../../../images/sprite.svg";

export abstract class Modal<T> {
  protected dialog!: HTMLDialogElement;
  protected dialogContentTemplate!: HTMLTemplateElement;
  protected dialogContent!: HTMLDivElement;
  private dialogCloseButton!: HTMLButtonElement;

  constructor(contentSelector: string) {
    this.dialogContentTemplate = document.querySelector(
      contentSelector
    ) as HTMLTemplateElement;
    this.init();
  }

  abstract show(data: T): void;

  public close = (): void => {
    this.dialog.close();

    document.removeEventListener('keydown', this.handleKeyDown);
  };

  protected showDialog(): void {
    document.body.appendChild(this.dialog);

    this.dialog.classList.remove('hidden');
    this.dialog.setAttribute('aria-hidden', 'false');

    this.dialog.showModal();

    document.addEventListener('keydown', this.handleKeyDown);

    this.dialog.addEventListener('close', () => {
      setTimeout(() => {
        this.dialog.remove();
      }, 300)
    });
  }

  protected handleKeyDown = (event: KeyboardEvent): void => {
    if (event.key === 'Escape') this.close();
  };

  private init(): void {
    this.dialog = document.createElement('dialog');
    this.dialog.classList.add('modal');
    this.dialog.classList.add('hidden');
    this.dialog.setAttribute('aria-modal', 'true');
    this.dialog.setAttribute('aria-hidden', 'true');

    this.dialog.innerHTML = this.renderDialog();

    this.dialogCloseButton = this.dialog.querySelector(
      '[data-dialog-close]'
    ) as HTMLButtonElement;

    this.dialogContent = this.dialog.querySelector(
      '[data-dialog-content]'
    ) as HTMLDivElement;

    this.dialogCloseButton.addEventListener('click', this.close);

    this.dialog.addEventListener('mousedown', event => {
      if (event.target === event.currentTarget) {
        this.close();
      }
    });
  }

  private renderDialog(): string {
    return `
      <div class="modal-container">
        <button class="modal-close-button" type="button" data-dialog-close>
          <svg width="24" height="24" class="icon stroke-icon">
            <use href="${spriteUrl}#icon-x" data-favorite-icon />
          </svg>
        </button>
        <div class="modal-card" data-dialog-content>
          ${this.dialogContentTemplate.innerHTML}
        </div>
      </div>
    `
  }
}
