uniform vec3 iResolution;
uniform sampler2D iChannel0;

uniform float uRMDmin, uRMDmax, uRMPrecision, uLightAmp, uLightRotY, uLightY;
uniform float uFOV, uFog, uCamX, uCamY, uCamZ, uCamRotXTime, uCamRotYTime, uCamRotZTime, uCamYTilt;
uniform float uTorY, uTorP1, uTorP2, uTorNoise, uTorTime, uTorNb;
uniform float uNoiseScale0, uNoiseScale1, uNoiseAmp0, uNoiseAmp1, uNoise2, uNoiseMinus, uNoiseTime0;
uniform float uSeaHeight;
uniform int uNoiseIterN, uNoiseIter;
uniform float uIQNoiseAmp, uIQNoiseTime, uIQNoiseScale, uNoiseOffset;
uniform float uColorMountain, uColorSea, uColorForet, uColorMate;
uniform float uSunSeed, uSunDMin, uSunRM_TdMax;
uniform float uAmpSun, uAmpTerrain;
uniform float uColBright, uColContrast, uColSat, uColFond;

varying vec2 vUv;

const vec3 SEA_BASE = vec3(0.0,0.09,0.18);
const vec3 SEA_WATER_COLOR = vec3(0.8,0.9,0.6) * 0.6;

#define R(p, a) p=cos(a)*p+sin(a)*vec2(p.y, -p.x)
#define PI 3.14159

struct Cam {
    vec3 p; // position
    vec3 d; // direction
    vec3 u; // up vector
    vec2 f; // fov
} _cam;

struct Ray {
    vec3 o; // origin
    vec3 d; // direction
} _ray;

mat3 rot(vec3 n, float a)
{
    float s = sin(a), c = cos(a), k = 1.0 - c;
    
    return mat3(n.x*n.x*k + c    , n.y*n.x*k - s*n.z, n.z*n.x*k + s*n.y,
                n.x*n.y*k + s*n.z, n.y*n.y*k + c    , n.z*n.y*k - s*n.x,
                n.x*n.z*k - s*n.y, n.y*n.z*k + s*n.x, n.z*n.z*k + c    );
}

// IQ's noise
float pn( in vec3 p )
{
    vec3 ip = floor(p);
    p = fract(p);
    p *= p*(3.0-2.0*p);
    vec2 uv = (ip.xy+vec2(37.0,17.0)*ip.z) + p.xy;
    uv = textureLod( iChannel0, (uv+ 0.5)/256.0, 0.0 ).yx;
    return mix( uv.x, uv.y, p.z );
}

float fpn(vec3 p) {
    return pn(p*.06125)*.57 + pn(p*.125)*.28 + pn(p*.25)*.15;
}

