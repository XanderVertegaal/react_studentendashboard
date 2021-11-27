import { ProjectEntry } from "../Interfaces";

type Props = {
    studentScores: ProjectEntry[]
}

const StudentTable: React.FC<Props> = ({studentScores}) => {

    const studentRows = studentScores.map(entry => {
        return (
            <tr key={entry.projectName}>
                <td>{entry.projectName}</td>
                <td>{entry.difficultyScore}</td>
                <td>{entry.funScore}</td>
            </tr>
        )
    })

    return (
        <table className="student-table">
            <thead>
                <tr>
                    <th>Exercise</th>
                    <th>Difficulty</th>
                    <th>Fun</th>
                </tr>
            </thead>
            <tbody>
                {studentRows}
            </tbody>
        </table>
    )
}

export default StudentTable