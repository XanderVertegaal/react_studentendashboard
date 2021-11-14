const initialState = 'curriculum'

interface SortMethodAction {
    type: string;
    payload: string
}


const setSortMethod = (state: string = initialState, action: SortMethodAction) => {
    let newState: string;
    switch (action.type) {
        case "SET_SORT_CURRICULUM":
        case "SET_SORT_DIFFICULTY":
        case "SET_SORT_FUN":
            newState = action.payload
            break
        default:
            return state;
    }
    return newState
}

export default setSortMethod