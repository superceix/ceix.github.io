var canvas = document.getElementById('canvas');
var width = canvas.clientWidth;
var height = canvas.clientHeight;


var renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setClearColor(0xccccccc);
renderer.setSize(width, height);

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 10000);
camera.position.set(50, 360, 800);

var light = new THREE.DirectionalLight(0xffffff);
light.position.set(360, 360, 360);
scene.add(light);

var texture = THREE.ImageUtils.loadTexture('images/1.jpg', {}, function () {
    renderer.render(scene, camera);
});
texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set(11, 10);
var plane = new THREE.Mesh(new THREE.BoxGeometry(536, 1, 536), new THREE.MeshLambertMaterial({ map: texture }));

scene.add(plane);
//scene.add(cube);


var render = function () {
    requestAnimationFrame(render);

    plane.rotation.y += 0.02;
    renderer.render(scene, camera);
};

render();