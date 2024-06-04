import React, { useEffect, useRef } from 'react';

import { Engine, Scene, ArcRotateCamera, FreeCamera, HemisphericLight, Vector3, MeshBuilder, UniversalCamera, PointLight, StandardMaterial, Color3 } from '@babylonjs/core';
//import Box from './Box';

// -----------------------------------------------------------------------------------------------------------

function BabylonScene() {
    const canvasRef = useRef(null);
    //const boxRef = useRef(null); // Reference to the box for easy access in event handlers

    
    useEffect(() => {
        if (canvasRef.current) {
            const engine = new Engine(canvasRef.current, true);
            const scene = new Scene(engine);

            // Camera ---------------------------------------------------------------------------------------                                                                
            // set up camera with args
            const camera = new ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2, 20, new Vector3(0, 5, -30), scene);

            // take user input 
            camera.attachControl(canvasRef.current, true);
            
            // change camera position on x,y,z scale respectively - higher z value means further away 
            camera.setPosition(new Vector3(20,200,400)); 

            // Set realistic camera angles for room designing 
            camera.lowerBetaLimit = 0.1;
            camera.upperBetaLimit = (Math.PI / 2) * 0.99;
            camera.lowerRadiusLimit = 150;
            // TODO: What if I want to move just one object - i.e just the box and not the ground? 
            // Camera ---------------------------------------------------------------------------------------





            // Light ---------------------------------------------------------------------------------------
            var light = new HemisphericLight("light", new Vector3(1, 1, 0), scene);
            // Light ----------------------------------------------------------------------------------------





            // Objects ---------------------------------------------------------------------------------------
            // Use a box to act as a dresser or cabinet
            const box = MeshBuilder.CreateBox("box", {size: 20}, scene);
            box.position = new Vector3(0,10,0);
            
            // Ground
            var ground = MeshBuilder.CreateGround("ground", {width: 200, height: 200}, scene);
            // Objects ---------------------------------------------------------------------------------------





            // Materials ---------------------------------------------------------------------------------------
            const boxMat = new StandardMaterial("boxMat", scene);
            boxMat.diffuseColor = new Color3(0, 1, 0); // Green color
            box.material = boxMat;
            //const box = new Box(scene);
            
            const groundMaterial = new StandardMaterial("groundMat", scene);
            groundMaterial.diffuseColor = new Color3(0.9, 0.8, 2); 
            ground.material = groundMaterial;
            // Materials ---------------------------------------------------------------------------------------






            // GAME LOGIC
            var canvas = engine.getRenderingCanvas();
            let startingPoint;
            let currentMesh; 
            
            const getGroundPosition = () => {
                const pickinfo = scene.pick(scene.pointerX, scene.pointerY, mesh => mesh === ground);
                return pickinfo.hit ? pickinfo.pickedPoint : null;
            };
    
            const pointerDown = function (evt) {
                if (evt.button !== 0) return;
                const pickInfo = scene.pick(scene.pointerX, scene.pointerY, mesh => mesh !== ground);
                if (pickInfo.hit) {
                    currentMesh = pickInfo.pickedMesh;
                    startingPoint = getGroundPosition();
                    if (startingPoint) {
                        setTimeout(() => {
                            camera.detachControl(canvasRef.current);
                        }, 0);
                    }
                }
            };
    
            const pointerUp = function () {
                if (startingPoint) {
                    camera.attachControl(canvasRef.current, true);
                    startingPoint = null;
                }
            };
    
            const pointerMove = function (evt) {
                if (!startingPoint) return;
                const current = getGroundPosition();
                if (!current) return;
                const diff = current.subtract(startingPoint);
                currentMesh.position.addInPlace(diff);
                startingPoint = current;
            };
    
            canvasRef.current.addEventListener("pointerdown", pointerDown, false);
            canvasRef.current.addEventListener("pointerup", pointerUp, false);
            canvasRef.current.addEventListener("pointermove", pointerMove, false);
            // GAME LOGIC
      
    
            engine.runRenderLoop(() => {
                scene.render();
            });

            // Resize the canvas on window size change 
            window.addEventListener('resize', () => {
            engine.resize();
            });

            return () => {
                scene.dispose();
                engine.dispose();
                window.removeEventListener('resize', engine.resize);
                
            };
        }
    }, []);

    return (
        <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }}></canvas>
    );
}

//////////////////////////////////
export default BabylonScene;