import React,  {useState} from 'react'
import {useDropzone} from 'react-dropzone'
import cn from "classnames";
import "./ControlBar.scss";
import { BUTTON_TEXT, LINK, QUESTION, OPTION } from "./ControlBar.constants";
import upload_img from "./../../icons/upload.svg";
import delete_img from "./../../icons/delete.svg"


interface IDropFile extends File {
  preview?: string;
}
const ImageControlBar: React.FC = () => {
  const [file, setFile] = useState<IDropFile>();
  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/*',
    maxFiles: 1,
    onDrop: acceptedFiles => {
      setFile({...acceptedFiles[0], preview:  URL.createObjectURL(acceptedFiles[0])})
    }
  });

  return (
    <section className="control-bar__body">
      <section className="dropzone">
       <div {...getRootProps({className: 'dropzone__container'})}>
         <input {...getInputProps()} />
          <img src={upload_img} alt="upload_img" />
         {file && <img src={file?.preview} className="dropzone__img" alt="dropdown_img" />}
       </div>
     </section>
      <button className="control-bar__delete-button" onClick={() => setFile(undefined)}>
        <img src={delete_img} alt="delete_button" />
      </button>
    </section>
  )
} 

const ButtonControlBar: React.FC = () => {
  const [nameVal, setNameVal] = useState<string>("");
  const [linkVal, setLinkVal] = useState<string>("");

  const clearValues = () => {
    setNameVal("");
    setLinkVal("");
  }

  return (
    <section className="control-bar__body">
      <section className="control-bar__buttons-form buttons-form">
        <input value={nameVal} onChange={(e) => setNameVal(e.target.value)} type="text" className="buttons-form__input-name input-name" placeholder={BUTTON_TEXT} />
        <input value={linkVal} onChange={(e) => setLinkVal(e.target.value)}  type="text" className="buttons-form__input-link input-link" placeholder={LINK} />
      </section>
      <button className="control-bar__delete-button" onClick={clearValues}>
        <img src={delete_img} alt="delete_button" />
      </button>
    </section>
  )
}

const ImageAndButtonControlBar: React.FC = () => {
  const [file, setFile] = useState<IDropFile>();
  const [nameVal, setNameVal] = useState<string>("");
  const [linkVal, setLinkVal] = useState<string>("");

  const clearValues = () => {
    setNameVal("");
    setLinkVal("");
    setFile(undefined);
  }

  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/*',
    maxFiles: 1,
    onDrop: acceptedFiles => {
      setFile({...acceptedFiles[0], preview:  URL.createObjectURL(acceptedFiles[0])})
    }
  });

  return (
    <section className="control-bar__body">
      <section className="dropzone">
       <div {...getRootProps({className: 'dropzone__container'})}>
         <input {...getInputProps()} />
          <img src={upload_img} alt="upload_img" />
         {file && <img src={file?.preview} className="dropzone__img" alt="dropdown_img" />}
       </div>
     </section>
     <section className="control-bar__buttons buttons-form">
        <input value={nameVal} onChange={(e) => setNameVal(e.target.value)} type="text" className="buttons-form__input-name input-name" placeholder="Текст кнопки" />
        <input value={linkVal} onChange={(e) => setLinkVal(e.target.value)}  type="text" className="buttons-form__input-link input-link" placeholder="Ссылка" />
      </section>
      <button className="control-bar__delete-button" onClick={clearValues}>
        <img src={delete_img} alt="delete_button" />
      </button>
    </section>
  )
}

const renderSwitch = (num: number | undefined) => {
  switch (num) {
    case 0:
      return <ImageControlBar />
    case 1:
      return <ButtonControlBar />
    case 2:
      return <ImageAndButtonControlBar />
    default:
      break;
  }
}

interface IControlBar extends React.HTMLAttributes<HTMLDivElement> {
  activeButton: number | undefined;
}

export const ControlBar: React.FC<IControlBar> = ({activeButton, className}) => {
  return (
    <section className={cn("control-bar", className)}>
      {renderSwitch(activeButton)}
    </section> 
  )
}