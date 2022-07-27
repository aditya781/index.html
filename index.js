//import platform from './images/platform.png';
//console.log(platform)
const canvas = document.querySelector('canvas')

const c = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;
console.log("canvas.width = "+canvas.width)
console.log("canvas.height = "+ canvas.height)

let wf = (canvas.width/1536);
let hf = (canvas.height/726);

let powerCount = 0;
const gravity = 0.5;
class Player{
    constructor(){
        this.position = {
            x:200*wf,
            y:200*hf
        }
        this.velocity = {
            x:0,
            y:0 
        }
        this.width =  66*(canvas.width/1536)
        this.height =  150*(canvas.height/726)
        this.frames =0 
        this.sprites = {
            stand: {
                right: createImage('./images/spriteStandRight.png'),
                left: createImage('./images/spriteStandLeft.png'),
                cropWidth: 177,
                width:66*wf
            },
            run:{
                right: createImage('./images/spriteRunRight.png'),
                left: createImage('./images/spriteRunLeft.png'),
                cropWidth: 341,
                width:127.875*wf
            }
        }
        this.currentSprite = this.sprites.stand.right;
        this.currentCropWidth = 177
        this.image = createImage('./images/spriteStandRight.png')
    }

    draw(){
        //c.fillStyle = 'red';
        //c.fillRect(this.position.x, this.position.y, this.width, this.height);
        c.drawImage(this.currentSprite,
            this.currentCropWidth * this.frames,
            0,
            this.currentCropWidth ,
            400,
             this.position.x,
              this.position.y,
               this.width,
                this.height);
    
    }
    update(){
        this.frames += 1
        if(this.frames>=59 && (this.currentSprite === this.sprites.stand.right
            || this.currentSprite === this.sprites.stand.left)) this.frames = 0
        else if (this.frames>29 && (this.currentSprite === this.sprites.run.right
             || this.currentSprite === this.sprites.run.left)){
            this.frames = 0
        }
        this.draw();
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;
        if(this.position.y + this.height + this.velocity.y<= canvas.height){
            this.velocity.y += gravity;
        }
        // else{
        //     this.velocity.y = 0;
        // }
        
    }
}



class Platform{
    constructor({x, y, image, w, h} ){
        this.position = {
            x,
            y
        }
        this.velocity = {
            x:200,
            y:20 
        }
        this.width = w
        this.height = h
        this.image = image
    }

    draw(){
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    
    }
    
}


class GenericObjects{
    constructor({x, y, image, w, h} ){
        this.position = {
            x,
            y
        }
        this.velocity = {
            x:200,
            y:20 
        }
        this.width = w
        this.height = h
        this.image = image
    }

    draw(){
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }
    
}

class ParallaxObject{
    constructor({x, y, image, w, h} ){
        this.position = {
            x,
            y
        }
        this.velocity = {
            x:200,
            y:20 
        }
        this.width = w
        this.height = h
        this.image = image
    }

    draw(){
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }
    
}


function createImage(imageSrc){
    const image =new Image()
    image.src = imageSrc
    return image;
}



let player = new Player();
let platforms =[new Platform({
    x:0*(canvas.width/1536), y:650*(canvas.height/726), image: createImage('./images/p2.png'), w:500*(canvas.width/1536), h:100*(canvas.height/726)
}), new Platform({
    x:500*wf, y:650*hf, image: createImage('./images/p2.png'), 
    w:500*wf, h:100*hf
}), new Platform({
    x:1200*wf,
    y:450*hf, 
    image: createImage('./images/p2.png'),
    w:500*wf, h:100*hf
}),
new Platform({
    x:2000*wf,
    y:400*hf, 
    image: createImage('./images/small.png'),
    w:210*wf, h:100*hf
}), new Platform({
    x:2300*wf,
    y:200*hf, 
    image: createImage('./images/small.png'),
    w:210*wf, h:100*hf
}),
new Platform({
    x:2500*wf,
    y:400*hf, 
    image: createImage('./images/p2.png'),
    w:500*wf, h:100*hf
}),

new Platform({
    x:3200*wf,
    y:300*hf, 
    image: createImage('./images/small.png'),
    w:210*wf, h:100*hf
})];


