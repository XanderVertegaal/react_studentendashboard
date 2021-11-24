import { ProjectEntry } from "../Interfaces";

type Props = {
    studentScores: ProjectEntry[]
}

const StudentTable: React.FC<Props> = ({studentScores}) => {

    console.log('Student scores:', studentScores)
    
    const studentRows = studentScores.map(entry => {
        return (
            <tr>
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