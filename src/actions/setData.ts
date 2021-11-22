import { StudentEntry } from "../Interfaces"

export const setData = (value: StudentEntry[]) => {
  return {
    type: "SET_DATA",
    payload: value
  }  
}