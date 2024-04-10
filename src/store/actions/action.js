import LOGIN from "../constants/constant";

const userLogin = (user) => {
    
    return{
        type: LOGIN,
        login: user.login,
        name: user.name,
        userID: user.userID,
    }
}

export default userLogin