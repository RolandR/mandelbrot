var vertexShader = `

precision highp float;

attribute vec2 coordinates;

uniform float zoom;
uniform vec2 zoomOrigin;
uniform float aspect;

varying vec2 texCoord;

void main(void){
	
	texCoord = (coordinates);

	texCoord.y *= -1.0;

	texCoord.xy += zoomOrigin.xy;
	texCoord.xy *= zoom;
	
	texCoord.x = texCoord.x * aspect - 0.5;
	
	gl_Position = vec4(coordinates, 1.0, 1.0);

}

`;
