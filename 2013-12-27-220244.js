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
	'camera': new THREE.PerspectiveCamera(45,0,1,1500),
	'renderer': new THREE.WebGLRenderer(),
	'initRender' : (function(){
	    this.light.position = new THREE.Vector3(50,50,33);
	    //this.light.position = new THREE.Vector3(0,-350,33);
	    this.helper.position = new THREE.Vector3(0,0,0);
	    this.camera.aspect = this.width/this.height;
	    // カメラ数値アップデート
	    this.camera.updateProjectionMatrix();

	    //this.camera.position = new THREE.Vector3(400,300,700);
	    this.camera.position = new THREE.Vector3(0,0,100);
	    //this.camera.position = new THREE.Vector3(0,0,50);
	    this.camera.lookAt(new THREE.Vector3(0,0,0));

	    this.renderer.setSize(this.width,this.height);
	    this.renderer.setClearColor(0xeeeeee,1);
	    document.getElementById('stage').appendChild(this.renderer.domElement);

	    this.scene.add(this.light);
	    this.scene.add(this.ambient);
	    this.scene.add(this.helper);
	    
	    this.reload();
	}),
	'initObject' : (function(){
	    this.geometry = new THREE.CubeGeometry(50,50,50);
	    //this.material = new THREE.MeshBasicMaterial({color:'#f00'});
	    this.material = new THREE.MeshLambertMaterial({color: 0x00ff00});
	    this.cube = new THREE.Mesh(this.geometry,this.material);
	    this.cube.position = new THREE.Vector3(-50,0,0);
	    this.scene.add(this.cube);
	    this.reload();
	}),
	'moveLight' : (function(){
	    //this.light.position
	}),
	'anime' : (function(func){
	    console.log(func);
	    //window.cancelAnimationFrame(this.nowAnime);
	    //this.nowAnime = window.requestAnimationFrame(func);
	}),
	'reload' : (function(){
	    this.renderer.render(this.scene,this.camera);
	}),
    };
    SceneObj = {
	'mat' : new THREE.MeshFaceMaterial([
	    new THREE.MeshLambertMaterial({ color: '#0095d9' }),
	    new THREE.MeshLambertMaterial({ color: 0x66ccff })
	]),
	'fontInfo': {
	    'size':40,
	    'curveSegments':20,
	    'height' : 3,
	    'font': 'abcdef',
	    'material' : 0,
	    'extrudeMaterial' : 1,
	},
	'WordGeometry' : [],
	'AddWord' : (function(size,word,position){
	    var wordOpt = {};
	    wordOpt.fontInfo = this.fontInfo;
	    wordOpt.fontInfo.size = size;
	    wordOpt.textArr = new THREE.Mesh(new THREE.TextGeometry(word,wordOpt.fontInfo),new THREE.MeshLambertMaterial({'color':'#F00'}));//this.mat);
	    
	    wordOpt.textArr.position = position;
	    this.WordGeometry.push(wordOpt);
	    return wordOpt.textArr;
	}),
	'getGeometry' : (function(id){
	    if (id > this.WordGeometry.length){
		return NULL;
	    }
	    return this.WordGeometry[id].textArr;
	}),
	'get' : (function(id){
	    if (id > this.WordGeometry.length){
		return NULL;
	    }
	    return this.WordGeometry[id];
	}),
    };
    
    TEST = {
	'geo': new THREE.Geometry(),
	'container': new THREE.Object3D(),
	'test' : (function(){
	    THREE.GeometryUtils.merge(this.geo,
				      SceneObj.getGeometry(0));
	    THREE.GeometryUtils.merge(this.geo,
				      SceneObj.getGeometry(1));
	    var mesh = new THREE.Mesh(this.geo, new THREE.MeshLambertMaterial());
	    this.container.add(mesh);
	    //this.container.rotation.z = -Math.PI/4;
	    //this.container.rotation.y = -Math.PI/2;
	    //this.container.position.y = -60;
	    App.scene.add(this.container);
	    App.reload();

	}),
    };
    App.initRender();
    //App.initObject();
    App.reload();
    var temp = SceneObj.AddWord(10,'東中出身',new THREE.Vector3(-28,0,0));
    App.scene.add(temp);

    var tween0 = new TWEEN.Tween(temp.position).to({z:30},1000)
        .easing(TWEEN.Easing.Elastic.Out);
    var tween2= new TWEEN.Tween(temp.rotation).to({z:Math.PI/2},200)
	.easing(TWEEN.Easing.Linear.None);
    var tween3= new TWEEN.Tween(temp.position).to({y:-27},200)
	.easing(TWEEN.Easing.Linear.None)
	.onStart(function(){
	    tween2.start();
	});
    
    tween0.chain(tween3);
    tween0.start();
    var test2 = (function(){
	//console.log(temp.position);
	
	App.nowAnime = window.requestAnimationFrame(test2);
	TWEEN.update();
	App.reload();
    });
    test2();
    
    

    // App.anime(test);
   
    //temp.rotation.z = Math.PI/2;
    
    /*
      var temp = SceneObj.AddWord(50,'涼宮ハルヒ',new THREE.Vector3(0,0,0));
    temp.rotation.z = Math.PI/2;
    var temp = SceneObj.AddWord(30,'ただの',new THREE.Vector3(0,0,0));
    temp.rotation.x = -Math.PI/2;
    //temp.uniforms.fraction.value = 100;
    temp.scale = new THREE.Vector3(0.9,0.9,0.9);
    var temp = SceneObj.AddWord(100,'人間',new THREE.Vector3(0,0,120));
    temp.rotation.x = -Math.PI/2;
    var temp = SceneObj.AddWord(30,'には',new THREE.Vector3(180,0,0));
    temp.rotation.x = -Math.PI/2;
    var temp = SceneObj.AddWord(100,'興味',new THREE.Vector3(0,0,250));
    temp.rotation.x = -Math.PI/2;
    var temp = SceneObj.AddWord(40,'ありません。',new THREE.Vector3(0,0,320));
    temp.rotation.x = -Math.PI/2;
    
    App.scene.add(SceneObj.getGeometry(2));
    App.scene.add(SceneObj.getGeometry(3));
    App.scene.add(SceneObj.getGeometry(4));
    App.scene.add(SceneObj.getGeometry(5));
    App.scene.add(SceneObj.getGeometry(6));
    */
//    TEST.test();
    
    App.reload();
    
})();
