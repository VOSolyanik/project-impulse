import { getExerciseById } from "../api/exersises.api";
import { Exercise } from "../types/exercise";

// modal.showModal()
document
  .getElementById('tempModalOpen')
  ?.addEventListener('click',async () =>{
    const response = await getExerciseById("64f389465ae26083f39b17a6")
    modal.show(response)
    }
  );
document
  .querySelector('.modal-close-button')
  ?.addEventListener('click', () =>
    modal.close()
);


type ModalElements = {
  name: HTMLTitleElement | null;
  gifUrl: HTMLImageElement | null;
  rating: HTMLElement | null;
  target: HTMLElement | null;
  bodyPart: HTMLElement | null;
  equipment: HTMLElement | null;
  popularity: HTMLElement | null;
  burnedCalories: HTMLElement | null;
  time: HTMLElement | null;
  description: HTMLElement | null;
};

class ModalExercise {
  private elements: ModalElements = {
    name: null,
    gifUrl: null,
    rating: null,
    target: null,
    bodyPart: null,
    equipment: null,
    popularity: null,
    burnedCalories: null,
    time: null,
    description: null,
  };
  private dialog: HTMLDialogElement;

  constructor(selector: string) {
    const modalElement = document.querySelector(selector);
    if (modalElement instanceof HTMLDialogElement) {
      this.dialog = modalElement;
      this.elements.name = modalElement.querySelector("[data-name-element]");
      this.elements.gifUrl = modalElement.querySelector("[data-gif-element]");
      this.elements.rating = modalElement.querySelector("[data-rating-element]");
      this.elements.target = modalElement.querySelector("[data-target-element]");
      this.elements.bodyPart = modalElement.querySelector("[data-bodyPart-element]");
      this.elements.equipment = modalElement.querySelector("[data-equipment-element]");
      this.elements.popularity = modalElement.querySelector("[data-popular-element]");
      this.elements.burnedCalories = modalElement.querySelector("[data-burnedCalories-element]");
      this.elements.time = modalElement.querySelector("[data-time-element]");
      this.elements.description = modalElement.querySelector("[data-description-element]");

      modalElement.addEventListener("mousedown", (event) => {
        if (event.target === event.currentTarget) {
          this.close();
        }
      });
    } else {
      throw new Error("Modal element not found or is not a dialog");
    }
  }

  public show(props: Exercise): void {
    for (const key in this.elements) {
      const element = this.elements[key as keyof ModalElements];
      const value = props[key as keyof Exercise];

      if (element) {
        if (value) {
          element.hidden = false;

          if (element instanceof HTMLImageElement) {
            element.src = String(value);
          } else if (key === "rating") {
            element.innerHTML = Number(value).toFixed(2);
          }
          
          else {
            element.innerHTML = String(value);
          }
        } else {
          element.hidden = true;
        }
      }
    }
    this.dialog.showModal();
    document.addEventListener("keydown", this.closeEvent);
  }

  public close = (): void => {
    this.dialog.close();
    document.removeEventListener("keydown", this.closeEvent);
  };

  private closeEvent = (event: KeyboardEvent): void => {
    if (event.key === "Escape") this.close();
  };
}

const modal = new ModalExercise(".modal");