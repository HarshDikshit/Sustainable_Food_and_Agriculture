export const LOGIN ='LOGIN'

const initialState = {
    authStatus: false,
  };
  
  const authReducer = (state = initialState, action) => {
   switch(action.type){
    case LOGIN:
        return{
            ...state,
            authStatus: true
        };
        default:
            return state;
   };
   
  };
  
  export default authReducer;