/**
 * @author mrdoob / https://mrdoob.com/
 * @author mikael em
 * @author westlangley / https://github.com/westlangley
 * 
 * @description: Загрузчик GLTF (GL Transmission Format) для загрузки 3D моделей в формате .glb или .gltf.
 */

THREE.GLTFLoader = function ( manager ) {

    this.manager = ( manager !== undefined ) ? manager : THREE.DefaultLoadingManager;
  
  };
  
  THREE.GLTFLoader.prototype = {
  
    constructor: THREE.GLTFLoader,
  
    load: function ( url, onLoad, onProgress, onError ) {
      var scope = this;
  
      var loader = new THREE.XHRLoader( this.manager );
      loader.setResponseType( 'arraybuffer' );
      loader.load( url, function ( buffer ) {
  
        try {
  
          var gltf = scope.parse( buffer, url );
  
          if ( onLoad ) onLoad( gltf );
  
        } catch ( e ) {
  
          if ( onError ) onError( e );
  
        }
  
      }, onProgress, onError );
  
    },
  
    parse: function ( data, path ) {
      var json;
  
      if ( typeof data === 'string' ) {
  
        json = JSON.parse( data );
  
      } else {
  
        json = new TextDecoder().decode( new DataView( data ) );
  
      }
  
      var loader = new THREE.GLTFLoader();
      loader.parse( json, path );
    }
  
  };
  