float rand(vec2 n) { 
  return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

float noise(vec2 n) {
  const vec2 d = vec2(0.0, 1.0);
  vec2 b = floor(n), f = smoothstep(vec2(0.0), vec2(1.0), fract(n));
  return mix(mix(rand(b), rand(b + d.yx), f.x+uNoise2), mix(rand(b + d.xy), rand(b + d.yy), f.x), f.y+0.7*uNoise2);
}

const mat2 m2 = mat2(1.6,-1.2,
                     1.2, 1.6);

float sdCappedTorus(in vec3 p, in vec2 sc, in float ra, in float rb)
{
    p.x = abs(p.x);
    float k = (sc.y*p.x>sc.x*p.y) ? dot(p.xy,sc) : length(p.xy);
    return sqrt( dot(p,p) + ra*ra - 2.0*ra*k ) - rb;
}

float smin( float a, float b, float k )
{
  float h = clamp( 0.5 + 0.5*(b-a)/k, 0.0, 1.0 );
  return mix( b, a, h ) - k*h*(1.0-h);
}


float map( in vec3 pos, in int iter)
{
    float h = 0.0;
    vec2 q = pos.xz*uNoiseScale0;
    
    float s = 0.5;
    for( int i=0; i<iter; i++ )
    {
        h += s*(1.-abs(noise( q + uNoiseTime0)*uNoiseAmp1-uNoiseMinus));
        q = m2*q*uNoiseScale1; 
        q += vec2(2.41,8.13);
        s *= 0.48 + 0.2*h;
    }
    h *= uNoiseAmp0; //2.0;
    
    float d1 = pos.y - h + uNoiseOffset;
    
    // rings
    float an = 2.5*(1.+0.2*sin(uTorTime+3.0+pos.x+pos.z));
    vec2 cc = vec2(sin(an),cos(an));
    vec3 r1 = mod(pos+uTorNb/2.,uTorNb)-uTorNb/2.;
    r1.y = pos.y - 0.1 - 0.7*h - uTorY;
    r1.y += (0.5*sin((uTorTime+pos.x + 3.0*pos.z)*(1.-uColorForet) + (uTorTime + 2.*pos.y + pos.x*0.2 + pos.z*0.33)*uColorForet));
    r1 *= rot(vec3(1.,0.,0.),PI);
    float rrr = uTorTime * 0.2 + (pos.x + pos.z ) * (1. - min(uColorForet, 0.9));
    R(r1.xy, rrr*(1. - uColorForet));
    R(r1.xz, rrr);
    float d2 = sdCappedTorus( r1.xyz, cc, uTorP1, uTorP2 );
    float tornoisescale = 10.*(1.-uColorForet) + 2.*uColorForet;
    float tornoise = (noise(r1.xz*vec2(tornoisescale,tornoisescale)) * uTorNoise);
    
    float iqnoise = fpn((pos*(1.-uColorForet)+r1*uColorForet) * uIQNoiseScale + uIQNoiseTime) * uIQNoiseAmp;
    d2 -= (tornoise + iqnoise) * (1.-uColorForet*step(-1., r1.y+0.3*cos(r1.x*1.)+0.3*cos(r1.z*2.)));
    d1 += iqnoise * (1.-uColorForet);
    return smin( d1, d2, 1.);
}

vec3 calcNormal( in vec3 pos )
{
    vec2 e = vec2(1.0,-1.0) * 0.001;
    int iter = uNoiseIterN;
    return normalize( e.xyy*map( pos + e.xyy, iter ) + 
            e.yyx*map( pos + e.yyx, iter ) + 
            e.yxy*map( pos + e.yxy, iter ) + 
            e.xxx*map( pos + e.xxx, iter ) );
}

float softShadows( in vec3 ro, in vec3 rd )
{
    float res = 1.0;
    float t = 0.01;
    for( int i=0; i<40; i++ )
    {
        vec3 pos = ro + rd*t;
        float h = map( pos, 3 );
        res = min( res, max(h,0.0)*164.0/t );
        if( res < uRMPrecision ) break;
        t += h*0.5;
    }
    
    return res;
}

Ray lookAt(Cam c, vec2 uv, float aspect)
{   
    vec3 r = normalize(cross(c.d,c.u));
    vec3 u = cross(r,c.d);
    
    uv.y /= aspect;
    
    float a = c.f.x/360. * uv.x * PI;
    float b = c.f.y/360. * uv.y * PI;
    
    c.d *= rot(u,a);

    r = normalize(cross(c.d,u));

    c.d *= rot(r,b);
    
    return Ray(c.p, c.d);
}
float diffuse(vec3 n,vec3 l,float p) {
    return pow(dot(n,l) * 0.4 + 0.6,p);
}

float specular(vec3 n,vec3 l,vec3 e,float s) {    
    float nrm = (s + 8.0) / (PI * 8.0);
    return pow(max(dot(reflect(e,n),l),0.0),s) * nrm;
}
vec3 getSkyColor(vec3 e) {
    e.y = (max(e.y,0.0)*0.8+0.2)*0.8;
    return vec3(pow(1.0-e.y,2.0), 1.0-e.y, 0.6+(1.0-e.y)*0.4) * 1.1;
}

mat4 brightnessMatrix( float brightness )
{
    return mat4( 1, 0, 0, 0,
                 0, 1, 0, 0,
                 0, 0, 1, 0,
                 brightness, brightness, brightness, 1 );
}

mat4 contrastMatrix( float contrast )
{
    float t = ( 1.0 - contrast ) / 2.0;
    
    return mat4( contrast, 0, 0, 0,
                 0, contrast, 0, 0,
                 0, 0, contrast, 0,
                 t, t, t, 1 );

}

mat4 saturationMatrix( float saturation )
{
    vec3 luminance = vec3( 0.3086, 0.6094, 0.0820 );
    
    float oneMinusSat = 1.0 - saturation;
    
    vec3 red = vec3( luminance.x * oneMinusSat );
    red+= vec3( saturation, 0, 0 );
    
    vec3 green = vec3( luminance.y * oneMinusSat );
    green += vec3( 0, saturation, 0 );
    
    vec3 blue = vec3( luminance.z * oneMinusSat );
    blue += vec3( 0, 0, saturation );
    
    return mat4( red,     0,
                 green,   0,
                 blue,    0,
                 0, 0, 0, 1 );
}

void mainImage( out vec4 fragColor, in vec2 vUv )
{
    // POS :
  vec2 p = vUv;
  vec2 uv = (p -.5)*2.;
  vec2 uvm = vec2(0.,uCamYTilt);
  
  // CAM & RAY :
  _cam = Cam(
      vec3(uCamX,uCamY+2.2,uCamZ),
      vec3(0,-1,0),
      vec3(0,0,1),
      vec2(uFOV,uFOV)
  );
  
  float aspect = iResolution.x/iResolution.y;
  R(_cam.d.yz, uvm.y*cos(uvm.x)*PI/2.);
  R(_cam.d.yx, uvm.x*cos(uvm.y)*PI/2.);
  _ray = lookAt(_cam, uv, aspect);
  
  R(_ray.o.yz, uCamRotXTime);
  R(_ray.d.yz, uCamRotXTime);
  R(_ray.o.xz, uCamRotYTime);
  R(_ray.d.xz, uCamRotYTime);
  R(_ray.o.xy, uCamRotZTime);
  R(_ray.d.xy, uCamRotZTime);
  
  // t: length of the ray
  // d: distance function
  float d = 100., t = uRMDmin;
  // ld, td: local, total density 
  // w: weighting factor
  float ld = 0., td = 0., w = 0.;
  // Distance threshold.
  const float h = .1;
  // total color
  float tc = 0.;

  // RM
  for (int i=0; i<100; i++) {
   
      if (td > uSunRM_TdMax || d < uRMPrecision * t || t > uRMDmax) break;
      
      // evaluate distance function
      d = map(_ray.o+t*_ray.d, uNoiseIter);
      
      // step forward
      t += d;
  
  }
  
  vec3 light = normalize( vec3( 0.0, uLightY, 1.0) );
  R(light.xz, uLightRotY);
  vec3 col = vec3( 0.7, 0.8, 1.0 ) * (1.0 - uAmpSun) * uColFond;
  col *= 1.0 - 0.5*_ray.d.y;
  vec3 mate = vec3(0.);
  // hit
  if( t < uRMDmax )
  {
      // shade and light
      vec3 pos = _ray.o+t *_ray.d;
      vec3 dist = t *_ray.d;
      vec3 nor = calcNormal( pos );
      
      float dif = clamp( dot(nor,light), 0.0, 1.0 );
      float sha = softShadows( pos+nor*.01, light );
      vec3 lig = (vec3(10.0,1.5,1.0) * (uColorMountain+uColorForet) + vec3(1.5) * uColorSea) * dif * 1.5 * sha;
           lig += vec3(0.6,0.3,0.4) * max(nor.y,0.0)*0.9;
    //   mate += mix( vec3(0.3), vec3(0.2,0.15,0.1)*0.73*uColorMountain + SEA_BASE*uColorSea, smoothstep( 0.7,0.9,abs(nor.y)) )*(1.-uColorForet);
      mate += (vec3(0.1,0.15,0.05) * step(5., pos.y) + mix( vec3(0.2,0.15,0.1),vec3(0.1,0.15,0.05), smoothstep( 0.7,0.9,abs(nor.y)) ) * (1.-step(5., pos.y)))*uColorForet;
      mate *= 0.5 + texture( iChannel0, 0.5*pos.xz ).x * uColorMate;
      col = mate * lig;
      
      if( uColorSea > 0.8 ){
        float fresnel = clamp(1.0 - dot(nor,-_ray.d), 0.0, 1.0);
        fresnel = min(pow(fresnel,3.0), 0.5);
            
        vec3 reflected = getSkyColor(reflect(_ray.d,nor));    
        vec3 refracted = SEA_BASE + dif * SEA_WATER_COLOR * 0.12;
        
        vec3 color = mix(refracted,reflected,fresnel);
        
        float atten = max(1.0 - dot(dist,dist) * 0.001, 0.0);
        color += SEA_WATER_COLOR * (pos.y - uSeaHeight) * 0.18 * atten;
        
        color += vec3(specular(nor, light, _ray.d, 60.0));
        col *= color;
      }
      
      float fog = exp( -uFog*t*t*90.0/uRMDmax )* (1.0 - uAmpSun); //-0.0015
      col *= fog;
      col += (1.0-fog)*vec3(0.5,0.6,0.7) * uColFond;
  }
  
  float sun = clamp( dot(_ray.d,light), 0.0, 1.0 );
  col += vec3(1.0,0.8,0.6)*0.4*pow(sun,8.0) * uLightAmp;
  
  col = sqrt( col );
  
  // Vignetage
  col *= 0.5 + 0.5*pow(16.0*p.x*p.y*(1.0-p.x)*(1.0-p.y),0.2);
  
  // Recontraste :
  col = smoothstep( 0.0, 1.0, col );
  
  col = uAmpTerrain * col;
  float debut = step(t, uRMDmin);
  fragColor = brightnessMatrix( uColBright + 0.5*debut) * contrastMatrix( uColContrast +1.3*debut ) * saturationMatrix( uColSat + 0.5*debut ) * vec4(col, 1.0);
}

 
void main() {
  mainImage(gl_FragColor, vUv);
}