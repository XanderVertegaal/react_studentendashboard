import EvaluationChart from "./EvaluationChart"
import InputForm from "./InputForm"
import { useAppSelector } from "../app/hooks"

const Home = () => {

    const studentData = useAppSelector((state) => state.dataSet)
    const sortingMethod = useAppSelector((state) => state.sortMethod)
    const filterMethod = useAppSelector((state) => state.filters)

    return (
        <article className="home">
            <EvaluationChart 
                studentData={studentData}
                sortingMethod={sortingMethod}
                filterMethod={filterMethod}
            />
            <InputForm 
                studentData={studentData}
                filterMethod={filterMethod}
            />
        </article>
    )
}

export default Home