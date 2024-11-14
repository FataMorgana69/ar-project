// Проверка поддержки WebXR
if (navigator.xr) {
    const enterARButton = document.getElementById('enter-ar');
    const errorMessage = document.getElementById('error-message');
    
    // Убираем сообщение об ошибке, если AR поддерживается
    errorMessage.textContent = '';
    
    enterARButton.addEventListener('click', function() {
        navigator.xr.requestDevice().then(function(device) {
            device.requestSession('immersive-ar').then(function(session) {
                // Успешный запуск AR-сессии
                let xrRefSpace = session.requestReferenceSpace('local');
                
                // Создаем сцену и модель
                const scene = new THREE.Scene();
                const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
                const renderer = new THREE.WebGLRenderer({ antialias: true });
                document.body.appendChild(renderer.domElement);

                const loader = new THREE.GLTFLoader();
                loader.load('models/stol.gltf', function(gltf) {
                    const model = gltf.scene;
                    scene.add(model);
                }, undefined, function(error) {
                    console.error('Ошибка загрузки модели: ', error);
                    errorMessage.textContent = 'Ошибка загрузки модели!';
                });

                // Обработка жестов (поворот и масштаб)
                let isScaling = false;
                let initialDistance = 0;
                let initialRotation = { x: 0, y: 0 };

                function onTouchStart(event) {
                    if (event.touches.length === 2) {
                        isScaling = true;
                        initialDistance = getDistance(event.touches[0], event.touches[1]);
                    }
                }

                function onTouchMove(event) {
                    if (isScaling && event.touches.length === 2) {
                        let newDistance = getDistance(event.touches[0], event.touches[1]);
                        let scaleFactor = newDistance / initialDistance;
                        model.scale.set(scaleFactor, scaleFactor, scaleFactor);
                    } else if (event.touches.length === 1) {
                        let deltaX = event.touches[0].clientX - initialTouchPosition.x;
                        let deltaY = event.touches[0].clientY - initialTouchPosition.y;

                        model.rotation.x = initialRotation.x + deltaY * 0.005;
                        model.rotation.y = initialRotation.y + deltaX * 0.005;
                    }
                }

                function onTouchEnd(event) {
                    isScaling = false;
                }

                function getDistance(touch1, touch2) {
                    let dx = touch1.clientX - touch2.clientX;
                    let dy = touch1.clientY - touch2.clientY;
                    return Math.sqrt(dx * dx + dy * dy);
                }

                document.addEventListener('touchstart', onTouchStart);
                document.addEventListener('touchmove', onTouchMove);
                document.addEventListener('touchend', onTouchEnd);

                // Обработка ошибок доступа к камере
                navigator.mediaDevices.getUserMedia({ video: true })
                    .then(function(stream) {
                        console.log("Камера доступна.");
                    })
                    .catch(function(error) {
                        console.error("Ошибка доступа к камере: ", error);
                        errorMessage.textContent = 'Ошибка доступа к камере!';
                    });

                // Отображение сцены
                function animate() {
                    renderer.render(scene, camera);
                    requestAnimationFrame(animate);
                }
                animate();
            }).catch(function(error) {
                console.log("Ошибка при запуске AR: ", error);
                errorMessage.textContent = 'Ошибка при запуске AR!';
            });
        }).catch(function(error) {
            console.log("WebXR не поддерживается этим устройством: ", error);
            errorMessage.textContent = 'WebXR не поддерживается этим устройством.';
        });
    });
} else {
    // WebXR не поддерживается
    document.getElementById('error-message').textContent = 'WebXR не поддерживается этим браузером или устройством.';
}
