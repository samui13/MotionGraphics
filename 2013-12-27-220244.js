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
	    //this.camera.position = new THREE.Vector3(0,500,0);
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
    var animeList = (function(){
	function F() {}
	F.prototype = Array();
	F.prototype.prototype = {'test':"animeList"};
	return  new F();
    });
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
    var groupGeometry = (function(){
	function F() {
	    this.geo = new THREE.Geometry();
	    //this.container = new THREE.Object3D();
	    this.mesh = new THREE.Mesh(this.geo,new THREE.MeshLambertMaterial({'color':'#f00'}));
	    this.add(this.mesh);
	    this.merge = (function(obj){
		THREE.GeometryUtils.merge(this.geo,obj);
	    });
	};
	F.prototype = new THREE.Object3D();
	return new F();
    });
    App.initRender();
    //App.initObject();
    App.reload();
    
    var motions = new animeList();
    console.log(motions.prototype.test);

    var temp = SceneObj.AddWord(10,'東中出身',new THREE.Vector3(-28,0,0));
    App.scene.add(temp);
    var temp = SceneObj.AddWord(60,'涼宮ハルヒ',new THREE.Vector3(150,-32,30));
    //var t = SceneObj.AddWord(30,'ただの',new THREE.Vector3(temp.position.x,temp.position.y+10,-45));
    SceneObj.AddWord(30,'ただの',new THREE.Vector3(0,0,0));
    SceneObj.AddWord(100,'人間',new THREE.Vector3(0,0,0));
    SceneObj.AddWord(30,'には',new THREE.Vector3(0,0,0));
    SceneObj.AddWord(100,'興味',new THREE.Vector3(0,0,0));
    SceneObj.AddWord(40,'ありません。',new THREE.Vector3(0,0,0));
    
    motions.push(new TWEEN.Tween(SceneObj.getGeometry(0).position)
		 .to({z:30},1000)
		 .easing(TWEEN.Easing.Elastic.Out));
    motions.push(new TWEEN.Tween(SceneObj.getGeometry(0).rotation)
		 .to({z:Math.PI/2+0.3},200)
		 .easing(TWEEN.Easing.Linear.None));
    
    motions.push(new TWEEN.Tween(SceneObj.getGeometry(0).position)
		 .to({y:-27},200)
		 .easing(TWEEN.Easing.Linear.None)
		 .onStart(function(){
		     motions[1].start();
		     motions[3].start();
		     App.scene.add(SceneObj.getGeometry(1));
		 }));
    var temp = new groupGeometry();
    var temp1 = new groupGeometry();
    motions.push(new TWEEN.Tween(SceneObj.getGeometry(1).position)
		 .to({x:-30},150)
		 .easing(TWEEN.Easing.Linear.None)
		 .onStart(function(){
		     
		 })
		.onComplete(function(){
		    App.scene.remove(SceneObj.getGeometry(0));
		    App.scene.remove(SceneObj.getGeometry(1));
		    temp.merge(SceneObj.getGeometry(0));
		    temp.merge(SceneObj.getGeometry(1));
		    App.scene.add(temp);
		    motions[3].chain(motions[4]);
		}));
    motions.push(new TWEEN.Tween(temp.position)
		 .to({x:-400},800)
		 .easing(TWEEN.Easing.Linear.None)
		 .onComplete(function(){
		     motions[5].start();
		     motions[6].start();
		     //motions[4].chain(motions[5]);
		     //motions[4].chain(motions[6]);
		 }));
    motions.push(new TWEEN.Tween(temp.rotation)
		 .to({z:-Math.PI/2},100)
		 .easing(TWEEN.Easing.Linear.None)
		 .onComplete(function(){
		 }));
    motions.push(new TWEEN.Tween(temp.position)
		 .to({x:-150,y:180,z:-500},300)
		 .easing(TWEEN.Easing.Linear.None)
		 .onComplete(function(){
		 }));
    // 7
    motions.push(new TWEEN.Tween(temp.position)
		 .to({x:-50,y:0,z:-100},300)
		 .delay(800)
		 .easing(TWEEN.Easing.Linear.None)
		 .onStart(function(){
		     motions[8].start();
		     //motions[9].start();
		 })
		 .onComplete(function(){
		     var t = SceneObj.getGeometry(2);
		     t.rotation.y = Math.PI/8*2;
		     t.position.z = 0;
		     t.position.x = -20;
		     t.scale.x = 0.1;
		     t.scale.y = 0.1;
		     t.scale.z = 0.1;
		     App.scene.add(t);
		     App.reload();
		     //motions[9].start();
		 }));
    // 8
    motions.push(new TWEEN.Tween(temp.rotation)
		 .to({y:-Math.PI/8*2},200)
		 .easing(TWEEN.Easing.Linear.None)
		 .onComplete(function(){
		     /*
		     var t = SceneObj.getGeometry(4);
		     t.position.x = 100;
		     t.position.y = 0;
		     t.position.z = -120;
		     t.rotation.y = Math.PI/8*2;
		     App.scene.add(t);
		     */
		 })
		);
    // 9
    motions.push(new TWEEN.Tween(SceneObj.getGeometry(2).scale)
		 .to({x:1.0,y:1.0,z:1.0},40)
		 .easing(TWEEN.Easing.Linear.None)
		 .onStart(function(){
		     motions[10].start();
		 })
		 .onComplete(function(){
		     // 人間
		     var t = SceneObj.getGeometry(3);
		     t.position.x = -20;
		     t.position.y = -120;
		     t.rotation.y = Math.PI/8*2;
		     App.scene.add(t);
		 }));
		
    // 10
    motions.push(new TWEEN.Tween(SceneObj.getGeometry(3).rotation)
		 .delay(500)
		 .to({y:2*Math.PI+Math.PI/8*2},40)
		 .onStart(function(){
		     //App.camera.position = new THREE.Vector3(0,500,0);
		 })
		 .onComplete(function(){
		     App.scene.remove(SceneObj.getGeometry(2));
		     App.scene.remove(SceneObj.getGeometry(3));
		     //App.scene.remove(SceneObj.getGeometry(4));
		     temp1.merge(SceneObj.getGeometry(2));
		     temp1.merge(SceneObj.getGeometry(3));
		     App.scene.add(temp1);
		 }));
    //11
    motions.push(new TWEEN.Tween(temp1.position)
		 .to({x:0,y:100},80)
		 .easing(TWEEN.Easing.Quartic.In)
		 .onStart(function(){
		     motions[12].start();
		 }));
    //12
    motions.push(new TWEEN.Tween(temp.position)
		.to({x:-20,y:100},80)
		.easing(TWEEN.Easing.Quartic.In));
    //13
    motions.push(new TWEEN.Tween(App.camera.position)
		 .delay(400)
		 .to({x:120,y:120},1000)
		 .easing(TWEEN.Easing.Exponential.Out)
		 .onStart(function(){
		     var t = SceneObj.getGeometry(4);
		     t.position.x = 100;
		     t.position.y = 100;
		     t.position.z = -120;
		     t.rotation.y = Math.PI/8*2;
		     t.scale.x = 0.1;
		     t.scale.y = 0.1;
		     t.scale.z = 0.1;
		     App.scene.add(t);
		     motions[14].start();
		     motions[15].start();
		 }));
    // 14 
    motions.push(new TWEEN.Tween(SceneObj.getGeometry(4).scale)
		 .to({x:1.0,y:1.0,z:1.0},400)
		 .easing(TWEEN.Easing.Linear.None));
    //15
    motions.push(new TWEEN.Tween(App.camera.rotation)
		 .to({y:Math.PI/8},1000)
		.onStart(function(){
		}));
    /// 16
    motions.push(new TWEEN.Tween(App.camera.position)
		 .to({y:-85},500)
		.onStart(function(){
		    var t = SceneObj.getGeometry(5);
		    t.position.x = -1000;
		    t.position.y = -150;
		    t.position.z = 1000;
		    t.rotation.y = Math.PI/8*2;
		    App.scene.add(t);
		    //temp1.merge();
		    motions[17].start();
		}));
    //17
    motions.push(new TWEEN.Tween(SceneObj.getGeometry(5).position)
		 .to({x:0,z:-20},800)
		 .easing(TWEEN.Easing.Elastic.Out)
		 .onComplete(function(){
		     var t = SceneObj.getGeometry(6);
		     t.position.x = 0;
		     t.position.y = -250;
		     t.position.z = -20;
		     t.rotation.y = Math.PI/8*2;
		     t.scale.x = 0.0;
		     t.scale.y = 0.0;
		     t.scale.z = 0.0;
		     App.scene.add(t); 
		 }));
    // 18
    motions.push(new TWEEN.Tween(App.camera.position)
		 .to({y:-220},500)
		.onStart(function(){
		    motions[19].start();
		    
		}));
    // 19
    motions.push(new TWEEN.Tween(SceneObj.getGeometry(6).scale)
		 .to({x:1.0,y:2.0,z:1.0},400)
		 .easing(TWEEN.Easing.Linear.None)
		.onStart(function(){
		}));
    //20
    motions.push(new TWEEN.Tween(App.camera.position)
		 .to({x:200,y:-80,z:500},400)
		 .onStart(function(){
		     motions[21].start();
		 }));
    // 21
    motions.push(new TWEEN.Tween(App.camera.rotation)
		 .to({},400));
    
    motions[0].chain(motions[2]);
    motions[2].chain(motions[3]);
    motions[6].chain(motions[7]);
    motions[7].chain(motions[9]);
    motions[10].chain(motions[11]);
    motions[12].chain(motions[13]);
    motions[13].chain(motions[16]);
    motions[16].chain(motions[18]);
    motions[18].chain(motions[20]);
    motions[0].start();
    var test2 = (function(){
	App.nowAnime = window.requestAnimationFrame(test2);
	TWEEN.update();
	App.reload();
    });
    test2();
    
    

    // App.anime(test);
    
    /*
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
