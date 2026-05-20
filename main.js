import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
const scene = new THREE.Scene();
//scene.background = new THREE.Color(0xaaddff); // Fondo azul pastel
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);
const verdeOscuro = new THREE.MeshPhysicalMaterial({ color: 0x3e8b3e });
const verdeClaro = new THREE.MeshPhysicalMaterial({ color: 0x7cc576 });
const blanco = new THREE.MeshPhysicalMaterial({ color: 0xffffff });
const negro = new THREE.MeshPhysicalMaterial({ color: 0x000000 });
const rojo = new THREE.MeshPhysicalMaterial({ color: 0xd32f2f });
const marron = new THREE.MeshPhysicalMaterial({ color: 0x6b4f2f });

const ambiente = new THREE.AmbientLight(0x8a2b2, 10);
scene.add(ambiente);
const foco = new THREE.SpotLight(0x8a2b2, 40);
foco.position.set(0, 4, 8);
scene.add(foco);

const SpotLightHelper = new THREE.SpotLightHelper(foco);
scene.add(SpotLightHelper);

const PointLight = new THREE.PointLight(0xffff00, 25, 10); 
PointLight.position.set(150, -45, -200);
scene.add(PointLight);

const PointLightHelper = new THREE.PointLightHelper(PointLight);
scene.add(PointLightHelper);

const estrellas = new THREE.Group();
const estrellaData = [];
const shootingStars = [2, 8, 17];
for (let i = 0; i < 24; i++) {
  const basePosition = new THREE.Vector3(
    (Math.random() - 0.5) * 8,
    2.2 + Math.random() * 2.4,
    (Math.random() - 0.5) * 8
  );
  const intensidad = 0.08 + Math.random() * 0.12;
  const estrella = new THREE.PointLight(0xffffff, intensidad, 20, 2);
  estrella.position.copy(basePosition);
  estrellas.add(estrella);

  const brillo = new THREE.Mesh(
    new THREE.SphereGeometry(0.04, 8, 8),
    new THREE.MeshBasicMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 0.7 })
  );
  brillo.position.copy(basePosition);
  estrellas.add(brillo);

  estrellaData.push({
    estrella,
    brillo,
    basePosition,
    sway: 0.4 + Math.random() * 0.4,
    isShooting: shootingStars.includes(i),
    active: false,
    direction: new THREE.Vector3(),
    speed: 0.14 + Math.random() * 0.06
  });
}
scene.add(estrellas);

function crearCubito(ancho, alto, profundo, material) {
  return new THREE.Mesh(new THREE.BoxGeometry(ancho, alto, profundo), material);
}

// Grupo del dinosaurio
const trex = new THREE.Group();
scene.add(trex);

// Hacerlo más erguido
trex.rotation.z = -0.45;

// Cuerpo
const cuerpo = crearCubito(2.8, 1.6, 1, verdeOscuro);
cuerpo.position.set(0.4, 0.3, 0);
trex.add(cuerpo);

// Barriga clara
const barriga = crearCubito(2, 1.0, 0.8, verdeClaro);
barriga.position.set(0.4, 0.1, 0);
trex.add(barriga);

// Cuello
const cuello = crearCubito(0.6, 0.9, 0.9, verdeOscuro);
cuello.position.set(-1.1, 0.8, 0);
trex.add(cuello);

// Cabeza cuadrada
const cabeza = crearCubito(1.1, 1, 1, verdeOscuro);
cabeza.position.set(-1.95, 1.25, 0);
trex.add(cabeza);

// Hocico
const hocico = crearCubito(0.7, 0.4, 1, verdeOscuro);
hocico.position.set(-2.55, 0.95, 0);
trex.add(hocico);

// Mandíbula inferior
const mandibula = crearCubito(0.7, 0.3, 0.9, verdeOscuro);
mandibula.position.set(-2.55, 0.65, 0);
trex.add(mandibula);

// Dientes
const diente1 = crearCubito(0.1, 0.15, 0.05, blanco);
diente1.position.set(-2.1, 0.7, 0.45);
trex.add(diente1);
const diente2 = crearCubito(0.1, 0.15, 0.05, blanco);
diente2.position.set(-2.4, 0.7, 0.45);
trex.add(diente2);

// Ojo grueso
const ojo = crearCubito(0.25, 0.25, 0.05, blanco);
ojo.position.set(-2.05, 1.2, 0.45);
trex.add(ojo);
const pupila = crearCubito(0.12, 0.12, 0.02, negro);
pupila.position.set(-2.05, 1.2, 0.55);
trex.add(pupila);

