import React, {useState, useEffect, useRef, useMemo} from 'react'
import ReactPlayer from 'react-player/file';
import FilePlayerProps from 'react-player/file'
import cn from "classnames";
import iconPlay from "./../../icons/play.svg"
import iconPause from "./../../icons/pause.svg"
import "./Player.scss";
import {IElement} from "./../../types";


interface IPlayer extends React.HtmlHTMLAttributes<HTMLDivElement> {
  updatePlayerTime: (val: number) => void,
  elements: IElement[],
}


export const Player: React.FC<IPlayer> = ({updatePlayerTime, className, elements}) => {
  const [isPlay, setIsPlay] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const myPlayer = useRef<FilePlayerProps>(null);

  const checkCurrentTime = () => {
    if (myPlayer.current) {
      console.log("Проверил время");
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
          <span>{secondsToHms(duration * 2 / 5)}</span>
          <span>{secondsToHms(duration * 3 / 5)}</span>
          <span>{secondsToHms(duration * 4 / 5)}</span>
          <span>{secondsToHms(duration)}</span>
        </section>
        <section className="player__line">
        <input
          type='range' min={0} max={duration} step='any'
          value={time} className="player__range"
          // onMouseDown={handleSeekMouseDown}
          // onChange={handleSeekChange}
          // onMouseUp={handleSeekMouseUp}
          onChange={(e) => setTime(+e.target.value)}
          onMouseUp={() => {myPlayer.current?.seekTo(time)}}
        />
        {!!duration && (<section className="player__elements">
          {elements.map((element) => {
            return <div className="player__element" style={{left: `${element.timeStart*100/duration}%`, width: `${1000/duration}%`}} />
          })}
        </section>)}
        </section>
      </section>
      <ReactPlayer onProgress={() => updateTime()} 
        ref={myPlayer} playing={isPlay} width="0" height="0" className="react-player" url="https://d3ctxlq1ktw2nl.cloudfront.net/staging/2021-4-13/185868806-44100-2-95edbe2a482b1.m4a" />
    </section>
  )
}