// Функция для запуска AR с WebXR
function startWebXR() {
    if (navigator.xr) {
        const enterARButton = document.getElementById('enter-ar-button');
        enterARButton.style.display = 'block';
        
        // Слушаем клик по кнопке
        enterARButton.addEventListener('click', function () {
            // Пытаемся войти в AR режим через WebXR
            navigator.xr.requestSession('immersive-ar', {
                requiredFeatures: ['hit-test']
            }).then(onSessionStarted).catch((err) => {
                console.error("AR Session failed", err);
            });
        });
        
        function onSessionStarted(session) {
            // Создаем рендерер Three.js для WebXR
            const canvas = document.createElement('canvas');
            document.body.appendChild(canvas);
        
            const renderer = new THREE.WebGLRenderer({ canvas: canvas });
            renderer.xr.enabled = true;
        
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera();
            scene.add(camera);
        
            const controller = renderer.xr.getController(0);
            scene.add(controller);
        
            const hitTestSource = new XRHitTestSource(session);
            session.addEventListener('end', onSessionEnded);
        
            animate();
        
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
        // WebXR не поддерживается, запускаем AR.js
        startARJS();
    }
}

// Функция для запуска AR с AR.js
function startARJS() {
    const arScene = document.createElement('a-scene');
    arScene.setAttribute('embedded', true);
    arScene.setAttribute('arjs', 'sourceType: webcam; debugUIEnabled: false;');

    const marker = document.createElement('a-marker');
    marker.setAttribute('preset', 'hiro');  // Вы можете выбрать другие маркеры
    marker.setAttribute('id', 'ar-marker');
    
    // Создаем 3D модель с путем к файлу stol.gltf
    const model = document.createElement('a-entity');
    model.setAttribute('gltf-model', 'models/stol.gltf');  // Путь к файлу модели
    model.setAttribute('scale', '0.3 0.3 0.3');
    model.setAttribute('position', '0 0 0');
    
    marker.appendChild(model);
    arScene.appendChild(marker);
    
    const button = document.getElementById('enter-ar-button');
    button.style.display = 'none'; // Скрываем кнопку

    document.body.appendChild(arScene);
}

// Инициализация
startWebXR();
