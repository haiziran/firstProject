var sceneloader,sceneloader2,
    dlight,dlight2,
    axis,axis2;
var meshMap = new HashMap();
var meshMap2=new HashMap();

var scene, camera, trackball, webGLRenderer, WebGLCanvas,
    removedMesh = new Array();
// var scene2, camera2, trackball2, webGLRenderer2, WebGLCanvas2,
//     removedMesh2 = new Array();
var loading = document.querySelector('#loading');
// var loading2 = document.querySelector('#loading2');
//主场景
function initWebGL(){

    WebGLCanvas = document.querySelector("#WebGL-output");
    // WebGLCanvas2 = document.querySelector("#WebGL-output2");
    scene  = new THREE.Scene();
    // scene2  = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, WebGLCanvas.offsetWidth / WebGLCanvas.offsetHeight, 0.05, 1000000);
    camera.position.set(10, 10, 17);
    camera.up.set(0,1,0);

    // camera2 = new THREE.PerspectiveCamera(45, WebGLCanvas2.offsetWidth / WebGLCanvas2.offsetHeight, 0.05, 1000000);
    // camera2.position.set(10, 10, 17);
    // camera2.up.set(0,1,0);

    trackball = new THREE.OrbitControls(camera, WebGLCanvas);
    // trackball2 = new THREE.OrbitControls(camera2, WebGLCanvas2);
    webGLRenderer = new THREE.WebGLRenderer({
        antialias: true,    //是否开启反锯齿
        precision:"lowp"    //着色精度选择
    });
    // webGLRenderer2 = new THREE.WebGLRenderer({
    //     antialias: true,    //是否开启反锯齿
    //     precision:"lowp"    //着色精度选择
    // });
    webGLRenderer.autoClear = false;
    webGLRenderer.setClearColor(0xbbddee, 1.0);
    webGLRenderer.setSize(WebGLCanvas.offsetWidth, WebGLCanvas.offsetHeight);
    webGLRenderer.shadowMap.enabled = true;

    WebGLCanvas.appendChild(webGLRenderer.domElement);

    dlight = new DLight(scene, webGLRenderer);

    // webGLRenderer2.autoClear = false;
    // webGLRenderer2.setClearColor(0xbbddee, 1.0);
    // webGLRenderer2.setSize(WebGLCanvas2.offsetWidth, WebGLCanvas2.offsetHeight);
    // webGLRenderer2.shadowMap.enabled = true;
    //
    // WebGLCanvas2.appendChild(webGLRenderer2.domElement);
    //
    // dlight2 = new DLight(scene2, webGLRenderer2);
    render();


}

function animate() {

    requestAnimationFrame(animate);

    trackball.update();
    dlight.update(camera);
    // trackball2.update();
    // dlight2.update(camera);
    render();

}


function render() {
    webGLRenderer.clear();
    webGLRenderer.setViewport( 0, 0, WebGLCanvas.offsetWidth, WebGLCanvas.offsetHeight );
    webGLRenderer.render(scene, camera);

    // webGLRenderer2.clear();
    // webGLRenderer2.setViewport( 0, 0, WebGLCanvas2.offsetWidth, WebGLCanvas2.offsetHeight );
    // webGLRenderer2.render(scene2, camera2);
}

initWebGL();
animate();
window.addEventListener( 'resize', onWindowResize, false );
function onWindowResize() {

    var WebGLCanvas = document.querySelector("#WebGL-output");
    screen_width = WebGLCanvas.offsetWidth;
    screen_height = WebGLCanvas.offsetHeight;
    aspect = screen_width / screen_height;
    webGLRenderer.setSize( screen_width, screen_height );
    camera.aspect = aspect;

    // var WebGLCanvas2 = document.querySelector("#WebGL-output2");
    // screen_width2 = WebGLCanvas2.offsetWidth;
    // screen_height2 = WebGLCanvas2.offsetHeight;
    // aspect2 = screen_width2 / screen_height2;
    // webGLRenderer2.setSize( screen_width2, screen_height2 );
    // camera2.aspect = aspect2;
    render();
}

