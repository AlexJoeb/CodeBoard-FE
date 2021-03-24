import React, { FC, ReactElement } from 'react';

import Board from '../Components/Board';
import Stats from '../Components/Stats';
import Topics from '../Components/Topics';

const Home: FC = (): ReactElement => {
  return (
    <div className='w-full'>
      <Stats />
      <Topics />
      <Board />
    </div>
  );
}

export default Home;