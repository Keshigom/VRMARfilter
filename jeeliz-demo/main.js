
const Settings = {
    targetScale: 10,
    positionOffset: {
        x: 0,
        y: -15,
        z: 0
    }
}

const init = () => {
    document.querySelector("#uploadBtn").addEventListener("change", (e) => { handleFiles(e.target.files) });

    document.querySelector("#downloadBtn").addEventListener("click", () => {
        const canvas = document.querySelector("#jeeFaceFilterCanvas");
        const downloadLink = document.querySelector("#downloadLink");
        const name = AVATAR && AVATAR.getMetadata().title || "avatar_name";
        const filename = name + "_" + Date.now();

        if (canvas.msToBlob) {
            const blob = canvas.msToBlob();
            window.navigator.msSaveBlob(blob, filename);
        } else {
            downloadLink.href = canvas.toDataURL('image/png');
            downloadLink.download = filename;
            downloadLink.click();
        }
    });
}
window.addEventListener('load', function () {
    init();
});

const handleFiles = (files) => {
    const avatarURL = window.URL.createObjectURL(files[0]);
    AVATAR_READY = false;
    const light = new THREE.HemisphereLight(0xbbbbff, 0x444422);
    light.position.set(0, 1, 0);
    THREE.JeelizHelper.Scene.remove(AVATAR.getScene());
    AVATAR = new WebVRM(avatarURL, THREE.JeelizHelper.Scene, avatarInit);
}

let AVATAR_READY = false;
let AVATAR;
const createVRM = () => {
    AVATAR = new WebVRM("./assets/MonoPub.vrm", THREE.JeelizHelper.Scene, avatarInit);
}

const avatarInit = () => {
    AVATAR_READY = true
    console.log(AVATAR);
    ajast()
}

let ajast = () => {
    AVATAR.getScene().rotation.set(0, Math.PI, 0);
    initialPose();

    //HACK: 読み込み直後はワールド座標が取れない？
    setTimeout(() => {
        AVATAR.setBoneRotation("head", { x: 0, y: 0, z: 0 });
        const avatarScale = AVATAR._skeleton._boneMap.get("leftEye").bone.getWorldPosition().y - AVATAR._skeleton._boneMap.get("hips").bone.getWorldPosition().y;
        const scale = Settings.targetScale * 0.5473522283979353 / avatarScale;
        console.log("avatarScale" + avatarScale);
        console.log("Scale" + scale);

        AVATAR.setScale(scale);
        //Settings.positionOffset.y = -150 / scale;
    }, 100);
    //ajast = () => { };
}

const initialPose = () => {
    AVATAR.setBoneRotation("rightUpperArm", { z: -Math.PI / 4 });
    AVATAR.setBoneRotation("leftUpperArm", { z: Math.PI / 4 });

}

const update = () => {
    if (!AVATAR_READY) return;

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

