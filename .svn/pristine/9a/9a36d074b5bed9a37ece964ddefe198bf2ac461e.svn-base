     //获取地址栏 pid
    var url = window.location.search;
    var pId = url.substring(url.lastIndexOf('=')+1, url.length);
    var urn;

    function geturn(){
        $.ajax({

            //  url: "http://localhost:8080/bim/forge/getBy/"+pId, //这边需要改成自己服务器地址
             url:myUrl+"forge/getBy/"+pId,
             type: "get",
             contentType: "application/json;charset=utf-8",
             async: false,
             dataType: "json",
             //data: jsonText,
             success: function (data) {
                 if (data) {
                     urn = data.urn;
                      // alert(urn);
                 } else {
                     console.log("urn获取失败1");
                 }
             },
             error: function () {

                 console.log("urn获取失败2");
             }
         });


    }




// 获取token并进行渲染
     window.onload = getToken();//先获取token再获取urn
     geturn();
     var viewer;
     var token;

     function getToken() {
 
         $.ajax({

            //  url:"http://localhost:8080/bim/forge/getToken",//这边需要改成自己服务器地址
             url: myUrl+"forge/getToken?token="+eIdToken+"&loginId="+eId, 
             type: "get",
             contentType: "application/json;charset=utf-8",
             async: false,
             dataType: "json",
             //data: jsonText,
             success: function (data) {
                 if (data) {
                     token = data.token
                     // alert(token);
                 } else {
                     console.log("token获取失败1");
                 }
             },
             error: function () {

                 console.log("token获取失败2");
             }
         })
     }


    //  var urn = 'dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6bXlidWNrZXR4eHh4L3J1aXl1YW4ucnZ0';
     var options = {
         env: 'AutodeskProduction',
         accessToken: token
     };
     var documentId = 'urn:' + urn;
     Autodesk.Viewing.Initializer(options, function onInitialized() {
         Autodesk.Viewing.Document.load(documentId, onDocumentLoadSuccess, onDocumentLoadFailure);
     });

     /**
      * Autodesk.Viewing.Document.load() success callback.
      * Proceeds with model initialization.
      */
     function onDocumentLoadSuccess(doc) {

         // A document contains references to 3D and 2D viewables.
         var viewables = Autodesk.Viewing.Document.getSubItemsWithProperties(doc.getRootItem(), {
             'type': 'geometry'
         }, true);
         if (viewables.length === 0) {
             console.error('Document contains no viewables.');
             return;
         }

         // Choose any of the avialble viewables
         var initialViewable = viewables[0];
         var svfUrl = doc.getViewablePath(initialViewable);
         var modelOptions = {
             sharedPropertyDbPath: doc.getPropertyDbPath()
         };

         var viewerDiv = document.getElementById('forgeViewer');
         viewer = new Autodesk.Viewing.Private.GuiViewer3D(viewerDiv);
         viewer.start(svfUrl, modelOptions, onLoadModelSuccess, onLoadModelError);
     }

     /**
      * Autodesk.Viewing.Document.load() failuire callback.
      */
     function onDocumentLoadFailure(viewerErrorCode) {
         console.error('onDocumentLoadFailure() - errorCode:' + viewerErrorCode);
     }

     /**
      * viewer.loadModel() success callback.
      * Invoked after the model's SVF has been initially loaded.
      * It may trigger before any geometry has been downloaded and displayed on-screen.
      */
     function onLoadModelSuccess(model) {
         console.log('onLoadModelSuccess()!');
         console.log('Validate model loaded:' + (viewer.model === model));
         console.log(model);
     }

     /**
      * viewer.loadModel() failure callback.
      * Invoked when there's an error fetching the SVF file.
      */
     function onLoadModelError(viewerErrorCode) {
         console.error('onLoadModelError() - errorCode:' + viewerErrorCode);
     }

     // this will prepare and download the XLS file
     function downloadExcel() {
         alert("开始下载属性！！");
         $('#downloadExcel').prop("disabled", true);
         ForgeXLS.downloadXLSX(urn, token, statusCallback /*Optional*/ );
     }

     function statusCallback(completed, message) {
         $.notify(message, 'info');
         $('#downloadExcel').prop("disabled", !completed);
     }