import React from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import BusinessCard from './components/BusinessCard';
import { getEmployeeById } from './data/employees';

const EmployeeCard: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const employee = id ? getEmployeeById(id) : null;

  // If no employee found, redirect to default employee
  if (!employee) {
    const defaultEmployee = getEmployeeById('muhammad-tahir');
    if (defaultEmployee) {
      return <BusinessCard employee={defaultEmployee} />;
    }
    // Fallback if no default employee exists
    return <div>No employee data found</div>;
  }

  return <BusinessCard employee={employee} />;
};

const DefaultCard: React.FC = () => {
  // Default to the first employee (Muhammad Tahir)
  const defaultEmployee = getEmployeeById('muhammad-tahir');
  
  if (!defaultEmployee) {
    return <div>No employee data found</div>;
  }

  return <BusinessCard employee={defaultEmployee} />;
};

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<DefaultCard />} />
          <Route path="/:id" element={<EmployeeCard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;