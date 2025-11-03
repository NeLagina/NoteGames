
import './App.css';
import logo from "./assets/Kitm.png";
import Gameone from "./Gameone";
import { useState } from "react";




function App() {
  const [UI, setUI] = useState("");
  return (
    <>
      <main>
        <h1 className='title'>Music Note Game</h1>
        <img src={logo} alt="logo kitm" / >
        {UI === "play" ? <Gameone /> : null}
        {UI === "" ? (
          <button className="button-5" role="button" onClick={(function () { setUI("play") })}>Žaisti</button>
        ): <button className="button-5" role="button" onClick={(function () { setUI("") })}>back</button>}
        
      </main>
    </>
  )
}

export default App
