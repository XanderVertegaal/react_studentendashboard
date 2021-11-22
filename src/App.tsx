
import { useEffect } from 'react';
import { useAppDispatch } from './app/hooks';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import StudentPage from './components/StudentPage';
import {getSheetData, processData} from './utils';
import { StudentEntry } from './Interfaces';
import { setData } from './actions/setData';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    getSheetData()
      .then(data => processData(data))
      .then((dataSet: StudentEntry[]) => dispatch(setData(dataSet)))
  })
    
    return (
      <>
        <Header />
        <Router>
        <main>
        <Sidebar />
          <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/students/:studentname" element={<StudentPage />}/>
          </Routes>
        </main>
        </Router>
      </>
    );
  }

export default App;
