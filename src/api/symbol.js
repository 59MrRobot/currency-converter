export const getSymbols = () => (
  fetch('https://api.exchangerate.host/symbols')
    .then(response => response.json())
);