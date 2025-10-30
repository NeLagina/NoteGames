
import './App.css'
import Gameone from "./Gameone"
import { useState } from "react";




function App() {
  const [UI, setUI] = useState("");
  return (
    <>
      <main>
        <h1 className='title'>Music Note Game</h1>

        {UI === "" ? (
          <button className="button-5" role="button" onClick={(function () { setUI("play") })}>Žaisti</button>
        ): <button className="button-5" role="button" onClick={(function () { setUI("") })}>back</button>}
        {UI === "play" ? <Gameone /> : null}
      </main>
    </>
  )
}

export default App
