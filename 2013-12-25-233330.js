(function(){
    var word = [
	'東中出身',
	'涼宮ハルヒ',
	'ただの人間には興味ありません。',
	'このなかに',
	'宇宙人',
	'未来人',
	'異世界人',
	'超能力者',
	'がいたら',
	'あたしの',
	'ところに',
	'きなさい。',
	'以上',
    ];
    var App = {};
    App.animate = (function(){
	App.sceneOne();
	App.camera.position.x -= 10;
	App.renderer.render(App.scene,App.camera);
	App.nowAnime = window.requestAnimationFrame(App.animateOne);
	//App.animate();
    });
    App.animateOne = (function(){
	if (App.camera.position.z < 300){
	    App.camera.position.z +=10;
	    App.renderer.render(App.scene,App.camera);
	    App.nowAnime = window.requestAnimationFrame(App.animateOne);
	}else{
	    cancelAnimationFrame(App.nowAnime);
	    App.nowAnime = window.requestAnimationFrame(App.animateTwo);
	}
    });
    App.animateTwo = (function(){
	if (App.camera.position.z > 280){
	    App.camera.position.z -=5;
	    App.renderer.render(App.scene,App.camera);
	    App.nowAnime = window.requestAnimationFrame(App.animateTwo);
	}else{
	    cancelAnimationFrame(App.nowAnime);
	    App.nowAnime = window.requestAnimationFrame(App.animateTwoTwo);
	}
    });
    App.animateTwoTwo = (function(){
	if (App.camera.position.z < 300){
	    App.camera.position.z +=3;
	    App.renderer.render(App.scene,App.camera);
	    cancelAnimationFrame(App.nowAnime);
	    App.nowAnime = window.requestAnimationFrame(App.animateTwoTwo);
	}else{
	    cancelAnimationFrame(App.nowAnime);
	    App.AddWordTwo();
	    App.Interval = setInterval((function(){
		clearInterval(App.Interval);
		App.nowAnime = window.requestAnimationFrame(App.animateThree);
}),300);
	}
    });
    App.animateThree = (function(){
	var task0 = false;
	var task1 = false;
	var task2 = false;
	var task3 = false;
	if ((App.textArr.rotation.z >= Math.PI/2)){
	    task0 = true;
	}else{
	    App.textArr.rotation.z += Math.PI/180*10;
	}
	if ((App.camera.position.y >=100)&&
	   (App.camera.position.x >=100) &&
	   (App.camera.position.z>=400)){
	    task1 = true;
	}else{
	    App.camera.position.y+=11;
	    App.camera.position.x+=10;
	    App.camera.position.z+=10;
	}
	if(App.textArr2.position.x <=-1000){
	    task2 = true;
	}else{
	    App.textArr.position.x -=25;
	    App.textArr2.position.x-=25;
	}
	if(task0 == false || task1 == false || task2 == false){
	    App.renderer.render(App.scene,App.camera);
	    cancelAnimationFrame(App.nowAnime);
	    App.nowAnime = window.requestAnimationFrame(App.animateThree);
	}else{
	    cancelAnimationFrame(App.nowAnime);	
	    App.nowAnime = window.requestAnimationFrame(App.animateFour);
	}
	
    });
    App.animateFour = (function(){
	var task3 = false;
	if(App.camera.position.z >= 1000
	  && App.textArr2.rotation.z < -Math.PI/2+0.000000001
	  && App.textArr.rotation.z < 0.000000001){
	    task3 = true;
	}else{
	    App.camera.position.z+=50;
	    //App.camera.position.y-=10;
	    App.textArr2.position.y+=40;
	    App.textArr.position.y+=40;
	    App.textArr2.rotation.z -= Math.PI/180*6;
	    App.textArr.rotation.z -= Math.PI/180*6;
	}
	if(task3 == false){
	    App.renderer.render(App.scene,App.camera);
	    cancelAnimationFrame(App.nowAnime);
	    App.nowAnime = window.requestAnimationFrame(App.animateFour);
	}else{
	    
	    cancelAnimationFrame(App.nowAnime);
	    App.Interval = setInterval((function(){
		clearInterval(App.Interval);
		App.nowAnime = window.requestAnimationFrame(App.animateFive);
}),500);
	}
	
    });
    App.animateFive = (function(){
	var task0 = false;
	App.textArr2.rotation.y = -Math.PI/2;
	App.textArr.rotation.y = -Math.PI/2;
	App.textArr2.position.x = 0;
	App.textArr.position.x=0;
	
	if(!task0){
	    App.renderer.render(App.scene,App.camera);
	    cancelAnimationFrame(App.nowAnime);
	    App.nowAnime = window.requestAnimationFrame(App.animateFive);
	}
    });
    App.sceneOne = (function(){
	App.textArr = new THREE.Mesh(new THREE.TextGeometry( word[0], App.fontIni ), App.mat);
	//App.textArr.position = new THREE.Vector3(-100,0,-10);
	App.textArr.position = new THREE.Vector3(-1*(App.width/10),0,100);
	App.scene.add(App.textArr);
    });
    App.AddWordTwo = (function(){
	App.fontIni2 = App.fontIni;
	App.fontIni2.size = 150;
	App.textArr2 = new THREE.Mesh(new THREE.TextGeometry(word[1],App.fontIni2),App.mat);
	App.textArr2.position = new THREE.Vector3(-1*(App.width/10),30,100);
	App.scene.add(App.textArr2);
    });
    var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;

    App.width = SCREEN_WIDTH;
    App.height = SCREEN_HEIGHT;
    // scene
    App.scene  = new THREE.Scene();
    // mesh
    //App.geometry = new THREE.CubeGeometry(50,50,50);
    //var material = new THREE.MeshBasicMaterial({color: '#f00'});
    //App.material = new THREE.MeshLambertMaterial({color: '#f00'});
    //App.cube  =  new THREE.Mesh(geometry,material);
    //App.cube.position.set(0,0,0);
    //scene.add(cube);
    // Text
    //var text = new THREE.TextGeometry('SampleTEXT日本語',{size:100});
    
    App.mat = new THREE.MeshFaceMaterial([
      new THREE.MeshLambertMaterial({ color: '#0095d9' }),
      new THREE.MeshLambertMaterial({ color: 0x66ccff })
    ]);

    App.fontIni = {
      size: 40, curveSegments: 20, height:3,
      font: 'abcdef',
      material:0, extrudeMaterial:1
    };


    // light
    App.light = new THREE.DirectionalLight(0xffffff,1);
    App.light.position = new THREE.Vector3(0,100,33);
    App.scene.add(App.light);
    App.ambient = new THREE.AmbientLight(0x550000);
    App.scene.add(App.ambient);
    //helper
    App.axis = new THREE.AxisHelper(1000);
    App.axis.position = new THREE.Vector3(0,0,0);
    App.scene.add(App.axis);
    // camera
    App.camera = new THREE.PerspectiveCamera(60,App.width/App.height,1,2000);
    //App.camera.position = new THREE.Vector3(200,200,500);
    App.camera.position = new THREE.Vector3(0,0,100);
    App.camera.lookAt(new THREE.Vector3(0,0,0));
    // rendering
    App.renderer = new THREE.WebGLRenderer();
    App.renderer.setSize(App.width,App.height);
    App.renderer.setClearColor(0xeeeeee,1);
    document.getElementById('stage').appendChild(App.renderer.domElement);
    
    App.animate();
})();
