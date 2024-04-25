import { useState } from "react";
import CurrencyConverter from "./CurrencyConverter";
import CountryChart from "./CountryChart";
import Signature from "./Signature";

function App() {
  const [count, setCount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const URL = "https://api.exchangerate-api.com/v4/latest/";
  return (
    <>
      <div className="App">
        <Signature/>
        <CurrencyConverter 
          fromCurrency={fromCurrency} 
          toCurrency={toCurrency} 
          setFromCurrency={setFromCurrency} 
          setToCurrency={setToCurrency} 
          URL={URL}
        />
        <hr />
        <CountryChart
          fromCurrency={fromCurrency}
          toCurrency={toCurrency}
          URL={URL}
          setFromCurrency={setFromCurrency}
          setToCurrency={setToCurrency}
        />
      </div>
    </>
  );
}

export default App;
