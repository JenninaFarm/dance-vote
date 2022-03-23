import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import './Styles.scss';

import Frontpage from './components/pages/frontpage/Frontpage';
import Voting from './components/pages/voting/Voting';
import Login from './components/pages/login/Login';
import Profile from './components/pages/profile/Profile';
import Results from './components/pages/results/Results';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({username: '', id: '', email: ''})
  const navigate = useNavigate();

  const login = (loggedUser) => {
    setIsLoggedIn(true);
    setUser(loggedUser);
    navigate('/profile');
  }

  return (
    <div className='dance-vote'>
      <Routes>
        <Route path='/' element={<Frontpage handleLogin={login}/>} />
        <Route path='login' element={<Login handleLogin={login} />} />
        <Route path='profile/*' element={isLoggedIn ? <Profile userObj={user} /> : <Navigate to='/login' /> } />
        <Route path='vote' element={<Voting />} />
        <Route path='results' element={<Results />} />
      </Routes>
    </div>
  );
}

export default App;
