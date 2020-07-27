import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import Item from "./Item";

import cookieSrc from "../cookie.svg";

import items from "../data";

const useKeydown = (code, callback) => {
  React.useEffect(() => {
    const handleKeyDown = (ev) => {
      if (ev.code === code) {
        ev.preventDefault();
        callback();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });
};

const useDocumentTitle = (title, fallbackTitle) => {
  React.useEffect(() => {
    document.title = title;

    return () => {
      document.title = fallbackTitle;
    };
  }, [title]);
};

const Game = ({
  numCookies,
  setNumCookies,
  purchasedItems,
  setPurchasedItems,
  cookiesPerClick,
  setcookiesPerClick,
}) => {
  const useMegaCursor = (numMegaCursor) => {
    React.useEffect(() => {
      setcookiesPerClick(1 + numMegaCursor * items[3].increasePerClick);

      return () => {
        setcookiesPerClick(cookiesPerClick);
      };
    }, [numMegaCursor]);
  };

  useKeydown("Space", () => {
    setNumCookies(numCookies + 1);
  });

  useDocumentTitle(
    `${numCookies} cookies - Cookie Clicker Game`,
    "Cookie Clicker Game"
  );

  useMegaCursor(purchasedItems.megacursor);

  // React.useEffect(() => {
  //   console.log("onstart");
  //   const handleSpaceBar = (ev) => {
  //     if (ev.code === "Space") {
  //       // console.log("spacebar clicked");
  //       setNumCookies(numCookies + 1);
  //     }
  //   };
  //   window.addEventListener("keydown", handleSpaceBar);
  //   return () => {
  //     // console.log("removed");
  //     window.removeEventListener("keydown", handleSpaceBar);
  //   };
  // });

 

  return (
    <Wrapper>
      <GameArea>
        <Indicator>
          <Total>{numCookies} cookies</Total>
          <strong>
            {purchasedItems.cursor +
              purchasedItems.grandma * 10 +
              purchasedItems.farm * 80}
          </strong>{" "}
          cookie(s) per second
          <p>
            <strong>{cookiesPerClick}</strong> cookie(s) per click
          </p>
        </Indicator>
        <Button onClick={() => setNumCookies(numCookies + cookiesPerClick)}>
          <Cookie src={cookieSrc} />
        </Button>
      </GameArea>

      <ItemArea>
        <SectionTitle>Items:</SectionTitle>
        {items.map((item, index) => {
          return (
            <Item
              key={item.id}
              name={item.name}
              cost={item.cost}
              increasePerSecond={item.increasePerSecond}
              increasePerClick={item.increasePerClick}
              numOwned={purchasedItems[item.name.toLowerCase()]}
              handleClick={({ cost, name }) => {
                if (numCookies < cost) {
                  window.alert("You can't afford it!");
                } else {
                  setNumCookies(numCookies - cost);
                  setPurchasedItems({
                    ...purchasedItems,
                    [name.toLowerCase()]:
                      purchasedItems[name.toLowerCase()] + 1,
                  });
                }
              }}
              isFirst={index === 0}
            />
          );
        })}
      </ItemArea>
      <HomeLink to="/">Return home</HomeLink>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
`;
const GameArea = styled.div`
  flex: 1;
  display: grid;
  place-items: center;
`;
const Button = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
`;

const Cookie = styled.img`
  width: 200px;
`;

const ItemArea = styled.div`
  height: 100%;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SectionTitle = styled.h3`
  text-align: center;
  font-size: 32px;
  color: yellow;
`;

const Indicator = styled.div`
  position: absolute;
  width: 250px;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
`;

const Total = styled.h3`
  font-size: 28px;
  color: lime;
`;

const HomeLink = styled(Link)`
  position: absolute;
  top: 15px;
  left: 15px;
  color: #666;
`;

export default Game;
