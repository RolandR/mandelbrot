
init();

function init(){
	
	var canvas = document.getElementById("renderCanvas");

	var width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	var height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

	canvas.width = Math.min(width, height*1.5);
	canvas.height = Math.min((width*2)/3, height);
	
	
	var renderer = new Renderer('renderCanvas');

	var zoom = 1;
	var zoomOrigin = [0, 0];

	var dragging = false;
	var lastPosition = [0, 0];

	renderer.render(zoom, zoomOrigin);

	canvas.addEventListener("dblclick", function(e){
		if(e.ctrlKey){

			zoomOut(e.layerX, e.layerY);
			
		} else {
			
			zoomIn(e.layerX, e.layerY);
		}
	});


	canvas.addEventListener("wheel", function(e){
		
		if(e.deltaY > 0){

			zoomOut(e.layerX, e.layerY);
			
		} else if(e.deltaY < 0){
			
			zoomIn(e.layerX, e.layerY);
		}
	});

	function zoomIn(x, y){
		zoomOrigin[0] = zoomOrigin[0]*2;
		zoomOrigin[1] = zoomOrigin[1]*2;

		zoomOrigin[0] += ((x/canvas.width)*2-1);
		zoomOrigin[1] += ((y/canvas.height)*2-1);
	
		zoom = zoom / 2;

		renderer.render(zoom, zoomOrigin);
	}

	function zoomOut(x, y){
		zoomOrigin[0] -= ((x/canvas.width)*2-1);
		zoomOrigin[1] -= ((y/canvas.height)*2-1);
		
		zoomOrigin[0] = zoomOrigin[0]/2;
		zoomOrigin[1] = zoomOrigin[1]/2;
		
		zoom = zoom * 2;

		renderer.render(zoom, zoomOrigin);
	}

	canvas.addEventListener("mousedown", function(e){
		lastPosition = [e.clientX, e.clientY];
		dragging = true;
	});

	window.addEventListener("mousemove", function(e){
		if(dragging){
			var deltaX = e.clientX - lastPosition[0];
			var deltaY = e.clientY - lastPosition[1];
			lastPosition = [e.clientX, e.clientY];

			zoomOrigin[0] -= ((deltaX/canvas.width)*2);
			zoomOrigin[1] -= ((deltaY/canvas.width)*3);

			renderer.render(zoom, zoomOrigin);
		}
	});

	window.addEventListener("mouseup", function(e){
		if(dragging){
			dragging = false;
		}
	});
	
}













