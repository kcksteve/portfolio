import { useRef, useEffect } from 'react';
import * as PIXI from 'pixi.js';
import bunnyImage from '../images/bunny.png';

const PixiDiv = () => {
  const appDiv = useRef();

  const setupPixi = (parentDiv) => {
    // The application will create a renderer using WebGL, if possible,
    // with a fallback to a canvas render. It will also setup the ticker
    // and the root stage PIXI.Container.
    const app = new PIXI.Application();

    // The application will create a canvas element for you that you
    // can then insert into the DOM.
    parentDiv.appendChild(app.view);
    app.view.id = 'pixi';

    // load the texture we need
    app.loader.add('bunny', bunnyImage).load((loader, resources) => {

        // This creates a texture from a 'bunny.png' image.
        const bunny = new PIXI.Sprite(resources.bunny.texture);
        //const bunny = new PIXI.Sprite(PIXI.Texture.WHITE);

        // Setup the position of the bunny
        bunny.x = app.renderer.width / 2;
        bunny.y = app.renderer.height / 2;

        // Rotate around the cent
        bunny.anchor.x = 0.5;
        bunny.anchor.y = 0.5;

        // Add the bunny to the scene we are building.
        app.stage.addChild(bunny);

        // Listen for frame updates
        app.ticker.add(() => {
            // each frame we spin the bunny around a bit
            bunny.rotation += 0.01;
        });
    });

    return true;
  }

  useEffect(() => {
    if (!document.getElementById('pixi')) {
        setupPixi(appDiv.current);
    }
  }, []);

  return (
    <div className="pixiApp" ref={appDiv}/>
  );
}

export default PixiDiv;
