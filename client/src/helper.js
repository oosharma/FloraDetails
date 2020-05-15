// Refactor this function.

export function modifyResult(result) {
  //console.log(result);
  for (let item of result) {
    // for(let prop in result[item]){
    //   result[item] = temp.replace(/;/g, ", ");
    // }
    //console.log(item);
    for (let key in item) {
      item[key] = item[key].replace(/;/g, ", ");

      //console.log(key);
    }
    console.log(result);
  }
  let keys = [];

  return result;
}
