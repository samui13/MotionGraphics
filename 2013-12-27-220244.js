(function(){
    var SCREEN_WIDTH = window.innerWidth,
    SCREEN_HEIGHT = window.innerHeight;
    var App = {
	'width':window.innerWidth,
	'height':window.innerHeight,
	'scene': new THREE.Scene(),
	'light' : new THREE.DirectionalLight(0xffffff,1),
	'ambient': new THREE.AmbientLight(0x550000),
	'helper' : new THREE.AxisHelper(1000),
	'camera': new THREE.PerspectiveCamera(45,this.width/this.height,1,1500),
	'renderer': new THREE.WebGLRenderer(),
	'initRender' : (function(){
	    this.light.position = new THREE.Vector3(0,100,33);
	    this.helper.position = new THREE.Vector3(0,0,0);
	    this.camera.position = new THREE.Vector3(0,0,1500);
	    this.camera.lookAt(new THREE.Vector3(0,0,0));

	    this.renderer.setSize(this.width,this.height);
	    this.renderer.setClearColor(0xeeeeee,1);
	    
	    this.scene.add(this.light);
	    this.scene.add(this.ambient);
	    this.scene.add(this.helper);
	    document.getElementById('stage').appendChild(this.renderer.domElement);
	    this.renderer.render(this.scene,this.camera);
	}),
	'fontInfo': {
	    'size':40,
	    'curveSegments':20,
	    'height' : 3,
	    'font': 'abcdef',
	    'material' : 0,
	    'extrudeMaterial' : 1,
	},
	'initObject' : (function(){
	    this.geometry = new THREE.CubeGeometry(50,50,50);
	    this.material = new THREE.MeshBasicMaterial({color:'#f00'});
	    this.cube = new THREE.Mesh(this.geometry,this.material);
	    this.cube.position = new THREE.Vector3(0,0,0);
	    this.scene.add(this.cube);
	    this.renderer.render(this.scene,this.camera);
	}),
	
    };
    $(document).ready(function(){
	App.initRender();
	App.initObject();
	
	App.renderer.render(App.scene,App.camera);
    });
})();
