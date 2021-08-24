import React,  {useState, useEffect} from 'react'
import {useDropzone} from 'react-dropzone'
import cn from "classnames";
import "./ControlBar.scss";
import { BUTTON_TEXT, LINK, QUESTION, OPTION } from "./ControlBar.constants";
import {IElement, IAddElement, TAddElement} from "../../types";
import upload_img from "./../../icons/upload.svg";
import delete_img from "./../../icons/delete.svg"

import { useFormik } from 'formik';
import * as Yup from 'yup';

interface IDropFile extends File {
  preview?: string,
}

const ImageControlBar: React.FC<IAddElement> = ({addElement, playerTime}) => {
  const [file, setFile] = useState<IDropFile | null>(null);
  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/jpeg',
    maxFiles: 1,
    onDrop: acceptedFiles => {
      setFile(Object.assign(acceptedFiles[0], {
        preview: URL.createObjectURL(acceptedFiles[0])
      }))
      console.log(Object.assign(acceptedFiles[0], {
        preview: URL.createObjectURL(acceptedFiles[0])
      }));
    }
  });

  const formik = useFormik({
    initialValues: {
      timeStart: 0,
      timeEnd: 0,
      type: 'imagebutton',
      buttonText: null,
      buttonUrl: null,
      imageUrl: ''
    },
    validationSchema: Yup.object({
      timeStart: Yup.number()
        .required(""),
      timeEnd: Yup.number()
        .required("")
        .min(playerTime+9, "")
        .max(playerTime+11, ""),
      imageUrl: Yup.mixed()
        .required("Вы не добавили картинку")
    }),
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
      addElement(values);
      clearValues();
    },
  });

  const clearValues = () => {
    setFile(null);
  }

  useEffect(() => {
    formik.setFieldValue("imageUrl", file);
    formik.setFieldValue("timeStart", playerTime);
    formik.setFieldValue("timeEnd", playerTime+10);
  }, [file]);

  return (
    <section className="control-bar__body">
      <section className="dropzone">
       <div {...getRootProps({className: 'dropzone__container'})}>
         <input 
          // id="imageUrl" 
          // name="imageUrl" 
          // onChange={formik.handleChange} 
          // onBlur={formik.handleBlur} 
          // value={formik.values.imageUrl} 
          {...getInputProps()} 
         />
          <img src={upload_img} alt="upload_img" />
         {file && <img src={file?.preview} className="dropzone__img" alt="dropdown_img" />}
       </div>
     </section>
     <p>{file?.size}</p>
      <button className="control-bar__add-button" type="submit" onClick={() => formik.handleSubmit()}>
        +
      </button>
      <button className="control-bar__delete-button" onClick={() => clearValues()}>
        <img src={delete_img} alt="delete_button" />
      </button>
    </section>
  )
} 

const ButtonControlBar: React.FC<IAddElement> = ({addElement, playerTime}) => {
  const [nameVal, setNameVal] = useState<string>("");
  const [linkVal, setLinkVal] = useState<string>("");

  const formik = useFormik({
    initialValues: {
      timeStart: 0,
      timeEnd: 0,
      type: 'imagebutton',
      buttonText: "",
      buttonUrl: "",
      imageUrl: null
    },
    validationSchema: Yup.object({
      timeStart: Yup.number()
        .required(""),
      timeEnd: Yup.number()
        .required("")
        .min(playerTime+9, "")
        .max(playerTime+11, ""),
      buttonText: Yup.string()
        .required("Введите текст кнопки"),
      buttonUrl: Yup.string()
      .matches(
          /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
          "Введите корректную ссылку"
      )
      .required("Введите ссылку"),
    }),
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
      addElement(values);
      clearValues();
    },
  });

  const updateValues = () => {
    formik.setFieldValue("buttonText", nameVal);
    formik.setFieldValue("buttonUrl", linkVal);
    formik.setFieldValue("timeStart", playerTime);
    formik.setFieldValue("timeEnd", playerTime+10);
  }

  const clearValues = () => {
    setNameVal("");
    setLinkVal("");
  }

  console.log("render");

  return (
    <section className="control-bar__body">
      <section className="control-bar__buttons-form buttons-form">
        <input 
          id="buttonText" 
          name="buttonText" 
          onBlur={() => updateValues()}
          value={nameVal} 
          onChange={(e) => setNameVal(e.target.value)} 
          type="text" 
          className="buttons-form__input-name input-name" 
          placeholder={BUTTON_TEXT} 
          />
        <input 
          id="buttonUrl" 
          name="buttonUrl"
          onBlur={() => updateValues()}
          value={linkVal} 
          onChange={(e) => setLinkVal(e.target.value)}  
          type="text" className="buttons-form__input-link input-link" 
          placeholder={LINK} />
      </section>
      <button className="control-bar__add-button" type="submit" onClick={() => formik.handleSubmit()}>
        +
      </button>
      <button className="control-bar__delete-button" onClick={clearValues}>
        <img src={delete_img} alt="delete_button" />
      </button>
    </section>
  )
}

