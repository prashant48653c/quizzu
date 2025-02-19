

export type RegisterResponse = {
    _id: string;
    fullname: string;
    email: string;
    avatar: string;
    score: number[];
    role: string; 
    createdAt: string;  
    updatedAt: string;   
    __v: number;
    accessToken: string;
    refreshToken: string;
  };

export interface UserType{
    _id: string;
    fullname: string;
    email: string;
    avatar: string; 
    score: number[];
    role: string; 
}
 