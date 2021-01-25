const salesReducer = (state = [], action) => {

    if (action.type === 'SALES') {

        //return [...state, action.data]

        return action.data


        //state = action.data
       // if(state.length > 3) return [action.data, ...state]
        //return [...state, action.data]
    }
    return state
}

export default salesReducer;