
Axis = function(camera, scene, renderer, WebGLCanvas, trackball, objmap) {

    var vertexshader = "void main() {\
                          gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);gl_Position.z *= 0.1;\
                        }";

    var pixelshader = "void main(){ \
                          gl_FragColor = vec4(0.0,  1.0, 0.0,  0.9);\
                        }";

    var shaderMaterial =
          new THREE.ShaderMaterial({
              transparent: true,
              vertexShader: vertexshader,
              fragmentShader: pixelshader
          });

    var _this = this;

    var A = 2;

    this.domElement = (WebGLCanvas !== undefined) ? WebGLCanvas : document;

    this.screen = { left: 0, top: 0, width: 0, height: 0 };

    var geometry = new THREE.CylinderGeometry(0.2, 3, 16, 32);

    for (var v = 0; v < geometry.vertices.length; v++) {
        geometry.vertices[v].add(new THREE.Vector3(0, 8, 0));
    }

    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00, opacity: 0.5, transparent: true });
    //material.depthTest = false;
    var y = new THREE.Mesh(geometry, shaderMaterial);

    y.name = "y";

    var rotations = [new THREE.Vector3(0, 0, -3.1415926 / 2), new THREE.Vector3(0, 0, 0), new THREE.Vector3(3.1415926 / 2, 0, 0)];

    scene.add(y);

    var axisscene = new THREE.Object3D();

    scene.add(axisscene);

    var axiss = [y];

    var geometry = new THREE.Geometry();

    geometry.vertices.push(
	new THREE.Vector3(-100, 0, -100),
	new THREE.Vector3(-100, 0, 100),
	new THREE.Vector3(100, 0, 100),
    new THREE.Vector3(100, 0, -100),
	new THREE.Vector3(-100, 0, -100)
    );

    var plane = new THREE.Line(geometry, material);

    plane.rotation.set(rotations[A].x, rotations[A].y, rotations[A].z);

    scene.add(plane);

    var globalPlane = new THREE.Plane(normal, 0);

    var globalPlanes = [globalPlane];

    //renderer.clippingPlanes = globalPlanes;

    renderer.localClippingEnabled = true;

    var raycaster = new THREE.Raycaster();

    var mouse = {};

    var pickaxis = y;

    this.moving = false;

    this.getClip = function() {

        return globalPlanes;
    }

    this.disableClip = function() {

        axisscene.visible = false;
        y.visible = false;
        plane.visible = false;

        renderer.localClippingEnabled = false;

        renderer.clippingPlanes = Object.freeze([]);
    };

    _this.disableClip();

    this.enableClip = function(xyz) {

        renderer.localClippingEnabled = true;
        y.visible = true;
        plane.visible = true;

        if (xyz != A) {

            clearClipResult();
        }

        A = xyz;

        var view = camera.getWorldDirection().clone();

        view = pickaxis.position.clone().sub(camera.position.clone());

        view.normalize();

        var normals = [new THREE.Vector3(-1, 0, 0), new THREE.Vector3(0, -1, 0), new THREE.Vector3(0, 0, -1)];

        normal = normals[A]; //normal.transformDirection(y.matrixWorld);

        var opp = -1;

        var dot = normal.dot(view);

        if (dot > 0) {
            opp = 1;
        }

        normal.multiplyScalar(opp);

        y.rotation.set(opp * rotations[A].x, opp * rotations[A].y, opp * rotations[A].z);
        plane.rotation.set(opp * rotations[A].x, opp * rotations[A].y, opp * rotations[A].z);

        globalPlane.normal = normal;

        var dist = plane.position.clone();

        var d = dist.dot(normal);

        globalPlane.constant = -d + 0.01;

        computeClipResult();

    };

    var normal = new THREE.Vector3(0, 1, 0);

    function clearClipResult() {

        for (var obj in axisscene.children) {

            axisscene.remove(obj);
            obj = null;
        }

        axisscene.children.length = 0;

    }

    var vertexshader = "varying vec3 vViewPosition;void main() {\
                          gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);\
                          vec4 mvPosition = modelViewMatrix * vec4(position,1.0);\
                          vViewPosition = -mvPosition.xyz;\
                          gl_Position.z -= 0.0009;gl_Position.z *= 0.99999;\
                        }";

    var pixelshader = "varying vec3 vViewPosition;	uniform vec4 clippingPlanes[ 1 ];void main(){\
                            gl_FragColor = vec4(0.8,  0.99, 0.0,  1.0);\
                        }";

    var shaderMaterial =

          new THREE.ShaderMaterial({
              transparent: true,
              vertexShader: vertexshader,
              fragmentShader: pixelshader
          });

    ///////////////////////////////////////////////////////////////////////////////////////////////

    function computeClipResult() {


        var numline = 0;

        var objs = objmap.getValues();

        for (var b = 0; b < objs.length; b++) {

            var obj = objs[b];

            if (obj.geometry == null) {
                continue;
            }

            var min = obj.geometry.boundingBox.min.clone();
            var max = obj.geometry.boundingBox.max.clone();

            min.applyMatrix4(obj.matrixWorld);
            max.applyMatrix4(obj.matrixWorld);

            var boxpoints = [
              new THREE.Vector3(min.x, min.y, min.z), new THREE.Vector3(max.x, min.y, min.z),
              new THREE.Vector3(min.x, max.y, min.z), new THREE.Vector3(min.x, min.y, max.z),
              new THREE.Vector3(max.x, max.y, min.z), new THREE.Vector3(max.x, min.y, max.z),
              new THREE.Vector3(max.x, max.y, max.z), new THREE.Vector3(min.x, max.y, max.z)
              ];

            var dot = 0;
            var boxInPlane = false;

            var plane = _this.getClip()[0];

            for (var i = 0; i < boxpoints.length; i++) {

                var d = boxpoints[i].dot(plane.normal) + plane.constant;

                if (i == 0) {
                    dot = d;
                }
                else {
                    if (dot * d < 0) {
                        boxInPlane = true;
                        break;
                    }
                }

            }

            if (boxInPlane) {

                var clipgeo = new ClipGeometry(obj.geometry, obj.matrixWorld, plane);

                if (clipgeo.getAttribute("position").array.length > 0) {

                    var clipline = new THREE.LineSegments(clipgeo, shaderMaterial);

                    //clipline.matrix = obj.matrix;

                    numline += 1; //clipgeo.getAttribute("position").array.length / 3;

                    axisscene.add(clipline);
                }
            }
        }

        axisscene.visible = true;

        console.log(numline);
    }


    function mouseup(ev) {

        var haveMoved = _this.moving;

        _this.moving = false;

        trackball.enabled = true;

        //_this.disableClip();

        if (!haveMoved) {

            return;
        }

        haveMoved = false;

        clearClipResult();


        computeClipResult();


    };

    function mousedown(ev) {


        if (ev.button == 2 || ev.button == 1)
            return;

        mouse.x = ( (ev.pageX - $(WebGLCanvas).offset().left) / WebGLCanvas.offsetWidth ) * 2 - 1;
        mouse.y = - ( (ev.pageY - $(WebGLCanvas).offset().top) / WebGLCanvas.offsetHeight ) * 2 + 1;

        moving = false;

        raycaster.setFromCamera(mouse, camera);

        var intersects = raycaster.intersectObjects(axiss);

        if (intersects.length > 0) {

            _this.moving = true;

            trackball.enabled = false;

            scene.remove(pickaxis);
            scene.add(pickaxis);

        }
    };

    var lastX = 0;
    var lastY = 0;

    function mousemove(ev) {


        var deltX = ev.pageX - lastX;
        var deltY = ev.pageY - lastY;

        lastX = ev.pageX;
        lastY = ev.pageY;

        var dist = camera.position.clone().sub(pickaxis.position).length() / 180;

        pickaxis.scale.set(dist, dist, dist);

        plane.scale.set(dist / 10, dist / 10, dist / 10);

        if (_this.moving) {

            clearClipResult();

            var up = new THREE.Vector3(0, 1, 0);
            var dir = camera.getWorldDirection().clone();

            var right = dir.clone(); right.cross(up);

            up = right.clone(); up.cross(dir);

            var xmove = normal.dot(right) * dist * deltX;
            var ymove = -normal.dot(up) * dist * deltY;

            var move = normal.clone();

            move.setLength(xmove + ymove);

            move.add(pickaxis.position);

            pickaxis.position.copy(move);

            plane.position.copy(pickaxis.position);

        }

        var dist = plane.position.clone();

        var d = dist.dot(normal);

        globalPlane.constant = -d + 0.01;
    }

    this.clipRay = function(raycaster) {

        if (!plane.visible) {
            return;
        }

        var orig = raycaster.ray.origin.clone();

        var dir = raycaster.ray.direction.clone();

        var farpoint = orig.add(raycaster.ray.direction.setLength(1000000));

        var line = new THREE.Line3(raycaster.ray.origin, farpoint);

        var cp = _this.getClip()[0];

        if (webGLRenderer.localClippingEnabled && cp != null) {

            var hitClipPoint = new THREE.Vector3();

            cp.intersectLine(line, hitClipPoint);

            if (hitClipPoint != undefined) {
                raycaster.set(hitClipPoint, dir);
            }
        }
    }


    this.domElement.addEventListener('mousemove', mousemove, false);

    this.domElement.addEventListener('mousedown', mousedown, false);
    document.addEventListener('mouseup', mouseup, false);
};


Axis.prototype = Object.create(THREE.EventDispatcher.prototype);
Axis.prototype.constructor = Axis;
