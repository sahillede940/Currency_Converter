import { useEffect, useState } from "react";
import { currency_data } from "./country_data";

const CountryChart = ({
  fromCurrency,
  toCurrency,
  setFromCurrency,
  setToCurrency,
}) => {
  const [data, setData] = useState();
  const [filteredData, setFilteredData] = useState(Object.keys(currency_data));
  const [search, setSearch] = useState("");
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    setData(Object.keys(currency_data));
  }, []);

  function searchCurrencyData(keyword) {
    const result = [];

    for (const code in currency_data) {
      const { country, currency_name } = currency_data[code];

      if (
        code.includes(keyword) ||
        country.toLowerCase().includes(keyword.toLowerCase()) ||
        currency_name.toLowerCase().includes(keyword.toLowerCase())
      ) {
        result.push(code);
      }
    }
    return result;
  }

  useEffect(() => {
    if (data) {
      setFilteredData(searchCurrencyData(search));
    }
  }, [search]);

  return (
    <div>
      <h4>
        Toggle to select the currency you want to convert from or to by clicking
        on the country code in the table.
      </h4>
      <div className="toggle-container">
        <p>From</p>
        <label class="switch">
          <input
            type="checkbox"
            value={toggle}
            onChange={() => {
              setToggle(!toggle);
            }}
          />
          <span class="slider"></span>
        </label>
        <p>To</p>
      </div>
      <h2
        style={{
          marginTop: "1rem",
        }}
      >
        Country Chart
      </h2>

      <div>
        <input
          type="text"
          placeholder="Search Country..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Country</th>
            <th>Currency</th>
          </tr>
        </thead>
        <tbody>
          {filteredData?.map((country) => {
            return (
              <tr
                key={country}
                onClick={() => {
                  toggle ? setToCurrency(country) : setFromCurrency(country);
                }}
                className="table-row"
              >
                <td>{country}</td>
                <td>{currency_data[country].country}</td>
                <td>{currency_data[country].currency_name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CountryChart;
