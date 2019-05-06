
const setTestObject = () => {
    console.log(THREE.JeelizHelper.Scene);
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const cubeMaterial = new THREE.MeshNormalMaterial({ wireframe: false });
    const threeCube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    threeCube.position.set(0, 0, -10);
    //THREE.JeelizHelper.Scene.add(threeCube);
    createVRM();
}

const createVRM = () => {
    const vrmLoader = new THREE.VRMLoader();

    vrmLoader.load(
        "./assets/AliciaSolid.vrm",
        (vrm) => {
            THREE.JeelizHelper.Scene.add(vrm.model);
            vrm.model.position.set(0, 0, -10);
            // this._vrm = vrm;
            // this._initAvatar(vrm);
            // this.physics = new __three_vrm__.VRMPhysics(vrm);
            // this.isReady = true;
            // callBackReady();
            // Render the scene.
        },
        function (progress) {
            console.log(progress.loaded / progress.total);
        },
        function (error) {
            console.error(error);
        }
    );
}