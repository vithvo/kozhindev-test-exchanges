const month = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];

export const formatDate = (item: Date) => {
  const date = new Date(item);
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();

  return `${day} ${month[date.getMonth()]} ${date.getFullYear()} в ${date
    .toLocaleTimeString("ru-RU")
    .slice(0,-3)}`;
};
