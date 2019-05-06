
const Settings = {
    positionOffset: {
        x: 0,
        y: -15,
        z: 0
    }
}

const setTestObject = () => {
    console.log(THREE.JeelizHelper.Scene);
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const cubeMaterial = new THREE.MeshNormalMaterial({ wireframe: false });
    const threeCube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    threeCube.position.set(0, 0, -10);
    //THREE.JeelizHelper.Scene.add(threeCube);
    createVRM();
}

let AVATAR_READY = false;
const createVRM = () => {
    AVATAR = new WebVRM("./assets/MonoPub.vrm", THREE.JeelizHelper.Scene, () => { AVATAR_READY = true });
}

let ajast = () => {
    AVATAR.getScene().rotation.set(0, Math.PI, 0);
    AVATAR.setScale(10);
    ajast = () => { };
}

const update = () => {
    if (!AVATAR_READY) return;
    ajast();
    avatar = AVATAR.getScene();
    const targetPosition = THREE.JeelizHelper.CompositeObjects[0].position;
    const targetRotation = THREE.JeelizHelper.CompositeObjects[0].rotation;
    targetRotation.x = -targetRotation.x;
    targetRotation.z = -targetRotation.z;
    const currentPosition = {
        x: targetPosition.x + Settings.positionOffset.x,
        y: targetPosition.y + Settings.positionOffset.y,
        z: targetPosition.z + Settings.positionOffset.z
    };
    avatar.rotation.set(0, Math.PI, 0);
    avatar.position.set(currentPosition.x, currentPosition.y, currentPosition.z);
    AVATAR.setBoneRotation("head", targetRotation);
}