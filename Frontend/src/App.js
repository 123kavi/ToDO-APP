import React, { useState } from 'react';
import LoginForm from './components/pages/LoginForm';
import RegistrationForm from './components/pages/RegistrationForm';
import TaskForm from './components/pages/TaskForm';
import TaskList from './components/pages/TaskList';

function App() {
  const [token, setToken] = useState('');

  const handleLogin = (token) => {
    setToken(token);
  };

  return (
    <div className="App">
      {!token && (
        <>
          <LoginForm onLogin={handleLogin} />
       
        </>
      )}
      {token && (
        <>
        
          <TaskList token={token} />
        </>
      )}
    </div>
  );
}

export default App;
