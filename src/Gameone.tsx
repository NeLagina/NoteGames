import { useState, useEffect } from "react";
import useSound from "use-sound";
import "./Gameon.css";

import notesC from "./assets/sound/notes/c.mp3";
import notesDo from "./assets/sound/notes/do.mp3";
import notesF from "./assets/sound/notes/f.mp3";
import notesLa from "./assets/sound/notes/la.mp3";
import notesMi from "./assets/sound/notes/mi.mp3";
import notesRe from "./assets/sound/notes/re.mp3";
import notesSol from "./assets/sound/notes/sol.mp3";

function Blackoverlay(props: { children: any }) {
  return <div className="overlay">{props.children}</div>;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function DeathScreen({ score }: { score: number }) {
  return (
    <>
      <h1>Tasku gavai {score} :(</h1>
      <p>Laikas baigėsi! </p>
    </>
  );
}

function App() {
  const [gameTime, setGameTime] = useState(65);
  const [roundTime, setRoundTime] = useState(0);
  const [score, setScore] = useState(150);
  const [mode, setMode] = useState<"Start" | "Guess" | "Death">("Start");
  const [currentNote, setCurrentNote] = useState<{ play: () => void; label: string } | null>(null);
  const [lastNoteLabel, setLastNoteLabel] = useState<string | null>(null);

  const [playC] = useSound(notesC);
  const [playDo] = useSound(notesDo);
  const [playF] = useSound(notesF);
  const [playLa] = useSound(notesLa);
  const [playMi] = useSound(notesMi);
  const [playRe] = useSound(notesRe);
  const [playSol] = useSound(notesSol);

  const notes = [
    { play: playDo, label: "Do" },
    { play: playRe, label: "Re" },
    { play: playMi, label: "Mi" },
    { play: playF, label: "Fa" },
    { play: playSol, label: "Sol" },
    { play: playLa, label: "La" },
    { play: playC, label: "Si" },
  ];


  useEffect(() => {
    if (mode === "Death") return; 

    if (gameTime > 0) {
      const interval = setInterval(() => {
        setGameTime((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {

      setMode("Death");
    }
  }, [gameTime, mode]);

  // Round timer
  useEffect(() => {
    if (mode !== "Guess") return;

    if (roundTime > 0) {
      const interval = setInterval(() => {
        setRoundTime((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setScore((prev) => prev - 50);
   
      nextRound();
    }
    
  }, [roundTime, mode]); 

  useEffect(() => {
    const startGame = async () => {
      if (mode === "Start") {
        await sleep(1000);
        nextRound();
      }
    };
    startGame();
   
  }, [mode]);

  const nextRound = () => {
    if (mode === "Death") return; 

    if (currentNote) {
      setLastNoteLabel(currentNote.label);
    }
    const note = notes[Math.floor(Math.random() * notes.length)];
    setCurrentNote(note);
   
    try {
      note.play();
    } catch (e) {
      // swallow play errors in environments where audio isn't allowed/loaded
      // console.warn("Failed to play note:", e);
      alert("Jusu naršykle neleidžia groti garsų bandykit Firefox ar kita naršykle")
    }
    setRoundTime(10);
    setMode("Guess");
  };

  const handleGuess = (label: string) => {
    if (mode === "Death" || !currentNote) return;
    if (label === currentNote.label) {
      setScore((prev) => prev + 100);
    } else {
      setScore((prev) => prev - 50);
    }
    nextRound();
  };

  return (
    <Blackoverlay>
      {mode === "Death" ? (
        <DeathScreen score={score} />
      ) : (
        <>
          <h1>Laikas liko: {Math.floor(gameTime / 60)}:{(gameTime % 60).toString().padStart(2, "0")}</h1>
          {lastNoteLabel && (
            <p className="last-note">Paskutinė nata buvo: <strong>{lastNoteLabel.toUpperCase()}</strong></p>
          )}
          <h2>Taškai: {score}</h2>
          <h3>Spėk natą!</h3>
          <p>Likęs laikas: {roundTime}s</p>

          <div className="buttons">
            {notes.map((note) => (
              <button key={note.label} onClick={() => handleGuess(note.label)}>
                {note.label.toUpperCase()}
              </button>
            ))}
          </div>
        </>
      )}
    </Blackoverlay>
  );
}

export default App;