// Create scene
var scene = new THREE.Scene();

// Create camera
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(2, 1, 5);

// Create renderer
var renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create simple geometry
var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshStandardMaterial();
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

var ambLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambLight);

// Add components

light.setLights(scene);

var loader = new THREE.ObjectLoader();
loader.load("resources/models/eiffel.json", function (obj) {
    obj.children[0].material = material;
    obj.children[0].geometry.scale(0.1, 0.1, 0.1);

    scene.add(obj);
});

// ^^^^

controls = new THREE.OrbitControls(camera);
controls.autoRotate = true;
controls.autoRotateSpeed = 2;
controls.noKeys = true;

var clock = new THREE.Clock();

var render = function () {
    requestAnimationFrame(render);
    var delta = clock.getDelta();

    light.render();
    renderer.render(scene, camera);
};

render();