import React from "react";
import usePersistedState from "../hooks/use-persisted.hook";

export const GameContext = React.createContext();

export const GameProvider = ({ children }) => {
  const [numCookies, setNumCookies] = usePersistedState("saveNumCookies", 100);
  const [purchasedItems, setPurchasedItems] = usePersistedState(
    "savePurchasedItems",
    {
      cursor: 0,
      grandma: 0,
      farm: 0,
      megacursor: 0,
    }
  );

  const [cookiesPerClick, setCookiesPerClick] = React.useState(1);

  return (
    <GameContext.Provider
      value={{
        numCookies: Number(numCookies),
        setNumCookies,
        purchasedItems,
        setPurchasedItems,
        cookiesPerClick,
        setCookiesPerClick,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
