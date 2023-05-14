import React, { useState, useEffect, createContext, useContext } from 'react'

const Crypto = createContext();


const CryptoContext = (props) => {
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");

  useEffect(() => {
    if (currency === "INR") setSymbol("₹");
    else if (currency === "USD") setSymbol("$");
  }, [currency]);
  
    return (
    <Crypto.Provider value={{currency, symbol, setCurrency}}>
      {props.children}
    </Crypto.Provider>
  )
}

export default CryptoContext;

export const Cryptostate = () => {
  return useContext(Crypto);
};