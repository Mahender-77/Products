
export const reducer=(state,{type,payload})=>{
    switch(type){
        case "SELECTED_VAL":
            return {...state,
                value:state.value===payload?"":payload
                // status:state.status=state.value===""?state.status:!state.status
            }
        case "Filter_with_Price": 
             return{
                ...state,
                priceV:state.priceV===payload?"":payload
             }  
        case "AUTH_TRUE":
            return{
                ...state,
                auth:payload
            }     
            case "STATUS.":
            return{
                ...state,
                status:payload
            } 
            case "SETING_INPUTVALUE":
                return{
                    ...state,
                    inputValue:payload
                } 
        default:
            return state
    }
}