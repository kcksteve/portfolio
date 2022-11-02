import { useState } from 'react';
import './App.css';
import StartButtonGroup from './components/StartButtonGroup';
import PixiDiv from './Pixi/PixiDiv';

function App() {
  const [startAnimLink, setStartAnimLink] = useState(() => () => {console.log('testing')});
  const [playSfx, setPlaySfx] = useState(true);
  const [showSite, setShowSite] = useState(false);
  const [showLaunchBtn, setShowLaunchBtn] = useState(false);

  return (
    <div className="App">
      <PixiDiv
        startAnim={startAnimLink}
        setStartAnim={setStartAnimLink}
        playSfx={playSfx}
        setShowSite={setShowSite}
        setShowLaunch={setShowLaunchBtn}
      />
      {showLaunchBtn &&
        <StartButtonGroup
          startAnim={startAnimLink}
          playSfx={playSfx}
          setPlaySfx={setPlaySfx}
          setShowLaunchBtn={setShowLaunchBtn}
        />
      }

    </div>
  );
}

export default App;
