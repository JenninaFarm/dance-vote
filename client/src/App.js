import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import './Styles.scss';

import Frontpage from './components/pages/frontpage/Frontpage';
import NewPoll from './components/pages/create-poll/NewPoll';
import Voting from './components/pages/voting/Voting';
import Registeration from './components/pages/registeration/Registeration';
import Login from './components/pages/login/Login';
import Profile from './components/pages/profile/Profile';



const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({username: '', id: ''})
  const navigate = useNavigate();

  const login = (loggedUser) => {
    setIsLoggedIn(true);
    setUser({username: loggedUser.username, id: loggedUser.id});
    navigate('/profile');
  }

  return (
    <div className='dance-vote'>
      <Routes>
        <Route path='/' element={<Frontpage />} />
        <Route path='register' element={<Registeration />} />
        <Route path='login' element={<Login handleLogin={login} />} />
        <Route path='new-poll' element={isLoggedIn ? <NewPoll /> : <Navigate to='/login' /> }/>
        <Route path='profile' element={isLoggedIn ? <Profile user={user} /> : <Navigate to='/login' /> } />
        <Route path='vote' element={<Voting />} />
      </Routes>
    </div>
  );
}

export default App;
