import "./App.css";
import { useState } from "react";
import axios from "axios";

function App() {
  // store everything that changes in state
  const [from, setFrom] = useState("en");
  const [to, setTo] = useState("es");
  const [word, setWord] = useState("");
  // translation is object because that's what's returned by server
  const [translation, setTranslation] = useState({});
  // image is string because it's a URL
  const [image, setImage] = useState("");

  // call the API to get translation
  async function handleTranslate(event) {
    event.preventDefault();
    const API = `https://translatim-oqqa.onrender.com/translate?word=${word}&from=${from}&to=${to}`;
    const res = await axios.get(API);
    setTranslation(res.data);
    setImage(res.data.image);
  }

  return (
    <>
      <form onSubmit={handleTranslate}>
        <div className="bigboy">
          <div className="container">
            <select onChange={(event) => setFrom(event.target.value)}>
              <option value="ar">Arabic</option>
              <option value="en" selected="selected">
                English
              </option>
              <option value="pl">Polish</option>
              <option value="es">Spanish</option>
              <option value="tr">Turkish</option>
            </select>
            <textarea
              className="input"
              placeholder="Enter text"
              onChange={(event) => setWord(event.target.value)}
            />
            <button>Translate & generate image of dubious relevance</button>
            <div className="titletext">
              <h1>whyTranslator?</h1>
              <p>
                Translate text between a shockingly small number of languages
                and generate an image of dubious relevance.
              </p>
              <p>It's what the internet has always needed!</p>
            </div>
          </div>

          <div className="container">
            <select onChange={(event) => setTo(event.target.value)}>
              <option value="ar">Arabic</option>
              <option value="en">English</option>
              <option value="pl">Polish</option>
              <option value="es" selected="selected">
                Spanish
              </option>
              <option value="tr">Turkish</option>
            </select>
            <div className="output">{translation.translation}</div>
            <img src={image} />
          </div>
        </div>
      </form>
    </>
  );
}

export default App;
