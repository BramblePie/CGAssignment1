const ModelCreator = (function () {
    let time = 0;

    function ground() {
        const geometry = new THREE.PlaneGeometry(16, 20, 1, 1);
        const normal = new THREE.TextureLoader().load("resources/images/grass_normal.jpg");
        normal.wrapS = THREE.RepeatWrapping;
        normal.wrapT = THREE.RepeatWrapping;
        normal.repeat.set(12, 12);
        const texture = new THREE.TextureLoader().load("resources/images/grass.jpg");
        texture.wrapT = THREE.RepeatWrapping;
        texture.wrapS = THREE.RepeatWrapping;
        texture.repeat.set(12, 12);
        const material = new THREE.MeshStandardMaterial({
            // color: 0x339922,
            side: 0,
            roughness: 0.9,
            metalness: 0.2,
            normalMap: normal,
            map: texture
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.rotateX(-Math.PI / 2);
        mesh.position.set(-2, 0, 0);
        mesh.receiveShadow = true;
        return mesh;
        // TODO: Ground needs hole for lake
    }

    function lake() {
        const geo = new THREE.CircleGeometry(2, 8);
        const material = new THREE.MeshStandardMaterial({
            color: 0x1133aa,
            side: 2,
            roughness: 0,
            metalness: 0,
            transparent: true,
            opacity: 0.85
        });
        const mesh = new THREE.Mesh(geo, material);
        mesh.scale.set(1.6, 1, 1.2);
        mesh.position.set(-1.6, 0.01, 0);
        mesh.rotateX(-Math.PI / 2);
        return mesh;
        // TODO: Lake needs to go in hole in ground
    }

    function tree() {
        const normal = new THREE.TextureLoader().load("resources/images/grass_normal.jpg");
        normal.wrapS = THREE.RepeatWrapping;
        normal.wrapT = THREE.RepeatWrapping;
        normal.repeat.set(8,8);
        // Tree top
        const goeTop = new THREE.IcosahedronGeometry();
        const materialTop = new THREE.MeshStandardMaterial({
            color: 0x408820,
            roughness: 0.9,
            metalness: 0.2,
            normalMap: normal
        });
        const meshTop = new THREE.Mesh(goeTop, materialTop);
        meshTop.scale = new THREE.Vector3(1, 1, 1);
        meshTop.castShadow = true;

        // Tree trunk
        const goeTrunk = new THREE.CylinderGeometry(0.1, 0.2, 2, 3);
        const materialTrunk = new THREE.MeshStandardMaterial({
            color: 0x662211,
            roughness: 0.9,
            metalness: 0.2
        });
        const meshTrunk = new THREE.Mesh(goeTrunk, materialTrunk);
        meshTrunk.position.set(0, -1, 0);
        meshTrunk.castShadow = true;

        this.tree = new THREE.Group();
        this.tree.position.set(2, 2, 0);
        this.tree.add(meshTrunk);
        this.tree.add(meshTop);
        this.tree.castShadow = true;
        return this.tree;
    }

    function renderTree(delta) {
        if (this.tree == null)
            return;
        treeTop = this.tree.children[1];
        treeTop.scale.set(1.2 + 0.06 * Math.sin(time * 0.8), 1, 1.2 + 0.06 * Math.sin(time * 0.8 + Math.PI));
    }

    function road() {
        const geo = new THREE.PlaneGeometry(4, 20, 1, 1);
        const texture = new THREE.TextureLoader().load("resources/images/road_normal.jpg");
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(2, 8);
        const mat = new THREE.MeshStandardMaterial({
            color: 0x505050,
            roughness: 0.8,
            metalness: 0.4,
            normalMap: texture
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.rotation.x = -Math.PI / 2;
        mesh.position.set(8, 0, 0);
        return mesh;
    }

    function setModels(scene) {
        scene.add(ground());
        scene.add(lake());
        scene.add(tree());
        scene.add(road());
    }

    function render(delta) {
        renderTree(delta);

        time += delta;
    }

    return {
        setModels: setModels,
        render: render
    }
})();