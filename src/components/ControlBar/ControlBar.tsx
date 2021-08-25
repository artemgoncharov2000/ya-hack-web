import React,  {useState, useEffect, useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import cn from "classnames";
import "./ControlBar.scss";
import { BUTTON_TEXT, LINK, QUESTION, OPTION } from "./ControlBar.constants";
import {IEpisode, IAddEpisode, TAddEpisode, TIsAvailable} from "../../types";
import upload_img from "./../../icons/upload.svg";
import delete_img from "./../../icons/delete.svg";
import add_img from "./../../icons/add.svg";

import { useFormik } from 'formik';
import * as Yup from 'yup';

interface IDropFile extends File {
  preview?: string,
}

const ImageControlBar: React.FC<IAddEpisode> = ({addElement, playerTime, isAvailable}) => {
  const [file, setFile] = useState<IDropFile | null>(null);
  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/jpeg',
    maxFiles: 1,
    onDrop: acceptedFiles => {
      setFile(Object.assign(acceptedFiles[0], {
        preview: URL.createObjectURL(acceptedFiles[0])
      }))
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
        .required("")
        .test("Доступно", "Уже есть элемент на таймлайне", val => isAvailable(Number(val))),
      timeEnd: Yup.number()
        .required("")
        .min(playerTime+9, "")
        .max(playerTime+11, "")
        .test("Доступно", "Уже есть элемент на таймлайне", val => isAvailable(Number(val))),
      imageUrl: Yup.mixed()
        .required("Вы не добавили картинку")
    }),
    onSubmit: values => {
      addElement(values);
      clearValues();
    },
  });

  const clearValues = () => {
    setFile(null);
  }

  useEffect(() => {
    formik.setFieldValue("imageUrl", file);
  }, [file]);

  const updateValues = async () => {
    await formik.setFieldValue("timeStart", playerTime);
    await formik.setFieldValue("timeEnd", playerTime+10);
  }

  return (
    <section className="control-bar__body">
      <section className="dropzone">
       <div {...getRootProps({className: 'dropzone__container'})}>
         <input 
          {...getInputProps()} 
         />
          <img src={upload_img} alt="upload_img" />
         {file && <img src={file?.preview} className="dropzone__img" alt="dropdown_img" />}
       </div>
     </section>
      <button className="control-bar__add-button" type="submit" onClick={async () => {
        await updateValues();
        formik.handleSubmit()
      }}>
        <img src={add_img} alt="add_button" />
      </button>
      <button className="control-bar__delete-button" onClick={() => clearValues()}>
        <img src={delete_img} alt="delete_button" />
      </button>
    </section>
  )
} 

const ButtonControlBar: React.FC<IAddEpisode> = ({addElement, playerTime, isAvailable}) => {
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
        .required("")
        .test("Доступно", "Уже есть элемент на таймлайне", val => isAvailable(Number(val))),
      timeEnd: Yup.number()
        .required("")
        .min(playerTime+9, "")
        .max(playerTime+11, "")
        .test("Доступно", "Уже есть элемент на таймлайне", val => isAvailable(Number(val))),
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
      addElement(values);
      clearValues();
    },
  });

  const updateValues = async () => {
    await formik.setFieldValue("buttonText", nameVal);
    await formik.setFieldValue("buttonUrl", linkVal);
    await formik.setFieldValue("timeStart", playerTime);
    await formik.setFieldValue("timeEnd", playerTime+10);
  }

  const clearValues = () => {
    setNameVal("");
    setLinkVal("");
  }

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
      <button className="control-bar__add-button" type="submit" onClick={async () => {
        await updateValues();
        formik.handleSubmit()
      }}>
        <img src={add_img} alt="add_button" />
      </button>
      <button className="control-bar__delete-button" onClick={clearValues}>
        <img src={delete_img} alt="delete_button" />
      </button>
    </section>
  )
}

const ImageAndButtonControlBar: React.FC<IAddEpisode> = ({addElement, playerTime, isAvailable}) => {
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
        .required("")
        .test("Доступно", "Уже есть элемент на таймлайне", val => isAvailable(Number(val))),
      timeEnd: Yup.number()
        .required("")
        .min(playerTime+9, "")
        .max(playerTime+11, "")
        .test("Доступно", "Уже есть элемент на таймлайне", val => isAvailable(Number(val))),
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
      addElement(values);
      clearValues();
    },
  });

  useEffect(() => {
    formik.setFieldValue("imageUrl", file);
  }, [file]);

  const updateValues = async () => {
    await formik.setFieldValue("buttonText", nameVal);
    await formik.setFieldValue("buttonUrl", linkVal);
    await formik.setFieldValue("timeStart", playerTime);
    await formik.setFieldValue("timeEnd", playerTime+10);
  }

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
      <button className="control-bar__add-button" type="submit" onClick={async () => {
        await updateValues();
        formik.handleSubmit()
      }}>
        <img src={add_img} alt="add_button" />
      </button>
      <button className="control-bar__delete-button" onClick={clearValues}>
        <img src={delete_img} alt="delete_button" />
      </button>
    </section>
  )
}

const renderSwitch = (num: number | undefined, addElement: TAddEpisode, playerTime: number, isAvailable: TIsAvailable) => {
  switch (num) {
    case 0:
      return <ImageControlBar addElement={addElement} playerTime={playerTime} isAvailable={isAvailable} />
    case 1:
      return <ButtonControlBar addElement={addElement} playerTime={playerTime} isAvailable={isAvailable}  />
    case 2:
      return <ImageAndButtonControlBar addElement={addElement} playerTime={playerTime} isAvailable={isAvailable}  />
    default:
      break;
  }
}

interface IControlBar extends React.HTMLAttributes<HTMLDivElement> {
  playerTime: number,
  addElement: TAddEpisode,
  activeButton: number | undefined,
  elements: IEpisode[],
}

export const ControlBar: React.FC<IControlBar> = ({activeButton, playerTime, addElement, elements, className}) => {
  const isAvailable = useCallback((num: number): boolean => {
    for (let i = 0; i < elements.length; i++) {
      if (num >= elements[i].timeStart && num <= elements[i].timeEnd) {
        return false;
      }
    }
    return true;
  }, [elements])

  return (
    <section className={cn("control-bar", className)}>
      {renderSwitch(activeButton, addElement, playerTime, isAvailable)}
    </section> 
  )
}