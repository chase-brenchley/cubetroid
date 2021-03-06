Game.enemies.bossFinal = function(spec){
    function generate(spec){
        var that = {}
        that.alive = true;
        that.moveSpeed = .002;
        that.health = 500;
        that.yVelocity = -1.5;
        that.timeUntilNextJump = 2000; // jumps every 2000 ms
        that.leftLimit = spec.leftLimit;
        that.rightLimit = spec.rightLimit;
        that.direction = Math.random() > .5 ? that.moveSpeed : -that.moveSpeed;
        that.position = spec.startLocation;


        that.draw = function(){
            Game.graphics.drawCornerRect({
                x: that.position.x,
                y: that.position.y,
                width: .1,
                height: .17*2,
                color: "red",
            })
        }

        that.updatePosition = function(time){
            that.timeUntilNextJump -= time;

            if (that.timeUntilNextJump <= 0) {
                that.timeUntilNextJump = 2000;
                that.yVelocity = -1.4;
                that.position.y += that.yVelocity * time/1000;
            } 
            else if(that.position.y < 1-(.05+.17*2)) {
                that.yVelocity += 3 * time/1000;
                that.position.y += that.yVelocity * time/1000;

                if(that.position.x + that.direction > that.rightLimit) that.direction = -that.moveSpeed;
                else if(that.position.x - that.direction < that.leftLimit) that.direction = that.moveSpeed;
                that.position.x += that.direction;
            } 
            else if(that.position.y > 1-(.05+.17*2)) that.position.y = 1-(.05+.17*2);
        }

        that.updateState = function(){
            if(that.health <= 0){
                that.alive = false;
            }
        }

        that.update = function(time){
            that.updatePosition(time);
        }

        that.takeDamage = function(dmg){
            that.health -= dmg;
        }

        return that;
    }

    return {
        generate: generate,
    }
}();