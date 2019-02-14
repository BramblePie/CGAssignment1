const ModelLoader = (function () {
    const objLoader = new THREE.ObjectLoader();

    // loads the eiffel tower and adds it to scene
    function loadEiffel(scene) {
        return objLoader.load("resources/models/eiffel.json", function (obj) {
            obj.children[0].geometry.scale(0.1, 0.1, 0.1);

            scene.add(obj);
        });
    }

    // public function to load and add all wanted models to world
    function setModels(scene) {
        //loadEiffel(scene)
    }

    function render(delta) {

    }

    return {
        setModels: setModels,
        render:render
    };
})();