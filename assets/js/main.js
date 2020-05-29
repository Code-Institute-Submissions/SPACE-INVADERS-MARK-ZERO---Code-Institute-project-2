// =============================================================================================
// #region ==== I M A G E S   P R E - L O A D ==================================================



var Images = {};

function loadImages(list){
    var total = 0;
    $("span").text("Loading...");
    for(var i = 0; i < list.length; i++){
        var img = new Image();
        Images[list[i].name] = img;
        
        img.onload = function(){
            total++;
            if(total == list.length){
                $("span").text("Loaded.");
            }
        };
        img.src = list[i].url;
    }
}

// .... Images List ............................................................................
loadImages ([   
    {   name: "player_starship_small",
        url: "assets/images/spaceship2_100x50.png"      },
    {   name: "player_starship_medium",
        url: "assets/images/spaceship2_120x60.png"      },
    {   name: "bg-planet-1",
        url: "assets/images/bg-planet-3840x2160.jpg"    }
]);

// #endregion

// =============================================================================================
// #region ==== G L O B A L   V A R I A B L E S =================================================
var ctx;
var game;
var player;


//#endregion

// ==============================================================================================
// #region ==== G A M E - O B J E C T S =========================================================

// .... GAME ...................................................................................
function Game () {
    this.canvas = null;
    this.context = null;
    this.width = null;
    this.height = null;
    this.create = function(canvasId, width, height) { 
        this.canvas = document.getElementById(canvasId);
        this.canvas.width = width;
        this.canvas.height = height;
        this.context = this.canvas.getContext("2d");
        return this.context;
    };
    this.isPaused = true; //Game paused at load
};

// .... PLAYER ..................................................................................
function Player(name) {
    this.name = name;
    this.sizeW =  120; //Width at start
    this.sizeH =  60; //Height at start
    this.posX = 100; //Horizontal axis at start
    this.posY = ((game.canvas.height / 2) - (this.sizeH)); //Vertical axis at start
    this.draw = function(newX, newY) {
        ctx.clearRect(this.posX, this.posY, this.sizeW, this.sizeH);
        this.posX -= newX;
        this.posY -= newY;
        return ctx.drawImage(Images["player_starship_small"], 
            this.posX, this.posY, this.sizeW, this.sizeH);
    };
};

// #endregion

// ==============================================================================================
// #region ==== S T A R T =======================================================================

$(document).ready(function() {
    
    //Create Canvas
    game = new Game();
    ctx = game.create("canvas-1", 1000, 700);
    
    //Start Point
    start(ctx);
})

// ==== GAME ENTRY POINT =========================================================================
// 
function start(ctx) {

    loadResources(ctx); //Images and resources on the screen*/
    setControls(); //Key Commands
  
}

// ==== START / PAUSE ============================================================================
                                                                                       

$(".game-info-bar button").click(function(){
    
    if (Game.isPaused){
        Game.isPaused = false;
        $(".game-info-bar button").text("Game Started!");
        unPause();
    }
    else if (!Game.isPaused) {
        Game.isPaused = true;
        $(".game-info-bar button").text("Game Paused!");
        pause(); 
        
    
    }
    else {
        alert("Error! Game is neither started or paused!")
    }
});

function unPause() {
// TODO: PAUSE FUNCTIONS - Make pause and unpause functions
// TODO: PAUSE FUNCTIONS - Connect Pause to a pause buttom "KeyP"
}

function pause() {

}
 
// #endregion

// ==============================================================================================
// #region ==== G A M E - R U N N I N G =========================================================


// **** LOAD RESOURCES **************************************************************************
function loadResources(ctx) {

    inGame_player(ctx); //Creates the player ship, score and other statuses
}

// .......... Player ...........
function inGame_player() {
    player = new Player("iFooledMe");
    player.draw(0,0); // TODO: START - Check why player image is not loading in canvas at start (just when a key is stroked)
    $("#player-user-name").html(` Welcome <strong>${player.name}!</strong><br>Enjoy your Game!`);
};


// .......... Enemies ..........




// **** SET CONTROLS ****************************************************************************

function setControls() {

    /* Listen for keystrokes */
     document.addEventListener('keydown', logKey);
 
     /* Log keystroke and pass to player actions function */
     function logKey(e) {
         var key = `${e.code}`;       
         playerActions(key);
    }
}

function playerActions(key) { 
    
    // ==== SETTINGS =====================================================
    var mrg_vrt = 30;           // Margin to top and bottom canvas borders 
    var mrg_hrz = 30;           // Margin to left and right canvas borders 
    var speed_vrt = 15;         // Speed of vertical movement 
    var speed_hrz = 0;          // Speed of horizontal movement

    switch (key) {
        
        // === Move Up ===
        case "ArrowUp":
        case "KeyW":
            if (player.posY >= 0 + mrg_vrt) {
                player.draw(0, 1 * speed_vrt); 
            }
            else {
                break;
            }
            break;
        
        // === Move Down ===
        case 'ArrowDown':
        case "KeyS":
            if (player.posY <= game.canvas.height - player.sizeH - mrg_vrt) {
                player.draw(0, -1 * speed_vrt); 
            }
            else {
                break;
            }
            break;
        
        // === Move Left ===
        case 'ArrowLeft':
        case "KeyA":
            player.draw(1 * speed_hrz, 0); 
            break;
        
        // === Move Right ===    
        case 'ArrowRight':
        case "KeyD":
            player.draw(-1 * speed_hrz, 0); 
            break;
        default:          
        console.log(`Some other Key! var KeyStroke = ${key}`);
          break;
    }  
 }

 // #endregion