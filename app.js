let sceneEl = document.createElement('a-scene');
sceneEl.setAttribute('embedded', true);
sceneEl.setAttribute('arjs', 'sourceType: webcam; debugUIEnabled: false;');

// Камера и сцена AR
let cameraEl = document.createElement('a-camera');
cameraEl.setAttribute('position', '0 1.6 0'); // Позиция камеры
sceneEl.appendChild(cameraEl);

// Добавляем кнопку для активации AR
const enterARButton = document.getElementById('enter-ar-button');

// Проверка на поддержку WebXR
if (navigator.xr) {
  enterARButton.style.display = 'block';
  enterARButton.addEventListener('click', () => {
    navigator.xr.requestSession('immersive-ar', {
      requiredFeatures: ['hit-test']
    }).then(onSessionStarted).catch((err) => {
      console.error("AR Session failed", err);
      // Запуск AR.js, если WebXR не поддерживается
      startARJS();
    });
  });
} else {
  startARJS();
}

// Функция для работы с WebXR
function onSessionStarted(session) {
  const canvas = document.createElement('canvas');
  document.body.appendChild(canvas);

  const renderer = new THREE.WebGLRenderer({ canvas: canvas });
  renderer.xr.enabled = true;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
  camera.position.set(0, 1.6, 2);  // Позиция камеры

  scene.add(camera);

  session.requestAnimationFrame(animate);

  function animate() {
    renderer.render(scene, camera);
    session.requestAnimationFrame(animate);
  }
}

// Функция для запуска AR.js без маркера
function startARJS() {
  const arScene = document.createElement('a-scene');
  arScene.setAttribute('embedded', true);
  arScene.setAttribute('arjs', 'sourceType: webcam; debugUIEnabled: false;');

  // Добавляем плоскость
  const ground = document.createElement('a-plane');
  ground.setAttribute('position', '0 0 -2');
  ground.setAttribute('rotation', '-90 0 0');
  ground.setAttribute('width', '5');
  ground.setAttribute('height', '5');
  ground.setAttribute('color', '#ccc');

  arScene.appendChild(ground);

  // Создаем 3D модель и позиционируем ее на плоскости
  const model = document.createElement('a-entity');
  model.setAttribute('gltf-model', 'models/stol.gltf'); // Путь к 3D модели
  model.setAttribute('scale', '0.1 0.1 0.1'); // Устанавливаем фиксированный масштаб
  model.setAttribute('position', '0 0 0'); // Устанавливаем позицию модели на плоскости

  arScene.appendChild(model);

  const button = document.getElementById('enter-ar-button');
  button.style.display = 'none'; // Скрываем кнопку после начала AR

  document.body.appendChild(arScene);
}
