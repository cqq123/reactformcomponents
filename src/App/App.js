import React from 'react';
import style from './App.scss';
/* eslint-disable */
import InputTest from 'demo/InputTest';
import CheckboxTest from 'demo/CheckboxTest';
import RadioTest from 'demo/RadioTest';
import SelectTest from 'demo/SelectTest';
import DrawImg from 'components/DrawImg';
import UploadFile from 'components/UploadFile';
/* eslint-enable */
const App = () => (
  <div className={style.main}>
    <InputTest />
    <CheckboxTest />
    <RadioTest />
    <SelectTest />
    <DrawImg />
    <UploadFile />
  </div>
);

export default App;
