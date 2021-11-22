import { Filters } from "../Interfaces"

export const setFilter = (value: Filters) => {
    return {
        type: "SET_FILTER",
        payload: value
    }
}  