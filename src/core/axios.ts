import axios from "axios";

export const SERVER_URL = "//localhost:3100"

axios.defaults.baseURL = "//localhost:3100/api"

/** Axios с предустановленым URL */
export default axios