import { faBookOpen } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ChangeEvent } from "react"
import { Filters } from '../Interfaces'

type Props = {
    assignmentList: string[];
    filterHandler: (event: ChangeEvent<HTMLInputElement>) => void;
    currentFilters: Filters;
}

const AssignmentSelector: React.FC<Props> = ({assignmentList, filterHandler, currentFilters}) => {

    let assignmentItems = assignmentList.map((assignment: any) => {
        return (
            <li key={`chk-${assignment}`} >
                <input 
                    type="checkbox" 
                    id={`show-assignment-${assignment}`} 
                    // key={`chk-${assignment}`} 
                    value={assignment}
                    onChange={filterHandler}
                    checked={currentFilters.assignments.includes(assignment)}
                />
                <FontAwesomeIcon icon={faBookOpen} />
                <label htmlFor={`show-assignment-${assignment}`}>{assignment}</label>
            </li>)
    })
    
    return (
        <>
            <h4>Assignments:</h4>
            <ul>
                {assignmentItems}
            </ul>
        </>
    )

}

export default AssignmentSelector