function load3D(){

    meshMap.clear();
    // meshMap2.clear();
    //
    sceneloader = new SceneLoader(scene);
    sceneloader.callback = function(){
        var objmaps = this.objmap.getObjects();
        for (i in objmaps) {
            if (objmaps[i].type == "Mesh") {

                meshMap.add(objmaps[i].name, objmaps[i]);
            }
        }
    }

    axis = new Axis(camera, scene, webGLRenderer, WebGLCanvas, trackball, sceneloader.objmap);

    //加载场景配置
    sceneloader.loadscene("model/meshes.json");
    //加载模型包
    sceneloader.loadzip("model/meshes.zip");

    // sceneloader2 = new SceneLoader(scene2);
    // sceneloader2.callback = function(){
    //     var objmaps2 = this.objmap.getObjects();
    //     for (i in objmaps2) {
    //         if (objmaps2[i].type == "Mesh") {
    //
    //             meshMap2.add(objmaps2[i].name, objmaps2[i]);
    //         }
    //     }
    // }
    //
    // axis2 = new Axis(camera2, scene2, webGLRenderer2, WebGLCanvas2, trackball2, sceneloader2.objmap);
    //
    // //加载场景配置
    // sceneloader2.loadscene("model/meshes.json");
    // //加载模型包
    // sceneloader2.loadzip("model/meshes.zip");
}

load3D();
// function SetOpacity2(b){
//     var modelArray = meshMap2.getValues();
//     for (var i = 0; i < modelArray.length; i++) {
//
//         var mesh = modelArray[i];
//         if(b)
//         {
//             mesh.material.transparent = true;
//             mesh.material.opacity = 0.05;
//         }
//         else
//         {
//             mesh.material.transparent = false;
//             mesh.material.opacity = 1;
//             mesh.visible = true;
//         }
//     }
// }
function SetOpacity(b)
{
    var modelArray = meshMap.getValues();
    for (var i = 0; i < modelArray.length; i++) {

        var mesh = modelArray[i];
        if(b)
        {
            mesh.material.transparent = true;
            mesh.material.opacity = 0.05;
        }
        else
        {
            mesh.material.transparent = false;
            mesh.material.opacity = 1;
            mesh.visible = true;
        }
    }


}

document.querySelector("#WebGL-output").ondblclick = function() {

    var mouse = new Object(),
        raycaster = new THREE.Raycaster(),
        WebGLCanvas = document.querySelector("#WebGL-output");

    return function(ev){

        if (ev.button != 0) return;

        mouse.x = ((ev.pageX - $(WebGLCanvas).offset().left) / WebGLCanvas.offsetWidth) * 2 - 1;
        mouse.y = -((ev.pageY - $(WebGLCanvas).offset().top) / WebGLCanvas.offsetHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);

        axis.clipRay(raycaster);


        SetOpacity(true);

        var intersects = raycaster.intersectObjects(meshMap.getValues());

        if (intersects.length > 0) {
            var meshCode = intersects[0].object.name;

            //点击构件获取唯一标识（name）
            // alert(meshCode);
            modelUe4(meshCode);
            // mm(meshCode);
            var mesh = scene.getObjectByName(meshCode);
            if (mesh == undefined) {
                return;
            }
            mesh.material.transparent = false;
            mesh.material.opacity = 1;
            mesh.visible = true;

        } else {

            SetOpacity(false);
        }
    }
}();
// document.querySelector("#WebGL-output2").ondblclick = function() {
//
//     var mouse = new Object(),
//         raycaster = new THREE.Raycaster(),
//         WebGLCanvas2 = document.querySelector("#WebGL-output2");
//
//     return function(ev){
//
//         if (ev.button != 0) return;
//
//         mouse.x = ((ev.pageX - $(WebGLCanvas2).offset().left) / WebGLCanvas2.offsetWidth) * 2 - 1;
//         mouse.y = -((ev.pageY - $(WebGLCanvas2).offset().top) / WebGLCanvas2.offsetHeight) * 2 + 1;
//
//         raycaster.setFromCamera(mouse, camera2);
//
//         axis2.clipRay(raycaster);
//
//
//         SetOpacity2(true);
//
//         var intersects = raycaster.intersectObjects(meshMap2.getValues());
//
//         if (intersects.length > 0) {
//             var meshCode = intersects[0].object.name;
//
//             //点击构件获取唯一标识（name）
//             // alert(meshCode);
//             modelUe4(meshCode);
//             var mesh = scene2.getObjectByName(meshCode);
//             if (mesh == undefined) {
//                 return;
//             }
//             mesh.material.transparent = false;
//             mesh.material.opacity = 1;
//             mesh.visible = true;
//
//         } else {
//
//             SetOpacity2(false);
//         }
//     }
// }();
document.querySelector("#WebGL-output").onmousemove = function() {



    var mouse = new Object(),
        raycaster = new THREE.Raycaster(),
        WebGLCanvas = document.querySelector("#WebGL-output");

    return function(ev){

        mouse.x = ( (ev.pageX - $(WebGLCanvas).offset().left) / WebGLCanvas.offsetWidth ) * 2 - 1;
        mouse.y = - ( (ev.pageY - $(WebGLCanvas).offset().top) / WebGLCanvas.offsetHeight ) * 2 + 1;

        raycaster.setFromCamera( mouse, camera );

        var intersects = raycaster.intersectObjects( sceneloader.objmap.getValues() );

        var showModelName = document.querySelector("#showModelName");
        if ( intersects.length > 0 )
        {
            showModelName.innerText = intersects[0].object.name;
            showModelName.style.padding = "0.3em 0.5em";
            showModelName.style.left = ev.pageX + 24 + "px";
            showModelName.style.top = ev.pageY - 24 + "px";
        }
        else
        {
            showModelName.innerText = "";
            showModelName.style.padding = 0;
            showModelName.style.left = "0";
            showModelName.style.top = "0";
        }

    }
}();

