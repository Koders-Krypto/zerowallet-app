export function formatNumberCommas(number: number): string {
  const parts = number.toString().split(".");
  const integerPart = parts[0];
  const decimalPart = parts[1] || "";

  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return `${formattedInteger}${decimalPart ? "." + decimalPart : ""}`;
}
