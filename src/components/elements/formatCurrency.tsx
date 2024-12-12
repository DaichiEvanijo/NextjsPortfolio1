const CurrencyFormatter = new Intl.NumberFormat(undefined, {
  currency:"USD",
  style:"currency"
})

export const formatCurrency = (number:number) => {
  return  CurrencyFormatter.format(number)
}

export default formatCurrency