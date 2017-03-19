
init();

function init(){
	
	var canvas = document.getElementById("renderCanvas");

	var width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	var height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

	canvas.width = Math.min(width, height*1.5);
	canvas.height = Math.min((width*2)/3, height);
	
	
	var renderer = new Renderer('renderCanvas');

	renderer.render();
	
}













