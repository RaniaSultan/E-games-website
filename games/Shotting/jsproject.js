const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;
const scoreEl =document.querySelector('#scoreEl')
class player {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.raduis = radius;
        this.color = color;


    }
    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.raduis = this.raduis, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();

    }
}
class projectile {
    constructor(x, y, radius, color, volicity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.volicity = volicity;

    }
    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();

    }
    update() {
        this.draw()// بتاعت الفانكشن الي فوق يعني بيشاور عليها
        this.x = this.x + this.volicity.x;
        this.y = this.y + this.volicity.y;
    }
}
class Enemy {
    constructor(x, y, radius, color, volicity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.volicity = volicity;

    }
    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();

    }
    update() {
        this.draw()// بتاعت الفانكشن الي فوق يعني بيشاور عليها
        this.x = this.x + this.volicity.x;
        this.y = this.y + this.volicity.y;
    }
}

const player1 = new player(canvas.width / 2, canvas.height / 2, 30, 'white')



const projectiles = []
const enemies = []

function spawnEnemies() {
    
    setInterval(() => {
        const radius=Math.random() * (30 - 4) + 4
        let x
        let  y
        if(Math.random<0.5){
         x = Math.random()< 0.5 ? 0 - radius :canvas.width +radius
       y= Math.random()*canvas.height
        }else{
            x=Math.random()*canvas.width
            y =  Math.random()< 0.5 ? 0 - radius:canvas.height + radius
          
        }
        
        const color =  `hsla(${Math.random() * 360}, 100%, 50%, 1)`
        const angle = Math.atan2( canvas.height / 2 -y,
             canvas.width / 2-x)
             volicity = {
                x: Math.cos(angle),
                y: Math.sin(angle)

        
            }
            enemies.push(new Enemy(x, y, radius, color,volicity))
          
    },
    1000)

    
    
}
let animationId
let score =0
function animate() {
    animationId = requestAnimationFrame(animate)
    c.fillStyle = 'rgba(0,0,0,0.1)'
    c.fillRect(0, 0, canvas.width, canvas.height)

    player1.draw();

    projectiles.forEach((projectile, index) => {

        projectile.update()
        if (projectile.x + projectile.radius < 0 || 
            projectile.x - projectile.radius > canvas.width ||
            projectile.y + projectile.radius < 0 ||
            projectile.y - projectile.radius > canvas.height) {
             setTimeout ( ( ) =>{
                projectiles.splice(index, 1)
             },0)    
        }
          
    })
enemies.forEach((enemy, index) => {
    enemy.update()

    const dist = Math.hypot(player.x-enemy.x,player.y-enemy.y)

    if (dist - enemy.radius - player.radius < 1){
      cancelAnimationFrame(animationId)

    }

projectiles.forEach((projectile, projectileIndex) => {

    const dist = Math.hypot(projectile.x-enemy.x,projectile.y-enemy.y)

    if (dist - enemy.radius - projectile.radius < 1){
       score += 1
       scoreEl.innerHTML = score
        if (enemy.radius - 10 >10){
            enemy.radius -=10 
            setTimeout(()=>{
                enemies.splice(index, 1)
                projectiles.splice(index, 1)
                }, 0)}
        
            else{setTimeout(()=>{
                enemies.splice(index, 1)
                projectiles.splice(index, 1)
                }, 0)}
        }
       
})
})
}
addEventListener('click', (event) => {
    const angle = Math.atan2(
       event.clientX - canvas.height / 2 ,
        event.clientY - canvas.width / 2)
       const volicity = {
           x: Math.cos(angle) *7,
           y: Math.sin(angle) *7
       }
    
   //شرح مرة تانيه
    projectiles.push(
        new projectile(canvas.width / 2, canvas.height / 2, 5, 'white', volicity))


})
animate();
spawnEnemies()

