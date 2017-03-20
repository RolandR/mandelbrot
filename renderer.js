
function Renderer(canvasId){

	var canvas = document.getElementById(canvasId);
	var gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

	var shaderProgram;
	var size;

	var zoomAttr;
	var zoomOriginAttr;
	var aspectAttr;

	var lastHeight = canvas.height;
	var lastWidth = canvas.width;

	init();

	function init(){

		/*=========================Shaders========================*/


		// Create a vertex shader object
		var vertShader = gl.createShader(gl.VERTEX_SHADER);

		// Attach vertex shader source code
		gl.shaderSource(vertShader, vertexShader);

		// Compile the vertex shader
		gl.compileShader(vertShader);

		// Create fragment shader object
		var fragShader = gl.createShader(gl.FRAGMENT_SHADER);

		// Attach fragment shader source code
		gl.shaderSource(fragShader, fragmentShader);

		// Compile the fragmentt shader
		gl.compileShader(fragShader);

		// Create a shader program object to store
		// the combined shader program
		shaderProgram = gl.createProgram();

		// Attach a vertex shader
		gl.attachShader(shaderProgram, vertShader); 

		// Attach a fragment shader
		gl.attachShader(shaderProgram, fragShader);

		// Link both programs
		gl.linkProgram(shaderProgram);

		// Use the combined shader program object
		gl.useProgram(shaderProgram);

		if(gl.getShaderInfoLog(vertShader)){
			console.warn(gl.getShaderInfoLog(vertShader));
		}
		if(gl.getShaderInfoLog(fragShader)){
			console.warn(gl.getShaderInfoLog(fragShader));
		}
		if(gl.getProgramInfoLog(shaderProgram)){
			console.warn(gl.getProgramInfoLog(shaderProgram));
		}


		vertexBuffer = gl.createBuffer();

		/*==========Defining and storing the geometry=======*/

		var vertices = [
			-1.0,  1.0,
			 1.0,  1.0,
			-1.0, -1.0,
			-1.0, -1.0,
			 1.0,  1.0,
			 1.0, -1.0
		];

		size = ~~(vertices.length/2);
		
		gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
		gl.bindBuffer(gl.ARRAY_BUFFER, null);

		gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

		// Get the attribute location
		var coord = gl.getAttribLocation(shaderProgram, "coordinates");

		// Point an attribute to the currently bound VBO
		gl.vertexAttribPointer(coord, 2, gl.FLOAT, false, 0, 0);

		// Enable the attribute
		gl.enableVertexAttribArray(coord);

		zoomAttr = gl.getUniformLocation(shaderProgram, "zoom");
		zoomOriginAttr = gl.getUniformLocation(shaderProgram, "zoomOrigin");
		aspectAttr = gl.getUniformLocation(shaderProgram, "aspect");
		

	}

	function render(zoom, zoomOrigin){

		gl.uniform1f(zoomAttr, zoom);
		gl.uniform2f(zoomOriginAttr, zoomOrigin[0], zoomOrigin[1]);
		gl.uniform1f(aspectAttr, canvas.width/canvas.height);

		if(lastHeight != canvas.height || lastWidth != canvas.width){
			gl.viewport(0, 0, canvas.width, canvas.height);
		}

		gl.drawArrays(gl.TRIANGLES, 0, size);

		lastHeight = canvas.height;
		lastWidth = canvas.width;
		
	}

	return{
		 render: render
	};

}



















