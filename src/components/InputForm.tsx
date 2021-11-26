import StudentSelector from "./StudentSelector"
import { useAppDispatch } from "../app/hooks"
import AssignmentSelector from "./AssignmentSelector"
import { ChangeEvent } from "react"
import { setSortCurriculum, setSortDifficulty, setSortFun } from "../actions/setSortMethod"
import { setFilter } from "../actions/setFilter"
import { setFilteredState } from "../utils"
import { Filters, StudentEntry } from "../Interfaces"

const InputForm = (props: any) => {
    const dispatch = useAppDispatch();
    const studentData: StudentEntry[] = props.studentData
    const filterMethod: Filters = props.filterMethod
    
    const nameList = studentData.map(x => x.firstName) ;
    const assignmentList = studentData[0].projects.map(x => x.projectName);

    const sortHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const target = event.target
        switch (target.value) {
            case 'curriculum':
                dispatch(setSortCurriculum())    
                break;
            case 'fun':
                dispatch(setSortFun())
                break
            case 'difficulty':
                dispatch(setSortDifficulty())
                break
            default:
                break;
        }   
    }

    const filterHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const target = event.target
        let filteredState: Filters = {students: [], parameters: [], assignments: []}
        if (target.id.includes('-parameter-')) {
            filteredState = setFilteredState(filterMethod, 'parameters', target.value, target.checked)
        } else if (target.id.includes('-student-')) {
            filteredState = setFilteredState(filterMethod, 'students', target.value, target.checked)
        } else if (target.id.includes('-assignment-')) {
            filteredState = setFilteredState(filterMethod, 'assignments', target.value, target.checked)
        }
        dispatch(setFilter(filteredState))
    } 

    return (
        <form className="input-form">
            <fieldset className="sorting-options">
                <legend>Sort by:</legend>
                <div className="radio-wrapper">
                    <input type="radio" id="sort-curriculum" name="sort" value="curriculum" onChange={sortHandler} defaultChecked></input>
                    <label htmlFor="sort-curriculum"> Curriculum order</label><br/>

                    <input type="radio" id="sort-difficulty" name="sort" value="difficulty" onChange={sortHandler}></input>
                    <label htmlFor="sort-difficulty"> Difficulty</label><br/>

                    <input type="radio" id="sort-fun" name="sort" value="fun" onChange={sortHandler}></input>
                    <label htmlFor="sort-fun"> Fun</label><br/>
                </div>
            </fieldset>

            <fieldset className="filter-options">
                <legend>Show only:</legend>
                <div className="filter-list-wrapper">
                <h4>Parameters:</h4>
                <ul className="filter-list">
                    <li className="filter-list-item">
                        <input 
                            type="checkbox" 
                            name="fun" 
                            id="show-parameter-fun" 
                            onChange={filterHandler} 
                            value='fun' 
                            checked={filterMethod.parameters.includes('fun')}
                        />
                        <label htmlFor="show-fun"> Fun</label>
                    </li>
                    <li className="filter-list-item">
                        <input 
                            type="checkbox"
                            name="difficulty" 
                            id="show-parameter-difficulty" 
                            onChange={filterHandler} 
                            value='difficulty' 
                            checked={filterMethod.parameters.includes('difficulty')} 
                        />
                        <label htmlFor="show-difficulty"> Difficulty</label>
                    </li>
                </ul>
                </div>

                <StudentSelector 
                    nameList={nameList} 
                    filterHandler={filterHandler}
                    currentFilters={filterMethod}
                />
                <AssignmentSelector 
                    assignmentList={assignmentList}
                    filterHandler={filterHandler}
                    currentFilters={filterMethod}
                />

            </fieldset>
        </form>
    )
}

export default InputForm