// Manchas verdes claras
const mancha1 = crearCubito(0.3, 0.3, 0.05, rojo);
mancha1.position.set(0.2, 0.6, 0.5);
trex.add(mancha1);
const mancha2 = crearCubito(0.25, 0.25, 0.05, verdeClaro);
mancha2.position.set(0.8, 0.4, 0.5);
trex.add(mancha2);
const mancha3 = crearCubito(0.2, 0.2, 0.05, verdeClaro);
mancha3.position.set(-0.2, 0.2, 0.5);
trex.add(mancha3);
const mancha4 = crearCubito(0.15, 0.15, 0.05, verdeClaro);
mancha4.position.set(-1.3, 1.0, 0.45);
trex.add(mancha4);
const mancha5 = crearCubito(0.2, 0.2, 0.05, verdeClaro);
mancha5.position.set(-1.7, 1.5, 0.45);
trex.add(mancha5);

// Cola segmentada
const cola = new THREE.Group();
cola.position.set(1.8, 0.6, 0);
cola.rotation.z = -0.25;
trex.add(cola);
const cola1 = crearCubito(0.9, 0.4, 0.9, verdeOscuro);
cola1.position.set(0.4, 0.15, 0);
cola.add(cola1);
const cola2 = crearCubito(0.8, 0.35, 0.8, verdeOscuro);
cola2.position.set(1.05, 0.25, 0);
cola.add(cola2);
const cola3 = crearCubito(0.7, 0.3, 0.7, verdeOscuro);
cola3.position.set(1.7, 0.35, 0);
cola.add(cola3);

// Patas traseras
const pataIzq = crearCubito(0.45, 1.1, 0.5, verdeOscuro);
pataIzq.position.set(0.4, -1.15, 0.18);
trex.add(pataIzq);
const pataDer = crearCubito(0.45, 1.1, 0.5, verdeOscuro);
pataDer.position.set(0.4, -1.15, -0.18);
trex.add(pataDer);

// Pies cuadrados
const pieIzq = crearCubito(0.5, 0.2, 0.7, verdeOscuro);
pieIzq.position.set(0.4, -1.45, 0.18);
trex.add(pieIzq);
const pieDer = crearCubito(0.5, 0.2, 0.7, verdeOscuro);
pieDer.position.set(0.4, -1.45, -0.18);
trex.add(pieDer);

// Brazos pequeños estilo T-Rex
const brazoIzq = crearCubito(0.2, 0.4, 0.2, verdeOscuro);
brazoIzq.position.set(-0.4, 0.05, 0.3);
trex.add(brazoIzq);
const brazoDer = crearCubito(0.2, 0.4, 0.2, verdeOscuro);
brazoDer.position.set(-0.4, 0.05, -0.3);
trex.add(brazoDer);

// Cola curva de perfil
const colaBase = crearCubito(0.4, 0.4, 0.4, verdeOscuro);
colaBase.position.set(2.5, 0.9, 0);
trex.add(colaBase);

// Flor roja estilo Minecraft
function crearFlor(posX, posZ) {
  const flor = new THREE.Group();
  const tallo = crearCubito(0.1, 0.6, 0.1, marron);
  tallo.position.y = -0.7;
  flor.add(tallo);
  const centro = crearCubito(0.2, 0.2, 0.2, rojo);
  centro.position.y = -0.4;
  flor.add(centro);
  flor.position.set(posX, 0.1, posZ);
  scene.add(flor);
}

const grisClaro = new THREE.MeshPhysicalMaterial({ color: 0xcccccc });
const grisMedio = new THREE.MeshPhysicalMaterial({ color: 0x888888 });
const grisOscuro = new THREE.MeshPhysicalMaterial({ color: 0x444444 });
const hierbaAmarilla = new THREE.MeshPhysicalMaterial({ color: 0xd4af37 });
const pastoVerde = new THREE.MeshPhysicalMaterial({ color: 0x4caf50 });

crearFlor(-0.8, 1.2);
crearFlor(0.5, -1.0);

// Agregar rocas con tonos grises
const rocas = [
  { pos: [-2, -1.2, 0.5], size: [0.4, 0.3, 0.4], mat: grisClaro },
  { pos: [1.5, -1.2, -0.8], size: [0.5, 0.4, 0.3], mat: grisMedio },
  { pos: [-1.2, -1.2, -1.0], size: [0.3, 0.25, 0.35], mat: grisOscuro },
  { pos: [2.2, -1.2, 0.3], size: [0.45, 0.35, 0.4], mat: grisClaro },
  { pos: [0.8, -1.2, 1.2], size: [0.35, 0.3, 0.25], mat: grisMedio }
];

