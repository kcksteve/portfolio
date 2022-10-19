import { useRef, useEffect } from 'react';
import PixiAppManager from './PixiHelpers/PixiAppManager';
import PIXIOBJECTS from './pixiObjects';
import StarfieldScene from './Scenes/StarfieldScene';

const PixiDiv = () => {
  const appDiv = useRef();
  const pixiName = 'PixiHyperjump'
  let pixiAppManager;
  const CANVASSETTINGS = {
    baseWidth: 1920,
    baseHeight: 1080,
    canvasWidth: null,
    canvasHeight: null,
    scaleTo: 'height',
    bgColor: 0x050017
  };
  const SCENES = [StarfieldScene];
  const INTERPOSER = {
    startAnimFunc: null,
    showTextFunc: null
  };

  const setupPixi = (parentElement) => {
    pixiAppManager = new PixiAppManager(PIXIOBJECTS, parentElement, pixiName, CANVASSETTINGS, SCENES, INTERPOSER);
  };

  useEffect(() => {
    if (!document.getElementById(pixiName)) {
        setupPixi(appDiv.current);
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
