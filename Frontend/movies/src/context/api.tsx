import axios from "axios";

export const api = axios.create({
    baseURL: " http://localhost/api/v1/"

});
