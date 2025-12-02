import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000/api/v1/";

axios.defaults.withCredentials = true;

axios.interceptors.response.use(resp => resp, async error => {
    
    if(error.response.status === 401){
 
        const response = await axios.post('refresh/', {});

        if(response.status === 200){
            if(localStorage.getItem("user_token")){
                localStorage.removeItem("user_token");
            }

            localStorage.setItem("user_token", JSON.stringify(response.data["token"]))

            return axios(error.config);
        }
    }

    
    return error;
})