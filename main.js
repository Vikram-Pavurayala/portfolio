import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();//creating a scene

const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);//creating a camera
camera.position.x = -10;
camera.position.z = 13.5;
camera.position.y = 3.5;



const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth,window.innerHeight);
document.getElementById("canvas").appendChild(renderer.domElement);


let ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
scene.add(ambientLight);

const sunLight = new THREE.DirectionalLight(0xdddddd, 1.0);
sunLight.position.y = 15;
scene.add(sunLight);


function onWindowResize(){
	camera.aspect = window.innerWidth / (window.innerHeight);
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}





//ADDING FLOOR
const floorTexture = new THREE.TextureLoader().load('assets/floor.svg');
floorTexture.wrapS = THREE.RepeatWrapping; // Repeat the texture along the x-axis
floorTexture.wrapT = THREE.RepeatWrapping; // Repeat the texture along the y-axis
const repeatX = 10; // Adjust these values as needed
const repeatY = 10; // Adjust these values as needed
floorTexture.repeat.set(repeatX, repeatY);
const planeGeometry = new THREE.PlaneGeometry( 30, 30 );
const planeMaterial = new THREE.MeshBasicMaterial({
    map: floorTexture,
    side: THREE.DoubleSide
});
const floorPlane = new THREE.Mesh(planeGeometry, planeMaterial);
floorPlane.rotation.x = Math.PI/2;
floorPlane.position.y = -Math.PI
scene.add(floorPlane);




/* ADDING WALL GROUP START */

const wallGroup = new THREE.Group();
scene.add(wallGroup);

const WallTexture = new THREE.TextureLoader().load('assets/walls.jpg');
//front wall
const frontWall = new THREE.Mesh(
    new THREE.BoxGeometry(30, 20, 0.001),
    new THREE.MeshBasicMaterial({map:WallTexture ,
        side: THREE.DoubleSide}),
);
frontWall.position.z = -15;
wallGroup.add(frontWall);
//left wall
const leftWall = new THREE.Mesh(
    new THREE.BoxGeometry(30, 20, 0.01),
    new THREE.MeshBasicMaterial({map:WallTexture ,
        side: THREE.DoubleSide}),
);
leftWall.rotation.y = Math.PI/2;
leftWall.position.x = -15;
wallGroup.add(leftWall);
//right wall
const rightWall = new THREE.Mesh(
    new THREE.BoxGeometry(30, 20, 0.001),
    new THREE.MeshBasicMaterial({map:WallTexture ,
        side: THREE.DoubleSide}),
);
rightWall.rotation.y = Math.PI/2;
rightWall.position.x = 15;
wallGroup.add(rightWall);
//back wall
const backWall = new THREE.Mesh(
    new THREE.BoxGeometry(30, 20, 0.001),
    new THREE.MeshBasicMaterial({map:WallTexture ,
        side: THREE.DoubleSide}),
);
backWall.position.z = 15;
wallGroup.add(backWall);
//ceiling
const ceiling = new THREE.Mesh(
    new THREE.BoxGeometry(30, 30, 0.001),
    new THREE.MeshBasicMaterial({map:floorTexture ,
        side: THREE.DoubleSide}),
);
ceiling.rotation.x = Math.PI/2;
ceiling.position.y = Math.PI * 3.1;
wallGroup.add(ceiling);

// for(let i=0;i< wallGroup.children.length;i++){
//     wallGroup.children[i].BBox = new THREE.Box3();
//     wallGroup.children[i].BBox.setFromObject(wallGroup.children[i]);
// }




const bedModel = new GLTFLoader();

let bed;
 // Declare mixer outside the loader callback

bedModel.load('assets/bed.glb', function(gltf) {

    bed = gltf.scene;
    bed.scale.set(4, 4, 4);
    bed.position.y=-3;
    bed.position.x=-10;
    bed.rotation.y=3.2;
    bed.position.z=10;
    scene.add(bed);


}, undefined, function(error) {
    console.error(error);
});

const computerModel = new GLTFLoader();

let computer;
 // Declare mixer outside the loader callback

computerModel.load('assets/computer.glb', function(gltf) {

    computer = gltf.scene;
    computer.scale.set(100,100,100);
    computer.position.x=-13;
    computer.position.y=-3;
    computer.position.z=-2;
    scene.add(computer);


}, undefined, function(error) {
    console.error(error);
});

const tableModel = new GLTFLoader();

let table;
 // Declare mixer outside the loader callback

