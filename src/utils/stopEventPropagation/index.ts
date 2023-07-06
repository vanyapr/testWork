import {KeyboardEvent, MouseEvent} from "react";
import {TButtonClickEvent} from "@type/TButtonClickEvent";

export default function stopEventPropagation(
  event: TButtonClickEvent
): TButtonClickEvent {
  // Всплытие есть только у события по клику мыши, у нажатия кнопки всплытия нет
  if ((event as MouseEvent<HTMLButtonElement, MouseEvent>).stopPropagation !== undefined) {
    event.stopPropagation();
    return event as MouseEvent<HTMLButtonElement, MouseEvent>;
  }
  return event as KeyboardEvent<HTMLButtonElement>;
}
