import axios from "axios";

export const api = axios.create({
    // baseURL: " http://localhost/api/v1/" # com docker
    baseURL: " http://localhost:8000/api/v1/"

});
