

const initialState = {  
    currentPage: 1,
    HowMuchFavoriteItems:  -1,
    HowMuchSelectedItems:-1,
    CurrentFormAuth:'register',
    authForm:{
        // code 1 - true
        // code 2 - false
        // code 3 - neutral
        login:3,
        FirstName:3,
        LastName:3,
        Email:3,
        Password:3,
    }
}

export default function ReducerState(state = initialState, action ){
    switch(action.type){
        case 'Page/changeCurrentWindow':{
            return {
                ...state,
                currentPage: state.currentPage = action.idOfPage
            }
        };
        case 'Page/changeCounterlike':{
            return {
                ...state,
                HowMuchFavoriteItems: state.HowMuchFavoriteItems = action.Counter
            }
        };
        case 'Page/changeCounteraddCart':{
            return {
                ...state,
                HowMuchSelectedItems: state.HowMuchSelectedItems = action.Counter
            }
        };
        case 'Page/SwitchForm':{
            return {
                ...state,
                CurrentFormAuth: state.CurrentFormAuth = state.CurrentFormAuth == 'register'? 'login':'register'
            }
        };
        case 'Page/switchErrorAuthForm':{
            let name = action.name;
            return {
                ...state,
                authForm: {
                    ...state.authForm,
                    [name] : state.authForm[name] = action.value
                    
                }
            }
        };
        case 'Page/clearAuthForm':{
            return {
                ...state,
                authForm: state.authForm = {login:3,FirstName:3,LastName:3,Email:3,Password:3,}
            }
        };
        default:{
            return state
        }
    }
}