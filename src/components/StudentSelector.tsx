import { faUserGraduate } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ChangeEvent } from "react"
import { Filters } from "../Interfaces"

type Props = {
    nameList: string[];
    filterHandler: (event: ChangeEvent<HTMLInputElement>) => void;
    currentFilters: Filters
}

const StudentSelector: React.FC<Props> = ({nameList, filterHandler, currentFilters}) => {
    
    let studentItems = nameList.map((name: any) => {
        return (
            <li key={`chk-${name}`} >
                <input 
                    type="checkbox" 
                    id={`show-student-${name}`} 
                    value={name}
                    onChange={filterHandler}
                    checked={currentFilters.students.includes(name)}
                />
                        <FontAwesomeIcon icon={faUserGraduate} />
                <label htmlFor={`show-student-${name}`}>{name}</label>
            </li>)
    })
    
    return (
        <>
            <h4>Students:</h4>
            <ul>
                {studentItems}
            </ul>
        </>
    )

}

export default StudentSelector