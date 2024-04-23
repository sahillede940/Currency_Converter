import { useState } from "react";
import CurrencyConverter from "./CurrencyConverter";
import CountryChart from "./CountryChart";
import Signature from "./Signature";

function App() {
  const [count, setCount] = useState(0);
  const URL = "https://api.exchangerate-api.com/v4/latest/";
  return (
    <>
      <div className="App">
        <Signature/>
        <CurrencyConverter />
        <hr />
        <CountryChart />
      </div>
    </>
  );
}

export default App;
