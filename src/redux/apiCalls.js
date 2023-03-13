import { getConversionRate } from "../api/convert";
import { setConversionRate, setFromCurrency, setToCurrency } from "./currencyReducer";

export const convert = async (dispatch, fromCurrency, toCurrency) => {
  try {
    const response = await getConversionRate(fromCurrency, toCurrency);

    dispatch(setFromCurrency(fromCurrency));
    dispatch(setToCurrency(toCurrency));
    dispatch(setConversionRate(response.info.rate));
  } catch (error) {
    console.log(error)
  }
}