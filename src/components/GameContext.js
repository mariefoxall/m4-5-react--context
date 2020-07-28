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

  React.useEffect(() => {
    const localStored = JSON.parse(window.localStorage.getItem("timeStamp"));
    const timeUnmounted = localStored
      ? localStored
      : new Date().toLocaleString();

    const timeMounted = new Date().getTime();

    const timeDiffMill = timeMounted - timeUnmounted;
    const timeDiffSeconds = Math.ceil(timeDiffMill / 1000);
    console.log("timeDiff", timeDiffSeconds);

    const generatedCookiesPerSecond =
      purchasedItems.cursor +
      purchasedItems.grandma * 10 +
      purchasedItems.farm * 80;

    setNumCookies(numCookies + generatedCookiesPerSecond * timeDiffSeconds);
  }, []);

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
