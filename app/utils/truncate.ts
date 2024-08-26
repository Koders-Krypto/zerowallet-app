export default function Truncate(fullStr = "", strLen = 8, middleStr = "...") {
  if (fullStr.length <= strLen) return fullStr.toString();
  const midLen = middleStr.length;
  const charsToShow = strLen - midLen;
  const frontChars = Math.ceil(charsToShow / 2);
  const backChars = Math.floor(charsToShow / 2);
  return (
    fullStr.toString().substring(0, frontChars) +
    middleStr +
    fullStr.toString().substring(fullStr.length - backChars)
  );
}
