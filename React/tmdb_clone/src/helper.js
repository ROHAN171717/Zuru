export default function toggleItemInArray(array, item) {
  if (!array.includes(item)) {
    const newArr = [...array, item];
    return newArr;
  } else {
    const newArr = array.filter((arrayItem) => arrayItem !== item);
    return newArr;
  }
}

export function dateFormatter(dateObject) {
  let day = dateObject.getDate();
  let month = dateObject.getMonth() + 1;
  let year = dateObject.getFullYear();

  if (day < 10) {
    day = "0" + day;
  }
  if (month < 10) {
    month = "0" + month;
  }
  return `${month}/${day}/${year}`;
}

export function formateDateString(date) {
  const dateObj = new Date(date);
  const arr = dateObj.toDateString().split(" ");
  return ` ${arr[1]} ${arr[2]}, ${arr[3]}`;
}

export function handleScroller(number = 0) {
  var currentScrollPos =
    document.querySelectorAll(".trending_scroller")[number].scrollLeft;
  if (currentScrollPos > 25) {
    console.log("Inside If");
    document
      .querySelectorAll(".scroller_wrapper")
      [number].style.setProperty("--opacity", 0);
  } else if (currentScrollPos === 0) {
    document
      .querySelectorAll(".scroller_wrapper")
      [number].style.setProperty("--opacity", 1);
  }
}
