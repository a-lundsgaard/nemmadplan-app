const counterReducer2 = (state = 0, action) => {
    switch(action.type){
        case 'INCREMENT': return state +1
        case 'DECREMENT': return state -1
    }
    return state
}

export default counterReducer2