export type TAddElement = (el: IElement) => void;
export type TIsAvailable = (num: number) => boolean;

export interface IAddElement {
  addElement: TAddElement,
  playerTime: number,
  isAvailable: TIsAvailable,
}

export interface IElement {
  timeStart: number,
  timeEnd: number,
  type: string,
  buttonText: string | null,
  buttonUrl: string | null,
  imageUrl: string | null,
}