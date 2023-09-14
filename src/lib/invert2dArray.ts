/**
 * Invert a 2D array
 *
 * Warning: Child arrays must be the same length (there's no check, but it will break if they aren't)
 * @param array Array to invert
 * @returns Inverted array
 */
function invert2dArray<T, C extends ArrayLike<T>>(array: ArrayLike<C>): C[] {
  const newArray = new Array(array[0].length);

  for (let i = 0; i < array[0].length; i++) {
    newArray[i] = new Array(array.length);

    for (let j = 0; j < array.length; j++) {
      newArray[i][j] = array[j][i];
    }
  }

  return newArray;
}

export default invert2dArray;
