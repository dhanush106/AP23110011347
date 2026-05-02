import React from 'react'
import Log from "../src/utils/logger";
import Dashboard from './pages/Dashboard';


const App = () => {

const testLogger = async () => {
  const res = await Log(
    "frontend",
    "info",
    "component",
    "Logger test from frontend"
  );

  console.log("Log response:", res);
};

testLogger();
  return (
    <div>
      <Dashboard />
    </div>
  )
}

export default App
