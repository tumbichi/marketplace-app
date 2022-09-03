const formatter = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

export default function formatToCurrency(value: number | bigint) {
  return formatter.format(value);
}
