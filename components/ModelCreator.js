const ModelCreator = (function () {

    // Add a simple geometry
    function simpleCube() {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshStandardMaterial();
        return new THREE.Mesh(geometry, material);
    }

    function groundOld() {
        const geometry = new THREE.PlaneGeometry(20, 20, 1, 1);
        const texture = new THREE.TextureLoader().load("resources/images/grass_normal.jpg");
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(16, 16);
        const material = new THREE.MeshStandardMaterial({
            color: 0x339922,
            side: 0,
            roughness: 0.9,
            metalness: 0.2,
            normalMap: texture
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.rotateX(-Math.PI / 2);
        return mesh;
        // TODO: Ground needs hole for lake
    }

    function lake() {
        const geo = new THREE.CircleGeometry(2, 8);
        const material = new THREE.MeshStandardMaterial({
            color: 0x1133aa,
            side: 2,
            roughness: 0.3,
            metalness: 0,
            transparent: true,
            opacity: 0.7
        });
        const mesh = new THREE.Mesh(geo, material);
        mesh.position.set(0, 0.01, 0);
        mesh.rotateX(-Math.PI / 2);
        return mesh;
        // TODO: Lake needs to go in hole in ground
    }

    function three() {
        // Tree top
        const goeTop = new THREE.IcosahedronGeometry();
        const materialTop = new THREE.MeshStandardMaterial({
            color: 0x44a020,
            roughness: 0.9,
            metalness: 0.2
        });
        const meshTop = new THREE.Mesh(goeTop, materialTop);
        meshTop.scale = new THREE.Vector3(1, 1, 1);

        // Tree trunk
        const goeTrunk = new THREE.CylinderGeometry(0.1, 0.2, 2, 3);
        const materialTrunk = new THREE.MeshStandardMaterial({
            color: 0x662211,
            roughness: 0.9,
            metalness: 0.2
        });
        const meshTrunk = new THREE.Mesh(goeTrunk, materialTrunk);
        meshTrunk.position.set(0, -1, 0);

        const tree = new THREE.Group();
        tree.position.set(2, 2, 0);
        tree.add(meshTrunk);
        tree.add(meshTop);
        return tree;
    }


    function ground() {
        const geometry = new THREE.Geometry();
        geometry.vertices.push(
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(1, 0, 0),
            new THREE.Vector3(1, 0, 1),
            new THREE.Vector3(0, 0, 1)
        );

        geometry.faces.push(
            new THREE.Face3(0, 1, 2),
            new THREE.Face3(2, 3, 0)
        );

        geometry.computeBoundingBox();
        const material = new THREE.MeshBasicMaterial({
            color: 0x339922,
            side: 1
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(0, 2, 0);
        return mesh;
    }

    function setModels(scene) {
        // scene.add(simpleCube());
        scene.add(groundOld());
        scene.add(lake());
        scene.add(three());
        scene.add(ground());
    }

    return {
        setModels: setModels
    }
})();