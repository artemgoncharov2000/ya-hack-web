export type TAddElement = (el: IElement) => void;

export interface IAddElement {
  addElement: TAddElement,
  playerTime: number,
}

export interface IElement {
  timeStart: number,
  timeEnd: number,
  type: string,
  buttonText: string | null,
  buttonUrl: string | null,
  imageUrl: string | null,
}