// Refactor this function.

export function modifyResult(result) {
  for (let item of result) {
    for (let key in item) {
      item[key] = item[key].replace(/;/g, ", ");
      item[key] = item[key].charAt(0).toUpperCase() + item[key].slice(1);
      let modKey = key.split("_");
      for (let i = 1; i < modKey.length; i++) {
        modKey[i] = modKey[i].charAt(0).toUpperCase() + modKey[i].slice(1);
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
    if (sortDirection === "ascending") {
      if (a[att] > b[att]) {
        return 1;
      } else if (a[att] < b[att]) {
        return -1;
      }
      return 0;
    } else {
      if (a[att] > b[att]) {
        return -1;
      } else if (a[att] < b[att]) {
        return 1;
      }
      return 0;
    }
  };
  return 0;
}
