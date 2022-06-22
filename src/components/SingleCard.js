import React from "react";

function SingleCard({ card, handleChoice, flipped, disabled }) {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };
  return (
    <div className="xl:w-28 relative">
      <div className={flipped ? "flipped" : ""}>
        <img className="back absolute rounded-md " src={card.src} alt="" />
        <img className="front rounded-md" onClick={handleClick} src="/front.png" alt="" />
      </div>
    </div>
  );
}

export default SingleCard;
