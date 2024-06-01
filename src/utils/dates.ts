export function formatDate(date: Date | string): string {
  const dateObj = new Date(date);

  // Ensure the date object is valid
  if (isNaN(dateObj.getTime())) {
    throw new Error("Invalid date");
  }

  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = dateObj.toLocaleString("default", { month: "short" });
  const year = String(dateObj.getFullYear()).slice(-2); // Get the last two digits of the year

  return `${day} ${month}, ${year}`;
}
