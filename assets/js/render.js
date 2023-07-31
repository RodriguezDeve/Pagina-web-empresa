import * as THREE from "./three/build/three.module.js";
import { GLTFLoader} from './three/GLTFLoader.js';
import {OrbitControls} from './three/OrbitControls.js'

const sizes = {
  w: window.innerWidth/2.5,
  h: window.innerHeight,
}

const scene = new THREE.Scene();
//  const loader = new GLTFLoader ();
//  loader.load( 'assets/img/model/scene.gltf', function(gltf){
//    console.log(gltf);
//    const root = gltf.scene;
//    scene.add(root);
//  }, function(xhr){
//    console.log((xhr.loaded/xhr.total * 100) + "% loaded")
//  }, function (error){
//    console.log( error + gltf)
//  });

const loader2 = new GLTFLoader ();  
loader2.load('../../assets/img/model/wraith.glb', function(glb){
  console.log(glb);
  const root2 = glb.scene;

  root2.position.y =-35
  root2.position.z = 25
  scene.add(root2);
}, function(xhr){
  console.log((xhr.loaded/xhr.total * 100) + "% loaded")
}, function (error){
  console.log("don't charge" + error + glb)
});


const camera = new THREE.PerspectiveCamera(
  75,
  sizes.w / sizes.h,
  0.1,
  1000
);
camera.position.set(0,30,90);
scene.add(camera);
const canvas = document.getElementById('three');
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;


const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
  canvas: canvas
});
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.setSize(sizes.w, sizes.h);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));


//Lights
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(2,2,5);
scene.add(light);


var render = function () {

  requestAnimationFrame(render);
  controls.update();
  renderer.render(scene, camera);
};

// Render the scene
render();


window.addEventListener("resize", () => {
  sizes.w = window.innerWidth;
  sizes.h = window.innerHeight;

  camera.aspect = sizes.w / sizes.h;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.w, sizes.h);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
});