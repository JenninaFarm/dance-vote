import { Routes, Route } from 'react-router-dom';

import './Styles.scss';

import Frontpage from './components/pages/frontpage/Frontpage';
import NewPoll from './components/pages/create-poll/NewPoll';
import Voting from './components/pages/voting/Voting';
import { useEffect, useState } from 'react';

const App = () => {
  const [data, setData] = useState();

  useEffect(() => {
    fetch("/api")
    .then((res) => res.json())
    .then((data) => setData(data.message));
  }, []);

  return (
    <div className='dance-vote'>
      <p>{!data ? "Loading..." : data}</p>
      <Routes>
        <Route path='/' element={<Frontpage />} />
        <Route path='/new-poll' element={<NewPoll />} />
        <Route path='/vote' element={<Voting />} />
      </Routes>
    </div>
  );
}

export default App;
