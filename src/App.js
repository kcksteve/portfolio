import { useState } from 'react';
import './App.css';
import StartButton from './components/StartButton';
import PixiDiv from './Pixi/PixiDiv';

function App() {
  let [startAnimLink, setStartAnimLink] = useState(() => () => {console.log('testing')});

  return (
    <div className="App">
      <PixiDiv startAnim={startAnimLink} setStartAnim={setStartAnimLink}/>
      <StartButton startAnim={startAnimLink}/>
    </div>
  );
}

export default App;
