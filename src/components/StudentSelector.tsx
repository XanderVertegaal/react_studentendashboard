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
            <li key={`chk-${name}`} className="filter-list-item" >
                <input 
                    type="checkbox" 
                    id={`show-student-${name}`} 
                    value={name}
                    onChange={filterHandler}
                    checked={currentFilters.students.includes(name)}
                /> 
                <FontAwesomeIcon icon={faUserGraduate} /> 
                <label htmlFor={`show-student-${name}`}> {name} </label>
            </li>)
    })
    
    return (
        <div className="filter-list-wrapper">
            <h4>Students:</h4>
            <ul className="input-student-list">
                {studentItems}
            </ul>
        </div>
    )

}

export default StudentSelector