#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

uniform sampler2D u_texture_0;

vec4 realisticFire(vec2 texCoords, float xSize, float ySize, float overallnoiseMovementSpeedControl)
{
    //Fire Noise Calculations
    float noiseMovementSpeed1 = -0.5 * overallnoiseMovementSpeedControl;
    float nosieScale1 = 0.2;
    vec2 noiseTexCoords1 = (texCoords * nosieScale1) + vec2(0.0, u_time * noiseMovementSpeed1);
    float noise1 = texture2D(u_texture_0, noiseTexCoords1).r;
    float noiseMovementSpeed2 = -0.5 * overallnoiseMovementSpeedControl;
    float nosieScale2 = 0.3;
    vec2 noiseTexCoords2 = (texCoords * nosieScale2) + vec2(0.0, u_time * noiseMovementSpeed2);
    float noise2 = texture2D(u_texture_0, noiseTexCoords2).g;
    float noiseMovementSpeed3 = -0.3 * overallnoiseMovementSpeedControl;
    float nosieScale3 = 0.3;
    vec2 noiseTexCoords3 = (texCoords * nosieScale3) + vec2(0.0, u_time * noiseMovementSpeed3);
    float noise3 = texture2D(u_texture_0, noiseTexCoords3).b;
    
    //Fir Texture Coordinates Calculation
    vec2 fireTexCoords = vec2(texCoords.x, texCoords.y + (noise1 + noise2 + noise3) * texCoords.y);

    //Preparing Special Fire Texture
    float circleG = length((fireTexCoords - vec2(0.5, 0.0)) * vec2(xSize / 0.6, ySize / 0.6));
    circleG = smoothstep(0.5, 1.0, circleG);
    circleG = 1.0 - circleG;
    // circleG = step(0.5, circleG);

    float circleR = length((fireTexCoords - vec2(0.5, 0.0)) * vec2(xSize/ 0.7, ySize/ 0.9));
    circleR = smoothstep(0.5, 1.0, circleR);
    circleR = 1.0 - circleR;
    // circleR = step(0.5, circleR);

    float circleB = length((fireTexCoords - vec2(0.5, 0.0)) * vec2(xSize/ 0.8, ySize/ 1.5));
    circleB = smoothstep(0.5, 1.0, circleB);
    circleB = 1.0 - circleB;
    // circleB = step(0.5, circleB);

    float circleA = max(circleR, circleG);
    circleA = max(circleA, circleB);

    return vec4(circleR, circleG, circleB, circleA);
}

vec4 stylizedFire(vec2 texCoords, float xSize, float ySize, float overallnoiseMovementSpeedControl)
{
    //Fire Noise Calculations
    float noiseMovementSpeed1 = -0.5 * overallnoiseMovementSpeedControl;
    float nosieScale1 = 0.2;
    vec2 noiseTexCoords1 = (texCoords * nosieScale1) + vec2(0.0, u_time * noiseMovementSpeed1);
    float noise1 = texture2D(u_texture_0, noiseTexCoords1).r;
    float noiseMovementSpeed2 = -0.5 * overallnoiseMovementSpeedControl;
    float nosieScale2 = 0.3;
    vec2 noiseTexCoords2 = (texCoords * nosieScale2) + vec2(0.0, u_time * noiseMovementSpeed2);
    float noise2 = texture2D(u_texture_0, noiseTexCoords2).g;
    float noiseMovementSpeed3 = -0.3 * overallnoiseMovementSpeedControl;
    float nosieScale3 = 0.3;
    vec2 noiseTexCoords3 = (texCoords * nosieScale3) + vec2(0.0, u_time * noiseMovementSpeed3);
    float noise3 = texture2D(u_texture_0, noiseTexCoords3).b;
    
    //Fir Texture Coordinates Calculation
    vec2 fireTexCoords = vec2(texCoords.x, texCoords.y + (noise1 + noise2 + noise3) * texCoords.y);

    //Preparing Special Fire Texture - P2
    float circleG = length((fireTexCoords - vec2(0.5, 0.0)) * vec2(xSize / 0.8, ySize  / 0.9));
    circleG = smoothstep(0.5, 1.0, circleG);
    circleG = 1.0 - circleG;

    float circleR = length((fireTexCoords - vec2(0.5, 0.0)) * vec2(xSize / 0.7, ySize / 0.9));
    circleR = smoothstep(1.0, 1.0, circleR);
    circleR = 1.0 - circleR;

    float circleB = length((fireTexCoords - vec2(0.5, 0.0)) * vec2(xSize / 0.8, ySize / 1.2));
    circleB = smoothstep(1.0, 1.0, circleB);
    circleB = 1.0 - circleB;

    float circleA = max(circleR, circleG);
    circleA = max(circleA, circleB);

    return vec4(circleR, circleG, circleB, circleA);
}

void main()
{   
    vec2 texCoords = gl_FragCoord.xy / u_resolution;
   
    vec4 fireColor1 = vec4(1.0, 1.0, 0.7608, 1.0);
    vec4 fireColor2 = vec4(1.0, 0.8157, 0.0, 1.0);
    vec4 fireColor3 = vec4(1.0, 0.4824, 0.0, 1.0);

    float fireSizeX = ((sin(u_time * 0.2) / 2.0) + 0.5) * 4.0;
    vec4 fireTexture = realisticFire(texCoords, 0.0, 1.0, 0.5);
    // vec4 fireTexture = stylizedFire(texCoords, fireSizeX, 1.0, 0.2);

    //Final Color Calculations
    vec4 color = fireColor3;
    color = mix(color, fireColor2, fireTexture.r);
    color = mix(color, fireColor1, fireTexture.g);
    color.a *= fireTexture.a;
    gl_FragColor = vec4(color);
}