import { useState, useEffect } from "react";
import useSound from "use-sound";
import "./Gameon.css";

import notesC from "./assets/sound/notes/c.mp3";
import notesDo from "./assets/sound/notes/do.mp3";
import notesF from "./assets/sound/notes/f.mp3";
import notesLa from "./assets/sound/notes/la.mp3";
import notesMi from "./assets/sound/notes/mi.mp3";
import notesRe from "./assets/sound/notes/re.mp3";

function Blackoverlay(props:{ children : any }) {
  return <div className="overlay">{props.children}</div>;
}

function App() {
  const [timer, setTimer] = useState(3);
  const [content, setContent] = useState("");

  const [playC] = useSound(notesC);
  const [playDo] = useSound(notesDo);
  const [playF] = useSound(notesF);
  const [playLa] = useSound(notesLa);
  const [playMi] = useSound(notesMi);
  const [playRe] = useSound(notesRe);

  const notes = [
    { play: playC, label: "c" },
    { play: playF, label: "f" },
    { play: playDo, label: "do" },
    { play: playLa, label: "la" },
    { play: playMi, label: "mi" },
    { play: playRe, label: "re" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timer === 0 && content === "") {
      const item = notes[Math.floor(Math.random() * notes.length)];
      item.play();
      setContent(item.label);
    }
  }, [timer, content]);

  return (
    <Blackoverlay>
      <h1 className={timer > 0 ? "timer" : ""}>
        {timer > 0 ? timer : content}
      </h1>
    </Blackoverlay>
  );
}

export default App;