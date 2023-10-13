export default function toggleItemInArray(array, item) {
  if (!array.includes(item)) {
    const newArr = [...array, item];
    return newArr;
  } else {
    const newArr = array.filter((arrayItem) => arrayItem !== item);
    return newArr;
  }
}
