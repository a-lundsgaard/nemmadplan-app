const searchInput = (state = '', action) => {

    if(action.type === 'INPUT') {
        state = action.data
    }
    return state
}

export default searchInput;