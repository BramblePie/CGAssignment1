const ModelLoader = (function () {
    let time = 0;

    const objLoader = new THREE.ObjectLoader();

    function loadBuilding(scene) {
        return objLoader.load("resources/models/apartment-house.json", function (obj) {
            obj.children[1].children = [];
            obj.scale.set(0.015, 0.015, 0.015);
            obj.position.set(1.6, 0, -6);
            scene.add(obj);
        })
    }

    function loadBench(scene) {
        return objLoader.load("resources/models/bench.json", function (obj) {
            obj.scale.set(0.005, 0.005, 0.005);
            obj.position.set(1, 0, 3);
            obj.rotation.y = Math.PI / 12;
            obj.castShadow = true;
            obj.receiveShadow = true;
            const normal = new THREE.TextureLoader().load("resources/images/grass_normal.jpg");
            normal.wrapS = THREE.RepeatWrapping;
            normal.wrapT = THREE.RepeatWrapping;
            normal.repeat.set(6, 6);
            obj.children[1].children[0].material = new THREE.MeshStandardMaterial({
                color: 0x552211,
                roughness: 1,
                metalness: 0.1,
                side: 2,
                clipShadows: true,
                normalMap: normal
            });
            scene.add(obj);
        });
    }

    function loadDuck(scene) {
        return objLoader.load("resources/models/duck.json", function (obj) {
            this.duck = obj;
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
            duck.castShadow = true;
            duck.receiveShadow = true;
            scene.add(duck);
        });
    }

    function updateDuck(delta) {
        if (this.duck == null)
            return;

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
        loadBench(scene);
        loadBuilding(scene);
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