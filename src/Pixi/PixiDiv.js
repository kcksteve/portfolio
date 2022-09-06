import { useRef, useEffect } from 'react';
import PixiAppManager from './PixiHelpers/PixiAppManager';
import PIXIOBJECTS from './pixiObjects';

const PixiDiv = () => {
  const appDiv = useRef();
  const pixiName = 'PixiHyperjump'
  let pixiAppManager;
  const sizing = {
    baseWidth: 1920,
    baseHeight: 1080,
    canvasWidth: null,
    canvasHeight: null,
    scaleTo: 'height'
  }

  const setupPixi = (parentElement) => {
    pixiAppManager = new PixiAppManager(PIXIOBJECTS, parentElement, 'Hyperjump', sizing);
  };

  useEffect(() => {
    if (!document.getElementById(pixiName)) {
        setupPixi(appDiv.current);
    }
  }, []);

  return (
    <div className="pixiApp" ref={appDiv}/>
  );
}

export default PixiDiv;
