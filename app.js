// Получаем кнопку для запуска AR
document.getElementById('enter-ar').addEventListener('click', function() {
    const scene = document.querySelector('a-scene');
    
    // Проверим, поддерживает ли устройство AR
    if (navigator.xr && navigator.xr.isSessionSupported) {
        navigator.xr.isSessionSupported('immersive-ar').then(function(supported) {
            if (supported) {
                // Если поддержка AR есть, активируем AR-сцену
                scene.enterVR();
            } else {
                alert("AR не поддерживается на этом устройстве.");
            }
        }).catch(function(error) {
            console.error("Ошибка при проверке поддержки AR:", error);
            alert("Ошибка при проверке AR.");
        });
    } else {
        alert("AR не поддерживается на этом устройстве.");
    }
});
