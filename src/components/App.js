import React, { useContext } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import useInterval from "../hooks/use-interval.hook";

import GlobalStyles from "./GlobalStyles";
import Home from "./Home";
import Game from "./Game";
import items from "../data";
import { GameContext } from "./GameContext";

function App() {
  const { numCookies, setNumCookies, purchasedItems } = useContext(GameContext);

  useInterval(() => {
    const calculateCookiesPerTick = ({ cursor, grandma, farm }) => {
      return (
        cursor * items[0].increasePerSecond +
        grandma * items[1].increasePerSecond +
        farm * items[2].increasePerSecond
      );
    };
    const numOfGeneratedCookies = calculateCookiesPerTick(purchasedItems);
    setNumCookies(numCookies + numOfGeneratedCookies);
  }, 1000);

  return (
    <>
      <GlobalStyles />
      <Router>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/game">
          <Game
          // numCookies={numCookies}
          // setNumCookies={setNumCookies}
          // purchasedItems={purchasedItems}
          // setPurchasedItems={setPurchasedItems}
          // cookiesPerClick={cookiesPerClick}
          // setcookiesPerClick={setcookiesPerClick}
          />
        </Route>
      </Router>
    </>
  );
}

export default App;
