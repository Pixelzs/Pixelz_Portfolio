// Particles by Matthew Thompson
// Nebula
// Goal particle checks if near neighbour, attracts and repel or burst or be pushed
// AND connect lines if near neighbour

// Problem, O(N^2) more particles incredibly tanks memory as each particle requests to loop with all particles twice nested
// Possible solution to grid the area to chunks, mitigate amount of checks if all particles are not in same room 

// Second problem - Background. I want to use the current style background however the p5 annoyingly
// has a null background forcing the graphics to leave ghosting effects
// found Clear() function and some reason it took very long to find this answer


// CONFIG FOR PARTICLES. Amount/Size/Speed/Attract/Repul/Friction/Orbit/Connect/Opactiy/Colour/Twinkle/Burst
const particonfig = { 
    particleamount: 150,
    minradius:2,
    maxradius:6,
    
    minParticleSpeed: 0.5,
    maxParticleSpeed: 2.5,
    attractStrength: 0.06,
    attractDistance: 120,
    repulsionStrength: 0.07,
    repulsionDistance: 32,
    rippleMulti: 10.0, //Case to prevent clusters pressuring

    friction: 0.99, // 0 - 1. 1 meaning no friction.
    orbitSpeed: 0.0005, //Value will dimish attraction/repul if too high

    connectDistance:100, //Lines
    baseParticleColour: '138, 43, 226', //Purple
    minOpacity: 0.1,
    maxOpactiy: 0.8,
    twinkleSpeed: 0.01,

    burstChance: 0.0008, //Supernova
    burstDuration: 30,
    burstStr:175,
    burstRadius:100
}

let particles = [];
let centreX, centreY; //Orbit centre of screen

//Repeated, shortened to function
function getShortestDistance(obj1, obj2){
    let dirx = obj2.x - obj1.x;
    let diry = obj2.y - obj1.y;

    if(dirx > width/2) dirx -= width;
    else if(dirx < -width/2) dirx += width;

    if(diry > height/2) diry -= height;
    else if(diry < -height/2) diry += height;

    return {dirx, diry, distance: Math.sqrt(dirx * dirx + diry * diry)};
}

// CLASS PARTICLE ITSELF
class Particle{
    constructor(x,y,radius,dirx,diry){ //Postion/Size/Direciton/Neighbrs/Colour/Twinkle/Burst/Affected
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dirx = dirx;
        this.diry = diry;
        this.numCloseNeigh = 0;
        this.basecolour = particonfig.baseParticleColour;
        this.twinkleEff = random(TWO_PI);

        this.isBurst = false;
        this.burstTimer = 0;
        this.isAffectedBurst = false;
        this.affectedBurstTimer = 0;

    }

    //Draw Particle
    draw(){
        fill(this.basecolour);
        circle(this.x, this.y, this.radius * 2);
    }
    
    
    // To Update Position/Wormhole edge/Orbit/ConstantSpeed/Twinkle/BurstTimer/AffectedTimer
    Update(){
        

        //Warp webpage
        if(this.x - this.radius > width) this.x = -this.radius;
        else if(this.x + this.radius < 0) this.x = width + this.radius;

        if(this.y - this.radius > height) this.y = -this.radius;
        else if(this.y + this.radius < 0) this.y = height + this.radius;


        this.dirx *= particonfig.friction;
        this.diry *= particonfig.friction;

        const dirxFromCentre = this.x - centreX;
        const diryFromCentre = this.y - centreY;
        const distFromCentre = sqrt(dirxFromCentre * dirxFromCentre + diryFromCentre * diryFromCentre);

        // Okay so little complicated math here, looked it up in research and this is to get force of particle direction and bend it. also this is clockwise
        if(distFromCentre>0){
            const tangentialX = -diryFromCentre;
            const tangentialY = dirxFromCentre;

            this.dirx += (tangentialX/distFromCentre)*particonfig.orbitSpeed;
            this.diry += (tangentialY/distFromCentre)*particonfig.orbitSpeed;
        }

        const currentSpeed = sqrt(this.dirx * this.dirx + this.diry * this.diry);
        if(currentSpeed > particonfig.maxParticleSpeed){
            const scaleFactor = particonfig.maxParticleSpeed / currentSpeed;
            this.dirx *= scaleFactor;
            this.diry *= scaleFactor;
        } else if(currentSpeed < particonfig.minParticleSpeed && currentSpeed !==0){
            const scaleFactor = particonfig.minParticleSpeed / currentSpeed;
            this.dirx *= scaleFactor;
            this.diry *= scaleFactor;
        } else if (currentSpeed === 0){
            this.dirx = (random() - 0.5) * particonfig.minParticleSpeed * 2;
            this.diry = (random() - 0.5) * particonfig.minParticleSpeed * 2;
        }

        this.x += this.dirx;
        this.y += this.diry;
    

        if(this.isBurst){
            this.burstTimer--;
            if(this.burstTimer<=0)
                this.isBurst = false;
        } else if (this.isAffectedBurst){
            this.affectedBurstTimer--;
            if(this.affectedBurstTimer <=0){
                this.isAffectedBurst = false;
            }
        }

        this.twinkleEff += particonfig.twinkleSpeed;
        const opacity = particonfig.minOpacity +(particonfig.maxOpactiy - particonfig.minOpacity) * (0.5+0.5*sin(this.twinkleEff));

        this.basecolour = `rgba(${particonfig.baseParticleColour}, ${opacity})`;

        if(!this.isBurst && random() < particonfig.burstChance){
            this.isBurst = true;
            this.burstTimer = particonfig.burstDuration;
        }
        this.draw();
    }
}

