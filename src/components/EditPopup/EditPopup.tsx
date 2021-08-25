import React, { useState } from "react";
import cn from "classnames";
import "./EditPopup.scss";
import { TITLE, SUBMIT, BUTTON_IMG, BUTTON_BTN, BUTTON_IMG_AND_BTN, BUTTON_VOTE } from "./EditPopup.constants";
import {ControlBar} from "../ControlBar";
import {Player} from "../Player";
import {IElement} from "../../types";

// interface IEditPopup extends React.HtmlHTMLAttributes<HTMLDivElement> {
//   open: boolean
// }

export const EditPopup: React.FC<React.HtmlHTMLAttributes<HTMLDivElement>> = ({
  className
}) => {
  const [activeButton, setActiveButton] = useState<number | undefined>(undefined);
  const [elements, setElements] = useState<IElement[]>([]);
  const [playerTime, setPlayerTime] = useState<number>(0);

  const updatePlayerTime = (val: number) => {
    setPlayerTime(val);
  }

  const handleAddElement = (element: IElement) => {
    setElements(prev => ([...prev, element]))
  }

  const submit = () => {

  }

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
        <ControlBar elements={elements} addElement={handleAddElement} playerTime={playerTime} activeButton={activeButton} className="edit-popup__control-bar" />
      </section>
      <section className="edit-popup__bottom">
        <Player elements={elements} updatePlayerTime={updatePlayerTime} className="edit-popup__player" />
      </section>
      <button className="edit-popup__submit submit-btn">
        {SUBMIT}
      </button>
    </section>
  )
}