import './style.css';

import * as three from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';

const scene = new three.Scene();

const camera = new three.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const renderer = new three.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.set(30, 30, 35);

renderer.render(scene, camera);

const sphere = new three.TorusGeometry(5, 1.5);
const material = new three.MeshStandardMaterial({
    color: 'gray',
});

// const obj = new three.Mesh(sphere, material);
// scene.add(obj);

const loader = new GLTFLoader();
loader.load('models/1 - Untitled Room.gltf', function (obj) {
    scene.add(obj.scene);

    obj.scene.scale.set(8, 8, 8);
});

const light = new three.AmbientLight(0x111327, 0.5);
const pointLight = new three.PointLight(0xf050ff, 10, 50);
pointLight.position.set(6.5, 10, -5);

const paintLight = new three.PointLight('#00e1ff', 5, 50);
paintLight.position.set(-10, 15, -2);

const paintLight2 = new three.PointLight('#00e1ff', 5, 50);
paintLight2.position.set(-10, 15, 10);

scene.add(pointLight, light, paintLight, paintLight2);

// const lightHelper = new three.PointLightHelper(paintLight2);
// scene.add(lightHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function AddStar() {
    const geometry = new three.SphereGeometry(0.1, 6, 6);
    const material = new three.MeshBasicMaterial({ color: 'white' });
    const star = new three.Mesh(geometry, material);

    const [x, y, z] = Array(3)
        .fill()
        .map(() => three.MathUtils.randFloatSpread(100));

    star.position.set(x, y, z);
    scene.add(star);
}

Array(200).fill().forEach(AddStar);

function animate() {
    requestAnimationFrame(animate);

    sphere.rotateY(0.001);

    controls.update();

    renderer.render(scene, camera);
}

animate();