computerModel.load('assets/table.glb', function(gltf) {

    table = gltf.scene;
    table.scale.set(400,400,400);
    table.position.y = -3;
    scene.add(table);


}, undefined, function(error) {
    console.error(error);
});


const shelfModel = new GLTFLoader();

let shelf;
 // Declare mixer outside the loader callback

computerModel.load('assets/shelf.glb', function(gltf) {

    shelf = gltf.scene;
    shelf.scale.set(4,4,4);
    shelf.position.y = -3;
    shelf.position.x = -2;
    shelf.rotation.y = Math.PI;
    shelf.position.z = 14;
    scene.add(shelf);


}, undefined, function(error) {
    console.error(error);
});


const plantModel = new GLTFLoader();

let plant;
 // Declare mixer outside the loader callback

computerModel.load('assets/plant.glb', function(gltf) {

    plant = gltf.scene;
    plant.scale.set(5,5,5);
    plant.position.y = -1;
    plant.position.x = 13;
    //shelf.rotation.y = Math.PI;
    plant.position.z = 13;
    scene.add(plant);


}, undefined, function(error) {
    console.error(error);
});


const acModel = new GLTFLoader();

let ac;
 // Declare mixer outside the loader callback

computerModel.load('assets/ac.glb', function(gltf) {

    ac = gltf.scene;
    ac.scale.set(5,5,5);
    ac.position.y = 6;
    ac.position.x = -9;
    ac.rotation.y = Math.PI;
    ac.position.z = 14.9;
    scene.add(ac);


}, undefined, function(error) {
    console.error(error);
});



function addImage(imageUrl, width, height, position, message){
    const textureLoader = new THREE.TextureLoader();
    const imageTexture = textureLoader.load(imageUrl);
    const imageMaterial = new THREE.MeshBasicMaterial({
        map: imageTexture
    });
    const imageGeometery = new THREE.PlaneGeometry(width, height);
    const image = new THREE.Mesh(imageGeometery, imageMaterial);
    image.position.set(position.x, position.y, position.z);




    renderer.domElement.addEventListener("click", onMouseClick, false);

    function onMouseClick(event) {
        event.preventDefault();

        // Calculate mouse position in normalized device coordinates (-1 to +1)
        const mouse = new THREE.Vector2();
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        // Create a raycaster
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, camera);
        
        raycaster.near = 0.001; // Set the near distance to a small value
        raycaster.far = 10000; 
        

        // Check for intersections with the model
        const intersects = raycaster.intersectObject(image);

        if (intersects.length > 0) {
            
            let details = document.getElementById("message");
            details.innerText = message;
            details.style.display = "block";
            
        }
    }











    return image;
}

