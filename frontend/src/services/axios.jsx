import axios from 'axios'

const Api = axios.create({baseURL: "http://localhost:8080"})

Api.interceptors.request.use((req)=>{
    if(localStorage.getItem("auth")){
        req.headers.Authorization = localStorage.getItem("auth");
    }
    return req;
})

export default Api;