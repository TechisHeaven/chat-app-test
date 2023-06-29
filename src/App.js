
import './App.css';
// import { Button } from '@chakra-ui/react'
import {  Route , Routes } from 'react-router-dom';
import Homepage from './Pages/HomePage';
import ChatPage from './Pages/ChatPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/chats" element={<ChatPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
