!function(){function require(path,parent,orig){var resolved=require.resolve(path);if(null==resolved){orig=orig||path,parent=parent||"root";var err=new Error('Failed to require "'+orig+'" from "'+parent+'"');throw err.path=orig,err.parent=parent,err.require=!0,err}var module=require.modules[resolved];if(!module._resolving&&!module.exports){var mod={};mod.exports={},mod.client=mod.component=!0,module._resolving=!0,module.call(this,mod.exports,require.relative(resolved),mod),delete module._resolving,module.exports=mod.exports}return module.exports}require.modules={},require.aliases={},require.resolve=function(path){"/"===path.charAt(0)&&(path=path.slice(1));for(var paths=[path,path+".js",path+".json",path+"/index.js",path+"/index.json"],i=0;i<paths.length;i++){var path=paths[i];if(require.modules.hasOwnProperty(path))return path;if(require.aliases.hasOwnProperty(path))return require.aliases[path]}},require.normalize=function(curr,path){var segs=[];if("."!=path.charAt(0))return path;curr=curr.split("/"),path=path.split("/");for(var i=0;i<path.length;++i)".."==path[i]?curr.pop():"."!=path[i]&&""!=path[i]&&segs.push(path[i]);return curr.concat(segs).join("/")},require.register=function(path,definition){require.modules[path]=definition},require.alias=function(from,to){if(!require.modules.hasOwnProperty(from))throw new Error('Failed to alias "'+from+'", it does not exist');require.aliases[to]=from},require.relative=function(parent){function lastIndexOf(arr,obj){for(var i=arr.length;i--;)if(arr[i]===obj)return i;return-1}function localRequire(path){var resolved=localRequire.resolve(path);return require(resolved,parent,path)}var p=require.normalize(parent,"..");return localRequire.resolve=function(path){var c=path.charAt(0);if("/"==c)return path.slice(1);if("."==c)return require.normalize(p,path);var segs=parent.split("/"),i=lastIndexOf(segs,"deps")+1;return i||(i=0),path=segs.slice(0,i+1).join("/")+"/deps/"+path},localRequire.exists=function(path){return require.modules.hasOwnProperty(localRequire.resolve(path))},localRequire},require.register("component-emitter/index.js",function(exports,require,module){function Emitter(obj){return obj?mixin(obj):void 0}function mixin(obj){for(var key in Emitter.prototype)obj[key]=Emitter.prototype[key];return obj}module.exports=Emitter,Emitter.prototype.on=Emitter.prototype.addEventListener=function(event,fn){return this._callbacks=this._callbacks||{},(this._callbacks[event]=this._callbacks[event]||[]).push(fn),this},Emitter.prototype.once=function(event,fn){function on(){self.off(event,on),fn.apply(this,arguments)}var self=this;return this._callbacks=this._callbacks||{},on.fn=fn,this.on(event,on),this},Emitter.prototype.off=Emitter.prototype.removeListener=Emitter.prototype.removeAllListeners=Emitter.prototype.removeEventListener=function(event,fn){if(this._callbacks=this._callbacks||{},0==arguments.length)return this._callbacks={},this;var callbacks=this._callbacks[event];if(!callbacks)return this;if(1==arguments.length)return delete this._callbacks[event],this;for(var cb,i=0;i<callbacks.length;i++)if(cb=callbacks[i],cb===fn||cb.fn===fn){callbacks.splice(i,1);break}return this},Emitter.prototype.emit=function(event){this._callbacks=this._callbacks||{};var args=[].slice.call(arguments,1),callbacks=this._callbacks[event];if(callbacks){callbacks=callbacks.slice(0);for(var i=0,len=callbacks.length;len>i;++i)callbacks[i].apply(this,args)}return this},Emitter.prototype.listeners=function(event){return this._callbacks=this._callbacks||{},this._callbacks[event]||[]},Emitter.prototype.hasListeners=function(event){return!!this.listeners(event).length}}),require.register("dropzone/index.js",function(exports,require,module){module.exports=require("./lib/dropzone.js")}),require.register("dropzone/lib/dropzone.js",function(exports,require,module){(function(){var Dropzone,Em,camelize,contentLoaded,detectVerticalSquash,drawImageIOSFix,noop,without,__hasProp={}.hasOwnProperty,__extends=function(child,parent){function ctor(){this.constructor=child}for(var key in parent)__hasProp.call(parent,key)&&(child[key]=parent[key]);return ctor.prototype=parent.prototype,child.prototype=new ctor,child.__super__=parent.prototype,child},__slice=[].slice;Em="undefined"!=typeof Emitter&&null!==Emitter?Emitter:require("emitter"),noop=function(){},Dropzone=function(_super){function Dropzone(element,options){var elementOptions,fallback,_ref;if(this.element=element,this.version=Dropzone.version,this.defaultOptions.previewTemplate=this.defaultOptions.previewTemplate.replace(/\n*/g,""),this.clickableElements=[],this.listeners=[],this.files=[],"string"==typeof this.element&&(this.element=document.querySelector(this.element)),!this.element||null==this.element.nodeType)throw new Error("Invalid dropzone element.");if(this.element.dropzone)throw new Error("Dropzone already attached.");if(Dropzone.instances.push(this),this.element.dropzone=this,elementOptions=null!=(_ref=Dropzone.optionsForElement(this.element))?_ref:{},this.options=extend({},this.defaultOptions,elementOptions,null!=options?options:{}),this.options.forceFallback||!Dropzone.isBrowserSupported())return this.options.fallback.call(this);if(null==this.options.url&&(this.options.url=this.element.getAttribute("action")),!this.options.url)throw new Error("No URL provided.");if(this.options.acceptedFiles&&this.options.acceptedMimeTypes)throw new Error("You can't provide both 'acceptedFiles' and 'acceptedMimeTypes'. 'acceptedMimeTypes' is deprecated.");this.options.acceptedMimeTypes&&(this.options.acceptedFiles=this.options.acceptedMimeTypes,delete this.options.acceptedMimeTypes),this.options.method=this.options.method.toUpperCase(),(fallback=this.getExistingFallback())&&fallback.parentNode&&fallback.parentNode.removeChild(fallback),this.previewsContainer=this.options.previewsContainer?Dropzone.getElement(this.options.previewsContainer,"previewsContainer"):this.element,this.options.clickable&&(this.clickableElements=this.options.clickable===!0?[this.element]:Dropzone.getElements(this.options.clickable,"clickable")),this.init()}var extend;return __extends(Dropzone,_super),Dropzone.prototype.events=["drop","dragstart","dragend","dragenter","dragover","dragleave","addedfile","removedfile","thumbnail","error","errormultiple","processing","processingmultiple","uploadprogress","totaluploadprogress","sending","sendingmultiple","success","successmultiple","canceled","canceledmultiple","complete","completemultiple","reset","maxfilesexceeded","maxfilesreached"],Dropzone.prototype.defaultOptions={url:null,method:"post",withCredentials:!1,parallelUploads:2,uploadMultiple:!1,maxFilesize:256,paramName:"file",createImageThumbnails:!0,maxThumbnailFilesize:10,thumbnailWidth:100,thumbnailHeight:100,maxFiles:null,params:{},clickable:!0,ignoreHiddenFiles:!0,acceptedFiles:null,acceptedMimeTypes:null,autoProcessQueue:!0,addRemoveLinks:!1,previewsContainer:null,dictDefaultMessage:"Drop files here to upload",dictFallbackMessage:"Your browser does not support drag'n'drop file uploads.",dictFallbackText:"Please use the fallback form below to upload your files like in the olden days.",dictFileTooBig:"File is too big ({{filesize}}MiB). Max filesize: {{maxFilesize}}MiB.",dictInvalidFileType:"You can't upload files of this type.",dictResponseError:"Server responded with {{statusCode}} code.",dictCancelUpload:"Cancel upload",dictCancelUploadConfirmation:"Are you sure you want to cancel this upload?",dictRemoveFile:"Remove file",dictRemoveFileConfirmation:null,dictMaxFilesExceeded:"You can not upload any more files.",accept:function(file,done){return done()},init:function(){return noop},forceFallback:!1,fallback:function(){var child,messageElement,span,_i,_len,_ref;for(this.element.className=""+this.element.className+" dz-browser-not-supported",_ref=this.element.getElementsByTagName("div"),_i=0,_len=_ref.length;_len>_i;_i++)child=_ref[_i],/(^| )dz-message($| )/.test(child.className)&&(messageElement=child,child.className="dz-message");return messageElement||(messageElement=Dropzone.createElement('<div class="dz-message"><span></span></div>'),this.element.appendChild(messageElement)),span=messageElement.getElementsByTagName("span")[0],span&&(span.textContent=this.options.dictFallbackMessage),this.element.appendChild(this.getFallbackForm())},resize:function(file){var info,srcRatio,trgRatio;return info={srcX:0,srcY:0,srcWidth:file.width,srcHeight:file.height},srcRatio=file.width/file.height,trgRatio=this.options.thumbnailWidth/this.options.thumbnailHeight,file.height<this.options.thumbnailHeight||file.width<this.options.thumbnailWidth?(info.trgHeight=info.srcHeight,info.trgWidth=info.srcWidth):srcRatio>trgRatio?(info.srcHeight=file.height,info.srcWidth=info.srcHeight*trgRatio):(info.srcWidth=file.width,info.srcHeight=info.srcWidth/trgRatio),info.srcX=(file.width-info.srcWidth)/2,info.srcY=(file.height-info.srcHeight)/2,info},drop:function(){return this.element.classList.remove("dz-drag-hover")},dragstart:noop,dragend:function(){return this.element.classList.remove("dz-drag-hover")},dragenter:function(){return this.element.classList.add("dz-drag-hover")},dragover:function(){return this.element.classList.add("dz-drag-hover")},dragleave:function(){return this.element.classList.remove("dz-drag-hover")},paste:noop,reset:function(){return this.element.classList.remove("dz-started")},addedfile:function(file){var node,removeFileEvent,removeLink,_i,_j,_k,_len,_len1,_len2,_ref,_ref1,_ref2,_results,_this=this;for(this.element===this.previewsContainer&&this.element.classList.add("dz-started"),file.previewElement=Dropzone.createElement(this.options.previewTemplate.trim()),file.previewTemplate=file.previewElement,this.previewsContainer.appendChild(file.previewElement),_ref=file.previewElement.querySelectorAll("[data-dz-name]"),_i=0,_len=_ref.length;_len>_i;_i++)node=_ref[_i],node.textContent=file.name;for(_ref1=file.previewElement.querySelectorAll("[data-dz-size]"),_j=0,_len1=_ref1.length;_len1>_j;_j++)node=_ref1[_j],node.innerHTML=this.filesize(file.size);for(this.options.addRemoveLinks&&(file._removeLink=Dropzone.createElement('<a class="dz-remove" href="javascript:undefined;" data-dz-remove>'+this.options.dictRemoveFile+"</a>"),file.previewElement.appendChild(file._removeLink)),removeFileEvent=function(e){return e.preventDefault(),e.stopPropagation(),file.status===Dropzone.UPLOADING?Dropzone.confirm(_this.options.dictCancelUploadConfirmation,function(){return _this.removeFile(file)}):_this.options.dictRemoveFileConfirmation?Dropzone.confirm(_this.options.dictRemoveFileConfirmation,function(){return _this.removeFile(file)}):_this.removeFile(file)},_ref2=file.previewElement.querySelectorAll("[data-dz-remove]"),_results=[],_k=0,_len2=_ref2.length;_len2>_k;_k++)removeLink=_ref2[_k],_results.push(removeLink.addEventListener("click",removeFileEvent));return _results},removedfile:function(file){var _ref;return null!=(_ref=file.previewElement)&&_ref.parentNode.removeChild(file.previewElement),this._updateMaxFilesReachedClass()},thumbnail:function(file,dataUrl){var thumbnailElement,_i,_len,_ref,_results;for(file.previewElement.classList.remove("dz-file-preview"),file.previewElement.classList.add("dz-image-preview"),_ref=file.previewElement.querySelectorAll("[data-dz-thumbnail]"),_results=[],_i=0,_len=_ref.length;_len>_i;_i++)thumbnailElement=_ref[_i],thumbnailElement.alt=file.name,_results.push(thumbnailElement.src=dataUrl);return _results},error:function(file,message){var node,_i,_len,_ref,_results;for(file.previewElement.classList.add("dz-error"),"String"!=typeof message&&message.error&&(message=message.error),_ref=file.previewElement.querySelectorAll("[data-dz-errormessage]"),_results=[],_i=0,_len=_ref.length;_len>_i;_i++)node=_ref[_i],_results.push(node.textContent=message);return _results},errormultiple:noop,processing:function(file){return file.previewElement.classList.add("dz-processing"),file._removeLink?file._removeLink.textContent=this.options.dictCancelUpload:void 0},processingmultiple:noop,uploadprogress:function(file,progress){var node,_i,_len,_ref,_results;for(_ref=file.previewElement.querySelectorAll("[data-dz-uploadprogress]"),_results=[],_i=0,_len=_ref.length;_len>_i;_i++)node=_ref[_i],_results.push(node.style.width=""+progress+"%");return _results},totaluploadprogress:noop,sending:noop,sendingmultiple:noop,success:function(file){return file.previewElement.classList.add("dz-success")},successmultiple:noop,canceled:function(file){return this.emit("error",file,"Upload canceled.")},canceledmultiple:noop,complete:function(file){return file._removeLink?file._removeLink.textContent=this.options.dictRemoveFile:void 0},completemultiple:noop,maxfilesexceeded:noop,maxfilesreached:noop,previewTemplate:'<div class="dz-preview dz-file-preview">\n  <div class="dz-details">\n    <div class="dz-filename"><span data-dz-name></span></div>\n    <div class="dz-size" data-dz-size></div>\n    <img data-dz-thumbnail />\n  </div>\n  <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>\n  <div class="dz-success-mark"><span>✔</span></div>\n  <div class="dz-error-mark"><span>✘</span></div>\n  <div class="dz-error-message"><span data-dz-errormessage></span></div>\n</div>'},extend=function(){var key,object,objects,target,val,_i,_len;for(target=arguments[0],objects=2<=arguments.length?__slice.call(arguments,1):[],_i=0,_len=objects.length;_len>_i;_i++){object=objects[_i];for(key in object)val=object[key],target[key]=val}return target},Dropzone.prototype.getAcceptedFiles=function(){var file,_i,_len,_ref,_results;for(_ref=this.files,_results=[],_i=0,_len=_ref.length;_len>_i;_i++)file=_ref[_i],file.accepted&&_results.push(file);return _results},Dropzone.prototype.getRejectedFiles=function(){var file,_i,_len,_ref,_results;for(_ref=this.files,_results=[],_i=0,_len=_ref.length;_len>_i;_i++)file=_ref[_i],file.accepted||_results.push(file);return _results},Dropzone.prototype.getQueuedFiles=function(){var file,_i,_len,_ref,_results;for(_ref=this.files,_results=[],_i=0,_len=_ref.length;_len>_i;_i++)file=_ref[_i],file.status===Dropzone.QUEUED&&_results.push(file);return _results},Dropzone.prototype.getUploadingFiles=function(){var file,_i,_len,_ref,_results;for(_ref=this.files,_results=[],_i=0,_len=_ref.length;_len>_i;_i++)file=_ref[_i],file.status===Dropzone.UPLOADING&&_results.push(file);return _results},Dropzone.prototype.init=function(){var eventName,noPropagation,setupHiddenFileInput,_i,_len,_ref,_ref1,_this=this;for("form"===this.element.tagName&&this.element.setAttribute("enctype","multipart/form-data"),this.element.classList.contains("dropzone")&&!this.element.querySelector(".dz-message")&&this.element.appendChild(Dropzone.createElement('<div class="dz-default dz-message"><span>'+this.options.dictDefaultMessage+"</span></div>")),this.clickableElements.length&&(setupHiddenFileInput=function(){return _this.hiddenFileInput&&document.body.removeChild(_this.hiddenFileInput),_this.hiddenFileInput=document.createElement("input"),_this.hiddenFileInput.setAttribute("type","file"),(null==_this.options.maxFiles||_this.options.maxFiles>1)&&_this.hiddenFileInput.setAttribute("multiple","multiple"),null!=_this.options.acceptedFiles&&_this.hiddenFileInput.setAttribute("accept",_this.options.acceptedFiles),_this.hiddenFileInput.style.visibility="hidden",_this.hiddenFileInput.style.position="absolute",_this.hiddenFileInput.style.top="0",_this.hiddenFileInput.style.left="0",_this.hiddenFileInput.style.height="0",_this.hiddenFileInput.style.width="0",document.body.appendChild(_this.hiddenFileInput),_this.hiddenFileInput.addEventListener("change",function(){var file,files,_i,_len;if(files=_this.hiddenFileInput.files,files.length)for(_i=0,_len=files.length;_len>_i;_i++)file=files[_i],_this.addFile(file);return setupHiddenFileInput()})},setupHiddenFileInput()),this.URL=null!=(_ref=window.URL)?_ref:window.webkitURL,_ref1=this.events,_i=0,_len=_ref1.length;_len>_i;_i++)eventName=_ref1[_i],this.on(eventName,this.options[eventName]);return this.on("uploadprogress",function(){return _this.updateTotalUploadProgress()}),this.on("removedfile",function(){return _this.updateTotalUploadProgress()}),this.on("canceled",function(file){return _this.emit("complete",file)}),this.on("complete",function(){return 0===_this.getUploadingFiles().length&&0===_this.getQueuedFiles().length?setTimeout(function(){return _this.emit("queuecomplete")},0):void 0}),noPropagation=function(e){return e.stopPropagation(),e.preventDefault?e.preventDefault():e.returnValue=!1},this.listeners=[{element:this.element,events:{dragstart:function(e){return _this.emit("dragstart",e)},dragenter:function(e){return noPropagation(e),_this.emit("dragenter",e)},dragover:function(e){var efct;try{efct=e.dataTransfer.effectAllowed}catch(_error){}return e.dataTransfer.dropEffect="move"===efct||"linkMove"===efct?"move":"copy",noPropagation(e),_this.emit("dragover",e)},dragleave:function(e){return _this.emit("dragleave",e)},drop:function(e){return noPropagation(e),_this.drop(e)},dragend:function(e){return _this.emit("dragend",e)},paste:function(e){return noPropagation(e),_this.paste(e)}}}],this.clickableElements.forEach(function(clickableElement){return _this.listeners.push({element:clickableElement,events:{click:function(evt){return clickableElement!==_this.element||evt.target===_this.element||Dropzone.elementInside(evt.target,_this.element.querySelector(".dz-message"))?_this.hiddenFileInput.click():void 0}}})}),this.enable(),this.options.init.call(this)},Dropzone.prototype.destroy=function(){var _ref;return this.disable(),this.removeAllFiles(!0),(null!=(_ref=this.hiddenFileInput)?_ref.parentNode:void 0)&&(this.hiddenFileInput.parentNode.removeChild(this.hiddenFileInput),this.hiddenFileInput=null),delete this.element.dropzone,Dropzone.instances.splice(Dropzone.instances.indexOf(this),1)},Dropzone.prototype.updateTotalUploadProgress=function(){var acceptedFiles,file,totalBytes,totalBytesSent,totalUploadProgress,_i,_len,_ref;if(totalBytesSent=0,totalBytes=0,acceptedFiles=this.getAcceptedFiles(),acceptedFiles.length){for(_ref=this.getAcceptedFiles(),_i=0,_len=_ref.length;_len>_i;_i++)file=_ref[_i],totalBytesSent+=file.upload.bytesSent,totalBytes+=file.upload.total;totalUploadProgress=100*totalBytesSent/totalBytes}else totalUploadProgress=100;return this.emit("totaluploadprogress",totalUploadProgress,totalBytes,totalBytesSent)},Dropzone.prototype.getFallbackForm=function(){var existingFallback,fields,fieldsString,form;return(existingFallback=this.getExistingFallback())?existingFallback:(fieldsString='<div class="dz-fallback">',this.options.dictFallbackText&&(fieldsString+="<p>"+this.options.dictFallbackText+"</p>"),fieldsString+='<input type="file" name="'+this.options.paramName+(this.options.uploadMultiple?"[]":"")+'" '+(this.options.uploadMultiple?'multiple="multiple"':void 0)+' /><input type="submit" value="Upload!"></div>',fields=Dropzone.createElement(fieldsString),"FORM"!==this.element.tagName?(form=Dropzone.createElement('<form action="'+this.options.url+'" enctype="multipart/form-data" method="'+this.options.method+'"></form>'),form.appendChild(fields)):(this.element.setAttribute("enctype","multipart/form-data"),this.element.setAttribute("method",this.options.method)),null!=form?form:fields)},Dropzone.prototype.getExistingFallback=function(){var fallback,getFallback,tagName,_i,_len,_ref;for(getFallback=function(elements){var el,_i,_len;for(_i=0,_len=elements.length;_len>_i;_i++)if(el=elements[_i],/(^| )fallback($| )/.test(el.className))return el},_ref=["div","form"],_i=0,_len=_ref.length;_len>_i;_i++)if(tagName=_ref[_i],fallback=getFallback(this.element.getElementsByTagName(tagName)))return fallback},Dropzone.prototype.setupEventListeners=function(){var elementListeners,event,listener,_i,_len,_ref,_results;for(_ref=this.listeners,_results=[],_i=0,_len=_ref.length;_len>_i;_i++)elementListeners=_ref[_i],_results.push(function(){var _ref1,_results1;_ref1=elementListeners.events,_results1=[];for(event in _ref1)listener=_ref1[event],_results1.push(elementListeners.element.addEventListener(event,listener,!1));return _results1}());return _results},Dropzone.prototype.removeEventListeners=function(){var elementListeners,event,listener,_i,_len,_ref,_results;for(_ref=this.listeners,_results=[],_i=0,_len=_ref.length;_len>_i;_i++)elementListeners=_ref[_i],_results.push(function(){var _ref1,_results1;_ref1=elementListeners.events,_results1=[];for(event in _ref1)listener=_ref1[event],_results1.push(elementListeners.element.removeEventListener(event,listener,!1));return _results1}());return _results},Dropzone.prototype.disable=function(){var file,_i,_len,_ref,_results;for(this.clickableElements.forEach(function(element){return element.classList.remove("dz-clickable")}),this.removeEventListeners(),_ref=this.files,_results=[],_i=0,_len=_ref.length;_len>_i;_i++)file=_ref[_i],_results.push(this.cancelUpload(file));return _results},Dropzone.prototype.enable=function(){return this.clickableElements.forEach(function(element){return element.classList.add("dz-clickable")}),this.setupEventListeners()},Dropzone.prototype.filesize=function(size){var string;return size>=109951162777.6?(size/=109951162777.6,string="TiB"):size>=107374182.4?(size/=107374182.4,string="GiB"):size>=104857.6?(size/=104857.6,string="MiB"):size>=102.4?(size/=102.4,string="KiB"):(size=10*size,string="b"),"<strong>"+Math.round(size)/10+"</strong> "+string},Dropzone.prototype._updateMaxFilesReachedClass=function(){return null!=this.options.maxFiles&&this.getAcceptedFiles().length>=this.options.maxFiles?(this.getAcceptedFiles().length===this.options.maxFiles&&this.emit("maxfilesreached",this.files),this.element.classList.add("dz-max-files-reached")):this.element.classList.remove("dz-max-files-reached")},Dropzone.prototype.drop=function(e){var files,items;e.dataTransfer&&(this.emit("drop",e),files=e.dataTransfer.files,files.length&&(items=e.dataTransfer.items,items&&items.length&&null!=items[0].webkitGetAsEntry?this._addFilesFromItems(items):this.handleFiles(files)))},Dropzone.prototype.paste=function(e){},Dropzone.prototype.handleFiles=function(files){var file,_i,_len,_results;for(_results=[],_i=0,_len=files.length;_len>_i;_i++)file=files[_i],_results.push(this.addFile(file));return _results},Dropzone.prototype._addFilesFromItems=function(items){var entry,item,_i,_len,_results;for(_results=[],_i=0,_len=items.length;_len>_i;_i++)item=items[_i],null!=item.webkitGetAsEntry&&(entry=item.webkitGetAsEntry())?entry.isFile?_results.push(this.addFile(item.getAsFile())):entry.isDirectory?_results.push(this._addFilesFromDirectory(entry,entry.name)):_results.push(void 0):null!=item.getAsFile?null==item.kind||"file"===item.kind?_results.push(this.addFile(item.getAsFile())):_results.push(void 0):_results.push(void 0);return _results},Dropzone.prototype._addFilesFromDirectory=function(directory,path){var dirReader,entriesReader,_this=this;return dirReader=directory.createReader(),entriesReader=function(entries){var entry,_i,_len;for(_i=0,_len=entries.length;_len>_i;_i++)entry=entries[_i],entry.isFile?entry.file(function(file){return _this.options.ignoreHiddenFiles&&"."===file.name.substring(0,1)?void 0:(file.fullPath=""+path+"/"+file.name,_this.addFile(file))}):entry.isDirectory&&_this._addFilesFromDirectory(entry,""+path+"/"+entry.name)},dirReader.readEntries(entriesReader,function(error){return"undefined"!=typeof console&&null!==console?"function"==typeof console.log?console.log(error):void 0:void 0})},Dropzone.prototype.accept=function(file,done){return file.size>1024*this.options.maxFilesize*1024?done(this.options.dictFileTooBig.replace("{{filesize}}",Math.round(file.size/1024/10.24)/100).replace("{{maxFilesize}}",this.options.maxFilesize)):Dropzone.isValidFile(file,this.options.acceptedFiles)?null!=this.options.maxFiles&&this.getAcceptedFiles().length>=this.options.maxFiles?(done(this.options.dictMaxFilesExceeded.replace("{{maxFiles}}",this.options.maxFiles)),this.emit("maxfilesexceeded",file)):this.options.accept.call(this,file,done):done(this.options.dictInvalidFileType)},Dropzone.prototype.addFile=function(file){var _this=this;return file.upload={progress:0,total:file.size,bytesSent:0},this.files.push(file),file.status=Dropzone.ADDED,this.emit("addedfile",file),this._enqueueThumbnail(file),this.accept(file,function(error){return error?(file.accepted=!1,_this._errorProcessing([file],error)):_this.enqueueFile(file),_this._updateMaxFilesReachedClass()})},Dropzone.prototype.enqueueFiles=function(files){var file,_i,_len;for(_i=0,_len=files.length;_len>_i;_i++)file=files[_i],this.enqueueFile(file);return null},Dropzone.prototype.enqueueFile=function(file){var _this=this;if(file.accepted=!0,file.status!==Dropzone.ADDED)throw new Error("This file can't be queued because it has already been processed or was rejected.");return file.status=Dropzone.QUEUED,this.options.autoProcessQueue?setTimeout(function(){return _this.processQueue()},0):void 0},Dropzone.prototype._thumbnailQueue=[],Dropzone.prototype._processingThumbnail=!1,Dropzone.prototype._enqueueThumbnail=function(file){var _this=this;return this.options.createImageThumbnails&&file.type.match(/image.*/)&&file.size<=1024*this.options.maxThumbnailFilesize*1024?(this._thumbnailQueue.push(file),setTimeout(function(){return _this._processThumbnailQueue()},0)):void 0},Dropzone.prototype._processThumbnailQueue=function(){var _this=this;if(!this._processingThumbnail&&0!==this._thumbnailQueue.length)return this._processingThumbnail=!0,this.createThumbnail(this._thumbnailQueue.shift(),function(){return _this._processingThumbnail=!1,_this._processThumbnailQueue()})},Dropzone.prototype.removeFile=function(file){return file.status===Dropzone.UPLOADING&&this.cancelUpload(file),this.files=without(this.files,file),this.emit("removedfile",file),0===this.files.length?this.emit("reset"):void 0},Dropzone.prototype.removeAllFiles=function(cancelIfNecessary){var file,_i,_len,_ref;for(null==cancelIfNecessary&&(cancelIfNecessary=!1),_ref=this.files.slice(),_i=0,_len=_ref.length;_len>_i;_i++)file=_ref[_i],(file.status!==Dropzone.UPLOADING||cancelIfNecessary)&&this.removeFile(file);return null},Dropzone.prototype.createThumbnail=function(file,callback){var fileReader,_this=this;return fileReader=new FileReader,fileReader.onload=function(){var img;return img=document.createElement("img"),img.onload=function(){var canvas,ctx,resizeInfo,thumbnail,_ref,_ref1,_ref2,_ref3;return file.width=img.width,file.height=img.height,resizeInfo=_this.options.resize.call(_this,file),null==resizeInfo.trgWidth&&(resizeInfo.trgWidth=_this.options.thumbnailWidth),null==resizeInfo.trgHeight&&(resizeInfo.trgHeight=_this.options.thumbnailHeight),canvas=document.createElement("canvas"),ctx=canvas.getContext("2d"),canvas.width=resizeInfo.trgWidth,canvas.height=resizeInfo.trgHeight,drawImageIOSFix(ctx,img,null!=(_ref=resizeInfo.srcX)?_ref:0,null!=(_ref1=resizeInfo.srcY)?_ref1:0,resizeInfo.srcWidth,resizeInfo.srcHeight,null!=(_ref2=resizeInfo.trgX)?_ref2:0,null!=(_ref3=resizeInfo.trgY)?_ref3:0,resizeInfo.trgWidth,resizeInfo.trgHeight),thumbnail=canvas.toDataURL("image/png"),_this.emit("thumbnail",file,thumbnail),null!=callback?callback():void 0},img.src=fileReader.result},fileReader.readAsDataURL(file)},Dropzone.prototype.processQueue=function(){var i,parallelUploads,processingLength,queuedFiles;if(parallelUploads=this.options.parallelUploads,processingLength=this.getUploadingFiles().length,i=processingLength,!(processingLength>=parallelUploads)&&(queuedFiles=this.getQueuedFiles(),queuedFiles.length>0)){if(this.options.uploadMultiple)return this.processFiles(queuedFiles.slice(0,parallelUploads-processingLength));for(;parallelUploads>i;){if(!queuedFiles.length)return;this.processFile(queuedFiles.shift()),i++}}},Dropzone.prototype.processFile=function(file){return this.processFiles([file])},Dropzone.prototype.processFiles=function(files){var file,_i,_len;for(_i=0,_len=files.length;_len>_i;_i++)file=files[_i],file.processing=!0,file.status=Dropzone.UPLOADING,this.emit("processing",file);return this.options.uploadMultiple&&this.emit("processingmultiple",files),this.uploadFiles(files)},Dropzone.prototype._getFilesWithXhr=function(xhr){var file,files;return files=function(){var _i,_len,_ref,_results;for(_ref=this.files,_results=[],_i=0,_len=_ref.length;_len>_i;_i++)file=_ref[_i],file.xhr===xhr&&_results.push(file);return _results}.call(this)},Dropzone.prototype.cancelUpload=function(file){var groupedFile,groupedFiles,_i,_j,_len,_len1,_ref;if(file.status===Dropzone.UPLOADING){for(groupedFiles=this._getFilesWithXhr(file.xhr),_i=0,_len=groupedFiles.length;_len>_i;_i++)groupedFile=groupedFiles[_i],groupedFile.status=Dropzone.CANCELED;for(file.xhr.abort(),_j=0,_len1=groupedFiles.length;_len1>_j;_j++)groupedFile=groupedFiles[_j],this.emit("canceled",groupedFile);this.options.uploadMultiple&&this.emit("canceledmultiple",groupedFiles)}else((_ref=file.status)===Dropzone.ADDED||_ref===Dropzone.QUEUED)&&(file.status=Dropzone.CANCELED,this.emit("canceled",file),this.options.uploadMultiple&&this.emit("canceledmultiple",[file]));return this.options.autoProcessQueue?this.processQueue():void 0},Dropzone.prototype.uploadFile=function(file){return this.uploadFiles([file])},Dropzone.prototype.uploadFiles=function(files){var file,formData,handleError,headerName,headerValue,headers,input,inputName,inputType,key,option,progressObj,response,updateProgress,value,xhr,_i,_j,_k,_l,_len,_len1,_len2,_len3,_len4,_m,_ref,_ref1,_ref2,_ref3,_ref4,_this=this;for(xhr=new XMLHttpRequest,_i=0,_len=files.length;_len>_i;_i++)file=files[_i],file.xhr=xhr;xhr.open(this.options.method,this.options.url,!0),xhr.withCredentials=!!this.options.withCredentials,response=null,handleError=function(){var _j,_len1,_results;for(_results=[],_j=0,_len1=files.length;_len1>_j;_j++)file=files[_j],_results.push(_this._errorProcessing(files,response||_this.options.dictResponseError.replace("{{statusCode}}",xhr.status),xhr));return _results},updateProgress=function(e){var allFilesFinished,progress,_j,_k,_l,_len1,_len2,_len3,_results;if(null!=e)for(progress=100*e.loaded/e.total,_j=0,_len1=files.length;_len1>_j;_j++)file=files[_j],file.upload={progress:progress,total:e.total,bytesSent:e.loaded};else{for(allFilesFinished=!0,progress=100,_k=0,_len2=files.length;_len2>_k;_k++)file=files[_k],(100!==file.upload.progress||file.upload.bytesSent!==file.upload.total)&&(allFilesFinished=!1),file.upload.progress=progress,file.upload.bytesSent=file.upload.total;if(allFilesFinished)return}for(_results=[],_l=0,_len3=files.length;_len3>_l;_l++)file=files[_l],_results.push(_this.emit("uploadprogress",file,progress,file.upload.bytesSent));return _results},xhr.onload=function(e){var _ref;if(files[0].status!==Dropzone.CANCELED&&4===xhr.readyState){if(response=xhr.responseText,xhr.getResponseHeader("content-type")&&~xhr.getResponseHeader("content-type").indexOf("application/json"))try{response=JSON.parse(response)}catch(_error){e=_error,response="Invalid JSON response from server."}return updateProgress(),200<=(_ref=xhr.status)&&300>_ref?_this._finished(files,response,e):handleError()}},xhr.onerror=function(){return files[0].status!==Dropzone.CANCELED?handleError():void 0},progressObj=null!=(_ref=xhr.upload)?_ref:xhr,progressObj.onprogress=updateProgress,headers={Accept:"application/json","Cache-Control":"no-cache","X-Requested-With":"XMLHttpRequest"},this.options.headers&&extend(headers,this.options.headers);for(headerName in headers)headerValue=headers[headerName],xhr.setRequestHeader(headerName,headerValue);if(formData=new FormData,this.options.params){_ref1=this.options.params;for(key in _ref1)value=_ref1[key],formData.append(key,value)}for(_j=0,_len1=files.length;_len1>_j;_j++)file=files[_j],this.emit("sending",file,xhr,formData);if(this.options.uploadMultiple&&this.emit("sendingmultiple",files,xhr,formData),"FORM"===this.element.tagName)for(_ref2=this.element.querySelectorAll("input, textarea, select, button"),_k=0,_len2=_ref2.length;_len2>_k;_k++)if(input=_ref2[_k],inputName=input.getAttribute("name"),inputType=input.getAttribute("type"),"SELECT"===input.tagName&&input.hasAttribute("multiple"))for(_ref3=input.options,_l=0,_len3=_ref3.length;_len3>_l;_l++)option=_ref3[_l],option.selected&&formData.append(inputName,option.value);
else(!inputType||"checkbox"!==(_ref4=inputType.toLowerCase())&&"radio"!==_ref4||input.checked)&&formData.append(inputName,input.value);for(_m=0,_len4=files.length;_len4>_m;_m++)file=files[_m],formData.append(""+this.options.paramName+(this.options.uploadMultiple?"[]":""),file,file.name);return xhr.send(formData)},Dropzone.prototype._finished=function(files,responseText,e){var file,_i,_len;for(_i=0,_len=files.length;_len>_i;_i++)file=files[_i],file.status=Dropzone.SUCCESS,this.emit("success",file,responseText,e),this.emit("complete",file);return this.options.uploadMultiple&&(this.emit("successmultiple",files,responseText,e),this.emit("completemultiple",files)),this.options.autoProcessQueue?this.processQueue():void 0},Dropzone.prototype._errorProcessing=function(files,message,xhr){var file,_i,_len;for(_i=0,_len=files.length;_len>_i;_i++)file=files[_i],file.status=Dropzone.ERROR,this.emit("error",file,message,xhr),this.emit("complete",file);return this.options.uploadMultiple&&(this.emit("errormultiple",files,message,xhr),this.emit("completemultiple",files)),this.options.autoProcessQueue?this.processQueue():void 0},Dropzone}(Em),Dropzone.version="4.0.0-dev",Dropzone.options={},Dropzone.optionsForElement=function(element){return element.getAttribute("id")?Dropzone.options[camelize(element.getAttribute("id"))]:void 0},Dropzone.instances=[],Dropzone.forElement=function(element){if("string"==typeof element&&(element=document.querySelector(element)),null==(null!=element?element.dropzone:void 0))throw new Error("No Dropzone found for given element. This is probably because you're trying to access it before Dropzone had the time to initialize. Use the `init` option to setup any additional observers on your Dropzone.");return element.dropzone},Dropzone.autoDiscover=!0,Dropzone.discover=function(){var checkElements,dropzone,dropzones,_i,_len,_results;for(document.querySelectorAll?dropzones=document.querySelectorAll(".dropzone"):(dropzones=[],checkElements=function(elements){var el,_i,_len,_results;for(_results=[],_i=0,_len=elements.length;_len>_i;_i++)el=elements[_i],/(^| )dropzone($| )/.test(el.className)?_results.push(dropzones.push(el)):_results.push(void 0);return _results},checkElements(document.getElementsByTagName("div")),checkElements(document.getElementsByTagName("form"))),_results=[],_i=0,_len=dropzones.length;_len>_i;_i++)dropzone=dropzones[_i],Dropzone.optionsForElement(dropzone)!==!1?_results.push(new Dropzone(dropzone)):_results.push(void 0);return _results},Dropzone.blacklistedBrowsers=[/opera.*Macintosh.*version\/12/i],Dropzone.isBrowserSupported=function(){var capableBrowser,regex,_i,_len,_ref;if(capableBrowser=!0,window.File&&window.FileReader&&window.FileList&&window.Blob&&window.FormData&&document.querySelector)if("classList"in document.createElement("a"))for(_ref=Dropzone.blacklistedBrowsers,_i=0,_len=_ref.length;_len>_i;_i++)regex=_ref[_i],regex.test(navigator.userAgent)&&(capableBrowser=!1);else capableBrowser=!1;else capableBrowser=!1;return capableBrowser},without=function(list,rejectedItem){var item,_i,_len,_results;for(_results=[],_i=0,_len=list.length;_len>_i;_i++)item=list[_i],item!==rejectedItem&&_results.push(item);return _results},camelize=function(str){return str.replace(/[\-_](\w)/g,function(match){return match[1].toUpperCase()})},Dropzone.createElement=function(string){var div;return div=document.createElement("div"),div.innerHTML=string,div.childNodes[0]},Dropzone.elementInside=function(element,container){if(element===container)return!0;for(;element=element.parentNode;)if(element===container)return!0;return!1},Dropzone.getElement=function(el,name){var element;if("string"==typeof el?element=document.querySelector(el):null!=el.nodeType&&(element=el),null==element)throw new Error("Invalid `"+name+"` option provided. Please provide a CSS selector or a plain HTML element.");return element},Dropzone.getElements=function(els,name){var e,el,elements,_i,_j,_len,_len1,_ref;if(els instanceof Array){elements=[];try{for(_i=0,_len=els.length;_len>_i;_i++)el=els[_i],elements.push(this.getElement(el,name))}catch(_error){e=_error,elements=null}}else if("string"==typeof els)for(elements=[],_ref=document.querySelectorAll(els),_j=0,_len1=_ref.length;_len1>_j;_j++)el=_ref[_j],elements.push(el);else null!=els.nodeType&&(elements=[els]);if(null==elements||!elements.length)throw new Error("Invalid `"+name+"` option provided. Please provide a CSS selector, a plain HTML element or a list of those.");return elements},Dropzone.confirm=function(question,accepted,rejected){return window.confirm(question)?accepted():null!=rejected?rejected():void 0},Dropzone.isValidFile=function(file,acceptedFiles){var baseMimeType,mimeType,validType,_i,_len;if(!acceptedFiles)return!0;for(acceptedFiles=acceptedFiles.split(","),mimeType=file.type,baseMimeType=mimeType.replace(/\/.*$/,""),_i=0,_len=acceptedFiles.length;_len>_i;_i++)if(validType=acceptedFiles[_i],validType=validType.trim(),"."===validType.charAt(0)){if(-1!==file.name.toLowerCase().indexOf(validType.toLowerCase(),file.name.length-validType.length))return!0}else if(/\/\*$/.test(validType)){if(baseMimeType===validType.replace(/\/.*$/,""))return!0}else if(mimeType===validType)return!0;return!1},"undefined"!=typeof jQuery&&null!==jQuery&&(jQuery.fn.dropzone=function(options){return this.each(function(){return new Dropzone(this,options)})}),"undefined"!=typeof module&&null!==module?module.exports=Dropzone:window.Dropzone=Dropzone,Dropzone.ADDED="added",Dropzone.QUEUED="queued",Dropzone.ACCEPTED=Dropzone.QUEUED,Dropzone.UPLOADING="uploading",Dropzone.PROCESSING=Dropzone.UPLOADING,Dropzone.CANCELED="canceled",Dropzone.ERROR="error",Dropzone.SUCCESS="success",detectVerticalSquash=function(img){var alpha,canvas,ctx,data,ey,ih,iw,py,ratio,sy;for(iw=img.naturalWidth,ih=img.naturalHeight,canvas=document.createElement("canvas"),canvas.width=1,canvas.height=ih,ctx=canvas.getContext("2d"),ctx.drawImage(img,0,0),data=ctx.getImageData(0,0,1,ih).data,sy=0,ey=ih,py=ih;py>sy;)alpha=data[4*(py-1)+3],0===alpha?ey=py:sy=py,py=ey+sy>>1;return ratio=py/ih,0===ratio?1:ratio},drawImageIOSFix=function(ctx,img,sx,sy,sw,sh,dx,dy,dw,dh){var vertSquashRatio;return vertSquashRatio=detectVerticalSquash(img),ctx.drawImage(img,sx,sy,sw,sh,dx,dy,dw,dh/vertSquashRatio)},contentLoaded=function(win,fn){var add,doc,done,init,poll,pre,rem,root,top;if(done=!1,top=!0,doc=win.document,root=doc.documentElement,add=doc.addEventListener?"addEventListener":"attachEvent",rem=doc.addEventListener?"removeEventListener":"detachEvent",pre=doc.addEventListener?"":"on",init=function(e){return"readystatechange"!==e.type||"complete"===doc.readyState?(("load"===e.type?win:doc)[rem](pre+e.type,init,!1),!done&&(done=!0)?fn.call(win,e.type||e):void 0):void 0},poll=function(){var e;try{root.doScroll("left")}catch(_error){return e=_error,setTimeout(poll,50),void 0}return init("poll")},"complete"!==doc.readyState){if(doc.createEventObject&&root.doScroll){try{top=!win.frameElement}catch(_error){}top&&poll()}return doc[add](pre+"DOMContentLoaded",init,!1),doc[add](pre+"readystatechange",init,!1),win[add](pre+"load",init,!1)}},Dropzone._autoDiscoverFunction=function(){return Dropzone.autoDiscover?Dropzone.discover():void 0},contentLoaded(window,Dropzone._autoDiscoverFunction)}).call(this)}),require.alias("component-emitter/index.js","dropzone/deps/emitter/index.js"),require.alias("component-emitter/index.js","emitter/index.js"),"object"==typeof exports?module.exports=require("dropzone"):"function"==typeof define&&define.amd?define(function(){return require("dropzone")}):this.Dropzone=require("dropzone")}();