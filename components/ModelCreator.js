const ModelCreator = (function () {
    let time = 0;

    // Ground/ floor of the world
    function ground() {
        // Simple plane geometry for ground
        const geometry = new THREE.PlaneGeometry(200, 200, 1, 1);

        // Grass normal map and texture to add to aesthetics
        const normal = new THREE.TextureLoader().load("resources/images/grass_normal.jpg");
        normal.wrapS = THREE.RepeatWrapping;
        normal.wrapT = THREE.RepeatWrapping;
        normal.repeat.set(120, 120);
        const texture = new THREE.TextureLoader().load("resources/images/grass.jpg");
        texture.wrapT = THREE.RepeatWrapping;
        texture.wrapS = THREE.RepeatWrapping;
        texture.repeat.set(120, 120);

        // Grass has high roughness so it wont be shiny, and low metalness for a softer look
        const material = new THREE.MeshStandardMaterial({
            side: 0,
            roughness: 0.9,
            metalness: 0.2,
            normalMap: normal,
            map: texture
        });
        const mesh = new THREE.Mesh(geometry, material);
        // Rotate so front faces up
        mesh.rotateX(-Math.PI / 2);
        // All objects may cast shadows on the ground
        mesh.receiveShadow = true;
        return mesh;
    }

    // Simple round lake in the middle of the scene
    function lake() {
        // Low segment count circle to add an interesting aesthetic
        const geo = new THREE.CircleGeometry(2, 8);
        // Blue color, 0 roughness and metalness for maximum shine and soft look
        const material = new THREE.MeshStandardMaterial({
            color: 0x1133aa,
            side: 2,
            roughness: 0,
            metalness: 0,
            transparent: true,
            // Slightly transparent
            opacity: 0.85
        });
        const mesh = new THREE.Mesh(geo, material);
        mesh.scale.set(1.6, 1, 1.2);
        // Position slightly above the ground to not merge with it
        mesh.position.set(-1.6, 0.01, 0);
        // Rotate so front faces up
        mesh.rotateX(-Math.PI / 2);
        return mesh;
    }

    function tree() {
        // Recycle grass normal map on tree top to make it not look so smooth
        const normal = new THREE.TextureLoader().load("resources/images/grass_normal.jpg");
        normal.wrapS = THREE.RepeatWrapping;
        normal.wrapT = THREE.RepeatWrapping;
        normal.repeat.set(8,8);
        // Tree top made from low polygon sphere
        const goeTop = new THREE.IcosahedronGeometry();
        // Trees don't shine and are some what soft
        const materialTop = new THREE.MeshStandardMaterial({
            color: 0x408820,
            roughness: 0.9,
            metalness: 0.2,
            normalMap: normal
        });
        const meshTop = new THREE.Mesh(goeTop, materialTop);
        // The tree should cast a shadow
        meshTop.castShadow = true;

        // Tree trunk made for low segment count tapering cylinder
        const goeTrunk = new THREE.CylinderGeometry(0.1, 0.2, 2, 3);
        // The tree trunk should be dark and not shiny
        const materialTrunk = new THREE.MeshStandardMaterial({
            color: 0x662211,
            roughness: 0.9,
            metalness: 0.7
        });
        const meshTrunk = new THREE.Mesh(goeTrunk, materialTrunk);
        meshTrunk.position.set(0, -1, 0);
        // The tree should cast a shadow
        meshTrunk.castShadow = true;

        // Group tree components together for easy positioning
        this.tree = new THREE.Group();
        this.tree.position.set(2, 2, 0);
        this.tree.add(meshTrunk);
        this.tree.add(meshTop);
        return this.tree;
    }

    // Animate tree top to change in width circularly to to mimic movement from wind
    function renderTree() {
        if (this.tree == null)
            return;
        treeTop = this.tree.children[1];
        treeTop.scale.set(1.2 + 0.06 * Math.sin(time * 0.8), 1, 1.2 + 0.06 * Math.sin(time * 0.8 + Math.PI));
    }

    function road() {
        const geo = new THREE.PlaneGeometry(4, 200, 1, 1);
        const texture = new THREE.TextureLoader().load("resources/images/road_normal.jpg");
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(3, 160);
        const mat = new THREE.MeshStandardMaterial({
            color: 0x505050,
            roughness: 0.8,
            metalness: 0.4,
            normalMap: texture
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.rotation.x = -Math.PI / 2;
        mesh.position.set(8, 0.01, 0);
        return mesh;
    }

    // Public function to add all created models to scene
    function setModels(scene) {
        scene.add(ground());
        scene.add(lake());
        scene.add(tree());
        scene.add(road());
    }

    // Public function to render all models that have an animation
    function render(delta) {
        renderTree();

        time += delta;
    }

    return {
        setModels: setModels,
        render: render
    }
})();