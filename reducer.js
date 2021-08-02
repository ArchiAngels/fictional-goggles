

const initialState = {  
    currentPage: 1,
    HowMuchFavoriteItems:  -1,
    HowMuchSelectedItems:-1,
    CurrentFormAuth:'register'
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
        default:{
            return state
        }
    }
}