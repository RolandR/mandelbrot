var fragmentShader = `

precision highp float;
precision highp int;

uniform vec2 onePixel;

varying vec2 texCoord;

vec3 hsv2rgb(vec3 c)
{
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

vec3 mandelbrot(vec2 pos){
	
	bool inside = true;

	vec3 color = vec3(1.0, 1.0, 1.0);

	vec2 z = vec2(0.0, 0.0);
	vec2 nextZ = vec2(0.0, 0.0);

	int divergence = 0;

	for(int count = 0; count < 4096; count++){

		nextZ.x = z.x*z.x - z.y*z.y + pos.x;
		nextZ.y = 2.0*z.x*z.y + pos.y;

		z = nextZ;

		if(dot(pow(z, vec2(2.0, 2.0)), vec2(1)) > 4.0){
			inside = false;
			divergence = count;
			break;
		}
		
	}

	if(inside){
		color = vec3(0.0, 0.0, 0.0);
	} else {
		//color.gb = vec2(1.0 - float(divergence) / 4096.0);
		color = hsv2rgb(vec3(float(divergence*50) / 4096.0, 1.0, 1.0));
	}

	return color;
	
}

void main(void){
	
	gl_FragColor = vec4(mandelbrot(texCoord), 1.0);
	
}

`;








































