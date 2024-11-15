// Функция для запуска AR
document.getElementById('enter-ar').addEventListener('click', function() {
    const scene = document.querySelector('a-scene');
    
    // Проверим поддержку WebXR
    if (navigator.xr && navigator.xr.isSessionSupported) {
        navigator.xr.isSessionSupported('immersive-ar').then(function(supported) {
            if (supported) {
                // Если поддержка есть, запускаем AR
                scene.enterVR();
            } else {
                alert("AR не поддерживается на вашем устройстве.");
            }
        }).catch(function(error) {
            console.error("Ошибка при проверке поддержки AR:", error);
            alert("Ошибка при проверке AR.");
        });
    } else {
        alert("AR не поддерживается на вашем устройстве.");
    }
});