const image1 = addImage("assets/image1.jpg",3,3,new THREE.Vector3(-14.9,5,1),"I'm a huge fan of anime because it's incredibly creative and tells captivating stories. My top picks are Demon Slayer and Your Name. Demon Slayer is visually stunning and follows the journey of a boy fighting demons to protect his family. Your Name, on the other hand, weaves a beautiful tale of romance and fantasy across time. Both of these shows remind me of why I fell in love with anime in the first place – its ability to tell unique and compelling stories that transport me to different worlds.");
const image2= addImage("assets/image2.jpeg",3,3,new THREE.Vector3(-14.9,5,-5),"I'm a huge fan of anime because it's incredibly creative and tells captivating stories. My top picks are Demon Slayer and Your Name. Demon Slayer is visually stunning and follows the journey of a boy fighting demons to protect his family. Your Name, on the other hand, weaves a beautiful tale of romance and fantasy across time. Both of these shows remind me of why I fell in love with anime in the first place – its ability to tell unique and compelling stories that transport me to different worlds.");
image1.rotation.y = Math.PI/2;
image2.rotation.y= Math.PI/2;
const image3 = addImage("assets/image3.jpeg",5,3,new THREE.Vector3(-10,5,-14.9)," Same as Among Us Playing Free Fire isn't just about the game for me; it's a way to connect with friends while having a blast. It's amazing how it brings us together, strategizing and chatting while we play. Free Fire isn't just a game; it's a social experience that lets me bond with my friends as we battle it out and have a great time.");
const image4 = addImage("assets/image4.jpeg",5,3,new THREE.Vector3(-3,5,-14.9),"Same a Free Fire Among Us isn't just another game for me; it's a chance to enjoy some quality time with friends while having loads of fun. I absolutely love the thrill of fooling my friends as we navigate through tasks and try to uncover the impostor. It's incredible how Among Us creates these moments of laughter and suspense, where every game is a new adventure filled with excitement and trickery. Among Us isn't just a game; it's a platform for unforgettable memories and endless enjoyment with my friends.");
const image5 = addImage("assets/image5.jpg",5,3,new THREE.Vector3(4,5,-14.9),"Check out this pic of my friends – the brainy bunch! 🤓 They're like superheroes, but instead of capes, they wear glasses and wield calculators. Who needs muscles when you've got brains? #SmartSquad 💡");
const image6 = addImage("assets/image6.jpg",5,3,new THREE.Vector3(11,5,-14.9),"In our university, my classmates are a diverse group of people who come together to learn. Some are really smart and always studying hard. Others like to have fun and enjoy their time on campus. Some are funny and make everyone laugh during class. And then there are those who are quiet but really good at their studies. We all face challenges like exams and assignments, but we support each other and work together to succeed. My classmates aren't just classmates; they're like friends sharing this journey of higher education with me.");
const image7 = addImage("assets/image7.png",5,3,new THREE.Vector3(14.9,6,-10)," These certificates are more than just decorative pixels on a screen. They're evidence of the skills and knowledge I've accumulated along my journey.(Just kidding I made them my self)");
const image8 = addImage("assets/image8.jpg",5,3,new THREE.Vector3(14.9,2,-10),"These certificates are more than just decorative pixels on a screen. They're evidence of the skills and knowledge I've accumulated along my journey.(Just kidding I made them my self)");
const image9 = addImage("assets/image9.jpg",5,3,new THREE.Vector3(14.9,3.5,-4),"These certificates are more than just decorative pixels on a screen. They're evidence of the skills and knowledge I've accumulated along my journey.(Just kidding I made them my self)");
const image10 = addImage("assets/image10.jpg",3,6,new THREE.Vector3(14.9,3.5,2),"My bucket list is a compilation of my wildest dreams and deepest desires, a roadmap for my journey through life. It's a reflection of who I am, what I value, and the experiences I long to have. But not every dream on my list has been realized, at least not yet. Some seem daunting, requiring courage and perseverance beyond my current reach. Others demand resources or circumstances that are beyond my control. Yet, I hold onto the belief that one day, they will be achieved. So, as I journey through life, I find joy in the pursuit of my dreams, knowing that every unchecked box represents a future adventure waiting to be experienced. And with each step I take, I move closer to turning those dreams into reality. ");
const image11 = addImage("assets/image11.jpg",3,6,new THREE.Vector3(14.9,3.5,6),"My resume is a summary of my professional journey, highlighting my skills, experiences, and achievements. It showcases my expertise and demonstrates my value to potential employers. As I progress in my career, my resume evolves to reflect my growth and aspirations.");
const image12 = addImage("assets/image12.jpg",7,7,new THREE.Vector3(6,4,14.9),"Family is my anchor, offering love, support, and belonging. They are there through thick and thin, sharing in life's highs and lows. Their presence shapes who I am and reminds me of the importance of connection and unconditional love.");
image7.rotation.y = -Math.PI/2;
image8.rotation.y = -Math.PI/2;
image9.rotation.y = -Math.PI/2;
image10.rotation.y = -Math.PI/2;
image11.rotation.y = -Math.PI/2;
image12.rotation.y = Math.PI;
scene.add(image1,image2,image3,image4,image5,image6,image7,image8,image9,image10,image11,image12);
















/* MOUSE CAMERA CONTROLS START*/

let isDragging = false;
let previousMouseX = 0;


// Add event listeners for mouse down and up events
document.addEventListener("mousedown", onMouseDown, false);
document.addEventListener("mouseup", onMouseUp, false);

function onMouseDown(event) {
    // Set dragging flag to true and store initial mouse position
    isDragging = true;
    previousMouseX = event.clientX;
   
}

function onMouseUp(event) {
    // Reset dragging flag to false
    isDragging = false;
}

// Add event listener for mouse move
document.addEventListener("mousemove", onMouseMove, false);

function onMouseMove(event) {
    // Check if dragging flag is set
    if (isDragging) {
        // Calculate the change in mouse position
        document.getElementById("message").style.display = "none";
        const deltaX = event.clientX - previousMouseX;
        
        // Update previous mouse position
        previousMouseX = event.clientX;
        

        // Adjust camera rotation based on mouse movement
        const sensitivity = 0.002; // Adjust the sensitivity as needed
        camera.rotation.y -= deltaX * sensitivity;
        

    }
}

