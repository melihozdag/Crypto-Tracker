import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [coins, setCoins] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredCoins, setFilteredCoins] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((response) => {
        setCoins(response.data);
        setFilteredCoins(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const inputHandler = (e) => {
    setSearchValue(e.target.value);
    setFilteredCoins(
      coins.filter(
        (coin) =>
          coin.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
          coin.symbol.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  const clean = () => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((response) => {
        setCoins(response.data);
        setFilteredCoins(response.data);
      })
      .catch((error) => console.error(error));
    setSearchValue("");
  };

  return (
    <div className="container">
      <h1 className="header pt-5 mb-4">Kripto Meldra</h1>
      <div className="search mb-1 d-flex align-items-center">
        <input
          className="input me-3 "
          type="text"
          value={searchValue}
          onChange={inputHandler}
          placeholder=" Ara..."
        />
        <button className="button" onClick={clean}>
          Temizle
        </button>
      </div>
      <Table className="table">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Symbol</th>
            <th>Price</th>
            <th>Change</th>
          </tr>
        </thead>
        <tbody>
          {filteredCoins.map((coin) => (
            <tr className="" key={coin.id}>
              <th scope="row">{<img width={35} src={coin.image} alt="" />}</th>
              <td>{coin.name}</td>
              <td>{coin.symbol.toUpperCase()}</td>
              <td>{coin.current_price}$</td>
              <td
                style={{
                  color: coin.price_change_percentage_24h < 0 ? "red" : "green",
                }}
              >
                {coin.price_change_percentage_24h}%
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default App;
