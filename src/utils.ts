const getSheetData = async () => {
  try {
    const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/1BHjq5MjpuSItvVbnQcEdQt_v956-Ks1lr3f_nEFkTks/values/Blad1!A2:D561?key=${process.env.REACT_APP_API_KEY}`)

    if (!response.ok) {
      const errorMessage: string = `Data could not be retrieved: ${response.status}`
      throw new Error(errorMessage)
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error);
  }
}

export interface StudentEntry {
  firstName: string;
  // lastName: string;
  // age: number;
  // img: string;
  projects: [
    ProjectEntry
  ]
}

export interface ProjectEntry {
  projectName: string;
  difficultyScore: number;
  funScore: number
}
  
export interface Filters {
  students: string[];
  assignments: string[];
  parameters: string[];
}

const processData = (data: {values: []}) => {
  let dataSet: StudentEntry[] = []
  for (let entry of data.values) {
    if (dataSet.some(x => x.firstName === entry[0]) === false) {
      let newName = entry[0]
      dataSet.push({
        firstName: newName,
        projects: [
          {
            projectName: entry[1],
            difficultyScore: parseInt(entry[2]),
            funScore: parseInt(entry[3])
          }
        ]
      })
    } else {
      let existingEntry = dataSet.find(x => x.firstName === entry[0])!
      existingEntry.projects.push({
          projectName: entry[1],
          difficultyScore: parseInt(entry[2]),
          funScore: parseInt(entry[3])
      })
    }
  }
  return dataSet
}

const getChartData = (storeData: StudentEntry[]) => {

  let aggregatedScores: {
    assignmentName: string; 
    diffScores: number[], 
    funScores: number[]
  }[] = []

  for (let student of storeData) {
    for (let assignment of student.projects) {
      if (aggregatedScores.some(x => x.assignmentName === assignment.projectName) === false) {
        aggregatedScores.push({
          assignmentName: assignment.projectName,
          diffScores: [assignment.difficultyScore],
          funScores: [assignment.funScore]
        })  
      } else {
        let existEntry = aggregatedScores.find(x => x.assignmentName === assignment.projectName)
        existEntry?.diffScores.push(assignment.difficultyScore)
        existEntry?.funScores.push(assignment.funScore)
      }
    }  
  }
  let chartData: {id: number; exercise: string; diffScore: number; funScore: number}[] = []
  let newId : number = 1
  for (let item of aggregatedScores) {
    let averageDiffScore: number = getAverage(item.diffScores)
    let averageFunScore: number = getAverage(item.funScores)
    chartData.push({
      id: newId,
      exercise: item.assignmentName,
      diffScore: averageDiffScore,
      funScore: averageFunScore
    })
    newId++
  }
  return chartData
}

const getAverage = (values: number[]): number => (values.reduce((total, current) => total + current) / values.length)

interface UnsortedData {
  id: number;
  exercise: string;
  diffScore: number;
  funScore: 2
}

const sortData = (dataSet: UnsortedData[], sortingMethod: string) => {
  let sortedDataset: UnsortedData[] = []
  switch (sortingMethod) {
    case 'curriculum':
      sortedDataset = dataSet.sort((a, b) => a.id - b.id)
      break;
    case 'fun':
      sortedDataset = dataSet.sort((a, b) => a.funScore - b.funScore)
      break
    case 'difficulty':
      sortedDataset = dataSet.sort((a, b) => a.diffScore - b.diffScore)
      break
    default:
      break;
  }
  return sortedDataset
}

const setFilteredState = (currentFilters: Filters, type: string, name: string, value: boolean) => {
  let copiedFilter: Filters = {
    parameters: [...currentFilters.parameters],
    students: [...currentFilters.students],
    assignments: [...currentFilters.assignments]
  }
  if (value === true) {
    copiedFilter[type as keyof Filters].push(name)
  } else {
    copiedFilter[type as keyof Filters] = copiedFilter[type as keyof Filters].filter(item => item !== name)
  }
  return copiedFilter
}

export { getSheetData, processData, getChartData, sortData, setFilteredState }