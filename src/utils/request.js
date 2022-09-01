import axios from "axios";
import {
  Loading
} from "quasar"
const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, 
  timeout: 8000, 
  isLoading:true,
});


request.interceptors.request.use(
  (config) => {
    
    if(config.isLoading){
      
      Loading.show()
      return config;
    }else{
      return config;
    }
    

    
  },
  (err) => {
    // 隱藏loading
    Loading.hide();
    return Promise.reject(err);
  }
);

request.interceptors.response.use(
  (res) => {
    // 隱藏loading
    Loading.hide();
    return res;
  },
  (err) => {
  
    Loading.hide();
 
    return Promise.reject(err);
  }
);

export default request; 
