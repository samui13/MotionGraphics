(function(){
    var word = [
	'東中出身',
	'涼宮ハルヒ',
	'ただの',
	'人間',
	'には',
	'興味',
	'ありません。',
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
	var task1 = false;
	var task2 = false;
	var task3 = false;
	if(App.textArr2.rotation.y <= -Math.PI/2+0.5
	  && App.textArr.rotation.y <=Math.PI/2-0.5){
	    task0 = true;
	}else{
	    App.textArr2.rotation.y -= Math.PI/180*10;
	    App.textArr.rotation.y -= Math.PI/180*10;
	}
	if(App.textArr2.position.x >= 0
	  && App.textArr.position.x >= 0){
	    task1 = true;
	}else{
	    App.textArr2.position.x += 100;
	    App.textArr.position.x += 100;
	}
	
	if(App.textArr2.position.y <=200
	  && App.textArr.position.y <= 200){
	    task2 = true;
	}else{
	    App.textArr2.position.y -= 100;
	    App.textArr.position.y -= 100;
	}
	if (App.camera.position.z <= 600){
	    task3 = true;
	}else{
	    App.camera.position.z -= 50;
	}
	if(!task0 || !task1 || !task2 || !task3){
	    App.renderer.render(App.scene,App.camera);
	    cancelAnimationFrame(App.nowAnime);
	    App.nowAnime = window.requestAnimationFrame(App.animateFive);
	}else{
	    
	    cancelAnimationFrame(App.nowAnime);	
	    App.AddWordFive();
	    App.nowAnime = window.requestAnimationFrame(App.animateSix);
	    
	}
    });
    App.animateSix = (function(){
	var task0 = false;
	var task1 = false;
	//console.log(App.camera.position);
	//App.textArr3.position
	if(App.textArr3.position.x >=130){
	    //App.AddWordSix();
	    task0 = true;
	    if (!App.textArr4){
		App.AddWordSix();
	    }
	}else{
	    App.textArr3.position.x += 120;
	}
	
	if(task0 == true && App.textArr4.position.x >=130){
	    console.log("H");
	    task1 = true;
	}else{
	    if (App.textArr4)
		App.textArr4.position.x += 150;
	}
	/*
	App.camera.position.y = -1200;
	App.camera.position.z = 1000;
	App.camera.lookAt(new THREE.Vector3(180,50,10));
	*/
	if(!task0 || !task1){
	    App.renderer.render(App.scene,App.camera);
	    cancelAnimationFrame(App.nowAnime);
	    App.nowAnime = window.requestAnimationFrame(App.animateSix);
	}else{
	    cancelAnimationFrame(App.nowAnime);
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

    App.AddWordFive = (function(){
	App.fontIni3 = App.fontIni;
	App.fontIni3.size = 80;
	App.textArr3 = new THREE.Mesh(new THREE.TextGeometry(word[2],App.fontIni3),App.mat);
	//App.textArr3.position = new THREE.Vector3(180,50,300);
	App.textArr3.position = new THREE.Vector3(-800,50,300);
	App.textArr3.rotation.y = Math.PI/2-1.3;
	App.scene.add(App.textArr3);
    });

    App.AddWordSix = (function(){
	App.fontIni4 = App.fontIni;
	App.fontIni4.size = 180;
	App.textArr4 = new THREE.Mesh(new THREE.TextGeometry(word[3],App.fontIni4),App.mat);
	//App.textArr4.position = new THREE.Vector3(180,-170,300);
	App.textArr4.position = new THREE.Vector3(-800,-170,300);
	App.textArr4.rotation.y = Math.PI/2-1.3;
	App.scene.add(App.textArr4);
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
