const light = (function () {
    let lights = 1;

    function setLight(scene) {
        scene.add(lights);
    }
})()