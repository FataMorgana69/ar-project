document.getElementById('enterARBtn').addEventListener('click', function () {
    const scene = document.querySelector('a-scene');
    const arButton = document.querySelector('#enterARBtn');

    if (scene) {
        scene.enterAR();
        arButton.style.display = 'none';  // Скрываем кнопку после активации AR
    }
});
