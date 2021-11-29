import React from 'react'
import { Filters, StudentEntry } from '../Interfaces'
import { filterStudents } from '../utils'

type Props = {
    studentData: StudentEntry[];
    filterMethod: Filters
}

const AggregateTable: React.FC<Props> = ({studentData, filterMethod}) => {

    // Make sure we make a deep copy of the current state before we modify it.
    const deepCopy = []
    for (let studentEntry of studentData) {
        let copiedProjects = [...studentEntry.projects]
        deepCopy.push({...studentEntry, projects: copiedProjects})
    }

    // Take only the selected students
    const filteredData = filterStudents(deepCopy, filterMethod)

    // Take only selected assignments
    for (let student of filteredData) {
        student.projects = student.projects.filter(x => filterMethod.assignments.includes(x.projectName))
    }

    // Set up names and assignments for the table header column/row.
    // We need to wait for the data to be fetched
    const nameList = filteredData.map(x => x.firstName)
    let assignmentList: string[] = []
    if (filteredData[0] === undefined) {
        assignmentList = studentData[0].projects.map(x => x.projectName)
    } else {
        assignmentList = filteredData[0].projects.map(x => x.projectName)
    }

    const tableHeaders = nameList.map(x => <th key={`${x}-header`} colSpan={2}>{x}</th>)
    let secondRow = []
    for (let i=0; i < nameList.length; i++) {
        secondRow.push(
            <React.Fragment key={`${i}-wrapper`}>
                <th key={`${i}-diff`}>Diff</th>
                <th key={`${i}-fun`}>Fun</th>
            </React.Fragment>
        )
    }

    let tableRows = []
    let indivScores: JSX.Element[] = []

    for (let assignment of assignmentList) {
        indivScores = filteredData.map(student => (
        <React.Fragment key={`${student.firstName}-${assignment}-wrapper`}>
            <td key={`${student.firstName}-${assignment}-diffScore`}>{student.projects[assignmentList.indexOf(assignment)].difficultyScore}</td>
            <td key={`${student.firstName}-${assignment}-funScore`}>{student.projects[assignmentList.indexOf(assignment)].funScore}</td>
        </React.Fragment>
        ))
        tableRows.push(
            <tr key={`row-${assignment}`}>
                <td key={`header-${assignment}`}>{assignment}</td>
                {indivScores}
            </tr>
        )
        }

    return (
        <section className="table-section">
            <h4 className="table-header">Aggregated evaluation scores</h4>
            <table className="aggregate-table">
                <thead>
                    <tr key="first-header-row">
                        <th key='assignments-header'>Assignments</th>
                        {tableHeaders}
                    </tr>
                    <tr key="second-header-row">
                        <th></th>
                        {secondRow}
                    </tr>
                </thead>
                <tbody>
                    {tableRows}
                </tbody>
            </table>
        </section>
    )
}

export default AggregateTable