
export default function (cb, storeProperty) {

    function select(state) {
        return state[storeProperty]
    }

    let currentValue
    function handleChange() {
        // alert('jei')
        let store = window.store
        let previousValue = currentValue
        currentValue = select(store.getState())
        //cb(currentValue); // for useState


        if (previousValue !== currentValue) {
            cb(currentValue); // for useState
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

