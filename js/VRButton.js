/**
 * @author WestLangley / https://github.com/westlangley
 * @description: Кнопка для активации WebXR для VR и AR в Three.js
 */

THREE.VRButton = {

    createButton: function ( renderer ) {
  
      var button = document.createElement( 'button' );
      button.style.display = 'none';
      button.style.position = 'absolute';
      button.style.bottom = '20px';
      button.style.left = '20px';
      button.style.zIndex = '1000';
      button.style.padding = '10px 20px';
      button.style.fontSize = '18px';
      button.style.backgroundColor = '#1e88e5';
      button.style.color = 'white';
      button.style.border = 'none';
      button.style.borderRadius = '5px';
      button.innerHTML = 'Enter AR';
  
      document.body.appendChild( button );
  
      // Функция для начала работы с WebXR
      function onEnterAR() {
        renderer.xr.enabled = true;
        document.body.appendChild( renderer.domElement );
        button.style.display = 'none'; // Скрыть кнопку, когда мы в AR
  
        navigator.xr.requestDevice().then(function(device) {
          return device.requestSession({immersive: true, environment: true});
        }).then(function(session) {
          renderer.xr.setSession(session);
        }).catch(function(error) {
          console.error('Error in WebXR session request:', error);
        });
      }
  
      // Добавить событие клика на кнопку
      button.addEventListener( 'click', onEnterAR );
  
      return button;
  
    }
  
  };
  