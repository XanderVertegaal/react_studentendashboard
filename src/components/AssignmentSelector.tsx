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
    let assignmentItems = assignmentList.map(assignment => (
            <li key={`chk-${assignment}`} className="filter-list-item">
                <input 
                    type="checkbox" 
                    id={`show-assignment-${assignment}`} 
                    value={assignment}
                    onChange={filterHandler}
                    checked={currentFilters.assignments.includes(assignment)}
                />
                <FontAwesomeIcon icon={faBookOpen} className="icon"/>
                <label htmlFor={`show-assignment-${assignment}`}>{assignment}</label>
            </li>)
    )
    
    return (
        <div className="filter-list-wrapper">
            <h4>Assignments:</h4>
            {(assignmentList[0] === '' ? <h4> Loading... </h4> :
            <ul>
                {assignmentItems}
            </ul>
            )}
        </div>
    )

}

export default AssignmentSelector