let genericObjects = [ new GenericObjects({
    x:0*wf, 
    y:0*hf, 
    image: createImage('./images/1.png'),  
    w:1550*(canvas.width/1536), h:750*(canvas.height/726)

}),
new GenericObjects({
    x:30*wf, y:130*hf, 
    image: createImage('./images/pay.png'), 
    w:80*wf, h:80*hf
}),
new GenericObjects({
    x:30*wf, 
    y:30*hf, image: createImage('./images/logo1.png'), 
    w:80*wf, h:80*hf
})
]

let powerBar = [
    new GenericObjects({
        x:1100*wf, 
        y:30*hf, image: createImage('./images/pu0.png'), 
        w:400*wf, h:40*hf
    }),
    new GenericObjects({
        x:0*wf, y:30*hf, 
        image: createImage('./images/icon1.png'), 
        w:400*wf, h:40*hf
    })]
function powerImage(){
    if(powerCount ===5 ) {
        powerBar = [
            new GenericObjects({
                x:1050*wf, 
                y:30*hf, image: createImage('./images/pu5.png'), 
                w:400*wf, h:40*hf
            })]
        }
    else if(powerCount === 4) {
        powerBar = [
            new GenericObjects({
                x:1050*wf, 
                y:30*hf, 
                image: createImage('./images/pu4.png'), 
                w:400*wf, h:40*hf
            }),
            new GenericObjects({
                x:1470*wf, 
                y:30*hf, 
                image: createImage('./images/icon1.png'), 
                w:40*wf, h:40*hf
            })]
    }
    else if(powerCount === 3) {
        powerBar = [
            new GenericObjects({
                x:1050*wf, y:30*hf, image: createImage('./images/pu3.png'), 
                w:400*wf, h:40*hf
            }),
            new GenericObjects({
                x:1470*wf, 
                y:30*hf, image: createImage('./images/icon1.png'), 
                w:40*wf, h:40*hf
            })]
    }
    else if(powerCount === 2) {
        powerBar = [
            new GenericObjects({
                x:1050*wf, 
                y:30*hf, 
                image: createImage('./images/pu2.png'), 
                w:400*wf, h:40*hf
            }),
            new GenericObjects({
                x:1470*wf, 
                y:30*hf, 
                image: createImage('./images/icon1.png'), 
                w:40*wf, 
                h:40*hf
            })]
    }
    else if(powerCount === 1) {
        powerBar = [
            new GenericObjects({
                x:1050*wf, 
                y:30*hf, 
                image: createImage('./images/pu1.png'), 
                w:400*wf, 
                h:40*hf
            }),
            new GenericObjects({
                x:1470*wf, 
                y:30*hf, image: createImage('./images/icon1.png'), 
                w:40*wf, 
                h:40*hf
            })]
    }
    else  {
        powerBar = [
            new GenericObjects({
                x:1050*wf, 
                y:30*hf, 
                image: createImage('./images/pu0.png'), 
                w:400*wf, 
                h:40*hf
            }),
            ,
            new GenericObjects({
                x:1470*wf, 
                y:30*hf, 
                image: createImage('./images/icon1.png'), 
                w:40*wf, 
                h:40*hf
            })]
    }
}

