
function DLight(scene, render) {

    render.shadowMap.enabled = true;
    render.shadowMap.type = THREE.PCFShadowMap;

    var light = null;

    var target = null;

    var frame = 0;

    var initshadow = false;

    var lastEyePos = camera.position.clone();

    this.enable = function(e) {
        var change = light.castShadow != e;
        light.castShadow = e;
        return change;
    }

    this.update = function(camera) {

        frame++;

        var eyepos = camera.position.clone();

        var dist = eyepos.sub(lastEyePos);

        lastEyePos = camera.position.clone();

        if (dist.length() > 0.02) {
            initshadow = true;
            render.shadowMap.enabled = false;
            //render.shadowMap.enabled = (frame % 4 == 0);

        }
        else {

            light.castShadow = true;

            if (initshadow) {
                render.shadowMap.enabled = (frame % 4 == 0);
            }
            else {
                render.shadowMap.enabled = true;
            }
        }

        var dir = camera.getWorldDirection().clone();

        var angle = Math.atan(dir.y / Math.sqrt(dir.x * dir.x + dir.z * dir.z));

        var sinv = Math.max(Math.abs(Math.sin(angle)), 0.6);

        var dist = camera.position.y / sinv;

        dir.setLength(dist);

        target.position.x = camera.position.x + dir.x;

        target.position.y = camera.position.y + dir.y;

        target.position.z = camera.position.z + dir.z;

        light.position.set(target.position.x - 250, 500, target.position.z + 350);

        var shadowscale = 5*( 1 + 0.3 * Math.abs(camera.position.y) );

        light.shadow.camera.right = shadowscale;
        light.shadow.camera.left = -shadowscale;
        light.shadow.camera.top = shadowscale;
        light.shadow.camera.bottom = -shadowscale;


    }

    function initAmbient() {
        var ambientLight = new THREE.AmbientLight(0xdde1ff);
        ambientLight.intensity = 0.5;
        scene.add(ambientLight);
    }


    function addShadowLight() {

        var directionalLight2 = new THREE.DirectionalLight(0xffeedd);

        directionalLight2.position.set(-250, 500,350);
        directionalLight2.intensity = 0.5;
        directionalLight2.castShadow = true;

        //directionalLight2.shadowOnly = true;

        directionalLight2.shadow.camera.near = 0.5;
        directionalLight2.shadow.camera.far = 10000;

        directionalLight2.shadow.camera.right = 15;
        directionalLight2.shadow.camera.left = -15;
        directionalLight2.shadow.camera.top = 15;
        directionalLight2.shadow.camera.bottom = -15;

        directionalLight2.shadow.mapSize.width = 2048;
        directionalLight2.shadow.mapSize.height = 2048;

        directionalLight2.shadow.bias = -0.00002;

        return directionalLight2;
    }

    initAmbient();

    light = addShadowLight();

    // 加强前光
    var directionalLight1 = new THREE.DirectionalLight(0xddeeff);
    directionalLight1.position.set(-250, 500, 350);
    directionalLight1.intensity = 0.3;
    directionalLight1.castShadow = false;
    scene.add(directionalLight1);


    // 背光
    var directionalLight2 = new THREE.DirectionalLight(0xddeeff);
    directionalLight2.position.set(150, -400, -350);
    directionalLight2.intensity = 0.1;
    directionalLight2.castShadow = false;
    scene.add(directionalLight2);

    target = new THREE.Object3D();

    light.target = target;

    scene.add(target);

    scene.add(light);


};