import { useParams } from "react-router"

const StudentPage = () => {
    let myParams = useParams()



    return (
        <article className='student-page'>
            <h2>Personal page of {myParams.studentname}</h2>
        </article>
    )
}

export default StudentPage