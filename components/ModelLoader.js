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

    function loadBike(scene) {
        return objLoader.load("resources/models/bike.json", function (obj) {
            obj.scale.set(0.600, 0.600, 0.600);
            obj.position.set(8, 0, 0);
            obj.rotation.y = Math.PI;
            obj.children[0].children.forEach(function (mesh) {
                mesh.material.transparent = true;
            });
            this.bike = obj;
            this.bike.v = 14;
            scene.add(obj);
        });
    }

    function updateBike(delta) {
        if (this.bike == null)
            return;

        bike.position.z -= delta * bike.v;

        // When at end of road reset position to start
        if (bike.position.z < -200) {
            bike.position.z = 200;
        }   // When nearing end of road lose opacity
        else if (bike.position.z < -50) {
            bike.children[0].children.forEach(function (mesh) {
                mesh.material.opacity = (bike.position.z + 100) / 50;
            });
        }   // When nearing centre go opaque
        else if (bike.position.z > 50 && bike.position.z < 100) {
            bike.children[0].children.forEach(function (mesh) {
                mesh.material.opacity = (bike.position.z - 100) / -50;
            });
        }
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
        loadBike(scene);
    }

    // Public function to render all models that have an animation
    function render(delta) {
        updateDuck(delta);
        updateBike(delta);

        time += delta;
    }

    return {
        setModels: setModels,
        render: render
    };
})();