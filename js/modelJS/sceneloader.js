function BMesh() {

    this.geo = null;
    this.texture = null;
};

function SceneLoader(scene) {

    this.objmap = new HashMap();

    var _this = this;

    var pathdir = "";

    var defaultOutline = false;

    var needLoadList = new Array();

    var zipdata = new HashMap();

    var geometryMap = new HashMap();

    var textureMap = new HashMap();

    var otMap = new HashMap();

    this.callback = function(){};

    this.showObjectSet = function(vis) {

        if ( _this.objmap.getValues().length < 1000 ) {
            return;
        }

        var ots = otMap.getValues();

        for (var s = 0; s < ots.length; s++) {
            ots[s].visible = vis;
        }

        if (outline != null) {

            outline.visible = vis;
        }

    }

    function JSONLoader(url, callback) {

        var request = new XMLHttpRequest();

        request.onreadystatechange = function() {

        if (request.readyState == 4) {

                if (request.status == 200 || request.status == 0) {

                    callback(JSON.parse(request.responseText));
                }
                else if (request.status == 404) {

                    //updateProgressBar();
                }
            }

        }

        request.open("GET", url, true);
        request.send();

    }

    function TxtLoader(url, callback) {

        var request = new XMLHttpRequest();

        request.onreadystatechange = function() {
            if (request.readyState == 4) {
                if (request.status == 200 || request.status == 0) {

                    callback(request.responseText);
                }
                else if (request.status == 404) {

                    //updateProgressBar();
                }
            }
        }
        request.open("GET", url, true);
        request.responseType = "text";
        request.send();
    }

    function ByteLoader(url, callback) {

        var request = new XMLHttpRequest();

        request.onreadystatechange = function() {
            if (request.readyState == 4) {
                if (request.status == 200 || request.status == 0) {

                    callback(request.responseText);
                }
                else if (request.status == 404) {

                    //updateProgressBar();
                }
            }
        }
        request.open("GET", url, true);
        request.setRequestHeader("Content-Type", "application/octet-stream");
        request.responseType = "arraybuffer";
        request.send();
    }


    function parseMeshByte(buffer) {

        var geometry = new THREE.BufferGeometry();

        var offset = 4 * 4;

        var numIndex = new Int32Array(buffer, offset, 1);

        offset += 4;

        var indexs = new Uint16Array(buffer, offset, numIndex[0]);

        offset += numIndex[0] * 2;

        if (numIndex[0] % 2 == 1) {

            offset += 2;
        }

        var numVertex = new Int32Array(buffer, offset, 1);

        offset += 4;

        var positions = new Float32Array(buffer, offset, numVertex[0] * 3);

        offset += numVertex[0] * 3 * 4;

        var hasTexcoord = false;

        var texcoords = null;

        var texturestr = null;

        if (buffer.byteLength > offset + 4 ) {

            var desc = new Uint8Array(buffer, offset, 4);

            offset += 4;

            if (desc[2] == 1) {

                if (buffer.byteLength > offset + 32) {

                    var subsetface = new Int32Array(buffer, offset, 3);

                    offset += 4 * 3;

                    var color = new Float32Array(buffer, offset, 4);

                    offset += 4 * 4;

                    var texturelen = new Int32Array(buffer, offset, 1);

                    offset += 4;

                    var texture = new Uint16Array(buffer, offset, texturelen[0]);

                    texturestr = String.fromCharCode.apply(null, texture);

                    offset += texturelen[0] * 2;

                    if (texturelen[0] % 2 != 0) {
                        offset += 2;
                    }

                }

                hasTexcoord = true;

                texcoords = new Float32Array(buffer, offset, numVertex[0] * 2);

            }

        }

        if (texcoords != null) {
            for (var i = 0; i < numVertex[0] / 2; i++) {
                texcoords[2 * i + 1] = -texcoords[2 * i + 1];
            }
        }

        var normals = new Float32Array( numVertex[0] * 3 );

        var tempnormals = new Array(numVertex[0]);

        for (var i = 0; i < numVertex[0]; i++)
        {
            tempnormals[i] = new THREE.Vector3(0, 0, 0);
        }

        var colors = new Uint8Array(numVertex[0]  * 3 );

        var indices = new Uint32Array(numIndex[0]);

        for (var v = 0; v < numIndex[0]; v++) {

            indices[v] = indexs[v];

        }

        for (var i = 0; i < numIndex[0] / 3; i++) {

            var p1 = new THREE.Vector3();
            var p2 = new THREE.Vector3();
            var p3 = new THREE.Vector3();

            var i0 = indices[3 * i + 0];
            var i1 = indices[3 * i + 1];
            var i2 = indices[3 * i + 2];

            p1.x = positions[3 * i0 + 0];
            p1.y = positions[3 * i0 + 1];
            p1.z = positions[3 * i0 + 2];

            p2.x = positions[3 * i1 + 0];
            p2.y = positions[3 * i1 + 1];
            p2.z = positions[3 * i1 + 2];

            p3.x = positions[3 * i2 + 0];
            p3.y = positions[3 * i2 + 1];
            p3.z = positions[3 * i2 + 2];

            var cb = new THREE.Vector3();
            var ab = new THREE.Vector3();

            cb.subVectors(p3, p2);
            ab.subVectors(p1, p2);

            cb.cross(ab);

            cb.normalize();

            //cb.negate();

            tempnormals[i0].add(cb);
            tempnormals[i1].add(cb);
            tempnormals[i2].add(cb);
        }

        for (var i = 0; i < tempnormals.length; i++) {

            tempnormals[i].normalize();

            normals[3 * i + 0] = tempnormals[i].x;
            normals[3 * i + 1] = tempnormals[i].y;
            normals[3 * i + 2] = tempnormals[i].z;

        }

        geometry.setIndex(new THREE.BufferAttribute(indices, 1));
        geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.addAttribute('normal', new THREE.BufferAttribute(normals, 3, false));


        if ( hasTexcoord ) {

            geometry.addAttribute('uv', new THREE.BufferAttribute(texcoords, 2, false));
        }

        geometry.addAttribute('color', new THREE.BufferAttribute(colors, 3, true));

        geometry.computeBoundingBox();

        var mesh = new BMesh();

        mesh.geo = geometry;
        mesh.texture = texturestr;

        return mesh;
    }

    callbackPainting = function() {

    }

    function loadtexgeo( geo ) {

        var texfile = pathdir + "textures/" + geo.texture;

        var textureLoader = new THREE.TextureLoader();

        var texture = textureLoader.load(texfile);

        var material = new THREE.MeshBasicMaterial({ color: 0xffffff, map: texture });

        return new THREE.Mesh(geo.geo, material);

    };

    function loadgeo (obj, geo) {
        var mesh = null;

        if (geo.texture == null || geo.texture.length == 0 ) {

            mesh = new THREE.Mesh(geo.geo, new THREE.MeshPhongMaterial({ specular: 0x050505, shininess: 30,transparent: false, opacity: 1 }));

            mesh.material.color.setRGB(obj.r, obj.g, obj.b);
            //console.log(obj.r, obj.g, obj.b);

        }
        else {

            var texfile = pathdir + "textures/" + geo.texture;

            var texture = textureMap.getValue(geo.texture);

            if ( texture == null ) {

                //console.log("loading " + texfile);

                var textureLoader = new THREE.TextureLoader();

                texture = textureLoader.load(texfile);

                textureMap.add(geo.texture, texture);
            }

            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            //texture.repeat.set(1, 1);

            var material = new THREE.MeshPhongMaterial({ specular: 0x050505, shininess: 30, color: 0xffffff, map: texture });

            mesh = new THREE.Mesh(geo.geo, material);

        }

        mesh.castShadow = true;

        mesh.receiveShadow = true;

        mesh.material.clippingPlanes = axis.getClip();
        mesh.material.clipShadows = true;

        mesh.material.side = THREE.DoubleSide;

        mesh.position.set(obj.px, obj.py, obj.pz);
        mesh.rotation.set(obj.rx, obj.ry, obj.rz);
        mesh.scale.set(obj.sx, obj.sy, obj.sz);
        mesh.name = obj.name;

        _this.objmap.add( obj.id, mesh );

        var inobjset = false;

        var ots = otMap.getValues();

        var node = scene;

        for (var s = 0; s < ots.length; s++) {

            if (mesh.name.indexOf(ots[s].name) >= 0 ) {

                inobjset = true;

                ots[s].add(mesh);

                node = ots[s];

                break;
             }
         }

         if (obj.parent == null || obj.parent.length == 0) {
             scene.add(mesh);
         }

        if ( !inobjset ) {

            if (_this.objmap.containsKey(obj.parent)) {
                node =_this.objmap.getValue(obj.parent);
                node.add(mesh);
            }
            else
            {
                scene.add(mesh);
            }
        }


      };

      /////////////////////////////////////////////////////////////////////////////////////////////

      var vertexshader = "varying vec3 vViewPosition;void main() {\
                          gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);\
                          vec4 mvPosition = modelViewMatrix * vec4(position,1.0);\
                          vViewPosition = -mvPosition.xyz;\
                          gl_Position.z -= 0.0005;gl_Position.z *= 0.999999;\
                        }";

      var pixelshader = "varying vec3 vViewPosition;	uniform vec4 clippingPlanes[ 1 ];void main(){\
                            gl_FragColor = vec4(0.0,  0.0, 0.0,  0.5);\
                          	for ( int i = 0; i < 1; ++ i ) {\
		                        vec4 plane = clippingPlanes[ i ];\
		                        if ( dot( vViewPosition, plane.xyz ) > plane.w ) discard;\
	                        }\
                        }";

      var shaderMaterial = null;
      var outline = new THREE.Object3D();
      scene.add(outline);

      ///////////////////////////////////

      this.showOutline = function(visible) {

      outline.visible = outline;

      defaultOutline = visible;

      var objs = _this.objmap.getValues();

      if (visible && objs.length > 0 ) {

              if (shaderMaterial == null || outline.children.length == 0 )
              {
                  shaderMaterial = new THREE.ShaderMaterial({
                  transparent: true,
                      vertexShader: vertexshader,
                      fragmentShader: pixelshader
                  });

                  shaderMaterial.linewidth = 1;

                  shaderMaterial.clipping = true;

                  shaderMaterial.clippingPlanes = axis.getClip();

                  for (var b = 0; b < objs.length; b++) {

                      var obj = objs[b];

                      obj.updateMatrixWorld(true);

                      var linemesh = new BoundingObject(obj.geometry, obj.matrixWorld);

                      var line = new THREE.LineSegments(linemesh, shaderMaterial);

                      outline.add(line);
                  }
            }

          }

      }


    function loadmodel(obj, obj3D, callback, paraIndex) {

        if (obj.mesh == "false")
        {
            var group = new THREE.Object3D();

            group.position.set(obj.px, obj.py, obj.pz);
            group.rotation.set(obj.rx, obj.ry, obj.rz);
            group.scale.set(obj.sx, obj.sy, obj.sz);

            group.updateMatrixWorld(true);

            group.name = obj.name;

            _this.objmap.add(obj.id, group);

            if (obj.parent == null || obj.parent.length == 0) {
                obj3D.add(group);
                return;
            }

            if (_this.objmap.containsKey(obj.parent)) {
                _this.objmap.getValue(obj.parent).add(group);
            }
            else {
                obj3D.add(group);
            }
        }
        else {

            var meshid = obj.meshid + ".json.byte";
            //console.log(meshid);
            var geo = geometryMap.get( meshid );

            if (geo != null) {

                loadgeo(obj, geo);
            }
            else {

                var arraybuffer = zipdata.get(meshid);

                if (arraybuffer != null) {

                    var geo = parseMeshByte(arraybuffer);

                    loadgeo(obj, geo);

                    geometryMap.add(meshid, geo);
                }
                else {

                        ByteLoader(pathdir + "meshes/" + meshid, function(arraybuffer) {

                        var geo = parseMeshByte(arraybuffer);

                        loadgeo(obj, geo);

                        geometryMap.add(meshid, geo);


                    });
                }
            }

        }
        callback && callback(paraIndex);
    };

    function loadlist() {
        //console.log("begin loadlist");

        var arraybuffer = zipdata.getValue("sky.byte");

        if (arraybuffer != null) {

            var geo = parseMeshByte(arraybuffer);

            geo.texture = new String("s.png");

            var mesh = loadtexgeo(geo);

            mesh.position.set(0, -5000, 0);
            mesh.scale.set(0.1, 0.1, 0.1);

            scene.add(mesh);

        }


        function loadList(i){

            loadmodel(needLoadList[i], scene, function(i){

                needLoadList[i] = null;

                if(i < needLoadList.length-1){
                    loading.innerText = '加载：' + Math.round(i / (needLoadList.length-1) * 100) + '%';
                    // loading2.innerText = '加载：' + Math.round(i / (needLoadList.length-1) * 100) + '%';
                    setTimeout(function(){
                        var n = i + 1;
                        loadList(n);
                    },4);
                }else{
                    loading.innerText = '';
                    // loading2.innerText = '';
                    console.timeEnd('模型加载');
                    _this.callback();
                }

            }, i);
        }
        console.time('模型加载');
        loadList(0);

        if (defaultOutline) {
            _this.showOutline(true);
        }

         //_this.callback();

    }

    function decodeB64(b64buf) {

        var decoded = new Uint8Array(b64buf.length * 3 / 4 | 0);
        var tmp;
        var pos = 0;
        var i, il;
        var table = decodeB64.DecodeTable;

        for (i = 0, il = b64buf.length; i < il; i += 4, pos += 3) {
            tmp = (table[b64buf.charCodeAt(i)] << 18) |
          (table[b64buf.charCodeAt(i + 1)] << 12) |
          (table[b64buf.charCodeAt(i + 2)] << 6) |
          (table[b64buf.charCodeAt(i + 3)]);
            decoded[pos] = tmp >>> 16;
            decoded[pos + 1] = tmp >>> 8 & 0xff;
            decoded[pos + 2] = tmp & 0xff;
        }

        return decoded;

    }

    this.DecodeTable = (function(chars) {
        var table = new Uint8Array(256);

        for (var i = 0, il = chars.length; i < il; ++i) {
            table[chars.charCodeAt(i)] = i;
        }

        return table;
    })('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/');


    this.loadzip = function(zipfilename) {

        JSZipUtils.getBinaryContent(zipfilename, function(err, data) {

            if (err) {
                alert("loading " + zipfilename + " failed");
                // alert("loading2 " + zipfilename + " failed");
                //return;
            }

            //console.log(zipfilename + "loaded");

            // TxtLoader(zipfilename, function(arraybuffer) {

            //var data = atob(arraybuffer);

            JSZip.loadAsync(data).then(function(zip) {

                console.time('模型解压');

                var numoffile = 0;
                var i = 0;

                zip.forEach(function(relativePath, zipEntry) { numoffile++ });


                zip.forEach(function(relativePath, zipEntry) {

                    zip.file(zipEntry.name).async("ArrayBuffer").then(function(data64) {

                        var str = new Float32Array(data64, 0, 4);

                        zipdata.add(zipEntry.name, data64);

                        i++;

                        loading.innerText = '解压：' + Math.round(i / numoffile * 100) + '%'
                        // loading2.innerText = '解压：' + Math.round(i / numoffile * 100) + '%'
                        if (i == numoffile) {
                            console.timeEnd('模型解压');
                            loadlist();
                        } //if

                    }); //then

                }); //forEach

                return zip;
                //
            }).then(function(zip) {

            });

            //}); // gettxt

        }); // getBinaryContent

    }    // load zip file

    this.loadscene = function(scenefile) {

        pathdir = scenefile.substr(0, 1 + scenefile.lastIndexOf("/"));

        JSONLoader(scenefile, function(json) {

            for (var i = 0; i < json.objects.length; i++) {
                if (json.objects[i].mesh == "false") {
                    loadmodel(json.objects[i], scene);
                }
                else {
                    needLoadList.push(json.objects[i]);
                }
            }

        });
    };

    this.cullByDist = function(camera,fardist, move) {

        var objs = _this.objmap.getValues();

        for (var i = 0; i < objs.length; i++) {

            if (objs[i].geometry != null && objs[i].geometry.attributes.position.length > 600) {

                if (!move) {
                    objs[i].visible = true;
                    continue;
                }
                else {
                    objs[i].visible = false;
                }

                continue;

                var min = objs[i].geometry.boundingBox.min.clone();
                var max = objs[i].geometry.boundingBox.max.clone();

                min.applyMatrix4(objs[i].matrixWorld);
                max.applyMatrix4(objs[i].matrixWorld);

                var center = min.clone();
                center.add(max);
                center.divideScalar(2);

                var eyepos = camera.position.clone();

                var dist = eyepos.sub(center);

                if (dist.length() > fardist) {
                    objs[i].visible = false;
                }
                else {
                    objs[i].visible = true;
                }
            }
        }
    }

};