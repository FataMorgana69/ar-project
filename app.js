// Получаем кнопку для запуска AR
const enterARButton = document.getElementById('enter-ar-button');

// Убедимся, что WebXR доступен
if (navigator.xr) {
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
    // WebXR не поддерживается, показываем сообщение
    alert('WebXR не поддерживается этим браузером. Попробуйте использовать другой браузер или устройство.');
}
