import { StudentEntry, Filters, UnsortedData, scoreList } from "./Interfaces"

const getSheetData = async () => {
  try {
    const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/1BHjq5MjpuSItvVbnQcEdQt_v956-Ks1lr3f_nEFkTks/values/Blad1!A2:D561?key=${process.env.REACT_APP_API_KEY}`)

    if (!response.ok) {
      const errorMessage = `Data could not be retrieved: ${response.status}`
      throw new Error(errorMessage)
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error);
  }
}

const getPersonalData = async (studentData: any) => {
  const listOfNames = studentData.values.map((x: string[]) => x[0])
  const uniqueNames: string[] = []
  for (let name of listOfNames) {
    if (uniqueNames.includes(name) === false) uniqueNames.push(name) }
  const numberOfStudents = uniqueNames.length

  try {
    const response = await fetch(`https://randomuser.me/api/?results=${numberOfStudents}`)
    if (!response.ok) {
      const errorMessage = `Data could not be retrieved: ${response.status}`
      throw new Error(errorMessage)
    }
    const personalData = await response.json()
    return personalData.results

  } catch (error) {
      console.error(error);
  }
}

const processData = async (rawSheetData: any) => {
    
  const personalData = await getPersonalData(rawSheetData)
  
  let thisIndex: number = 0
  let dataSet: StudentEntry[] = []
  for (let entry of rawSheetData.values) {
    if (dataSet.some(x => x.firstName === entry[0]) === false) {
      dataSet.push({
        firstName: entry[0],
        lastName: personalData[thisIndex].name.last,
        gender: personalData[thisIndex].gender,
        age: personalData[thisIndex].dob.age,
        image: personalData[thisIndex].picture.large,
        email: `${entry[0].toLowerCase()}.${personalData[thisIndex].name.last.toLowerCase()}@wincacademy.nl`,
        projects: [
          {
            projectName: entry[1],
            difficultyScore: parseInt(entry[2]),
            funScore: parseInt(entry[3])
          }
        ]
      })
      thisIndex++
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

const filterStudents = (unfilteredData: StudentEntry[], filterMethod: Filters): StudentEntry[] => 
  unfilteredData.filter(x => filterMethod.students.includes(x.firstName))

  
const getChartData = (storeData: StudentEntry[], filterMethod: Filters): UnsortedData[] => {
  const filteredStudentData = filterStudents(storeData, filterMethod)
  let filteredScores: scoreList[] = []

  for (let student of filteredStudentData) {
    for (let assignment of student.projects) {
      if (filterMethod.assignments.includes(assignment.projectName) && filteredScores.some(x => x.assignmentName === assignment.projectName) === false) {
        filteredScores.push({
          assignmentName: assignment.projectName,
          diffScores: [assignment.difficultyScore],
          funScores: [assignment.funScore]
        })  
      } else if (filterMethod.assignments.includes(assignment.projectName)) {
        let existEntry = filteredScores.find(x => x.assignmentName === assignment.projectName)
        existEntry?.diffScores.push(assignment.difficultyScore)
        existEntry?.funScores.push(assignment.funScore)
      }
    }  
  }

  // Calculate average scores
  let chartData: UnsortedData[] = []
  let newId : number = 1
  for (let item of filteredScores) {
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





const getAverage = (values: number[]): number => 
  values.reduce((total, current) => total + current) / values.length


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

const setFilteredState = (currentFilters: Filters, filterType: string, filterValue: string, shouldBeAdded: boolean) => {
  let copiedFilter: Filters = {
    parameters: [...currentFilters.parameters],
    students: [...currentFilters.students],
    assignments: [...currentFilters.assignments]
  }
  if (shouldBeAdded === true) {
    copiedFilter[filterType as keyof Filters].push(filterValue)
  } else {
    copiedFilter[filterType as keyof Filters] = copiedFilter[filterType as keyof Filters].filter(item => item !== filterValue)
  }
  return copiedFilter
}

export { getSheetData, processData, getChartData, sortData, setFilteredState, filterStudents }