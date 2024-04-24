import { useEffect, useState } from "react";
import { currency_data } from "./country_data";

const CountryChart = () => {
  const [data, setData] = useState();
  const [filteredData, setFilteredData] = useState(Object.keys(currency_data));
  const [search, setSearch] = useState("");

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
      <h2 style={{
        marginTop: "1rem",
      
      }}>Country Chart</h2>
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
              <tr key={country}>
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