const ImageAndButtonControlBar: React.FC<IAddElement> = ({addElement, playerTime}) => {
  const [file, setFile] = useState<IDropFile | null>(null);
  const [nameVal, setNameVal] = useState<string>("");
  const [linkVal, setLinkVal] = useState<string>("");

  const formik = useFormik({
    initialValues: {
      timeStart: 0,
      timeEnd: 0,
      type: 'imagebutton',
      buttonText: "",
      buttonUrl: "",
      imageUrl: "",
    },
    validationSchema: Yup.object({
      timeStart: Yup.number()
        .required(""),
      timeEnd: Yup.number()
        .required("")
        .min(playerTime+9, "")
        .max(playerTime+11, ""),
      buttonText: Yup.string()
        .required("Введите текст кнопки"),
      buttonUrl: Yup.string()
        .matches(
            /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
            "Введите корректную ссылку"
        )
        .required("Введите ссылку"),
        imageUrl: Yup.mixed()
          .required("Вы не добавили картинку")
    }),
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
      addElement(values);
      clearValues();
    },
  });

  useEffect(() => {
    formik.setFieldValue("imageUrl", file);
    formik.setFieldValue("timeStart", playerTime);
    formik.setFieldValue("timeEnd", playerTime+10);
  }, [file]);

  const updateValues = () => {
    formik.setFieldValue("buttonText", nameVal);
    formik.setFieldValue("buttonUrl", linkVal);
    formik.setFieldValue("timeStart", playerTime);
    formik.setFieldValue("timeEnd", playerTime+10);
  }

  console.log("render2");

  const clearValues = () => {
    setNameVal("");
    setLinkVal("");
    setFile(null);
  }

  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/jpeg',
    maxFiles: 1,
    onDrop: acceptedFiles => {
      setFile(Object.assign(acceptedFiles[0], {
        preview: URL.createObjectURL(acceptedFiles[0])
      }))
      console.log(Object.assign(acceptedFiles[0], {
        preview: URL.createObjectURL(acceptedFiles[0])
      }));
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
     <input 
          id="buttonText" 
          name="buttonText" 
          onBlur={() => updateValues()}
          value={nameVal} 
          onChange={(e) => setNameVal(e.target.value)} 
          type="text" 
          className="buttons-form__input-name input-name" 
          placeholder={BUTTON_TEXT} 
          />
        <input 
          id="buttonUrl" 
          name="buttonUrl"
          onBlur={() => updateValues()}
          value={linkVal} 
          onChange={(e) => setLinkVal(e.target.value)}  
          type="text" className="buttons-form__input-link input-link" 
          placeholder={LINK} />
      </section>
      <button className="control-bar__add-button" type="submit" onClick={() => formik.handleSubmit()}>
        +
      </button>
      <button className="control-bar__delete-button" onClick={clearValues}>
        <img src={delete_img} alt="delete_button" />
      </button>
    </section>
  )
}

const renderSwitch = (num: number | undefined, addElement: TAddElement, playerTime: number) => {
  switch (num) {
    case 0:
      return <ImageControlBar addElement={addElement} playerTime={playerTime} />
    case 1:
      return <ButtonControlBar addElement={addElement} playerTime={playerTime} />
    case 2:
      return <ImageAndButtonControlBar addElement={addElement} playerTime={playerTime} />
    default:
      break;
  }
}

interface IControlBar extends React.HTMLAttributes<HTMLDivElement>, IAddElement {
  playerTime: number,
  activeButton: number | undefined;
}

export const ControlBar: React.FC<IControlBar> = ({activeButton, playerTime, addElement, className}) => {
  return (
    <section className={cn("control-bar", className)}>
      {renderSwitch(activeButton, addElement, playerTime)}
    </section> 
  )
}