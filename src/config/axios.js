import Axios from "axios";

const baseURL = "https://api-meta.eskoops.com/";
/* process.env.NODE_ENV === "production"
    ? "http://18.222.221.0:1337"
    : "http://18.222.221.0:1337"; */

const axios = Axios.create({ baseURL });

//axios.defaults.withCredentials = true;

export default axios;
