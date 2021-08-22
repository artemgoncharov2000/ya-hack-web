import React, { useState } from "react";
import cn from "classnames";
import "./EditPopup.scss";
import { TITLE, BUTTON_IMG, BUTTON_BTN, BUTTON_IMG_AND_BTN, BUTTON_VOTE } from "./EditPopup.constants";
import {ControlBar} from "../ControlBar";
import {Player} from "../Player";

// interface IEditPopup extends React.HtmlHTMLAttributes<HTMLDivElement> {
//   open: boolean
// }

export const EditPopup: React.FC<React.HtmlHTMLAttributes<HTMLDivElement>> = ({
  className
}) => {
  const [activeButton, setActiveButton] = useState<number | undefined>(undefined);

  return (
    <section className={cn("edit-popup", className)}>
      <section className="edit-popup__top">
        <section className="edit-popup__selection-bar selection-bar">
          <h3 className="selection-bar__title">{TITLE}</h3>
          <ul className="selection-bar__list">
            {[BUTTON_IMG, BUTTON_BTN, BUTTON_IMG_AND_BTN, BUTTON_VOTE].map((item, index) => {
              return <li key={item} className={cn("selection-bar__item", {"selection-bar__item_active": activeButton === index})}  onClick={() => setActiveButton(index)}>{item}</li>
            })}
          </ul>
        </section>
        <ControlBar activeButton={activeButton} className="edit-popup__control-bar" />
      </section>
      <section className="edit-popup__bottom">
        <Player className="edit-popup__player" />
      </section>
      <button className="edit-popup__submit submit-btn">
        Сохранить и отправить
      </button>
    </section>
  )
}