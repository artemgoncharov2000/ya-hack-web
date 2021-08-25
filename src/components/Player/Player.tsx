import React, {useState, useEffect, useRef, useMemo} from 'react'
import ReactPlayer from 'react-player/file';
import FilePlayerProps from 'react-player/file'
import cn from "classnames";
import iconPlay from "./../../icons/play.svg"
import iconPause from "./../../icons/pause.svg"
import "./Player.scss";
import {IEpisode, IElement} from "./../../types";
import { Api } from "./../../api";

const api = new Api();


interface IPlayer extends React.HtmlHTMLAttributes<HTMLDivElement> {
  updatePlayerTime: (val: number) => void,
  elements: IEpisode[],
  element: IElement | null,
}


export const Player: React.FC<IPlayer> = ({updatePlayerTime, className, elements, element}) => {
  const [isPlay, setIsPlay] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  // const [element, setElement] = useState<IElement | null>(null)
  const myPlayer = useRef<FilePlayerProps>(null);

  const checkCurrentTime = () => {
    if (myPlayer.current) {
      return myPlayer.current.getCurrentTime();
    } else {
      return 0;
    }
  }

  const checkDuration = () => {
    if (myPlayer.current) {
      return myPlayer.current.getDuration();
    } else {
      return 0;
    }
  }

  const secondsToHms = (d: number) => {
    d = Number(d);
    const h = Math.floor(d / 3600);
    const m = Math.floor(d % 3600 / 60);
    const s = Math.floor(d % 3600 % 60);

    const hDisplay = h > 0 ? h + ":" : "0:";
    const mDisplay = m > 0 ? (m < 10 ? `0${m}:` : `${m}:`) : "00:";
    const sDisplay = s > 0 ? (s < 10 ? `0${s}` : `${s}`) : "00";
    return hDisplay + mDisplay + sDisplay; 
  }

  const updateTime = () => {
    const temp = Math.floor(checkCurrentTime());
    setTime(temp);
    updatePlayerTime(temp);
  }

  const duration = useMemo(() => {
    return checkDuration();
  }, [myPlayer.current])


  // useEffect(() => {
  //   (async() => {
  //     const temp = await api.getElement("bd2ccd93-1b52-49e1-b144-62ef51f84f5c");
  //     setElement(temp);
  //   })();
  // }, [])

  return (
    <section className={cn("player", className)}>

      <section className="player__info">
        <button className="player__play" onClick={() => setIsPlay(!isPlay)}>
          <img src={isPlay ? iconPause : iconPlay} alt="play" />
        </button>
        <span className="player__timer">{secondsToHms(time)}</span>
      </section>
      <section className="player__timeline">
        <section className="player__time">
          <span>0:00:00</span>
          <span>{secondsToHms((element?.duration || 0) * 2 / 5)}</span>
          <span>{secondsToHms((element?.duration || 0) * 3 / 5)}</span>
          <span>{secondsToHms((element?.duration || 0) * 4 / 5)}</span>
          <span>{secondsToHms((element?.duration || 0))}</span>
        </section>
        <section className="player__line">
        <input
          type='range' min={0} max={(element?.duration || 0)} step='any'
          value={time} className="player__range"
          onChange={(e) => setTime(+e.target.value)}
          onMouseUp={() => {myPlayer.current?.seekTo(time)}}
        />
        {!!(element?.duration || 0) && (<section className="player__elements">
          {elements.map((item) => {
            return <div key={item.buttonText} className="player__element" style={{left: `${item.timeStart*100/(element?.duration || 0)}%`, width: `${1000/(element?.duration || 0)}%`}} />
          })}
        </section>)}
        </section>
      </section>
      {/* <ReactPlayer onProgress={() => updateTime()} 
        ref={myPlayer} playing={isPlay} width="0" height="0" className="react-player" url="https://d3ctxlq1ktw2nl.cloudfront.net/staging/2021-4-13/185868806-44100-2-95edbe2a482b1.m4a" /> */}
      <ReactPlayer onProgress={() => updateTime()} 
        ref={myPlayer} playing={isPlay} width="0" height="0" className="react-player" url={element?.url} />
    </section>
  )
}