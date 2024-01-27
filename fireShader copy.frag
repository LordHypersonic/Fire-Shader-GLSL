#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

uniform sampler2D u_texture_0;

float drawCircle(vec2 position, float radius){
    return step(radius, length(position - vec2(0.5)));
}

void main()
{   
    vec2 texCoords = gl_FragCoord.xy / u_resolution;
   
    vec4 fireColor1 = vec4(1.0, 0.9961, 0.9569, 1.0);
    vec4 fireColor2 = vec4(0.7647, 1.0, 0.0, 1.0);
    vec4 fireColor3 = vec4(1.0, 0.3176, 0.0, 1.0);
    vec4 fireColor4 = vec4(0.0, 0.0, 0.0, 0.0);

    //Preparing Special Fire Texture - P1
    float circleA = length((texCoords - vec2(0.5, 0.0)) * vec2(1.9, 1.0));
    circleA = smoothstep(0.5, 1.0, circleA);
    circleA = 1.0 - circleA;

    //Fire Noise Calculations
    float overallnoiseMovementSpeedControl = 0.7;
    float noiseMovementSpeed1 = -0.1 * overallnoiseMovementSpeedControl;
    float nosieScale1 = 0.2;
    vec2 noiseTexCoords1 = (texCoords * nosieScale1) + vec2(0.0, u_time * noiseMovementSpeed1);
    float noise1 = texture2D(u_texture_0, noiseTexCoords1).r;
    float noiseMovementSpeed2 = -2.0 * overallnoiseMovementSpeedControl;
    float nosieScale2 = 3.0;
    vec2 noiseTexCoords2 = (texCoords * nosieScale2) + vec2(0.0, u_time * noiseMovementSpeed2);
    float noise2 = texture2D(u_texture_0, noiseTexCoords2).g;
    float noiseMovementSpeed3 = -0.08 * overallnoiseMovementSpeedControl;
    float nosieScale3 = 0.3;
    vec2 noiseTexCoords3 = (texCoords * nosieScale3) + vec2(0.0, u_time * noiseMovementSpeed3);
    float noise3 = texture2D(u_texture_0, noiseTexCoords3).b;
    
    //Fir Texture Coordinates Calculation
    vec2 fireTexCoords = vec2(texCoords.x, texCoords.y + (noise1 + noise2 + noise3) * circleA * texCoords.y);

    //Preparing Special Fire Texture - P2
    float circleG = length((fireTexCoords - vec2(0.5, 0.0)) * vec2(1.5, 4.5));
    circleG = smoothstep(0.5, 1.0, circleG);
    circleG = 1.0 - circleG;
    // circleG = step(0.5, circleG);

    float circleR = length((fireTexCoords - vec2(0.5, 0.0)) * vec2(1.5, 3.0));
    circleR = smoothstep(0.5, 1.0, circleR);
    circleR = 1.0 - circleR;
    // circleR = step(0.5, circleR);

    float circleB = length((fireTexCoords - vec2(0.5, 0.0)) * vec2(1.0, 3.0));
    circleB = smoothstep(0.5, 1.5, circleB);
    circleB = 1.0 - circleB;
    // circleB = step(0.5, circleB);

    vec4 fireTexture = vec4(circleR, circleG, circleB, circleA);

    //Final Color Calculations
    vec4 color = mix(fireColor4, fireColor3, circleB);
    color = mix(color, fireColor2, circleR);
    color = mix(color, fireColor1, circleG);
    gl_FragColor = vec4(color);
}