// Функция для запуска AR с WebXR
function startWebXR() {
  if (navigator.xr) {
    const enterARButton = document.getElementById('enter-ar-button');
    enterARButton.style.display = 'block';

    enterARButton.addEventListener('click', function () {
      // Пытаемся войти в AR режим через WebXR
      navigator.xr.requestSession('immersive-ar', {
        requiredFeatures: ['hit-test']
      }).then(onSessionStarted).catch((err) => {
        console.error("AR Session failed", err);
        // В случае ошибки запускаем AR.js
        startARJS();
      });
    });

    function onSessionStarted(session) {
      const canvas = document.createElement('canvas');
      document.body.appendChild(canvas);

      const renderer = new THREE.WebGLRenderer({ canvas: canvas });
      renderer.xr.enabled = true;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
      camera.position.set(0, 0, 1);  // Устанавливаем камеру на фиксированном расстоянии от модели
      scene.add(camera);

      const controller = renderer.xr.getController(0);
      scene.add(controller);

      session.requestAnimationFrame(animate);

      function animate() {
        renderer.render(scene, camera);
        session.requestAnimationFrame(animate);
      }

      function onSessionEnded() {
        document.body.removeChild(canvas);
        enterARButton.style.display = 'block';
      }
    }
  } else {
    startARJS();
  }
}

// Функция для запуска AR с AR.js
function startARJS() {
  const arScene = document.createElement('a-scene');
  arScene.setAttribute('embedded', true);
  arScene.setAttribute('arjs', 'sourceType: webcam; debugUIEnabled: false;');

  const marker = document.createElement('a-marker');
  marker.setAttribute('preset', 'hiro'); // Вы можете выбрать другие маркеры
  marker.setAttribute('id', 'ar-marker');

  // Создаем 3D модель с путем к файлу stol.gltf
  const model = document.createElement('a-entity');
  model.setAttribute('gltf-model', 'models/stol.gltf');  // Путь к файлу модели
  model.setAttribute('scale', '0.1 0.1 0.1'); // Установим фиксированный масштаб
  model.setAttribute('position', '0 0 0'); // Позиция модели

  marker.appendChild(model);
  arScene.appendChild(marker);

  const button = document.getElementById('enter-ar-button');
  button.style.display = 'none'; // Скрываем кнопку

  document.body.appendChild(arScene);
}

// Инициализация
startWebXR();
