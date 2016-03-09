/**
 * @author dvawter
 */
var contentObject= function(){
	this.contentStruct = {};
	return this;
};
contentObject.prototype.get = function(key){
	var con = "";
	try {
		con = this.contentStruct[key];
	}catch (ex) {
		console.log(ex);
		con = null;
	}finally {
		return con;
	}
};
contentObject.prototype.add = function(key, content){
	var res = true;
	try {
		if (key in this.contentStruct) {
			res = false;
		}
		else {
			this.contentStruct[key] = content;
		}
	}catch (ex) {
		res = false;
	}finally {
		return res;
	}
};
contentObject.prototype.update = function(key, content){
	var res = true;
	try {
		if (!key in this.contentStruct) {
			res = false;
		}
		else {
			this.contentStruct[key] = content;
		}
	}catch (ex) {
		res = false;
	}finally {
		return res;
	}
};
contentObject.prototype.deleteKey=function(key){
	var res=true;
	try {
		delete this.contentStruct[key];
	}catch(ex){
		res=false;
	}finally{
		return res;
	}
};
contentObject.prototype.deleteContent=function(key){
	var res=true;
	try {
		this.contentStruct[key]["content"]=null;
	}catch(ex){
		res=false;
	}finally{
		return res;
	}
};
(function($){
	$.extend({
		divController: function(){
			this.contentObject = new contentObject();
			return this;
		}
	});
	$.divController.prototype.storeAndDetach=function(key){
		var ts = new Date();
		var howMany=$("#"+key).size();
		if (howMany > 0) {
			var cnt = $("#" + key).detach();
			var cntO = {
				timeStamp: ts,
				content: cnt,
				dirty: false
			};
			var res=this.contentObject.add(key, cntO);
			if (!res) {
				res=this.contentObject.update(key, cntO);
			}
		return res;;	
		}else{
			return false;
		}
	}
	$.divController.prototype.attach = function(key, attachPoint){
		var out=this.contentObject.get(key);
		if (out){
			out.content.appendTo("#" + attachPoint);
			return true;
		}
		else {
			return false;
		}
	};	
	$.divController.prototype.isDirty = function(key,dirty){
		if (typeof(dirty) == 'boolean') {
			var out = this.contentObject.get(key);
			if (out) {
				out.dirty=dirty;
				return true;
			}else {
				return false;
			}
		}else{
			var out = this.contentObject.get(key);
			if (out) {
				return out.dirty;
			}else {
				return null;
			}	
		}
	};	
	
})(jQuery)