import axios from "axios";

//taoj instance cuar axxios voi cau hinh co ban
export const api = axios.create({
    baseURL: "https://phimapi.com/",
    // timeout: 3000,
    headers: { "Content-Type": "application/json" },
  });
  
  //do có 2 api khác nhaunene phải tạo 2 cái
  export const apiV1 = axios.create({
    baseURL: "https://phimapi.com/v1/api/",
    // timeout: 3000,
    headers: { "Content-Type": "application/json" },
  });