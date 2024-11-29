export function createArray(length: number) {
  return new Array(length)
    .fill(0)
    .map((_, index) => index + 1);
}