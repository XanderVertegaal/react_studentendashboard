import { StudentEntry } from "../utils"

export const setData = (value: StudentEntry[]) => {
  return {
    type: "SET_DATA",
    payload: value
  }  
}