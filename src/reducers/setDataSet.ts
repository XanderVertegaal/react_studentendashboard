import { StudentEntry } from "../utils";

const initialState: StudentEntry[] = 
    [
        {
            firstName: '',
            projects: [ 
                {
                projectName: '',
                difficultyScore: 0,
                funScore: 0
                }
            ]
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