let frontObject = [new ParallaxObject({
    x:0*wf, y:450*hf, 
    image: createImage('./images/front.png'), 
    w:800*wf, h:300*hf

}),
new ParallaxObject({
    x:-300*wf, y:0*hf, image: createImage('./images/5.png'),
     w:1550*wf, h:750*hf
}),
new ParallaxObject({
    x:1000*wf, y:450*hf, 
    image: createImage('./images/front.png'), w:800*wf, h:300*hf

}),
new ParallaxObject({
    x:1800*wf, 
    y:450*hf, 
    image: createImage('./images/front.png'), 
    w:800*wf, h:300*hf

}),
new ParallaxObject({
    x:1000*wf, y:0*hf, image: createImage('./images/5.png'),
     w:1550*wf, h:750*hf
}),
new ParallaxObject({
    x:2500*wf, 
    y:450*hf, 
    image: createImage('./images/front.png'), w:800*wf, 
    h:300*hf

}),
new ParallaxObject({
    x:3200*wf, 
    y:450*hf, image: createImage('./images/front.png'), 
    w:800*wf, h:300*hf

})]
let parallaxObject = [
    new ParallaxObject({
        x:800*wf, y:100*hf, image: createImage('./images/board.png'),
        w:280*wf, h:210*hf
    }),
    new ParallaxObject({
        x:1400*wf, y:100*hf, image: createImage('./images/board.png'),
        w:280*wf, h:210*hf
    }),
    new ParallaxObject({
        x:1900*wf, y:100*hf, image: createImage('./images/board.png'),
        w:280*wf, h:210*hf
    }),
    new ParallaxObject({
    x:200*wf, y:270*hf, 
    image: createImage('./images/platform.png'), 
    w:1000*wf, h:450*hf
}), new ParallaxObject({
    x:1200*wf, y:270*hf, 
    image: createImage('./images/platform.png'), 
    w:1000*wf, h:450*hf
}), new ParallaxObject({
    x:0*wf, y:0*hf, image: createImage('./images/5.png'),
     w:1550*wf, h:750*hf
}),
new ParallaxObject({
    x:70*wf, y:530*hf, image: createImage('./images/start.png'),
    w:120*wf, h:130*hf
})]
//power
let powerObject = [new ParallaxObject({
    x:500*wf, y:400*hf, image: createImage('./images/power.png'),
    w:30*wf, h:30*hf
}),
new ParallaxObject({
    x:1400*wf, y:400*hf, image: createImage('./images/power.png'),
    w:30*wf, h:30*hf
}),
new ParallaxObject({
    x:2100*wf, y:300*hf, image: createImage('./images/power.png'),
    w:30*wf, h:30*hf
})]
let power = [0,0,0,0,0,0]

let keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}



