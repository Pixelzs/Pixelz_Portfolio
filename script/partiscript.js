
const canvas = document.getElementById("particleCanvas");
const graphics = canvas.getContext('2d');
console.log(canvas);

const particonfig = {
    particleamount: 10,
    radius:10,
    baseParticleColour: 'rgba(138, 43, 226, 1)'
}

let particles = [];
// direction X and Directoin Y
class Particle{
    constructor(x,y,radius,dirx,diry){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dirx = dirx;
        this.diry = diry;
        this.basecolour = particonfig.baseParticleColour;
    }

    draw(){
        graphics.beginPath();
        graphics.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        graphics.fillStyle = this.basecolour;
        graphics.fill();
    }
    // Update postion
    Update(){

        if(this.x - this.radius > canvas.width) this.x = -this.radius;
        else if(this.x + this.radius < 0) this.x = canvas.width + this.radius;

        if(this.y - this.radius > canvas.height) this.y = -this.radius;
        else if(this.y + this.radius < 0) this.y = canvas.height + this.radius;

        this.x += this.dirx;
        this.y += this.diry;

        this.draw();
    }
    
    
}

function bigbang()
{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

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

function animateparticle(){
    requestAnimationFrame(animateparticle);
    graphics.clearRect(0,0,canvas.width,canvas.height);

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