export function truncateStr(str: string, length: number): string {
  return str.length > length ? str.substr(0, length) + "..." : str;
}
export function formatDotDate(date: Date | string) {
  if (typeof date === "string") date = new Date(date);
  return (
    date.getFullYear() +
    "." +
    String(date.getMonth() + 1).padStart(2, "0") +
    "." +
    String(date.getDate()).padStart(2, "0")
  );
}