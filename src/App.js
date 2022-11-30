import { useEffect, useState } from 'react';
import './App.css';
import StartButtonGroup from './components/StartButtonGroup';
import MainPage from './components/MainPage';
import AboutPage from './components/AboutPage';
import ProjectsPage from './components/ProjectsPage';
import ContactPage from './components/ContactPage';
import NavBar from './components/NavBar';
import PixiDiv from './Pixi/PixiDiv';

function App() {
  const [startAnimLink, setStartAnimLink] = useState();
  const [playSfx, setPlaySfx] = useState(false);
  const [showSite, setShowSite] = useState(false);
  const [showLaunchBtn, setShowLaunchBtn] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageComponent, setPageComponent] = useState();

  useEffect(() => {
    switch(currentPage) {
      case 0:
        setPageComponent(<MainPage setCurrentPage={setCurrentPage}/>);
        break;
      case 1:
        setPageComponent(<AboutPage/>);
        break;
      case 2:
        setPageComponent(<ProjectsPage/>);
        break;
      case 3:
        setPageComponent(<ContactPage/>);
        break;
    }
  }, [currentPage]);

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
      {
        showSite &&
        <NavBar setCurrentPage={setCurrentPage}/>
      }
      {
        showSite &&
        pageComponent
      }
    </div>
  );
}

export default App;
