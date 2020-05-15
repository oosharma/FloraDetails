// Refactor this function.

export function modifyResult(result) {
  for (let item of result) {
    for (let key in item) {
      item[key] = item[key].replace(/;/g, ", ");
    }
  }
  let keys = [];

  return result;
}
