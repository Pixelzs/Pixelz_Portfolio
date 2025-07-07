
const canvas = document.getElementById("particleCanvas");
const graphics = canvas.getContext('2d');
console.log(canvas);

const particonfig = {
    particleamount: 75,
    radius:6,
    connectDistance:100,
    baseParticleColour: '138, 43, 226',
    minOpacity: 0.01,
    maxOpactiy: 0.8,
    twinkleSpeed: 0.008,
    minParticleSpeed: 0.01,
    maxParticleSpeed: 2,
    attractStrength: 0.05,
    attractDistance: 150,
    repulsionStrength: 0.5,
    repulsionDistance: 32,
    friction: 0.99,
    orbitSpeed: 0.005
}

let particles = [];

let centreX, centreY;

//Wrap attraction fix
function getShortestDistance(obj1, obj2){
    let dirx = obj2.x - obj1.x;
    let diry = obj2.y - obj1.y;

    if(dirx > canvas.width/2) dirx -= canvas.width;
    else if(dirx < -canvas.width/2) dirx += canvas.width;

    if(diry > canvas.height/2) diry -= canvas.height;
    else if(diry < -canvas.height/2) diry += canvas.height;

    return {dirx, diry, distance: Math.sqrt(dirx * dirx + diry * diry)};
}


// direction X and Directoin Y
class Particle{
    constructor(x,y,radius,dirx,diry){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dirx = dirx;
        this.diry = diry;
        this.basecolour = particonfig.baseParticleColour;
        this.twinkleEff = Math.random() * Math.PI * 2;
    }

    draw(){
        graphics.beginPath();
        graphics.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        graphics.fillStyle = this.basecolour;
        graphics.fill();
    }
    // Update postion
    Update(){

        
        //Warp webpage
        if(this.x - this.radius > canvas.width) this.x = -this.radius;
        else if(this.x + this.radius < 0) this.x = canvas.width + this.radius;

        if(this.y - this.radius > canvas.height) this.y = -this.radius;
        else if(this.y + this.radius < 0) this.y = canvas.height + this.radius;


        this.dirx *= particonfig.friction;
        this.diry *= particonfig.friction;

        const dirxFromCentre = this.x - centreX;
        const diryFromCentre = this.y - centreY;
        const distFromCentre = Math.sqrt(dirxFromCentre * dirxFromCentre + diryFromCentre * diryFromCentre);

        //Okay so little complicated math here, looked it up in research and this is to get force of particle direction and bend it. also this is clockwise
        if(distFromCentre>0){
            const tangentialX = -diryFromCentre;
            const tangentialY = dirxFromCentre;

            this.dirx += (tangentialX/distFromCentre)*particonfig.orbitSpeed;
            this.diry += (tangentialY/distFromCentre)*particonfig.orbitSpeed;
        }

        const currentSpeed = Math.sqrt(this.dirx * this.dirx + this.diry * this.diry);
        if(currentSpeed > particonfig.maxParticleSpeed){
            const scaleFactor = particonfig.maxParticleSpeed / currentSpeed;
            this.dirx *= scaleFactor;
            this.diry *= scaleFactor;
        } else if(currentSpeed < particonfig.minParticleSpeed && currentSpeed !==0){
            const scaleFactor = particonfig.minParticleSpeed / currentSpeed;
            this.dirx *= scaleFactor;
            this.diry *= scaleFactor;
        } else if (currentSpeed === 0){
            this.dirx = (Math.random() - 0.5) * particonfig.minParticleSpeed * 2;
            this.diry = (Math.random() - 0.5) * particonfig.minParticleSpeed * 2;
        }

        this.x += this.dirx;
        this.y += this.diry;

        this.twinkleEff += particonfig.twinkleSpeed;
        const opacity = particonfig.minOpacity +(particonfig.maxOpactiy - particonfig.minOpacity) * (0.5+0.5*Math.sin(this.twinkleEff));

        this.basecolour = `rgba(${particonfig.baseParticleColour}, ${opacity})`;
        this.draw();
    }
    
    
}

function bigbang()
{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    centreX = canvas.width/2;
    centreY = canvas.height/2;

    particles = [];
    for (let i = 0; i < particonfig.particleamount; i++){
        const radius = particonfig.radius;
        const x = Math.random() * (canvas.width - radius * 2) + radius;
        const y = Math.random() * (canvas.height - radius * 2) + radius;
        const dirx = Math.random();
        const diry = Math.random();
        particles.push(new Particle(x,y,radius,dirx,diry));
    }
}


function particleConnectAndForces(){
    for(let i = 0; i < particles.length; i++){
        for(let o = i+1; o < particles.length; o++){
            const obj1 = particles[i];
            const obj2 = particles[o];

            const {dirx, diry, distance} = getShortestDistance(obj1, obj2);

            if(distance > 0){
                let force = 0;
                if(distance < particonfig.repulsionDistance){
                    let repulStrength = particonfig.repulsionStrength;
                    force = -repulStrength / (distance*distance);
                } else if (distance < particonfig.attractDistance){
                    force = particonfig.attractStrength / distance;
                }

                if(force !==0){
                    const angle = Math.atan2(dirx, diry);
                    const forcex = Math.cos(angle)*force;
                    const forcey = Math.sin(angle)*force;
                    obj1.dirx += forcex;
                    obj1.diry += forcey;
                    obj2.dirx -= forcex;
                    obj2.diry -= forcey;
                }
            }

            if(distance < particonfig.connectDistance){
                graphics.strokeStyle = `rgba(${particonfig.baseParticleColour}, ${1 - (distance / particonfig.connectDistance)})`;
                graphics.lineWidth = 0.5;
                graphics.beginPath();
                graphics.moveTo(obj1.x, obj1.y);
                const targetX = obj1.x + dirx;
                const targetY = obj1.y + diry;
                graphics.lineTo(targetX, targetY);
                graphics.stroke();
            }
        }
    }
}

function animateparticle(){
    requestAnimationFrame(animateparticle);
    graphics.clearRect(0,0,canvas.width,canvas.height);

    particleConnectAndForces();

    particles.forEach(particle => {
        particle.Update();
    });
}

window.addEventListener("resize", () =>{
    bigbang();
})

window.onload = function(){
    bigbang();
    animateparticle();
};