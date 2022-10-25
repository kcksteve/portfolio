import { useRef, useEffect } from 'react';
import PixiAppManager from './PixiHelpers/PixiAppManager';
import PIXIOBJECTS from './pixiObjects';
import StarfieldScene from './Scenes/StarfieldScene';
import HowlManager from './PixiAssistHowler/HowlManager';
import HOWLOBJECTS from './howlObjects';

const PixiDiv = () => {
  const appDiv = useRef();
  let pixiAppManager;
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
      showTextFunc: null
    }
  };

  const setupPixi = () => {
    pixiAppConfig.howlManager = new HowlManager(HOWLOBJECTS);
    pixiAppManager = new PixiAppManager(pixiAppConfig);
  };

  useEffect(() => {
    if (!document.getElementById(pixiAppConfig.pixiName)) {
      pixiAppConfig.parentElement = appDiv.current;
      setupPixi();
    }
  }, []);

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
