const light = (function () {
    var helpers = [];

    function keyLight(makeHelper) {
        const l = new THREE.DirectionalLight(0xffffff, 0.5);
        l.position.set(1, 2, 1);

        if (makeHelper)
            helpers.push(new THREE.DirectionalLightHelper(l, 1, 0xeeeeee));

        return l;
    }

    function setLights(scene) {
        // Add each wanted light
        scene.add(keyLight(true));

        // Add all helpers to scene
        helpers.forEach(helper => {
            scene.add(helper);
        });
    }

    function render() {

    }
    return {
        setLights: setLights,
        render: render
    };
})()