let scrollOfset = 0;
function initFunc(){
   /*  player = new Player();
     platforms =[
         new Platform({
        x:0*(canvas.width/1536), y:650*(canvas.height/726), image: createImage('./images/p2.png'), w:500*(canvas.width/1536), h:100*(canvas.height/726)
    }), new Platform({
        x:500, y:650, image: createImage('./images/p2.png'), w:500, h:100
    }), new Platform({
        x:1200,
        y:450, 
        image: createImage('./images/p2.png'),
        w:500, h:100
    }),
    new Platform({
        x:2000,
        y:400, 
        image: createImage('./images/small.png'),
        w:210, h:100
    }), new Platform({
        x:2300,
        y:200, 
        image: createImage('./images/small.png'),
        w:210, h:100
    }),
    new Platform({
        x:2500,
        y:400, 
        image: createImage('./images/p2.png'),
        w:500, h:100
    }),
    new Platform({
        x:3200,
        y:300, 
        image: createImage('./images/small.png'),
        w:210, h:100
    })];

    genericObjects = [ new GenericObjects({
        x:0, y:0, image: createImage('./images/1.png'),  w:1550*(canvas.width/1536), h:750*(canvas.height/726)
    }),
    new GenericObjects({
        x:30, y:130, image: createImage('./images/pay.png'), w:80, h:80
    }),
    new GenericObjects({
        x:30, y:30, image: createImage('./images/logo1.png'), w:80, h:80
    })]


    frontObject = [new ParallaxObject({
        x:0, y:450, image: createImage('./images/front.png'), w:800, h:300
    
    }),
    new ParallaxObject({
        x:-300, y:0, image: createImage('./images/5.png'),
         w:1550, h:750
    }),
    new ParallaxObject({
        x:1000, y:450, image: createImage('./images/front.png'), w:800, h:300
    
    }),
    new ParallaxObject({
        x:1800, y:450, image: createImage('./images/front.png'), w:800, h:300
    
    }),
    new ParallaxObject({
        x:1000, y:0, image: createImage('./images/5.png'),
         w:1550, h:750
    }),
    new ParallaxObject({
        x:2500, y:450, image: createImage('./images/front.png'), w:800, h:300
    
    }),
    new ParallaxObject({
        x:3200, y:450, image: createImage('./images/front.png'), w:800, h:300
    
    })]

     parallaxObject = [
        new ParallaxObject({
            x:800, y:100, image: createImage('./images/board.png'),
            w:280, h:210
        }),
        new ParallaxObject({
            x:1400, y:100, image: createImage('./images/board.png'),
            w:280, h:210
        }),
        new ParallaxObject({
            x:1900, y:100, image: createImage('./images/board.png'),
            w:280, h:210
        }), 
        new ParallaxObject({
        x:200, y:270, image: createImage('./images/platform.png'), w:1000, h:450
    }), new ParallaxObject({
        x:1200, y:270, image: createImage('./images/platform.png'), w:1000, h:450
    }), new ParallaxObject({
        x:0, y:0, image: createImage('./images/5.png'),
        w:1550, h:750
    }),
    new ParallaxObject({
        x:70, y:530, image: createImage('./images/start.png'),
        w:120, h:130
    })]
     
        //power
    powerObject = [new ParallaxObject({
        x:500, y:400, image: createImage('./images/power.png'),
        w:30, h:30
    }),
    new ParallaxObject({
        x:1400, y:400, image: createImage('./images/power.png'),
        w:30, h:30
    }),
    new ParallaxObject({
        x:2100, y:300, image: createImage('./images/power.png'),
        w:30, h:30
    })]

    powerBar = [
    new GenericObjects({
        x:1100, y:30, image: createImage('./images/pu0.png'), w:400, h:40
    })]
    power = [0,0,0,0,0,0]
     scrollOfset = 0;
      powerCount = 0;*/
      scrollOfset = 0;
      powerCount = 0;
 player = new Player();
 platforms =[new Platform({
    x:0*(canvas.width/1536), y:650*(canvas.height/726), image: createImage('./images/p2.png'), w:500*(canvas.width/1536), h:100*(canvas.height/726)
}), new Platform({
    x:500*wf, y:650*hf, image: createImage('./images/p2.png'), 
    w:500*wf, h:100*hf
}), new Platform({
    x:1200*wf,
    y:450*hf, 
    image: createImage('./images/p2.png'),
    w:500*wf, h:100*hf
}),
new Platform({
    x:2000*wf,
    y:400*hf, 
    image: createImage('./images/small.png'),
    w:210*wf, h:100*hf
}), new Platform({
    x:2300*wf,
    y:200*hf, 
    image: createImage('./images/small.png'),
    w:210*wf, h:100*hf
}),
new Platform({
    x:2500*wf,
    y:400*hf, 
    image: createImage('./images/p2.png'),
    w:500*wf, h:100*hf
}),

new Platform({
    x:3200*wf,
    y:300*hf, 
    image: createImage('./images/small.png'),
    w:210*wf, h:100*hf
})];


 genericObjects = [ new GenericObjects({
    x:0*wf, 
    y:0*hf, 
    image: createImage('./images/1.png'),  
    w:1550*(canvas.width/1536), h:750*(canvas.height/726)

}),
new GenericObjects({
    x:30*wf, y:130*hf, 
    image: createImage('./images/pay.png'), 
    w:80*wf, h:80*hf
}),
new GenericObjects({
    x:30*wf, 
    y:30*hf, image: createImage('./images/logo1.png'), 
    w:80*wf, h:80*hf
})]

 powerBar = [
     
    new GenericObjects({
        x:1100*wf, 
        y:30*hf, image: createImage('./images/pu0.png'), 
        w:400*wf, h:40*hf
    }),
    new GenericObjects({
        x:0*wf, y:30*hf, 
        image: createImage('./images/icon1.png'), 
        w:400*wf, h:40*hf
    })]
 frontObject = [new ParallaxObject({
    x:0*wf, y:450*hf, 
    image: createImage('./images/front.png'), 
    w:800*wf, h:300*hf

}),
new ParallaxObject({
    x:-300*wf, y:0*hf, image: createImage('./images/5.png'),
     w:1550*wf, h:750*hf
}),
new ParallaxObject({
    x:1000*wf, y:450*hf, 
    image: createImage('./images/front.png'), w:800*wf, h:300*hf

}),
new ParallaxObject({
    x:1800*wf, 
    y:450*hf, 
    image: createImage('./images/front.png'), 
    w:800*wf, h:300*hf

}),
new ParallaxObject({
    x:1000*wf, y:0*hf, image: createImage('./images/5.png'),
     w:1550*wf, h:750*hf
}),
new ParallaxObject({
    x:2500*wf, 
    y:450*hf, 
    image: createImage('./images/front.png'), w:800*wf, 
    h:300*hf

}),
new ParallaxObject({
    x:3200*wf, 
    y:450*hf, image: createImage('./images/front.png'), 
    w:800*wf, h:300*hf

})]
 parallaxObject = [
    new ParallaxObject({
        x:800*wf, y:100*hf, image: createImage('./images/board.png'),
        w:280*wf, h:210*hf
    }),
    new ParallaxObject({
        x:1400*wf, y:100*hf, image: createImage('./images/board.png'),
        w:280*wf, h:210*hf
    }),
    new ParallaxObject({
        x:1900*wf, y:100*hf, image: createImage('./images/board.png'),
        w:280*wf, h:210*hf
    }),
    new ParallaxObject({
    x:200*wf, y:270*hf, 
    image: createImage('./images/platform.png'), 
    w:1000*wf, h:450*hf
}), new ParallaxObject({
    x:1200*wf, y:270*hf, 
    image: createImage('./images/platform.png'), 
    w:1000*wf, h:450*hf
}), new ParallaxObject({
    x:0*wf, y:0*hf, image: createImage('./images/5.png'),
     w:1550*wf, h:750*hf
}),
new ParallaxObject({
    x:70*wf, y:530*hf, image: createImage('./images/start.png'),
    w:120*wf, h:130*hf
})]
//power
 powerObject = [new ParallaxObject({
    x:500*wf, y:400*hf, image: createImage('./images/power.png'),
    w:30*wf, h:30*hf
}),
new ParallaxObject({
    x:1400*wf, y:400*hf, image: createImage('./images/power.png'),
    w:30*wf, h:30*hf
}),
new ParallaxObject({
    x:2100*wf, y:300*hf, image: createImage('./images/power.png'),
    w:30*wf, h:30*hf
})]
 power = [0,0,0,0,0,0]

}

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,canvas.width, canvas.height);
    
    genericObjects.forEach((platform) => {
        platform.draw();
    })
    parallaxObject.forEach((platform) => {
        platform.draw();
    })
    platforms.forEach((platform) => {
        platform.draw();
    })
   
    //power object
    let i=0
    powerObject.forEach((platform) => {
        if(power[i]===0 && player.position.x+20>= platform.position.x &&
            player.position.x<=platform.position.x+platform.width && 
            player.position.y+player.height>platform.position.y && 
            player.position.y<platform.position.y+50)
        {
            power[i]=1;  
            powerCount ++; 
            console.log("power count = "+ powerCount)
        }
        else if(power[i]===0) platform.draw();
        i++;
    })

    player.update();
    frontObject.forEach((platform) => {
        platform.draw();
    })
    powerImage()
    powerBar.forEach((platform) => {
        platform.draw();
    })
   
    
    
    // c.drawImage(createImage('./images/fire.png'),
    // 452.9*ff, 0, 452.9, 857,
    // 200,
    //  200,
    //   100,
    //    200);
    //    ff++;
    //    if(ff>5)ff=0
    if(keys.right.pressed && player.position.x <= 500*wf){
        player.velocity.x = 5*wf
    }else if((keys.left.pressed && player.position.x>=100*wf) || 
    ( keys.left.pressed && scrollOfset === 0 && player.position.x>0)){
        player.velocity.x = -5*wf
    }else {
        player.velocity.x =0
        if(keys.right.pressed){
            scrollOfset += 5*wf
            platforms.forEach((platform) => {
                platform.position.x -=5*wf
            })
            powerObject.forEach((platform) => {
                platform.position.x -=5*wf
            })
            parallaxObject.forEach((platform) => {
                platform.position.x -=2*wf
            })
            frontObject.forEach((platform) => {
                platform.position.x -=6*wf
            })
        }else if(keys.left.pressed && scrollOfset > 0){
            scrollOfset -= 5*wf
            platforms.forEach((platform) => {
                platform.position.x += 5*wf
            })
            powerObject.forEach((platform) => {
                platform.position.x +=5*wf
            })
            parallaxObject.forEach((platform) => {
                platform.position.x +=2*wf
            })
            frontObject.forEach((platform) => {
                platform.position.x +=6*wf
            })
        }
    }

    platforms.forEach((platform) => {
        if(player.position.y + player.height <= platform.position.y && 
            player.position.y + player.height + player.velocity.y >= 
            platform.position.y && player.position.x +
            player.width >= platform.position.x && player.position.x <=
            platform.position.x +platform.width){
                player.velocity.y = 0;
            }
    })
    if(scrollOfset>10000){
        console.log("you win");
        //alert("you win")
    }

    //lose game
    if(player.position.y >canvas.height){
        initFunc();
    }
}
animate()
function leftdown(){
    keys.left.pressed = true;
            player.currentSprite = player.sprites.run.left
            player.currentCropWidth = player.sprites.run.cropWidth
            player.width = player.sprites.run.width
}
function leftup(){
    keys.left.pressed = false;
            player.currentSprite = player.sprites.stand.left
            player.currentCropWidth = player.sprites.stand.cropWidth
            player.width = player.sprites.stand.width
}

