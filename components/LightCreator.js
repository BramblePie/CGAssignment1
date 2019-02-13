const LightCreator = (function () {
    const helpers = [];

    // Main source of LightCreator in world
    function mainLight(makeHelper) {
        const l = new THREE.DirectionalLight(0xffffff, 1.5);
        l.position.set(1, 2, 1);

        if (makeHelper)
            helpers.push(new THREE.DirectionalLightHelper(l, 1, 0xeeeeee));

        return l;
    }

    // Ambient light
    function ambient() {
        return new THREE.AmbientLight(0xffffff, 0.1);
    }

    // public function to add all lights to scene
    function setLights(scene) {
        // Add each wanted LightCreator
        scene.add(mainLight(true));

        scene.add(ambient());

        // Add all helpers to scene
        helpers.forEach(helper => {
            scene.add(helper);
        });
    }

    // if LightCreator direction or position changes it needs to be rendered
    function render() {
        helpers.forEach(helper => {
            helper.update();
        });
    }
    return {
        setLights: setLights,
        render: render
    };
})();