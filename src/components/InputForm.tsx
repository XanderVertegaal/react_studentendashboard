import StudentSelector from "./StudentSelector"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import AssignmentSelector from "./AssignmentSelector"
import { ChangeEvent } from "react"
import { setSortCurriculum, setSortDifficulty, setSortFun } from "../actions/setSortMethod"
import { setFilter } from "../actions/setFilter"
import { setFilteredState, Filters } from "../utils"

const InputForm = () => {
    const dispatch = useAppDispatch();
    const storeData = useAppSelector((state) => state.dataSet);
    const filterData = useAppSelector((state) => state.filters)

    console.log('Current filter data:', filterData)
    
    const nameList = storeData.map((x: {firstName: string}) => x.firstName) ;
    const assignmentList : string[] = storeData[0].projects.map((x: {projectName: string}) => x.projectName);

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
        const filteredState: Filters = setFilteredState(filterData, 'parameters', target.value, target.checked)
        console.log('Parameters:', filteredState.parameters)
        dispatch(setFilter(filteredState))
    } 


    return (
        <form>
            <fieldset>
                <legend>Sort by:</legend>
                <div className="radio-wrapper">
                    <input type="radio" id="sort-curriculum" name="sort" value="curriculum" onChange={sortHandler} defaultChecked></input>
                    <label htmlFor="sort-curriculum">Curriculum order</label><br/>

                    <input type="radio" id="sort-difficulty" name="sort" value="difficulty" onChange={sortHandler}></input>
                    <label htmlFor="sort-difficulty">Difficulty</label><br/>

                    <input type="radio" id="sort-fun" name="sort" value="fun" onChange={sortHandler}></input>
                    <label htmlFor="sort-fun">Fun</label><br/>
                </div>
            </fieldset>

            <fieldset>
                <legend>Show only:</legend>
                <input type="checkbox" name="fun" id="show-fun" onChange={filterHandler} value='fun' checked={filterData.parameters.includes('fun')}/>
                <label htmlFor="show-fun">Fun</label><br/>

                <input type="checkbox" name="difficulty" id="show-difficulty" onChange={filterHandler} value='difficulty' checked={filterData.parameters.includes('difficulty')} />
                <label htmlFor="show-difficulty">Difficulty</label><br/>

                <input type="range" name="score" id="show-score" />
                <label htmlFor="show-score">Score</label><br/>

                <StudentSelector nameList={nameList} />
                <AssignmentSelector assignmentList={assignmentList} />

            </fieldset>
        </form>
    )
}

export default InputForm