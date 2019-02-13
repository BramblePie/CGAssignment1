// Create scene
const scene = new THREE.Scene();

// Create camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(2, 1, 5);

// Create renderer
const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add components

LightCreator.setLights(scene);

ModelLoader.setModels(scene);

ModelCreator.setModels(scene);


// ^^^^

controls = new THREE.OrbitControls(camera);
controls.autoRotate = true;
controls.autoRotateSpeed = 2;
controls.noKeys = true;

const clock = new THREE.Clock();

const render = function () {
    requestAnimationFrame(render);
    const delta = clock.getDelta();

    LightCreator.render();
    ModelLoader.render(delta);

    renderer.render(scene, camera);
};

render();