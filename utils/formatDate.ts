export default function formatCustomDate(inputDate: Date) {
  const day = inputDate.getDate();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthName = monthNames[inputDate.getMonth()];
  const year = inputDate.getFullYear();

  return `${day} ${monthName}. ${year}`;
}
