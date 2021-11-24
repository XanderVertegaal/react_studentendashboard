import { useParams } from "react-router"
import { useAppSelector } from "../app/hooks"
import EvaluationChart from "./EvaluationChart"
import StudentPageTable from "./StudentPageTable"

const StudentPage = () => {
    
    let myParams = useParams()
    const studentData = useAppSelector(state => state.dataSet)
    const student = studentData.find(x => x.firstName === myParams.studentname)!
    console.log('Student:', [student])

    const studentFilterMethod = {
        students: [student.firstName],
        assignments: student.projects.map(x => x.projectName),
        parameters: ['fun', 'curriculum', 'difficulty']
    }

    return (
        <article className='student-page'>
            <section className='student-card'>
                <img src={student.image} alt={`${student.firstName}${student.lastName}`} />
                <h4>{student.firstName} {student.lastName}</h4>
                <p>{student.age} years old</p>
                <p>{student.email}</p>
            </section>
            <EvaluationChart 
                studentData={studentData}
                sortingMethod='curriculum'
                filterMethod={studentFilterMethod}
            />
            <section className="student-table-section">
                <h4>Evaluation scores:</h4>
                <StudentPageTable studentScores={student.projects}/>
            </section>
        </article>
    )
}

export default StudentPage