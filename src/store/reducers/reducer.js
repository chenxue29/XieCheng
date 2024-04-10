const reducer = (state={login: 'offlogin', name: '', userID: 0}, action) => {
    switch(action.type){
        case 'LOGIN':
            return {
                login: action.login,
                name: action.name,
                userID: action.userID,
            }
        default:
            return state
    }
  };

  export default reducer