/* MOUSE CAMERA CONTROLS END */



/* CAMERA MOVEMENT START */

document.addEventListener("keydown", onKeyDown, false);

const roomWidth = 30;
const roomDepth = 30;

function onKeyDown(event){
    let keycode = event.which;

    // Get the camera's direction vector
    let direction = new THREE.Vector3();
    camera.getWorldDirection(direction);

    // Normalize the direction vector
    direction.normalize();

    const currentPosition = camera.position.clone();

    // Adjust camera position based on the key pressed
    if(keycode == 87){ // W 
        currentPosition.add(direction.clone().multiplyScalar(0.5)); // Move in the direction the camera is facing
    }
    else if(keycode == 83){ // S
        currentPosition.sub(direction.clone().multiplyScalar(0.5)); // Move opposite to the direction the camera is facing
    }
    else if(keycode == 65){ // A
        let right = new THREE.Vector3();
        camera.getWorldDirection(right);
        right.normalize();
        let up = new THREE.Vector3(0, 1, 0);
        let forward = new THREE.Vector3();
        forward.crossVectors(right, up);
        forward.normalize();
        currentPosition.sub(forward.clone().multiplyScalar(0.5)); // Move forward based on camera's facing direction
    }
    else if(keycode == 68){ // D
        let right = new THREE.Vector3();
        camera.getWorldDirection(right);
        right.normalize();
        let up = new THREE.Vector3(0, 1, 0);
        let forward = new THREE.Vector3();
        forward.crossVectors(right, up);
        forward.normalize();
        currentPosition.add(forward.clone().multiplyScalar(0.5)); // Move backward based on camera's facing direction
    }
   

    if (
        currentPosition.x +1 < roomWidth / 2  &&
        currentPosition.x -1 > -roomWidth / 2 &&
        currentPosition.z +1 < roomDepth / 2 &&
        currentPosition.z -1> -roomDepth / 2
    ) {
        // Update camera position if within boundaries
        camera.position.copy(currentPosition);
    }

}


/* CAMERA MOVEMENT END */


/* MOBILE TOUCH CAMERA CONTROLS START */

document.addEventListener("touchstart", onTouchStart, false);
document.addEventListener("touchmove", onTouchMove, false);
document.addEventListener("touchend", onTouchEnd, false);

let previousTouchX = 0;
let previousTouchY = 0;

function onTouchStart(event) {
    // Store initial touch position
    previousTouchX = event.touches[0].clientX;
    previousTouchY = event.touches[0].clientY;
}

function onTouchMove(event) {
    // Calculate the change in touch position
    document.getElementById("message").style.display = "none";
    const deltaX = event.touches[0].clientX - previousTouchX;
    const deltaY = event.touches[0].clientY - previousTouchY;

    // Update previous touch position
    previousTouchX = event.touches[0].clientX;
    previousTouchY = event.touches[0].clientY;

    // Convert touch movement to a direction vector based on camera rotation
    const direction = new THREE.Vector3();
    camera.getWorldDirection(direction);
    direction.normalize();

    // Adjust camera position based on touch movement
    const sensitivity = 0.005; // Adjust the sensitivity as needed
    camera.rotation.y -= deltaX * sensitivity;
    const moveVector = new THREE.Vector3(deltaX * sensitivity, 0, deltaY * sensitivity);
    const rotationMatrix = new THREE.Matrix4().makeRotationY(camera.rotation.y);
    moveVector.applyMatrix4(rotationMatrix);
    camera.position.add(moveVector);

    // Limit camera position within room boundaries
    const roomWidth = 25;
    const roomDepth = 25;
    
    camera.position.z = Math.min(Math.max(camera.position.z, -roomDepth / 2), roomDepth / 2);
}

function onTouchEnd(event) {
    // Reset previous touch positions
    previousTouchX = 0;
    previousTouchY = 0;
}

/* MOBILE TOUCH CAMERA CONTROLS END */






function animate(){
    requestAnimationFrame(animate);

    window.addEventListener("resize", onWindowResize, false);



    
    renderer.render(scene, camera);
}

if ( WebGL.isWebGLAvailable() ) {

	// Initiate function or other initializations here
	animate();

} else {

	const warning = WebGL.getWebGLErrorMessage();
	document.getElementById( 'container' ).appendChild( warning );

}
