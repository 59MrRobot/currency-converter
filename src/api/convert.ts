export const getConversionRate = (from: string, to: string) => (
  fetch(`https://api.exchangerate.host/convert?from=${from}&to=${to}`)
    .then(response => response.json())
);