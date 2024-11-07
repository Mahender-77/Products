

export const reducer= (state,{type,payload})=>{
    console.log("payload",payload)
    switch(type){
      
      
        case "AUTH_TRUE":
            return{
                ...state,
                auth:payload
            }     
          
            case "SETING_INPUTVALUE":
                return{
                    ...state,
                    inputValue:payload
                } 
            case "SET_SIZE":
                return{
                    ...state,
                    count:payload
                }
            
           
        default:
            return state
    }
}