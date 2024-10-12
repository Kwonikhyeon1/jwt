import logo from './logo.svg';
import './App.css';
import Header_nav_footer from './include/Header_nav_footer';
import SignUp from './member/SignUp';
import SignIn from './member/SignIn';
import Modify from './member/Modify';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './member/Home';
import Delete from './member/Delete';
import { useState } from 'react';
import HeaderNavFooter from './include/Header_nav_footer';

function App() {

  const [token, setToken] = useState('');

  return (
    <BrowserRouter>
    <HeaderNavFooter token={token} setToken={setToken}/>

      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp token={setToken}/>} />
          <Route path='/signin' element={<SignIn token={token} setToken={setToken}/>} />
          <Route path="/modify" element={<Modify token={setToken}/>} />
          <Route path="/" element={<Delete token={setToken}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
