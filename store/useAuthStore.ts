import {create} from 'zustand'
import Cookies from 'js-cookie'

interface AuthState{
    token: string | null;
  userId: number | null;
  role: string | null;
  isAuthenticated: boolean;
  setToken: (token: string) => void;
  setUserId: (userId: number) => void;
  setRole: (role: string) => void;
  clearAuth: () => void;
}



export const useAuthStore=create<AuthState>((set)=>({

    token:Cookies.get('token') || null,
    userId:Number(Cookies.get('_id')) || null,
    role: Cookies.get('role') || null,
    isAuthenticated: !!Cookies.get('token'),

    setToken:(token:string)=>{
      Cookies.set('token', token);
        set({ token, isAuthenticated: true });
    },
    setUserId:(userId:number)=>{
      localStorage.setItem('userId',userId.toString());
        Cookies.set('userId', userId.toString());
        set({ userId });
    },
    setRole: (role: string) => {
        Cookies.set('role', role);
        set({ role });
      },

      clearAuth: () => {
        Cookies.remove('token');
        Cookies.remove('userId');
        Cookies.remove('role');
        set({ 
          token: null, 
          userId: null, 
          role: null, 
          isAuthenticated: false 
        });
      },

}))

export default useAuthStore;