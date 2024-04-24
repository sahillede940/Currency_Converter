import React, { useState, useEffect } from "react";
import axios from "axios";

const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [fromAmountString, setFromAmountString] = useState("1");
  const [fromAmount, setFromAmount] = useState(1);
  const [exchangeRate, setExchangeRate] = useState(0);
  const [valueINR, setValueINR] = useState(0);
  const [valueUSD, setValueUSD] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get("https://api.exchangerate-api.com/v4/latest/INR")
      .then((response) => {
        setCurrencies(Object.keys(response.data.rates));
        setExchangeRate(response.data.rates[toCurrency]);
        setValueINR(response.data.rates["INR"]);
        setValueUSD(response.data.rates["USD"]);
      });
  }, []);

  const getExchangeRate = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
      );
      setExchangeRate(response.data.rates[toCurrency]);
      setValueINR(response.data.rates["INR"]);
      setValueUSD(response.data.rates["USD"]);
      setLoading(false);
    } catch (error) {
      console.error("Error: ", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getExchangeRate();
  }, [fromCurrency, toCurrency]);

  function formatINR(value) {
    if (value >= 1e7) {
      return IndianRupee.format((value / 1e7).toFixed(2)) + " crore";
    } else if (value >= 1e5) {
      return IndianRupee.format((value / 1e5).toFixed(2)) + " lakh";
    } else if (value >= 1e3) {
      return IndianRupee.format((value / 1e3).toFixed(2)) + " thousand";
    }
    return value.toFixed(2);
  }

  function formatUSD(value) {
    if (value >= 1e12) {
      return USDollar.format((value / 1e12).toFixed(2)) + " trillion";
    } else if (value >= 1e9) {
      return USDollar.format((value / 1e9).toFixed(2)) + " billion";
    } else if (value >= 1e6) {
      return USDollar.format((value / 1e6).toFixed(2)) + " million";
    } else if (value >= 1e3) {
      return USDollar.format((value / 1e3).toFixed(2)) + " thousand";
    }
    return value.toFixed(2);
  }

  const handleInputChange = (event) => {
    let value = event.target.value;
    if (value.endsWith("k") || value.endsWith("K")) {
      value = value.slice(0, -1) * 1000; // Convert 'k' to thousand
    } else if (value.endsWith("m") || value.endsWith("M")) {
      value = value.slice(0, -1) * 1000000; // Convert 'm' to million
    } else if (value.endsWith("b") || value.endsWith("B")) {
      value = value.slice(0, -1) * 1000000000; // Convert 'b' to billion
    } else if (value.endsWith("t") || value.endsWith("T")) {
      value = value.slice(0, -1) * 1000000000000; // Convert 't' to trillion
    }
    setFromAmount(value);
    setFromAmountString(event.target.value);
  };

  const USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const IndianRupee = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  });

  const currencyFormatter = (currency, value) => {
    return new Intl.NumberFormat(`en-${currency === "INR" ? "IN" : "US"}`, {
      style: "currency",
      currency: currencies.includes(currency) ? currency : "USD",
    }).format(value);
  };

  // get the currency symbol based on the currency code for the given currency

  const AutoComplete1 = ({ list, onChange, value }) => {
    return (
      <>
        <input
          list={list}
          placeholder="select"
          className="select-opts"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
          }}
        />
        <datalist id={list}>
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </datalist>
      </>
    );
  };

  const AutoComplete = ({ list, onChange, value }) => {
    return (
      <>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="select-opts"
          id={list}
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </>
    );
  };

  const Loader = () => <div className="loader"></div>;

  return (
    <div className="main">
      <h1>Currency Converter</h1>

      <div className="options">
        <input
          type="text"
          value={fromAmountString}
          onChange={handleInputChange}
          placeholder="Enter amount to convert"
        />
        <AutoComplete
          list="from-currencies"
          onChange={setFromCurrency}
          value={fromCurrency}
        />
        <AutoComplete
          list="to-currencies"
          onChange={setToCurrency}
          value={toCurrency}
        />
      </div>
      <h2>
        {currencyFormatter(fromCurrency, fromAmount)} ={" "}
        {loading ? (
          <Loader />
        ) : (
          <>
            {currencyFormatter(toCurrency, exchangeRate * fromAmount)}
          </>
        )}
      </h2>

      <div className="fixed-values">
        <h4>Value in USD: </h4>
        <div>
          {loading ? (
            <Loader />
          ) : (
            <p>
              {currencyFormatter(fromCurrency, fromAmount)} ={" "}
              {formatUSD(fromAmount * valueUSD)} USD
            </p>
          )}
        </div>
      </div>
      <div className="fixed-values">
        <h4>Value in INR: </h4>
        <div>
          {loading ? (
            <Loader />
          ) : (
            <p>
              {currencyFormatter(fromCurrency, fromAmount)} ={" "}
              {formatINR(fromAmount * valueINR)} INR
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
