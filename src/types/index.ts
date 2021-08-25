export type TAddEpisode = (el: IEpisode) => void;
export type TIsAvailable = (num: number) => boolean;

export interface IAddEpisode {
  addElement: TAddEpisode,
  playerTime: number,
  isAvailable: TIsAvailable,
}

export interface IEpisode {
  timeStart: number,
  timeEnd: number,
  type: string,
  buttonText?: string | null,
  buttonUrl?: string | null,
  imageUrl?: string | null,
  question?: string,
  options?: string[],
  multipleOptions?: boolean,
  correctAnswers?: number[],
}

export interface IElement {
  guid: string,
  podcastId?: string,
  episodeNumber?: number,
  title: string,
  duration: number,
  length: number,
  url: string,
  description: string,
  published: boolean,
  items?: IEpisode[],
  defaultImageUrl?: string,
}

