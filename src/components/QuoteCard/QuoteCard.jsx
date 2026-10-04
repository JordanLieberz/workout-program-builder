import React from "react";
import "./QuoteCard.css";

function QuoteCard() {
  return (
    <div className="quote-card">
      <p className="quote-card__text">“The struggle itself is the lesson.”</p>
      <p className="quote-card__author">— Sisyphus</p>
    </div>
  );
}

export default QuoteCard;