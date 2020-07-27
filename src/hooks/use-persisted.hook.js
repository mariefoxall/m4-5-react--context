import React from "react";

const usePersistedState = (storageName, startValue) => {
  // window.localStorage.clear();
  const localStored = JSON.parse(window.localStorage.getItem(storageName));
  const [storedValue, setStoredValue] = React.useState(
    localStored ? localStored : startValue
  );

  React.useEffect(() => {
    window.localStorage.setItem(storageName, JSON.stringify(storedValue));
  }, [storedValue]);

  return [storedValue, setStoredValue];
};

export default usePersistedState;