// document.querySelector("#WebGL-output2").onmousemove = function() {
//
//     var mouse = new Object(),
//         raycaster = new THREE.Raycaster(),
//         WebGLCanvas2 = document.querySelector("#WebGL-output2");
//
//     return function(ev){
//
//         mouse.x = ( (ev.pageX - $(WebGLCanvas2).offset().left) / WebGLCanvas2.offsetWidth ) * 2 - 1;
//         mouse.y = - ( (ev.pageY - $(WebGLCanvas2).offset().top) / WebGLCanvas2.offsetHeight ) * 2 + 1;
//
//         raycaster.setFromCamera( mouse, camera2 );
//
//         var intersects = raycaster.intersectObjects(sceneloader2.objmap.getValues() );
//
//         var showModelName = document.querySelector("#showModelName2");
//         if ( intersects.length > 0 )
//         {
//             showModelName.innerText = intersects[0].object.name;
//             showModelName.style.padding = "0.3em 0.5em";
//             showModelName.style.left = ev.pageX + 24 + "px";
//             showModelName.style.top = ev.pageY - 24 + "px";
//         }
//         else
//         {
//             showModelName.innerText = "";
//             showModelName.style.padding = 0;
//             showModelName.style.left = "0";
//             showModelName.style.top = "0";
//         }
//
//     }
// }();
// document.querySelector("#b_title").ondblclick=function(){
//     var mouse = new Object(),
//         raycaster = new THREE.Raycaster(),
//         WebGLCanvas = document.querySelector("#WebGL-output");
//
//     return function(ev){
//         if (ev.button != 0) return;
//         mouse.x = ((ev.pageX - $(WebGLCanvas).offset().left) / WebGLCanvas.offsetWidth) * 2 - 1;
//         mouse.y = -((ev.pageY - $(WebGLCanvas).offset().top) / WebGLCanvas.offsetHeight) * 2 + 1;
//         raycaster.setFromCamera(mouse, camera);
//         axis.clipRay(raycaster);
//         SetOpacity(true);
//         var mesh1=scene.getObjectByName('Line2029263637');
//         var mesh2=scene.getObjectByName('Line2029263632');
//         var mesh3=scene.getObjectByName('Line2029263625');
//         if(mesh1==undefined||mesh2==undefined||mesh3==undefined){
//             return;
//         }
//         mesh1.material.transparent = false;
//         mesh1.material.opacity = 1;
//         mesh1.visible = true;
//         mesh2.material.transparent = false;
//         mesh2.material.opacity = 1;
//         mesh2.visible = true;
//         mesh3.material.transparent = false;
//         mesh3.material.opacity = 1;
//         mesh3.visible = true;
//
//     }
//
// }();
