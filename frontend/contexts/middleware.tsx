import { Navigate } from "react-router-dom";
import { UserAuth } from "./authContext"

export default function ProtectedRoute({children}:any){
    const userContext = UserAuth();
    const user = userContext.user
    console.log(user);
    if(Object.keys(user).length===0){
        return <Navigate to="/"/>
    }
    return children;
}