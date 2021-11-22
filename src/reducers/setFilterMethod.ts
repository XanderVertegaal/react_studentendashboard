import { Filters } from "../Interfaces"

const initialState: Filters = {
    students: ['Evelyn', 'Aranka', 'Floris', 'Hector', 'Martina', 'Maurits'],
    assignments: [],
    parameters: ['fun', 'difficulty']
}

interface FilterAction {
    type: string;
    payload: Filters;
}

const setFilterMethod = (state: Filters = initialState, action: FilterAction) => {
    switch (action.type) {
        case "SET_FILTER":
            return action.payload
        default:
            break
    }
    return state
}

export default setFilterMethod