export const VerifyToken = async() => {
    try {
        if(localStorage.getItem("x-auth-token") && localStorage.getItem("userType")){
            // do nothing
        }else{
            window.location.replace("/");
        }
    } catch (error) {
        window.location.replace("/");
    }
}

export const VerifyAdmin = () => {
    try {
        let token = localStorage.getItem("x-auth-token");
        let userType = localStorage.getItem("userType");
        if(userType !== "0" && token){
            window.location.replace("/");
            return
        } 
    } catch (error) {
        window.location.replace("/");
        return
    }
}

export const VerifyCustomer = () => {
    try {
        let token = localStorage.getItem("x-auth-token");
        let userType = localStorage.getItem("userType");
        if(userType !== "1" && token){
            window.location.replace("/");
            return
        } 
    } catch (error) {
        window.location.replace("/");
        return
    }
}

export const VerifyDeliveryBoy = () => {
    try {
        let token = localStorage.getItem("x-auth-token");
        let userType = localStorage.getItem("userType");
        if(userType !== "2" && token){
            window.location.replace("/");
            return
        } 
    } catch (error) {
        window.location.replace("/");
        return
    }
}

export const VerifyServiceMan = () => {
    try {
        let token = localStorage.getItem("x-auth-token");
        let userType = localStorage.getItem("userType");
        if(userType !== "3" && token){
            window.location.replace("/");
            return
        } 
    } catch (error) {
        window.location.replace("/");
        return
    }
}