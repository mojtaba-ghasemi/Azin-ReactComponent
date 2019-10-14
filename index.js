import {
  Server_Excel_Url,
  Server_Main_Url,
  Server_Test_Url,
  StreamItemSep,
  StreamPartSep,
  Server_FileUpload_Url,
  Server_Controller_Url,
} from '../AppConfig';
import { SaveByteArray } from '../utils/jsArrayHelper';

export const getData = async (url, fetch) => {
  console.log(url);
  console.log(fetch);
  const data = await fetch(url);
  let response;
  if (data.status === 200) {
    response = await data.json();
    return response;
  }
  if (data.status === 404) {
  }
  if (data.status === 401) {
  }
  return data;
};

export const postData = async (fetch, serviceNm, inputObjectList) => {
  // console.log(Server_Main_Url);
  const inputStrm = getInputStrm(inputObjectList);
  console.log(serviceNm);
  console.log(inputStrm);
  const data = await fetch(Server_Main_Url, {
    method: 'POST',
    body: JSON.stringify({
      serviceName: serviceNm,
      inputStream: inputStrm,
    }),
  });


  let response;
  if (data.status === 200) {
    response = await data.json();
    return response;
  }
  if (data.status === 404) {
  }
  if (data.status === 401) {
  }
  return data;

};

export const Async_postData = async (fetch, serviceNm, inputObjectList) => {
  // console.log(Server_Main_Url);
  const inputStrm = getInputStrm(inputObjectList);
  console.log(serviceNm);
  console.log(inputStrm);
  const data = await fetch(Server_Main_Url, {
    method: 'POST',
    body: JSON.stringify({
      serviceName: serviceNm,
      inputStream: inputStrm,
    }),
  });

  let response;
  if (data.status === 200) {
    response = await data.json();
    return response;
  }
  if (data.status === 404) {
  }
  if (data.status === 401) {
  }
  return data;

};

export const postDataAndSaveExcel = async (
  fetch,
  excelFilename,
  inputObjectList,
) => {
  // console.log(Server_Main_Url);

 
  const sheets = getInputStrmAsJson('', inputObjectList);

  const data = await fetch(Server_Excel_Url, {
    method: 'POST',
    body: sheets,
  });

 

  let response;
  if (data.status === 200) {
    response = await data.arrayBuffer();
    SaveByteArray(response, excelFilename);
  }
  if (data.status === 404) {
  }
  if (data.status === 401) {
  }
  //  return data;
};

export const postData_Test = async (fetch, excelFilename, inputObjectList) => {
  // console.log(Server_Main_Url);

  const sheets = getInputStrmAsJson('', inputObjectList);
 
  console.log(sheets);

  // const tmp =
  //   '{"sheet1":{"prc_inputs":{"prm1":"ok","prm2":"ok2"},"P_DIM_BANK":100,"form_name":"DQRepGeneral_1"},"sheet2":{"prc_inputs":{"prm1":"ok1","prm2":"ok22"},"P_DIM_BANK":200,"form_name":"DQRepGeneral_2"}}';

  const data = await fetch(Server_Test_Url, {
    method: 'POST',
    body: sheets,
  });
 

  let response;
  if (data.status === 200) {
  }
  if (data.status === 404) {
  }
  if (data.status === 401) {
  }
  //  return data;
};

function getInputStrm(params) {
  let inputStrm = '';
  if (params === null || params === undefined) {
    return inputStrm;
  }

  params.forEach(item => {
    const pName = Object.getOwnPropertyNames(item)[0];
    inputStrm += pName + StreamItemSep + item[pName] + StreamPartSep;
  });

  return inputStrm;
}

function getInputStrm2(params) {
  let inputStrm = '';
  if (params === null || params === undefined) {
    return inputStrm;
  }

  params.forEach(item => {
    const pName = Object.getOwnPropertyNames(item)[0];
    const pVal = item[pName];
    if (typeof pVal !== 'object')
      inputStrm += pName + StreamItemSep + pVal + StreamPartSep;
    else
      inputStrm += pName + StreamItemSep + getInputStrm2(pVal) + StreamPartSep; // typeof = object(array)
  });

  return inputStrm;
}

function getInputStrmAsJson(name, obj) {
  let inputStrm = '';

  if (obj === null || obj === undefined) {
    return inputStrm;
  }

  if (typeof obj === 'object' && !Array.isArray(obj)) {
    // val is object not array

    if (name === null || name === undefined || name.length === 0)
      inputStrm = `{`;
    else inputStrm = `"${name}":{`;

    let tmp = '';
    Object.getOwnPropertyNames(obj).forEach(subName => {
      tmp += `,${getInputStrmAsJson(subName, obj[subName])}`;
    });
    tmp = tmp.substr(1);
    inputStrm += `${tmp}}`;
    return `${inputStrm}`;
  } else if (name === null || name === undefined || name.length === 0)
    // val is string
    return `"${obj.toString()}"`;

  return `"${name}":"${obj.toString()}"`;
}



export const postDataAsFormData = async (fetch, serviceNm, inputObjectList) => {

  const inputStrm = getOldInputStrm(inputObjectList);

  const formData = new FormData();
  formData.append('serviceName', serviceNm);
  formData.append('inputstream', inputStrm);

  const data = await fetch(Server_Main_Url, {
    method: 'POST',
    body: formData,
  });

  let response;
  if (data.status === 200) {
    //const jsonOK = data.replace("\",}" , "\"}");

    response = await data.json();
    return response;
  }
  if (data.status === 404) {
  }
  if (data.status === 401) {
  }
  return data;

};
function getOldInputStrm(params) {
  let inputStrm = '';
  if (params === null || params === undefined) {
    return inputStrm;
  }

  params.forEach(item => {
    const pName = Object.getOwnPropertyNames(item)[0];
    inputStrm += pName + 'ǵxstringǵ' + item[pName] + 'Ǵ';
  });

  return inputStrm;
}

export const Call_ServerMethod = async (fetch, ServerMethodNm, fileName) => {

  //const inputStrm = getOldInputStrm(inputObjectList);
  const server_Url = Server_Controller_Url + ServerMethodNm;
  console.log('eeeeeeeeeeeeeeeeeeeeee');
  console.log(ServerMethodNm);
  console.log(server_Url);

  const formData = new FormData();
  formData.append('fileName', fileName);

  const data = await fetch(server_Url, {
    method: 'POST',
    body: formData,
  });

  let response;
  if (data.status === 200) {
    response = await data.json();
    return response;
  }
  if (data.status === 404) {
  }
  if (data.status === 401) {
  }
  return data;

};


export const uploadFile = async (fetch, file) => {

 
  console.log(file);

  var data = new FormData()
  data.append('file', file)
  data.append('subpath', 'SQLite')

  const data2 = await fetch(Server_FileUpload_Url, {
    method: 'POST',
    body: data ,

  })


  let response;
  if (data.status === 200) {
    //const jsonOK = data.replace("\",}" , "\"}");

    response = await data.json();
    return response;
  }
  if (data.status === 404) {
  }
  if (data.status === 401) {
  }
  return data;

};

