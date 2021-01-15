class Food{
    constructor(){
        this.image=loadImage("images/Milk.png")

    }

    getFoodStock(){
        return foodS;

    }

    updateFoodStock(updatedFood){
        database.ref('/').update({
            Food:updatedFood,
            FeedTime:hour()   
           })
          

    }

    deductFoodStock(){

    }

    display(){
        var x=80,y=100
                
        if(foodS!=0){
        for(var i=1;i<=foodS;i++)
        {
            if(i%10===0){
                x=80;
                y=y+50
            }
            image(this.image,x,y,50,50);
            x=x+30;
        }
    }
        
        
    }

    showBottle(){
       
        imageMode(CENTER);
        image(this.image,720,220,70,70);
    }


}