import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryGroup, VictoryLabel, VictoryVoronoiContainer} from 'victory'
import { getChartData, sortData } from '../utils'

const EvaluationChart = props => {

    const studentData = props.studentData
    const sortingMethod = props.sortingMethod
    const filterMethod = props.filterMethod

    const unsortedData = getChartData(studentData, filterMethod)
    const chartData = sortData(unsortedData, sortingMethod)

    return (
        <section className="evaluation-chart">
            <h4>Summarising table chart</h4>
            <VictoryChart 
                singleQuadrantDomainPadding={{x: false}}
                height={200}
                width={600}
                containerComponent={<VictoryVoronoiContainer
                    labels={({datum}) => {
                        return `${datum.xName}` + 
                        (filterMethod.parameters.includes('difficulty') ? `\n difficulty: ${datum.diffScore}` : '') + 
                        (filterMethod.parameters.includes('fun')
                        ? `\n fun: ${datum.funScore}` : '')
                    }}
                    />}
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
                {filterMethod.parameters.includes('difficulty') && 
                <VictoryBar
                    barWidth={2}
                    style={
                        {data: {
                            fill: 'red'
                        }}
                    }
                    data={chartData}
                    x="exercise"
                    y="diffScore"
                />
                }

                {filterMethod.parameters.includes('fun') &&
                <VictoryBar
                    barWidth={2}
                    data={chartData}
                    x="exercise"
                    y="funScore"
                />
                }
                </VictoryGroup>
            </VictoryChart>
        </section>
    )
}

export default EvaluationChart