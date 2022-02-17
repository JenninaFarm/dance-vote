import { Routes, Route } from 'react-router-dom';

import './Styles.scss';

import Frontpage from './components/pages/frontpage/Frontpage';
import NewPoll from './components/pages/create-poll/NewPoll';
import Voting from './components/pages/voting/Voting';
import Registeration from './components/pages/registeration/Registeration';
import Login from './components/pages/login/Login';



const App = () => {

  return (
    <div className='dance-vote'>
      <Routes>
        <Route path='/' element={<Frontpage />} />
        <Route path='/register' element={<Registeration />} />
        <Route path='/login' element={<Login />} />
        <Route path='/new-poll' element={<NewPoll />} />
        <Route path='/vote' element={<Voting />} />
      </Routes>
    </div>
  );
}

export default App;
