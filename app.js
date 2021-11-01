

let container;
let camera;
let renderer;
let scene;
let modal;
let  controls;

function init(){
    container = document.querySelector('.scene')
    
    //create scene
    scene = new THREE.Scene();
    const fov = 35;
    const aspect = container.clientWidth/ container.clientHeight;
    const near = 0.1;
    const far = 10000;

    //camera setup
    
    camera = new THREE.PerspectiveCamera(fov,aspect,near,far);
    camera.position.set(0,200,1500);
    camera.rotation.z += 0;
    camera.rotation.y += 0;
    camera.rotation.x += 0.01;

    
   // const fog = new THREE.Fog(0xfffff,25,50);

    const ambient = new THREE.AmbientLight(0x404040,0/3);
    const light = new THREE.DirectionalLight(0xf1f1f1,2);
    
    light.position.set(0,50,50);
    
    scene.add(ambient);
    scene.add(light);
    //scene.add(fog);


    

    //renderer
    renderer = new THREE.WebGLRenderer({antialias:true,alpha:true});
    renderer.setSize(container.clientWidth,container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);


    //orbit controls 
     controls = new THREE.OrbitControls(camera, renderer.domElement );
        container.appendChild(renderer.domElement);


    //load model
    let loader =  new THREE.GLTFLoader();
   loader.load("./saturn.gltf",function(gltf){
       
       scene.add(gltf.scene);
       modal = gltf.scene.children[0];
        modal.rotation.y += 0.1;
        modal.rotation.x += -0.0;
        modal.rotation.z += -0.0;
       // renderer.render(scene,camera); 
       animate();
    });

}

//animate the object 

 function animate(){
     requestAnimationFrame(animate);
        //camera.position.x +=   0.5;
                // 0.1 slow  . . . 0.5 . . .meh  1? she's giving her 2 . . . you get the point..
        //camera.rotation.z  += -0.1 //negative means counter clockwise
                //same principle we're updating the image and continously updating the camera position with respect the z axis.


        controls.update();
     renderer.render(scene,camera);  
 }


init();

//uncomment this out for animation tweaks

//animate();