const xrButton = document.getElementById('xr-button');

// Функция для отображения/скрытия кнопки в зависимости от поддержки WebXR
if (navigator.xr) {
    xrButton.style.display = 'block';

    xrButton.addEventListener('click', function () {
        navigator.xr.requestSession('immersive-ar').then(function (session) {
            // Обрабатываем подключение AR-сессии
            session.addEventListener('end', function () {
                xrButton.style.display = 'block'; // Показываем кнопку после завершения сессии
            });
        });
    });
} else {
    // Если WebXR не поддерживается, показываем альтернативное сообщение
    alert('WebXR не поддерживается этим устройством.');
}
