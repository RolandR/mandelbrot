var vertexShader = `

attribute vec2 coordinates;

varying vec2 texCoord;

void main(void){
	
	texCoord = (coordinates);
	texCoord.x = texCoord.x * 1.5 - 0.5;
	
	gl_Position = vec4(coordinates, 1.0, 1.0);

}

`;
