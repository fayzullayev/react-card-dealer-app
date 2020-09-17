import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";
import "./Deck.css";

const Deck = () => {
  const [state, updateState] = useState({
    cards: [],
    isFinish: false,
    deck_id: null,
  });

  useEffect(() => {
    const getDeckId = async () => {
      const respone = await axios.get(
        "https://deckofcardsapi.com/api/deck/new/shuffle/"
      );

      updateState({
        ...state,
        deck_id: respone.data.deck_id,
      });
    };

    getDeckId();
  }, []);

  const add = async () => {
    const url = `https://deckofcardsapi.com/api/deck/${state.deck_id}/draw/`;
    let respone = await axios.get(url);

    if (respone.data && respone.data.remaining > 0 && respone.data.success) {
      let cards = [...state.cards];
      const randomDeg = Math.floor(Math.random() * (56 - -55 + 1) + -55);
      const x = Math.floor(Math.random() * (26 - -25 + 1) + -25);
      const y = Math.floor(Math.random() * (26 - -25 + 1) + -25);

      cards.push({
        ...respone.data.cards[0],
        deg: randomDeg,
        positionX: x,
        positionY: y,
      });

      updateState({
        ...state,
        cards,
      });
    } else {
      updateState({
        ...state,
        isFinish: true,
      });
    }
  };

  const cards = state.cards.map((card) => <Card key={card.code} {...card} />);
  return (
    <div className="Deck">
      <h1 className="Deck-title">
        <span role="img" aria-label="jsx-a11y/accessible-emoji">
          🧡
        </span>
        Card Dealer
        <span role="img" aria-label="jsx-a11y/accessible-emoji">
          🧡
        </span>
      </h1>
      <h2 className="Deck-title subtitle">
        <span role="img" aria-label="jsx-a11y/accessible-emoji">
          🧡
        </span>
        A little demo made with React
        <span role="img" aria-label="jsx-a11y/accessible-emoji">
          🧡
        </span>
      </h2>
      {!state.isFinish && <button onClick={add}>Get Card</button>}
      <div className="Deck-cards">{cards}</div>
    </div>
  );
};

export default Deck;
