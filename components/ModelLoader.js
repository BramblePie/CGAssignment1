const ModelLoader = (function () {
    let duck = {};

    let time = 0;

    const objLoader = new THREE.ObjectLoader();

    function loadDuck(scene) {
        return objLoader.load("resources/models/duck.json", function (obj) {
            duck = obj;
            duck.children[0].children[0].material = new THREE.MeshStandardMaterial({
                color: 0x895604,
                metalness: 0,
                roughness: 0
            });
            duck.children[0].children[1].material = new THREE.MeshStandardMaterial({
                color: 0x111111
            });
            duck.scale.set(100, 100, 100);
            duck.position.set(0, -0.05, 0);
            scene.add(duck);
        });
    }

    function updateDuck(delta) {
        const x = Math.sin((time + delta) / 3);
        const z = Math.cos((time + delta) / 3);
        duck.position.x = x;
        duck.position.z = z;
        if (x < 0)
            duck.rotation.y = Math.atan(z / -x) + Math.PI;
        else
            duck.rotation.y = -Math.atan(z / x);
    }

    // public function to load and add all wanted models to world
    function setModels(scene) {
        loadDuck(scene);
    }

    function render(delta) {
        updateDuck(delta);

        time += delta;
    }

    return {
        setModels: setModels,
        render: render
    };
})();