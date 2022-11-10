import { useRef, useEffect, useState } from 'react';
import PixiAppManager from './PixiHelpers/PixiAppManager';
import PIXIOBJECTS from './pixiObjects';
import StarfieldScene from './Scenes/StarfieldScene';
import HowlManager from './PixiAssistHowler/HowlManager';
import HOWLOBJECTS from './howlObjects';

const PixiDiv = ({ startAnim, setStartAnim, playSfx, setShowSite, setShowLaunch }) => {
  const appDiv = useRef();
  const[pixiAppManager, setPixiAppManager] = useState();
  let howlManager;

  const pixiAppConfig = {
    name: 'PixiHyperjump',
    parentElement: null,
    pixiObjects: PIXIOBJECTS,
    canvasSettings: {
      baseWidth: 1920,
      baseHeight: 1080,
      canvasWidth: null,
      canvasHeight: null,
      scaleTo: 'height',
      bgColor: 0x050017
    },
    scenes: [
      StarfieldScene
    ],
    interposer: {
      startAnimFunc: null,
      showSiteFunc: null,
      showLaunchBtnFunc: null,
      playSfx: null,
    }
  };

  const setupPixi = () => {
    pixiAppConfig.howlManager = new HowlManager(HOWLOBJECTS);
    setPixiAppManager(new PixiAppManager(pixiAppConfig));
  };

  useEffect(() => {
    if (document.getElementById(pixiAppConfig.name) === null) {
      setStartAnim(() => () => pixiAppConfig.interposer.startAnimFunc());
      pixiAppConfig.interposer.showLaunchBtnFunc = setShowLaunch;
      pixiAppConfig.interposer.showSiteFunc = setShowSite;
      pixiAppConfig.interposer.playSfx = playSfx;
      pixiAppConfig.parentElement = appDiv.current;
      setupPixi();
    }
  }, []);

  useEffect(() => {
    if (pixiAppManager && pixiAppManager.hasOwnProperty('interposerObject')) {
      pixiAppManager.interposerObject.playSfx = playSfx
      console.log(pixiAppManager.interposerObject.playSfx);
    }
  }, [playSfx])

  return (
    <div className="pixiApp" ref={appDiv} style={{
      height: '100vh',
      width: '100vw',
      position: 'absolute',
      overflow: 'hidden'
    }}/>
  );
}

export default PixiDiv;
