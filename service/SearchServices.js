import dotenv from "dotenv";
dotenv.config();
import axios from "axios";

import DataService from "./DataService";
const BACKEND_URL = "http://localhost:7076";

var SearchServices = {
  intellisearch: async function () {
    try {
      const url = `${BACKEND_URL}/api/getFiles`;
      console.log("Fetching Files from ", url);

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(
          `HTTP error! status: ${response.status} - ${response.statusText}`,
        );
      }
      const files = await response.json();
      return files;
    } catch (ex) {
      console.error(ex);
    }
  },

  getIntelliSearchResults: async function (data) {
    const response = await DataService.post("intellisearch/companies", data,);
    console.log(response);
    return response;
  },
  getFilebyId: async function () {
    const response = await DataService.get("api/v2/files${data.id}");
    console.log(response);
    return response;
  },
  updateFilebyId: async function (data) {
    const response = await DataService.post(`api/fileUpdate`, data);
    console.log(response);
    return response;
  },
  deletefileById: async function (data) {
    const response = await DataService.post(`api/agency/${data.id}`);
    console.log(response);
    return response;
  },
};
export default SearchServices;
