Game = {};
Game.screens = {

}

// game contains gameloop, update, and render. Runs the heart of the game.
Game.game = (function(controls){
    var floor = document.getElementById('canvas-main').height - 20;
    var curTime, prevTime;
    var seamus, graphics, physics;
    var currentStage;
    var paused;

    function init(){
        curTime = prevTime = performance.now();
        seamus = Game.seamus.generateSeamus(); 
        graphics = Game.graphics;
        physics = Game.physics;
        graphics.init();
        Game.controls.init();
        seamus.init(Game.controls.controls);
        Game.game.paused = false;
        requestAnimationFrame(gameLoop);
    }

    function gameLoop(){
        prevTime = curTime;
	    curTime = performance.now();
        var elapsedTime = curTime - prevTime;
        if (!Game.game.paused) {
            update(elapsedTime);
            render();
        }
        requestAnimationFrame(gameLoop);
    }

    function update(elapsedTime){
        seamus.update(elapsedTime)
        if(physics.collision(seamus, {x: 0, y: 400, width: 1000, height: 50, color: 'blue'})){
            console.log("you did it!")
        }
    }

    function render(){
        graphics.clear();
        graphics.drawRect({x: 0, y: 400, width: 1000, height: 50, color: 'blue'});        
        seamus.draw();
        graphics.drawStage();        
    }

    return{
        init: init,
        paused: paused,
    }
}(Game.controls));