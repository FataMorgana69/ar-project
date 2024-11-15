document.getElementById('enter-ar').addEventListener('click', function() {
    // Включение AR-сцены при нажатии на кнопку
    const scene = document.querySelector('a-scene');
    scene.enterVR(); // Вход в режим AR
});

const modelEntity = document.querySelector('#model');

// Обработка перемещения модели через сенсорные жесты
let isMoving = false;
let touchStart = { x: 0, y: 0 };

modelEntity.addEventListener('touchstart', (event) => {
    isMoving = true;
    touchStart = { x: event.touches[0].clientX, y: event.touches[0].clientY };
});

modelEntity.addEventListener('touchmove', (event) => {
    if (isMoving) {
        const touchMove = { x: event.touches[0].clientX, y: event.touches[0].clientY };
        const dx = touchMove.x - touchStart.x;
        const dy = touchMove.y - touchStart.y;

        // Перемещение модели на экран
        modelEntity.object3D.position.x += dx * 0.01;
        modelEntity.object3D.position.y -= dy * 0.01;

        // Обновляем начальную точку для следующего движения
        touchStart = touchMove;
    }
});

modelEntity.addEventListener('touchend', () => {
    isMoving = false;
});