rocas.forEach(roca => {
  const r = crearCubito(roca.size[0], roca.size[1], roca.size[2], roca.mat);
  r.position.set(roca.pos[0], roca.pos[1], roca.pos[2]);
  scene.add(r);
});

// Agregar hierba amarillenta
for (let i = 0; i < 15; i++) {
  const hierba = crearCubito(0.05, 0.2, 0.05, hierbaAmarilla);
  hierba.position.set(
    (Math.random() - 0.5) * 6,
    -1.1 + Math.random() * 0.1,
    (Math.random() - 0.5) * 4
  );
  scene.add(hierba);
}

// Agregar más pasto verde
for (let i = 0; i < 30; i++) {
  const pasto = crearCubito(0.03, 0.15, 0.03, pastoVerde);
  pasto.position.set(
    (Math.random() - 0.5) * 8,
    -1.1 + Math.random() * 0.1,
    (Math.random() - 0.5) * 6
  );
  scene.add(pasto);
}

// Nubes blancas grandes
function crearNube(posX, posY, posZ) {
  const nube = new THREE.Group();
  const cubosNube = [
    { pos: [0, 0, 0], size: [1.5, 0.8, 1] },
    { pos: [0.8, 0.2, 0], size: [1, 0.6, 0.8] },
    { pos: [-0.7, 0.1, 0.3], size: [0.9, 0.7, 0.9] },
    { pos: [0.3, 0.3, -0.4], size: [0.8, 0.5, 0.7] },
    { pos: [-0.4, 0.4, -0.2], size: [0.7, 0.6, 0.6] }
  ];
  cubosNube.forEach(cubo => {
    const c = crearCubito(cubo.size[0], cubo.size[1], cubo.size[2], blanco);
    c.position.set(cubo.pos[0], cubo.pos[1], cubo.pos[2]);
    nube.add(c);
  });
  nube.position.set(posX, posY, posZ);
  scene.add(nube);
}

crearNube(-3, 3, -2);
crearNube(2.5, 3.5, 1.5);

// Suelo simple
const suelo = crearCubito(8, 0.1, 6, new THREE.MeshPhysicalMaterial({ color: 0x7b5f3b }));
suelo.position.set(0.5, -1.4, 0);
scene.add(suelo);

camera.position.set(0, 1.3, 8);
camera.lookAt(0, 0.7, 0);

function animate(time) {
  controls.update();

  const orbitRadius = 1;
  const orbitSpeed = 0.0012;
  const angle = time * orbitSpeed;
  PointLight.position.x = Math.cos(angle) * orbitRadius - 0.2;
  PointLight.position.z = Math.sin(angle) * orbitRadius;
  PointLight.position.y = 2 + Math.sin(time / 1200) * 0.1;

  estrellaData.forEach((data, idx) => {
    if (data.isShooting) {
      if (!data.active) {
        if (Math.random() < 0.0025) {
          data.active = true;
          data.estrella.intensity = 0.75 + Math.random() * 0.35;
          data.direction.set(
            (Math.random() > 0.5 ? -1 : 1),
            -0.35,
            (Math.random() - 0.5) * 0.5
          ).normalize();
          const startX = data.direction.x > 0 ? -6 : 6;
          data.estrella.position.set(startX, 7.5 + Math.random() * 0.8, (Math.random() - 0.5) * 6);
          data.brillo.position.copy(data.estrella.position);
        }
      } else {
        data.estrella.position.addScaledVector(data.direction, data.speed);
        data.brillo.position.copy(data.estrella.position);
        if (data.estrella.position.y < 2.8 || Math.abs(data.estrella.position.x) > 7 || Math.abs(data.estrella.position.z) > 7) {
          data.active = false;
          data.estrella.intensity = 0.08 + Math.random() * 0.12;
          data.estrella.position.copy(data.basePosition);
          data.brillo.position.copy(data.basePosition);
        }
      }
    } else {
      data.estrella.position.x = data.basePosition.x + Math.sin(time * 0.0007 + idx) * data.sway;
      data.estrella.position.z = data.basePosition.z + Math.cos(time * 0.0008 + idx * 1.2) * data.sway;
      data.estrella.position.y = data.basePosition.y + Math.sin(time * 0.0011 + idx * 0.9) * 0.2;
      data.brillo.position.copy(data.estrella.position);
    }
  });

  PointLightHelper.update();

  cola.rotation.z = -0.25 + Math.sin(time / 700) * 0.12;
  pupila.position.y = 1.2 + Math.sin(time / 300) * 0.02;
  pupila.position.x = -2.05 + Math.sin(time / 800) * 0.01;
  renderer.render(scene, camera);
}

