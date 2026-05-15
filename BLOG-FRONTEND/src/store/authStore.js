import {create} from 'zustand'
import axios from 'axios'

export const useAuth = create((set)=>({
    currentUser : null,
    isAuthenticated : false,
    loading: false,
    error : null,
    login:async(userCredWithRole)=>{
        const {role,...userCredObj} = userCredWithRole
        try{
            set({loading:true,error:null})
            let res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/common-api/login`,userCredObj,{withCredentials:true})
            const userPayload = res.data.payload;
            const normalizedUser = {
                ...userPayload,
                profileImageUrl: userPayload.profileImageUrl || userPayload.profileImgUrl,
            };
            set({loading:false,isAuthenticated:true,currentUser:normalizedUser})
        }catch(err){
            console.log("error is", err)
            set({
                loading: false,
                error : err.response?.data?.error || "error",
                isAuthenticated: false,
                currentUser : null
            })
        }
    },
    logout:async()=>{
        try{
            set({loading:true, error:null})
            await axios.get(`${import.meta.env.VITE_API_BASE_URL}/common-api/logout`,{withCredentials:true})
            set({loading:false,isAuthenticated:false,currentUser:null})
        }catch(err){
            console.log("error is", err)
            set({
                loading: false,
                error : err.response?.data?.error || "error",
                isAuthenticated: false,
                currentUser : null
            })
        }
    },
    checkAuth: async () => {
        try {
            set({ loading: true });
            const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/common-api/check-auth`, { withCredentials: true });

            const userPayload = res.data.payload;
            const normalizedUser = {
                ...userPayload,
                profileImageUrl: userPayload.profileImageUrl || userPayload.profileImgUrl,
            };

            // ✅ FIX: actually save the user and mark authenticated
            set({
                currentUser: normalizedUser,
                isAuthenticated: true,
                loading: false,  // ✅ FIX: unblock the loading screen
            });

        } catch (err) {
            if (err.response?.status === 401) {
                set({ currentUser: null, isAuthenticated: false, loading: false });
                return;
            }
            console.error("Auth check failed:", err);
            set({ loading: false });
        }
    }
}))