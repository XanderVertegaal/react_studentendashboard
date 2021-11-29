import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryGroup, VictoryLabel, VictoryVoronoiContainer, VictoryLegend, VictoryTooltip} from 'victory'
import { getChartData, sortData } from '../utils'

const EvaluationChart = props => {

    const studentData = props.studentData
    const sortingMethod = props.sortingMethod
    const filterMethod = props.filterMethod

    const unsortedData = getChartData(studentData, filterMethod)
    const chartData = sortData(unsortedData, sortingMethod)

    return (
        <section className="evaluation-chart">
            <h4 className="chart-header">Evaluation results</h4>
            <VictoryChart 
                padding={{top: 20, bottom: 100, left: 20, right: 50}}
                singleQuadrantDomainPadding={{x: false}}
                height={200}
                width={600}
                theme={VictoryTheme.material} 
                domainPadding={{'x': [5, 5]}}
                containerComponent={
                    <VictoryVoronoiContainer
                        labelComponent={
                            <VictoryTooltip 
                                constrainToVisibleArea
                                style={{ fontSize: 10 }}
                            />}
                        labels={({datum}) => {
                            return `${datum.xName}` + 
                            (filterMethod.parameters.includes('difficulty') ? `\n difficulty: ${datum.diffScore}` : '') + 
                            (filterMethod.parameters.includes('fun') ? `\n fun: ${datum.funScore}` : '')
                        }}
                    />
                }
            >
                <VictoryLegend 
                    x={20}
                    y={0}
                    centerTitle
                    orientation="horizontal"
                    style={{title: {fontSize: 5}}}
                    data={[
                        { name: 'Fun score', symbol: { fill: 'red' }, labels: { fontSize: 8}},
                        { name: 'Difficulty score', symbol: { fill: 'green'}, labels: { fontSize: 8}}
                    ]}
                />
                <VictoryAxis    // x axis
                    style={ { tickLabels: { angle: 60, fontSize: 6, textAnchor: 'start' } } }
                    tickLabelComponent={<VictoryLabel dx={-6} dy={-8}/>}
                />
                <VictoryAxis    // y axis
                    dependentAxis
                    tickValues={[1,2,3,4,5]}
                    style={ { axisLabel: {padding: 30}, tickLabels: { fontSize: 5 } } }
                />
                <VictoryGroup 
                    offset={2} 
                    colorScale={"qualitative"}
                >
                {filterMethod.parameters.includes('difficulty') && 
                <VictoryBar
                    barWidth={2}
                    style={{data: {fill: 'red'}}}
                    data={chartData}
                    x="exercise"
                    y="diffScore"
                />
                }

                {filterMethod.parameters.includes('fun') &&
                <VictoryBar
                    barWidth={2}
                    style={{data: {fill: 'green'}}}
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