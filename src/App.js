import React from 'react'; 
import { Route, Routes } from 'react-router-dom'; 
import Home from './pages/Home'; 
import ChatOptionsPage from './pages/ChatOptionsPage'; 
import OpenChat from './pages/OpenChat'; 
import YearBasedChat from './pages/YearBasedChat'; 
import YearChat from './pages/YearChat'; 
import ProtectedRoute from './components/ProtectedRoute';

function App() { 
  return ( 
    <div className="App"> 
      <main> 
        <Routes> 
      
          <Route path="/" element={<Home />} /> 
          <Route path="/chat-options" element={<ProtectedRoute><ChatOptionsPage /></ProtectedRoute>} /> 
          <Route path="/open-chat" element={<ProtectedRoute><OpenChat /></ProtectedRoute>} /> 
          <Route path="/year-based" element={<ProtectedRoute><YearBasedChat /></ProtectedRoute>} /> 
          <Route path="/chat-room/:year" element={<ProtectedRoute><YearChat /></ProtectedRoute>} /> 
        </Routes> 
      </main> 
    </div> 
  ); 
}

export default App;
