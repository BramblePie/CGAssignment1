const ModelCreator = (function () {

    // Add a simple geometry
    function simpleCube() {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshStandardMaterial();
        return new THREE.Mesh(geometry, material);
    }

    function setModels(scene) {
        scene.add(simpleCube());
    }

    return {
        setModels:setModels
    }
})();