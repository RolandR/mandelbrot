var fragmentShader = `

precision mediump float;

varying vec2 texCoord;

void main(void){
	
	bool inside = true;

	vec3 color = vec3(1.0, 1.0, 1.0);

	vec2 z = vec2(0.0, 0.0);
	vec2 nextZ = vec2(0.0, 0.0);

	for(int count = 0; count < 4096; count++){

		nextZ.x = z.x*z.x - z.y*z.y + texCoord.x;
		nextZ.y = 2.0*z.x*z.y + texCoord.y;

		z = nextZ;

		if(dot(pow(z, vec2(2.0, 2.0)), vec2(1)) > 4.0){
			inside = false;
			break;
		}
		
	}

	if(inside){
		color = vec3(0.0, 0.0, 0.0);
	}
	
	gl_FragColor = vec4(color, 1.0);
	
}

`;








































