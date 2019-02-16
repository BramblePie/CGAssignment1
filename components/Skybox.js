const Skybox = (function () {

    function skyBoxMethod() {
        var directions = ["posx.jpg", "negx.jpg", "posy.jpg", "negy.jpg", "posz.jpg", "negz.jpg"];
        var materialArray = [];
        for (var i = 0; i < 6; i++) {
            materialArray.push(new THREE.MeshBasicMaterial({
                    map: THREE.ImageUtils.loadTexture(directions[i]),
                    side: THREE.BackSide
                })
            );
        }

        var skyGeometry = new THREE.CubeGeometry(5000, 5000, 5000);
        var skyMaterial = new THREE.MeshFaceMaterial(materialArray);
        var skyBox = new THREE.Mesh(skyGeometry, skyMaterial);

        //var skyGeometry = new THREE.CubeGeometry(10000, 10000, 10000);
        //var skyMaterials =
        //[
        //    new THREE.MeshBasicMaterial({
        //            map: new THREE.TextureLoader().load("https://i.ibb.co/56YQztG/posz.png"),
        //        side: THREE.DoubleSide
        //    }),
        //    new THREE.MeshBasicMaterial({
        //        map: new THREE.TextureLoader().load("https://i.ibb.co/sjvPNvz/negz.png"),
        //        side: THREE.DoubleSide
        //    }),
        //    new THREE.MeshBasicMaterial({
        //        map: new THREE.TextureLoader().load("https://i.ibb.co/b6V47yW/posy.png"),
        //        side: THREE.DoubleSide
        //    }),
        //    new THREE.MeshBasicMaterial({
        //        map: new THREE.TextureLoader().load("https://i.ibb.co/xJzNbJW/negy.png"),
        //        side: THREE.DoubleSide
        //    }),
        //    new THREE.MeshBasicMaterial({
        //        map: new THREE.TextureLoader().load("https://i.ibb.co/Q9Hrs5w/posx.png"),
        //        side: THREE.DoubleSide
        //    }),
        //    new THREE.MeshBasicMaterial({
        //        map: new THREE.TextureLoader().load("https://i.ibb.co/yRkLnz7/negx.png"),
        //        side: THREE.DoubleSide
        //    })
        //];
        //var skyMaterial = new THREE.MeshBasicMaterial(skyMaterials);
        //var skyBox = new THREE.Mesh(skyGeometry, skyMaterials);

        return skyBox;
    }

    function setSkybox(scene) {
        scene.add(skyBoxMethod());
    }

    return {
        setSkybox: setSkybox
    }
})();