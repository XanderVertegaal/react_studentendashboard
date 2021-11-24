export interface StudentEntry {
    firstName: string;
    lastName: string;
    gender: string;
    age: number;
    image: string;
    email: string;
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

  export interface UnsortedData {
    id: number;
    exercise: string;
    diffScore: number;
    funScore: number;
  }

  export interface scoreList {
      assignmentName: string; 
      diffScores: number[], 
      funScores: number[]
  }