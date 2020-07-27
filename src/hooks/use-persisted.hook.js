import React from "react";

const usePersistedState = (storageName, startValue) => {
  const localStored = window.localStorage.getItem(Number(storageName));
  const [storedValue, setStoredValue] = React.useState(
    localStored ? localStored : startValue
  );

  React.useEffect(() => {
    window.localStorage.setItem(storageName, Number(storedValue));
  }, [storedValue]);

  return [storedValue, setStoredValue];
};

export default usePersistedState;
