var OneDay = function () {
    this.scene = null;
    this.renderer = null;
    this.camera = null;
    this.width = canvas.clientWidth;
    this.height = canvas.clientHeight;

    this.Init = function () {
        this.initRenderer = function () {
            var canvas = document.getElementById('canvas');
            this.renderer = new THREE.WebGLRenderer({ canvas: canvas });
            this.renderer.setClearColor(0xccccccc);
            this.renderer.setSize(this.width, this.height);
        }

        //scene and camera
        this.initScene = function () {
            this.scene = new THREE.Scene();
            this.camera = new THREE.PerspectiveCamera(105, window.innerWidth / window.innerHeight, 0.1, 10000);
            this.camera.position.set(500, 3600, 1300);
            this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        }
        this.initLight = function () {
            //light
            var light = new THREE.DirectionalLight(0xffffff);
            light.position.set(360, 360, 360);
            this.scene.add(light);
        }

        this._init = function () {
            this.initRenderer();
            this.initScene();
            this.initLight();

            //坐标轴
            var axes = new THREE.AxisHelper(10000);
            this.scene.add(axes);
        }
        this._init();
    }

    this.Draw = function () {
        // 创建一个平面  
        var planeGeometry = new THREE.PlaneGeometry(10000, 10000, 1, 1);
        var planeMaterial = new THREE.MeshLambertMaterial({ color: 0xededed });
        var plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.receiveShadow = true;
        // rotate and position the plane  
        plane.rotation.x = -0.5 * Math.PI;
        plane.position.x = 0;
        plane.position.y = -10;
        plane.position.z = 0;
        this.scene.add(plane);

        //画线
        var material = new THREE.LineBasicMaterial({color: 0x000000});
        var geometry = new THREE.Geometry();

        geometry.vertices.push(
            new THREE.Vector3(-2500, 0, 2500),
            new THREE.Vector3(2500, 0, 2500),
            new THREE.Vector3(2500, 0, -2500),
            new THREE.Vector3(-2500, 0, -2500),
            new THREE.Vector3(-2500, 0, 2500)
        );

        var line = new THREE.Line(geometry, material);
        this.scene.add(line);
    }

    this.Start = function () {
        this.Init();
        this.Draw();
    }
    this.Start();
}

var oneday = new OneDay();

var orbitControls = new THREE.OrbitControls(oneday.camera);
var clock = new THREE.Clock();

var Render = function () {
    var delta = this.clock.getDelta();
    this.orbitControls.update(delta);
    //plane.rotation.y += 0.02;
    requestAnimationFrame(Render);
    oneday.renderer.render(oneday.scene, oneday.camera);
};
Render();

//地面
// var texture = THREE.ImageUtils.loadTexture('images/1.jpg', {}, function () {
//     renderer.render(scene, camera);
// });
// texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
// texture.repeat.set(11, 10);
// var ground = new THREE.Mesh(new THREE.BoxGeometry(536, 2, 536), new THREE.MeshLambertMaterial({ map: texture }));
// scene.add(ground);