var ctx;
var MENU = 1, GAME = 2, GAMEOVER = 3;
var gamestate;
var delta = 20;

var menuoption = 0;

/** global images **/
var bg_image, menu_image, gameover_image;
var healthbar, heart;
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
	gameover_image = new Image(); gameover_image.src = "gameover.png";
	healthbar = new Image(); healthbar.src = "life.png";
	heart = new Image(); heart.src = "heart.png";
	
	gameLoop();
}

function gameLoop()
{
	update(delta);
	draw();

	window.setTimeout(gameLoop, delta);
}

function collisionVSplayer()
{
	for (i = 0; i < bullets.length; i++)
	{
		if (!bullets[i].playerbullet && player.hitbox().hits(bullets[i].hitbox()))
		{		
			player.reset();
			bullets = new Array();
			enemies = new Array();
		}
	}
	for (i = 0; i < enemies.length; i++)
	{
		if (player.hitbox().hits(enemies[i].hitbox()))
		{		
			player.reset();
			bullets = new Array();
			enemies = new Array();
		}
	}
	
	if (player.lives <= 0)
	{
		gamestate = GAMEOVER
	}
}
function collisionVSenemies()
{
	for (i = 0; i < enemies.length; i++)
	{
		for (j = 0; j < bullets.length; j++)
		{
			if (bullets[j].playerbullet && enemies[i].hitbox().hits(bullets[j].hitbox()))
			{		
				enemies[i].health -= bullets[j].damage;
				bullets.splice(j, 1);
				j--;
			}
		}
		if (enemies[i].health < 0)
		{
			enemies.splice(i, 1);
			i--;
		}
	}
}
function cleanbullets()
{
	for (i = 0; i < bullets.length; i++)
	{
		if (bullets[i].x < -10 || bullets[i].x > 510 ||
			bullets[i].y < -10 || bullets[i].y > 610)
		{	
			bullets.splice(i, 1);
			i--;
		}	
	}
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
		// nada
	}
	else // game
	{
		spawnEnemies(timer);
		
		player.update(dt);
		for (i = 0; i < bullets.length; i++)
		{
			bullets[i].update(dt);
		}
		for (i = 0; i < enemies.length; i++)
		{
			enemies[i].update(dt);
		}
		collisionVSplayer();
		collisionVSenemies();
		cleanbullets();
		timer++;
	}
}

function spawnEnemies(timer) {
	var twoSecShoot = function(me) {
		if (me.timer % 100 === 0 && me.type === 0) {
			bullets.push(new Bullet(me.x + me.xoff - 12, me.y + me.yoff + 8, 0, .2, "big_p_bullet.png", 1, false));
		}
		if (self.timer % 200 === 0) {
			bullets.push(new Bullet(me.x + me.xoff - 12, me.y + me.yoff + 8, 0, .2, "big_p_bullet.png", 1, false));
		}
	}
	var sinXMove = function(me) {
		me.y += me.speed;
		me.x += Math.sin(me.timer/50);
	}
	
	if (timer % 50 == 0) {
		enemies.push(new BasicEnemy(Math.random() * 550, 50, player.type, sinXMove, twoSecShoot));
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
		ctx.drawImage(gameover_image, 0, 0);	
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
		
		ctx.drawImage(healthbar, 10, 10);
		ctx.drawImage(heart, 10 + 4, 10 + 4);
		if (player.lives > 1)
			ctx.drawImage(heart, 10 + 4 + 16, 10 + 4);
		if (player.lives > 2)
			ctx.drawImage(heart, 10 + 4 + 16 * 2, 10 + 4);
			
		
	}
}
