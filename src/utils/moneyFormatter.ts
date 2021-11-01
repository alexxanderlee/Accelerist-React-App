const formatter = Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
});

const formatMoney = (value: number) => formatter.format(value);

export default formatMoney;