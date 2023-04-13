import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSymbols } from './api/symbol';
import './App.scss';
import { convert } from './redux/apiCalls';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import SwapVertIcon from '@mui/icons-material/SwapVert';

const App: React.FC = () => {
  const conversionRate = useSelector((state: any) => state.conversionRate);
  const dispatch = useDispatch();

  const [symbols, setSymbols] = useState<Symbol[]>([]);

  const [fromCurrencyAmount, setFromCurrencyAmount] = useState('1');
  const [fromSymbol, setFromSymbol] = useState("USD");

  const [toCurrencyAmount, setToCurrencyAmount] = useState("");
  const [toSymbol, setToSymbol] = useState("ZAR");

  const isScreenSizeDesktop = window.matchMedia("(min-width: 1024px)").matches;

  const loadConverstionInformation = useCallback(
    () => {
      convert(dispatch, fromSymbol, toSymbol);
    }, [dispatch, fromSymbol, toSymbol]);

  useEffect(() => {
    loadConverstionInformation();

    setToCurrencyAmount(String(
      Math.round(Number(fromCurrencyAmount) * conversionRate * 100) / 100
    ));
  }, [conversionRate, fromCurrencyAmount, loadConverstionInformation]);

  const loadSymbols = useCallback(
    async () => {
      const loadedSymbols = await getSymbols();

      setSymbols(Object.values(loadedSymbols.symbols));
    }, []);

  useEffect(() => {
    loadSymbols();
  }, [loadSymbols]);

  const flipCurrencies = useCallback(() => {
    const tempSymbol = fromSymbol;
    setFromSymbol(toSymbol);
    setToSymbol(tempSymbol);
  }, [fromSymbol, toSymbol]);

  return (
    <div className="app">
      <div className="app__wrapper">
        <h1 className="app__title">Currency Converter</h1>

        <div className="app__container">
          <div className="currency">
            <h2>From</h2>

            <div className="currency__controls">
              <div className="currency__container">
                <img
                  src={`https://flagsapi.com/${fromSymbol.slice(0, 2)}/flat/32.png`}
                  alt={fromSymbol}
                  style={{ marginRight: "8px"}}
                />

                <p
                  style={{ letterSpacing: "2px", fontWeight: "600" }}
                >
                  {fromSymbol}
                </p>

                <select
                  className="currency__select"
                  value={fromSymbol}
                  onChange={(event) => {
                    setFromSymbol(event.target.value);
                  }}
                >
                  {symbols.map(symbol => (
                    <option
                      value={symbol.code}
                      key={symbol.code}
                    >
                      {symbol.description}
                    </option>
                  ))}
                </select>
              </div>

              <input
                type="text"
                id="first-currency"
                className="currency__input"
                value={fromCurrencyAmount}
                onChange={(event) => {
                  setFromCurrencyAmount(event.target.value);
                }}
              />
            </div>
          </div>

          <div
            className="app__flip-icon"
            onClick={() => flipCurrencies()}
          >
            {isScreenSizeDesktop
              ? (<SwapHorizIcon style={{ color: "#0CAFFF" }} />)
              : (<SwapVertIcon style={{ color: "#0CAFFF" }} />)}
          </div>

          <div className="currency currency--to">
            <h2>To</h2>

            <div className="currency__controls">
              <div className="currency__container">
                <img
                  src={`https://flagsapi.com/${toSymbol.slice(0, 2)}/flat/32.png`}
                  alt={toSymbol}
                  style={{ marginRight: "8px"}}
                />

                <p
                  style={{ letterSpacing: "2px", fontWeight: "600" }}
                >
                  {toSymbol}
                </p>

                <select
                  className="currency__select"
                  value={toSymbol}
                  onChange={(event) => {
                    setToSymbol(event.target.value);
                  }}
                >
                  {symbols.map(symbol => (
                    <option
                      value={symbol.code}
                      key={symbol.code}
                    >
                      {symbol.description}
                    </option>
                  ))}
                </select>
              </div>

              <input
                type="text"
                id="first-currency"
                className="currency__input"
                value={toCurrencyAmount}
                onChange={(event) => {
                  setFromCurrencyAmount(event.target.value);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
