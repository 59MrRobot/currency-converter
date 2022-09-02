import React, { useCallback, useEffect, useState } from 'react';
import { getConversionRate } from './api/convert';
import { getSymbols } from './api/symbol';
import './App.scss';

const App: React.FC = () => {
  const [symbols, setSymbols] = useState<Symbol[]>([]);
  const [fromCurrencySymbol, setFromCurrencySymbol] = useState('USD');
  const [fromCurrencyAmount, setFromCurrencyAmount] = useState('1');
  const [toCurrencySymbol, setToCurrencySymbol] = useState('ZAR');
  const [toCurrencyAmount, setToCurrencyAmount] = useState('');
  const [conversionRate, setConversionRate] = useState<number>();

  const loadSymbols = async () => {
    const loadedSymbols = await getSymbols();

    setSymbols(Object.values(loadedSymbols.symbols));
  }

  useEffect(() => {
    loadSymbols();
  }, []);

  const loadConversionRate = useCallback(
    async () => {
      const loadedRate = await getConversionRate(fromCurrencySymbol, toCurrencySymbol);

      setConversionRate(loadedRate.info.rate);
    }, [fromCurrencySymbol, toCurrencySymbol]);

  useEffect(() => {
    loadConversionRate();
  }, [loadConversionRate]);
  

  useEffect(() => {
    if (conversionRate) {
      setToCurrencyAmount(String(+fromCurrencyAmount * conversionRate));
    }
  }, [conversionRate, fromCurrencyAmount]);

  return (
    <div className="app">
      <div className="app__wrapper">
        <h1 className="app__title">Conversion Currency</h1>

        <div className="currency">
          <h2>From</h2>

          <div className="currency__controls">
            <input
              type="text"
              id="first-currency"
              className="currency__input"
              value={(Number.isNaN(+fromCurrencyAmount)) 
                ? (fromCurrencyAmount) 
                : (Math.round(+fromCurrencyAmount! * 100) / 100)
              }
              onChange={(event) => {
                setFromCurrencyAmount(event.target.value);
              }}
            />

            <p>{fromCurrencySymbol}</p>

            <select
              className="currency__select"
              value={fromCurrencySymbol}
              onChange={(event) => setFromCurrencySymbol(event.target.value)}
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
        </div>

        <div className="currency">
          <h2>To</h2>

          <div className="currency__controls">
            <input
              type="text"
              id="first-currency"
              className="currency__input"
              value={(Number.isNaN(+toCurrencyAmount)) 
                ? ('') 
                : (Math.round(+toCurrencyAmount! * 100) / 100)
              }
              onChange={(event) => {
                setToCurrencyAmount(event.target.value);

                if (!Number.isNaN(+event.target.value)) {
                  setFromCurrencyAmount(String(+event.target.value / conversionRate!));
                }
              }}
            />

            <p>{toCurrencySymbol}</p>

            <select
              className="currency__select"
              value={toCurrencySymbol}
              onChange={(event) => setToCurrencySymbol(event.target.value)}
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
        </div>
      </div>
    </div>
  );
}

export default App;
