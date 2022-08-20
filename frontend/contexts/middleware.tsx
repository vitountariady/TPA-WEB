import { Navigate } from "react-router-dom";
import { UserAuth } from "./authContext"

export function ProtectedRoute({children}:any){
    const userContext = UserAuth();
    const user = userContext.user
    if(Object.keys(user).length===0){
        return <Navigate to="/"/>
    }
    return children;
}

export function UnprotectedRoute({children}:any){
    const userContext = UserAuth();
    const user = userContext.user
    if(Object.keys(user).length!==0){
        return <Navigate to="/home"/>
    }
    return children;
}