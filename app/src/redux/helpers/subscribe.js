
export default function(cb){

    function select(state) {
        return state.searchInput
    }
      
    let currentValue
    function handleChange() {
        // alert('jei')
        let store = window.store
        let previousValue = currentValue
        currentValue = select(store.getState())
    
        if (previousValue !== currentValue) {
            cb(currentValue)
            /*console.log(
            'Some deep nested property changed from',
            previousValue,
            'to',
            currentValue
            )*/
        }
    }
    
    return store.subscribe(handleChange)

}

