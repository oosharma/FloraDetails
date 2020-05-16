// Refactor this function.

export function modifyResult(result) {
  for (let item of result) {
    for (let key in item) {
      item[key] = item[key].replace(/;/g, ", ");

      let modKey = key.split("_");
      for (let i = 1; i < modKey.length; i++) {
        modKey[i] = modKey[i].charAt(0).toUpperCase() + modKey[i].slice(1);
        // console.log(modKey[i]);
      }
      let modKeyString = modKey.join("");
      item[modKeyString] = item[key];

      // console.log(modKeyString);
    }
  }
  console.log("result is: ");
  console.log("result is: ");
  console.log(result);
  return result;
}
