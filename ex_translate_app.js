import React, { useState } from "react";
import Field from "./components/field";
import Translate from "./components/translate";
import Languages from "./components/languages";
import './style.css';

export default function App() {
    const [languages , setLanguages] = useState('es');
    const [text , setText] = useState('');

  return (
    <div>
        <Field onChange={setText} />
        <Languages languages={languages} onLaguagesChange={setLanguages}/>
        <hr />
        <Translate text={text} languages={languages}/>
    </div>
  );
}