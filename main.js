var ctx;
var MENU = 1, GAME = 2, GAMEOVER = 3;
var gamestate;
var delta = 20;

var menuoption = 0;

/** global images **/
var bg_image, menu_image;
/** end images **/

var player;
var bullets = new Array();
var enemies = new Array();
var timer = 0;


function loadGame()
{
	ctx = document.getElementById("canvas").getContext('2d');
	gamestate = MENU;
	
	bg_image = new Image(); bg_image.src = "bg.png";
	menu_image = new Image(); menu_image.src = "menu.png";
	
	gameLoop();
}


function gameLoop()
{
	update(delta);
	draw();

	window.setTimeout(gameLoop, delta);
}

function update(dt)
{
	if (gamestate == MENU)
	{
		if (menuoption == 0 && (32 in keysDown))
		{
			player = new Player(240, 500);
			gamestate = GAME;
		}
	}
	else if (gamestate == GAMEOVER)
	{
	
	}
	else // game
	{
		if (timer % 100 == 0) {
		    enemies.push(new BasicEnemy(Math.random() * 500, -50, 0));
		}
		player.update(dt);
		for (i = 0; i < bullets.length; i++)
		{
			bullets[i].update(dt);
		}
		for (i = 0; i < enemies.length; i++)
		{
			enemies[i].update(dt);
		}
		timer++;
	}
}

function draw()
{
	ctx.fillStyle = '#ff00ff';
	ctx.fillRect(0,0, 500, 600);
	ctx.stroke();
	if (gamestate == MENU)
	{
		ctx.drawImage(menu_image, 0, 0);
	}
	else if (gamestate == GAMEOVER)
	{
	
	}
	else // game
	{
		ctx.drawImage(bg_image, 0, 0);
		player.draw(ctx);
		
		for (i = 0; i < bullets.length; i++)
		{
			bullets[i].draw(ctx);
		}
		for (i = 0; i < enemies.length; i++)
		{
			enemies[i].draw(ctx);
		}
	}
}
