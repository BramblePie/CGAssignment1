const LightCreator = (function () {
    const helpers = [];

    // Main source of LightCreator in world
    function sunLight(makeHelper) {
        const l = new THREE.DirectionalLight(0xdddddd, 1.4);
        l.position.set(3, 4, 2);

        // This light will cast all shadows
        l.castShadow = true;

        if (makeHelper)
            helpers.push(new THREE.DirectionalLightHelper(l, 1, 0xeeeeee));

        return l;
    }

    // Extra source of light
    function secondLight() {
        const light = new THREE.DirectionalLight(0xdddddd, 1.4);
        light.position.set(-5, 2, -8);

        return light;
    }

    // Ambient light
    function ambient() {
        return new THREE.AmbientLight(0xffffff, 0.4);
    }

    // public function to add all lights to scene
    function setLights(scene) {
        // Add each wanted LightCreator
        scene.add(sunLight(false));
        scene.add(secondLight());
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