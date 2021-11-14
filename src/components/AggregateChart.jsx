import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryGroup, VictoryLabel} from 'victory'
import { getChartData, sortData } from '../utils'
import { useAppSelector } from '../app/hooks'

const AggregateChart = () => {

    const studentData = useAppSelector((state) => state.dataSet)
    const sortingMethod = useAppSelector((state) => state.sortMethod)
    const unsortedData = getChartData(studentData)

    const chartData = sortData(unsortedData, sortingMethod)

/*
    Target chartData
    [
        {id: 1, exercise: 'SCRUM', diffScore: 1.9, funScore: 2},
        {id: 2, exercise: 'W1D1-1', diffScore: 3.1, funScore: 3},
        {id: 3, exercise: 'W1D1-2', diffScore: 2, funScore: 3}
        ... 
    ]
*/

    return (
        <section className="aggregate-chart" style={{display: "flex", flexWrap: "wrap"}}>
            <h4>Chart goes here</h4>
            <VictoryChart 
                singleQuadrantDomainPadding={{x: false}}
                height={200}
                theme={VictoryTheme.material} 
                domainPadding={{'x': [5, 5]}}
            >
                <VictoryAxis    // x axis
                    style={
                        {
                            tickLabels: {
                                angle: 75,
                                fontSize: 5,
                                textAnchor: 'start',
                                
                            }
                        }
                    }
                    tickLabelComponent={<VictoryLabel dx={-10} dy={-4}/>}
                />
                <VictoryAxis    // y axis
                    dependentAxis
                    tickValues={[1,2,3,4,5]}
                    style={
                        {
                            axisLabel: {padding: 30},
                            tickLabels: {
                                fontSize: 5
                            }
                        }
                    }
                />
                <VictoryGroup 
                    offset={2} 
                    colorScale={"qualitative"}
                >
                <VictoryBar
                    barWidth={2}
                    style={
                        {data: {
                            fill: 'red'
                        }}
                    }
                    // data={[
                    //     {id: 1, exercise: 'SCRUM', diffScore: 1.9, funScore: 2},
                    //     {id: 2, exercise: 'W1D1-1', diffScore: 3.1, funScore: 3},
                    //     {id: 3, exercise: 'W1D1-2', diffScore: 2, funScore: 3}
                    // ]}
                    data={chartData}
                    x="exercise"
                    y="diffScore"
                    // tickFormat={exerciseNames}
                />

                <VictoryBar
                    barWidth={2}
                    data={chartData}
                    // data={[
                    //     {id: 1, exercise: 'SCRUM', diffScore: 1.9, funScore: 2},
                    //     {id: 2, exercise: 'W1D1-1', diffScore: 3.1, funScore: 3},
                    //     {id: 3, exercise: 'W1D1-2', diffScore: 2, funScore: 3}
                    // ]}
                    x="exercise"
                    y="funScore"
                />
                </VictoryGroup>
            </VictoryChart>
        </section>
    )
}

export default AggregateChart