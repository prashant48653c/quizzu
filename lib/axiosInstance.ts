import useAuthStore from '@/store/useAuthStore';
import axios from 'axios'

const axiosInstance=axios.create({
    baseURL:process.env.NEXT_PUBLIC_API_BASE_URL,
    withCredentials:true,
    timeout:10000,
    headers:{
        "Content-Type":"application/json",
      
    }
})

axiosInstance.interceptors.request.use((config)=>{
     const token = useAuthStore.getState().token;;
    if (config.url && !config.url.includes('/register') && token) {
        config.headers['Authorization'] = token;
      }
    return config;      
})


export default axiosInstance