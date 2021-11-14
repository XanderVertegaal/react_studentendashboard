import { Filters } from "../utils"

export const setFilter = (value: Filters) => {
    return {
        type: "SET_FILTER",
        payload: value
    }
}  