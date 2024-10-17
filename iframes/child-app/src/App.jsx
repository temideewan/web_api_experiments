import { useState } from 'react';

import PropTypes from 'prop-types';
function App(props) {
  let [myWord, changeMyWord] = useState('');
  return (
    <div className='pay-by-app'>
      <p>
        Hello I&apos;m a beautiful widget! My name is{' '}
        <code>{props.name || 'undefined'}</code>
      </p>
      <input value={myWord} onChange={(e) => changeMyWord(e.target.value)} />
      <button onClick={() => props.closeApp(myWord)}>
        Pass this word up to parent
      </button>
    </div>
  );
}

App.propTypes = {
  name: PropTypes.string,
  closeApp: PropTypes.func,
};

export default App;
