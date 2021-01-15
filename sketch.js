//Create variables here

var dog,dogHappy,database,foodS,foodStock;
var dogImage,milkBottle;
var lastFed,fedTime;
var foodObj;
var button1,button2;
var fed=0;


function preload()
{
    //load images here
    dogImage=loadImage("images/dogImg.png");
    dogHappy=loadImage("images/dogImg1.png");
    milkBottle=loadImage("images/Milk.png");
}

function setup() {
    createCanvas(1200, 500);
    dog=createSprite(1000,250);
    dog.addImage(dogImage);
    dog.scale=0.2;
  
    database=firebase.database();    
    foodStock=database.ref("Food");
    foodStock.on("value",readStock);
    

    foodObj = new Food();
     button1= createButton("Feed the Dog");
    button1.position(450,50);
    button1.mousePressed(feedDog);
     button2 = createButton("Add Food");
    button2.position(600,50);
    button2.mousePressed(addStock);
}


function draw() {  
    background(46,139,87);

    foodObj.display();
   
    feedTime=database.ref('FeedTime')
    feedTime.on("value",function(data){
        lastFed=data.val();
    });
    textSize(18)
    fill("black");
    if(lastFed>=12){
        text("Last Fed Time  : "+lastFed%12+" PM",350,30);
    }else  if(lastFed==0){
        text("Last Feed :  12 AM",350,30);
    }else{
        text("Last Feed:  "+lastFed+" AM",350,30);
    }
    if(fed===1){
    foodObj.showBottle();
    }
  drawSprites();
  //add styles here
  


}

function readStock(data){
    foodS=data.val();
    

}

function feedDog(){
    if(foodS!==0){
    dog.addImage(dogHappy); 
     
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
    fed=1;

    }
   

}

function writeStock(x){

    if(x<=0){
        x=0;
    }else{
        x=x-1
    }

    database.ref("/").update({
        Food:x
    })

}

function addStock(){
    
    
    foodS++;
    database.ref('/').update({
        Food:foodS
    }) 
    fed=0;

}



