import { faUserGraduate } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const StudentSelector = (props: any) => {
    
    let studentItems = props.nameList.map((name: any) => {
        return (
            <li key={`chk-${name}`} >
                
                <input type="checkbox" id={`chk-${name}`} value={name}/>
                <FontAwesomeIcon icon={faUserGraduate} />
                <label htmlFor={`chk-${name}`}>{name}</label>
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