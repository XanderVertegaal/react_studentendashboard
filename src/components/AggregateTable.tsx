import { Filters, StudentEntry } from '../Interfaces'

type Props = {
    studentData: StudentEntry[];
    filterMethod: Filters
}

const AggregateTable: React.FC<Props> = props => {

    // Sorting takes place here.

    const assignmentList = props.studentData[0].projects.map(x => x.projectName)
    const nameList = props.studentData.map(x => x.firstName)

    const tableHeaders = nameList.map(x => <th key={`${x}-header`} colSpan={2}>{x}</th>)

    let secondRow = []
    for (let i=0; i < nameList.length; i++) {
        secondRow.push(
            <>
                <th>Diff</th>
                <th>Fun</th>
            </>
        )
    }

    let tableRows = []
    let indivScores: any[] = []
    for (let assignment of assignmentList) {
        indivScores = props.studentData.map(student => (<>
            <td key={`${student.firstName}-${assignment}-diffScore`}>{student.projects[assignmentList.indexOf(assignment)].difficultyScore}</td>
            <td key={`${student.firstName}-${assignment}-funScore`}>{student.projects[assignmentList.indexOf(assignment)].funScore}</td></>
        ))
        
        tableRows.push(
            <tr>
                <td>{assignment}</td>
                {indivScores}
            </tr>
        )
        }

    return (
    <table className="aggregate-table">
        <thead>
            <tr>
                <th key='assignments-header'>Assignments</th>
                {tableHeaders}
            </tr>
            <tr>
                <th></th>
                {secondRow}
            </tr>
        </thead>
        <tbody>
            {tableRows}
        </tbody>
    </table>
    )
}

export default AggregateTable