const AssignmentSelector = (props: any) => {
    
    let assignmentItems = props.assignmentList.map((assignment: any) => {
        return (
            <li key={`chk-${assignment}`} >
                <input type="checkbox" id={`chk-${assignment}`} key={`chk-${assignment}`} value={assignment}/>
                <label htmlFor={`chk-${assignment}`}>{assignment}</label>
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