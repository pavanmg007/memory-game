import { useCallback, useEffect, useState } from "react";
import SingleCard from "./components/SingleCard";

const cardImages = [
  { src: "/assets/drive.png", matched: false },
  { src: "/assets/fit.png", matched: false },
  { src: "/assets/gmail.png", matched: false },
  { src: "/assets/google.png", matched: false },
  { src: "/assets/map.png", matched: false },
  { src: "/assets/marketing.png", matched: false },
  { src: "/assets/meet.png", matched: false },
  { src: "/assets/photos.png", matched: false },
  { src: "/assets/gpay.png", matched: false },
  { src: "/assets/dev.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [value, setValue] = useState("4");

  //Handle Difficulty value
  const handleChange = (e) => {
    setValue(e.target.value);
    shuffleCards(value);
  };

  // Shuffle Cards
  const shuffleCards = useCallback(() => {
    const newCards = cardImages.slice(value);
    const shuffledCard = [...newCards, ...newCards]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setCards(shuffledCard);
    setTurns(0);
  }, [value]);

  useEffect(() => {
    shuffleCards();
  }, [shuffleCards]);

  // handle Choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // resetting Choice
  const resetChoice = useCallback(() => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setDisabled(false);
    setTurns(turns + 1);
  }, [turns]);

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetChoice();
      } else {
        setTimeout(() => {
          resetChoice();
        }, 1000);
      }
    }
  }, [choiceOne, choiceTwo, resetChoice]);

  return (
    <div className="bg-slate-800 h-screen text-center">
      <h1 className="text-white text-xl xl:text-3xl font-bold py-6">Memory Game</h1>
      <button onClick={shuffleCards} className="text-white inline-block border px-2 py-1">
        New Game
      </button>
      <select
        value={value}
        onChange={handleChange}
        style={{height:'34px'}}
        className="ml-5 py-1 px-2 inline-block text-white border bg-transparent outline-none focus:bg-slate-800"
        name="difficulty"
        id="difficulty"
      >
        <option value="4">Easy</option>
        <option value="2">Medium</option>
        <option value="">Hard</option>
      </select>
      <div className="mx-5 md:w-3/5 xl:w-2/5 md:mx-auto">
        <div
          className={`${
            value === "4" || value === "2" ? "grid-cols-4" : "grid-cols-5"
          } grid  gap-4 place-items-center my-5`}
        >
          {cards.map((card) => (
            <SingleCard
              card={card}
              key={card.id}
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              disabled={disabled}
            />
          ))}
        </div>
        <h2 className="text-white">Turns: {turns}</h2>
      </div>
    </div>
  );
}

export default App;
