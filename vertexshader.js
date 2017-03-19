var vertexShader = `

attribute vec2 coordinates;

uniform float zoom;
uniform vec2 zoomOrigin;

varying vec2 texCoord;

void main(void){
	
	texCoord = (coordinates);

	texCoord.y *= -1.0;

	texCoord.xy += zoomOrigin.xy;
	texCoord.xy *= zoom;
	
	texCoord.x = texCoord.x * 1.5 - 0.5;
	
	gl_Position = vec4(coordinates, 1.0, 1.0);

}

`;
