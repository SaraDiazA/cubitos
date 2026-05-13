import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 4, 3 ); 
const loader = new THREE.TextureLoader();
const xd = loader.load("xd.jfif")
const material = new THREE.MeshBasicMaterial( { map:xd, color: 0x963245 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

// Largo - Ancho - Profundo
const geometriaCubito1 = new THREE.BoxGeometry( 1, 1, 1 );
// Material
const materialCubito1 = new THREE.MeshBasicMaterial();
// Mash
const cubito1 =
new THREE.Mesh( geometriaCubito1, materialCubito1 );
scene.add (cubito1)
cubito1.position.x=2

camera.position.z = 5;

function animate( time ) {

  cube.rotation.x = time / 2000;
  cube.rotation.y = time / 1000;

  renderer.render( scene, camera );

}