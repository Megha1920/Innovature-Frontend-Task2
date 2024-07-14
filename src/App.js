import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import SignupPage from './components/SignupPage';
import LoginPage from './components/LoginPage';
import TaskPage from './components/TaskPage';
import FileHandlingPage from './components/FileHandlingPage';
import Navbar from './components/Navbar';
import './styles.css';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/tasks" element={<TaskPage />} />
          <Route path="/files" element={<FileHandlingPage />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
