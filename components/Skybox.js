const Skybox = (function () {

    function skyBoxMethod() {
        // Put the images in an array for easy access and code simplicity
        const directions = ["resources/images/skybox/posz.png",
            "resources/images/skybox/negz.png",
            "resources/images/skybox/posy.png",
            "resources/images/skybox/negy.png",
            "resources/images/skybox/posx.png",
            "resources/images/skybox/negx.png"
        ];
        const materialArray = [];
        const textureLoader = new THREE.TextureLoader();
        for (let i = 0; i < 6; i++) {
            materialArray.push(new THREE.MeshBasicMaterial({
                    map: textureLoader.load(directions[i]),
                    side: 1
                })
            );
        }

        const skyGeometry = new THREE.CubeGeometry(2000, 2000, 2000);
        return new THREE.Mesh(skyGeometry, materialArray);
    }

    function setSkybox(scene) {
        scene.add(skyBoxMethod());
    }

    return {
        setSkybox: setSkybox
    }
})();