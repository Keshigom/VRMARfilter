
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
    AVATAR.getScene().rotation.set(0, Math.PI, 0);
    AVATAR.setScale(10);
    initialPose();
    ajast = () => { };
}

const initialPose = () => {
    AVATAR.setBoneRotation("rightUpperArm", { z: -Math.PI / 4 });
    AVATAR.setBoneRotation("leftUpperArm", { z: Math.PI / 4 });

}

const update = () => {
    if (!AVATAR_READY) return;
    ajast();
    avatar = AVATAR.getScene();
    const targetPosition = THREE.JeelizHelper.CompositeObjects[0].position;
    const targetRotation = THREE.JeelizHelper.CompositeObjects[0].rotation;
    const currentRotation = {
        x: -targetRotation.x,
        y: targetRotation.y,
        z: -targetRotation.z
    }
    const currentPosition = {
        x: targetPosition.x + Settings.positionOffset.x,
        y: targetPosition.y + Settings.positionOffset.y,
        z: targetPosition.z + Settings.positionOffset.z
    };

    moveGaze(currentRotation);
    avatar.position.set(currentPosition.x, currentPosition.y, currentPosition.z);
    AVATAR.setBoneRotation("head", currentRotation);
}

const moveGaze = (headRotation) => {
    const eyeRotation = {
        x: -headRotation.x * 0.5,
        y: -headRotation.y * 0.5,
        z: 0,
    }


    AVATAR.setBoneRotation("rightEye", eyeRotation);
    AVATAR.setBoneRotation("leftEye", eyeRotation);

}