import EvaluationChart from "./EvaluationChart"
import InputForm from "./InputForm"
import { useAppSelector } from "../app/hooks"
import AggregateTable from "./AggregateTable"

const Home = () => {

    const studentData = useAppSelector((state) => state.dataSet)
    const sortingMethod = useAppSelector((state) => state.sortMethod)
    const filterMethod = useAppSelector((state) => state.filters)

    return (
        <>
            <InputForm 
                studentData={studentData}
                filterMethod={filterMethod}
            />
            <EvaluationChart 
                studentData={studentData}
                sortingMethod={sortingMethod}
                filterMethod={filterMethod}
            />
            <AggregateTable 
                studentData={studentData}
                filterMethod={filterMethod}
            />
        </>
    )
}

export default Home