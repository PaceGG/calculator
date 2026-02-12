function convertNumber(value, fromBase, toBase) {
  if (!value) return "";
  const decimal = parseInt(value, fromBase);
  if (isNaN(decimal)) return "";
  return decimal.toString(toBase).toUpperCase();
}
