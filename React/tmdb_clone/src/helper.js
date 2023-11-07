export default function toggleItemInArray(array, item) {
  if (!array.includes(item)) {
    const newArr = [...array, item];
    return newArr;
  }
  const newArr = array.filter((arrayItem) => arrayItem !== item);
  return newArr;
}

export function dateFormatter(dateObject) {
  let day = dateObject.getDate();
  let month = dateObject.getMonth() + 1;
  const year = dateObject.getFullYear();

  if (day < 10) {
    day = `0${day}`;
  }
  if (month < 10) {
    month = `0${month}`;
  }
  return `${month}/${day}/${year}`;
}

export function formateDateString(date) {
  const dateObj = new Date(date);
  const arr = dateObj.toDateString().split(' ');
  return ` ${arr[1]} ${arr[2]}, ${arr[3]}`;
}
