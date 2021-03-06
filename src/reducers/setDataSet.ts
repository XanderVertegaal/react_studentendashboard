import { StudentEntry } from "../Interfaces";

const initialState: StudentEntry[] = [
    {
        firstName: '',
        lastName: '',
        gender: '',
        age: 0,
        image: '',
        email: '',
        projects: [{
            projectName: '',
            difficultyScore: 0,
            funScore: 0
        }]
      }
]

interface setDataSetAction {
    type: string,
    payload: StudentEntry[]
}

const setDataSet = (state: StudentEntry[] = initialState, action: setDataSetAction) => {
    let newState = [...state]
    switch (action.type) {
        case "SET_DATA":
            newState = action.payload
            break 
        default:
            return state;
    }
    return newState
}

export default setDataSet