//Starting Line
//P5 Setup for canvas and to cap frame to 30 - less performance hit
function setup(){
    createCanvas(windowWidth, windowHeight);
    pixelDensity(1);
    frameRate(30);
    centreX = width/2;
    centreY = height/2;
    bigbang(); //WHERE BEGINS
}

//P5 to start the system and draw the pparticles
function draw(){
    clear();
    supernova();
    particleConnectAndForces();
    noStroke();
    particles.forEach(particle => {
        particle.Update();
    });
}

//For ease of performance and memory when changin window size(common on mobile phones)
function delayRefresh(func, delay){
    let timeout;
    return function(...args){
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), delay);
    };
}

const delaybigbang = delayRefresh(() => {
    resizeCanvas(windowWidth, windowHeight);
    centreX = width / 2;
    centreY = height / 2;
    bigbang();
}, 500);

function windowResized(){
    delaybigbang();
}

//Creates the particles
function bigbang()
{
    particles = [];
    for (let i = 0; i < particonfig.particleamount; i++){
        const radius = random(particonfig.minradius, particonfig.maxradius);
        const x = random(width * 0.1, width * 0.9);
        const y = random(height * 0.1, height * 0.9);
        const dirx = (random()-0.5)* 1.3;
        const diry = (random()-0.5)* 1.3;
        particles.push(new Particle(x,y,radius,dirx,diry));
    }
}

//Bursts the particles away
function supernova(){
    particles.forEach(obj1 => {
        if(obj1.isBurst){
            particles.forEach(obj2 => {
                if(obj1 === obj2) return;

                const {dirx, diry, distance} = getShortestDistance(obj1, obj2);

                if(distance < particonfig.burstRadius && distance > 0)
                {
                    const angle = atan2(diry, dirx);
                    const force = particonfig.burstStr / (distance * distance);

                    obj2.dirx += cos(angle) * force;
                    obj2.diry += sin(angle) * force;

                    if(!obj2.isAffectedBurst){
                        obj2.isAffectedBurst = true;
                        obj2.affectedBurstTimer = particonfig.burstTimer;
                    }
                }
            })
        }
    })
}

//Main function for calculating forces of attraction/repul and lines
function particleConnectAndForces(){
    for(let i = 0; i < particles.length; i++){
        for(let o = 0; o < particles.length; o++){
            if(i === o) continue;
            const obj1 = particles[i];
            const obj2 = particles[o];

            const {dirx, diry, distance} = getShortestDistance(obj1, obj2);


            if(distance > 0){
                let force = 0;

                if(distance < particonfig.repulsionDistance)
                {
                    let repulStrength = particonfig.repulsionStrength;
                    
                    if(obj1.numCloseNeigh >= 3||obj2.numCloseNeigh >= 3)
                    {
                        repulStrength *= particonfig.rippleMulti;
                    }
                    force = -repulStrength / (distance*distance);
                
                } 
                else if (distance < particonfig.attractDistance)
                {
                    obj1.numCloseNeigh++;
                    force = particonfig.attractStrength / distance;
                }

                if(force !==0){
                    const angle = atan2(diry, dirx);
                    const forcex = cos(angle)*force;
                    const forcey = sin(angle)*force;
                    obj1.dirx += forcex;
                    obj1.diry += forcey;
                    obj2.dirx -= forcex;
                    obj2.diry -= forcey;
                }
            }

            //Connect Lines
            if(distance < particonfig.connectDistance){
                stroke(138, 43, 226, (1-(distance/particonfig.connectDistance)) *255);
                strokeWeight(0.5);
                line(obj1.x, obj1.y, obj1.x+dirx, obj1.y+diry);
            }
        }
    }
}

