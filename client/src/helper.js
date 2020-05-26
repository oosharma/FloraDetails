// Refactor this function.

export function modifyResult(result) {
  for (let item of result) {
    for (let key in item) {
      item[key] = item[key].replace(/;/g, ", ");
      item[key] = item[key].charAt(0).toUpperCase() + item[key].slice(1);
      let modKey = key.split("_");
      for (let i = 1; i < modKey.length; i++) {
        modKey[i] = modKey[i].charAt(0).toUpperCase() + modKey[i].slice(1);
        modKey[i] = modKey[i].replace(/\s/g, "");
      }
      let modKeyString = modKey.join("");
      item[modKeyString] = item[key];
    }
  }
  return result;
}

export function filterArr(arr) {
  const seen = new Set();
  const filteredArr = arr.filter(el => {
    const duplicate = seen.has(el.common_name);
    seen.add(el.common_name);
    return !duplicate;
  });
  return filteredArr;
}

function rank(size) {
  let rank;
  switch (size) {
    case "<1ft":
      rank = 1;
      break;
    case ">1ft":
      rank = 1.5;
    case "1-3ft":
      rank = 2;
      break;
    case "4-6ft":
      rank = 3;
      break;
    case "7-12ft":
      rank = 4;
      break;
    case "13-24ft":
      rank = 5;
      break;
    case ">24ft":
      rank = 6;
      break;
    case "Varies":
      rank = 7;
      break;
    case "FullGrownTree":
      rank = 8;
      break;
    default:
      rank = 7;
      break;
  }
  return rank;
}

export function sortByAttAndOrder(sortColumn, sortDirection) {
  let att = " ";
  switch (sortColumn) {
    case "Name":
      att = "commonName";
      break;
    case "Bloom Time":
      att = "bloomTime";
      break;
    case "Plant Type":
      att = "plantType";
      break;
    case "Water Needs":
      att = "waterNeeds";
      break;
    case "Size at Maturity":
      att = "sizeAtMaturity";
      break;
    case "Suitable Site Conditions":
      att = "suitableSiteConditions";
      break;
    case "Appropriate Location":
      att = "appropriateLocation";
      break;
    default:
      break;
  }
  return function(a, b) {
    if (att === "sizeAtMaturity") {
      let first = String(a[att]).replace(/'|\s/g, "");
      let second = String(b[att]).replace(/'|\s/g, "");
      let firstNumber = rank(first);
      let secondNumber = rank(second);
      if (sortDirection === "ascending") {
        if (firstNumber > secondNumber) {
          return 1;
        } else if (firstNumber < secondNumber) {
          return -1;
        }
        return 0;
      } else {
        if (firstNumber > secondNumber) {
          return -1;
        } else if (firstNumber < secondNumber) {
          return 1;
        }
        return 0;
      }
    }

    let first = String(a[att])
      .toUpperCase()
      .replace(/'|\s/g, "");
    let second = String(b[att])
      .toUpperCase()
      .replace(/'|\s/g, "");
    if (sortDirection === "ascending") {
      console.log("a[att]: " + a[att]);
      console.log("b[att]: " + b[att]);

      if (first > second) {
        return 1;
      } else if (first < second) {
        return -1;
      }
      return 0;
    } else {
      if (first > second) {
        return -1;
      } else if (first < second) {
        return 1;
      }
      return 0;
    }
  };
  return 0;
}
