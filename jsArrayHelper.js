// noinspection JSAnnotator
export const getUniqueValues = (array, key) => {
  const result = new Set();
  array.forEach(item => {
    if (item.hasOwnProperty(key)) {
      result.add(item[key]);
    }
  });
  const res = Array.from(result);
  return res;
};


export const SetSearch = (set, objectProperty, value) => {
  // sample {{name:ali , code:100} {name:mojtaba , code:200}}
  // Set_Search(set , 'name' , 'mojtaba')
  let res = null;
  if(set !== null && set !== undefined)
    set.forEach(item => {
      if (item[objectProperty] === value) {
        res = item;
      }
    });
  return res;
};

export const SetSearchAsArray = (set, objectProperty, value) => {
  // sample {{name:ali , code:100} {name:mojtaba , code:200}}
  // Set_Search(set , 'name' , 'mojtaba')
  const result = new Set();
  set.forEach(item => {
    if (item[objectProperty] === value) {
      result.add(item);
    }
  });
  const res = Array.from(result);
  return res;
};



export const SaveByteArray = (byteArray, fileName) => {
  var blob = new Blob([byteArray]);
  var link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  var fullfileName = fileName ;
  link.download = fullfileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};


export const Array2Hash = (list) => {
  const hash= {};
  list.forEach(item => {
    hash[item.NAME] = item.TITLE;
  });
  return hash;
}

export const Array2HashObject = (list, keyColName) => {
  const hash= {};
  list.forEach(item => {
    hash[item[keyColName]] = item;
  });
  return hash;
}

export const GetDupplicateValue = (list, keyColName) => {
  let results = [];
  let sorted_arr = [];
  //sorted_arr = list.slice().sort();
  for (let i = 0; i < sorted_arr.length - 1; i++) {
    if (sorted_arr[i + 1][keyColName] === sorted_arr[i][keyColName]) {
      results.push(sorted_arr[i]);
    }
  }
  return results;
}

export const GetMinusList = (list1, List2, keyColName) => {
  let results = [];
  let sorted_arr = [];
  //sorted_arr = list2.slice().sort();
  list1.forEach(item =>{
    if(List2.find(x => x[keyColName] === item[keyColName]) === undefined)
      results.push(item);
  });
  return results;
}
