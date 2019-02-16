const LightCreator = (function () {
    const helpers = [];

    // Main source of LightCreator in world
    function sunLight(makeHelper) {
        const l = new THREE.DirectionalLight(0xdddddd, 1.4);
        l.position.set(1, 2, 1);

        // This light will cast all shadows
        l.castShadow = true;

        if (makeHelper)
            helpers.push(new THREE.DirectionalLightHelper(l, 1, 0xeeeeee));

        return l;
    }

    // Ambient light
    function ambient() {
        return new THREE.AmbientLight(0xffffff, 0.4);
    }

    // public function to add all lights to scene
    function setLights(scene) {
        // Add each wanted LightCreator
        scene.add(sunLight(false));

        scene.add(ambient());

        // Add all helpers to scene
        helpers.forEach(helper => {
            scene.add(helper);
        });
    }

    // if any lights change direction or position it needs to be rendered
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