function jumpdown(){
    if(canvas.width<700 && (player.velocity.y === -18 || player.velocity.y === 0)) {
        player.velocity.y -= 18*wf+4;
      }
      else if(player.velocity.y === -18 || player.velocity.y === 0) player.velocity.y -= 18*wf;
       // console.log(player.velocity.y)
}
function rightdown(){
    keys.right.pressed = true;
    player.currentSprite = player.sprites.run.right
    player.currentCropWidth = player.sprites.run.cropWidth
    player.width = player.sprites.run.width
}
function rightup(){
    keys.right.pressed = false;
    player.currentSprite = player.sprites.stand.right
    player.currentCropWidth = player.sprites.stand.cropWidth
    player.width = player.sprites.stand.width
}
addEventListener('keydown', ({keyCode})=>{
    //console.log(keyCode)
    switch(keyCode) {
        case 37:
            keys.left.pressed = true;
            player.currentSprite = player.sprites.run.left
            player.currentCropWidth = player.sprites.run.cropWidth
            player.width = player.sprites.run.width
           // console.log('left');
            break;
        case 40:
           // console.log('down');
            break;
        case 39:
            keys.right.pressed = true;
            player.currentSprite = player.sprites.run.right
            player.currentCropWidth = player.sprites.run.cropWidth
            player.width = player.sprites.run.width
           // console.log('right');
            break;
        case 38:
            
            //if(player.position.y>=200)player.velocity.y -= 18;
          if(canvas.width<700 && (player.velocity.y === -18 || player.velocity.y === 0)) {
            player.velocity.y -= 18*wf+4;
          }
          else if(player.velocity.y === -18 || player.velocity.y === 0) player.velocity.y -= 18*wf;
           // console.log(player.velocity.y)
            //console.log('up');
            break;
    }
})

addEventListener('keyup', ({keyCode})=>{
    //console.log(keyCode)
    switch(keyCode) {
        case 37:
            keys.left.pressed = false;
            player.currentSprite = player.sprites.stand.left
            player.currentCropWidth = player.sprites.stand.cropWidth
            player.width = player.sprites.stand.width
           // console.log('left');
            break;
        case 40:
            //console.log('down');
            break;
        case 39:
            keys.right.pressed = false;
            player.currentSprite = player.sprites.stand.right
            player.currentCropWidth = player.sprites.stand.cropWidth
            player.width = player.sprites.stand.width
           // console.log('right');
            break;
        case 38:
            //player.velocity.y -= 20;
            //console.log('up');
            break;
    }
})


function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
      this.sound.play();
    }
    this.stop = function(){
      this.sound.pause();
    }
  }

 const walksound = new sound('./sound/walk.flac')

 