var ctx;
var MENU = 1, GAME = 2, GAMEOVER = 3;
var gamestate;
var delta = 20;

var menuoption = 0;

/** global images **/
var bg_image, menu_image, gameover_image;
var healthbar, heart, gamebg, gamebg2;
var shipselect, ships;
/** end images **/

var player;
var bullets = new Array();
var enemies = new Array();
var timer = 0;
var scroll = 0, scroll2 = 200;
var tick = 0;

aud.ontick = function() {
	tick++; 
};

//shooting functions
var twoSecShoot = function(me) {
	if (tick % 8 === 0 && me.shot) {
		bullets.push(new Bullet(me.x + me.xoff - 12, me.y + me.yoff + 8, -0.02, .2, "e_bullet"+ me.size +".png", 1, false));
		bullets.push(new Bullet(me.x + me.xoff - 12, me.y + me.yoff + 8, 0.02, .2, "e_bullet"+ me.size +".png", 1, false));
		me.shot = false;
	}
	if (tick % 2 === 1) {
		me.shot = true;
	}
	if (tick % 4 === 0 && me.shot) {
		bullets.push(new Bullet(me.x + me.xoff - 12, me.y + me.yoff + 8, 0, .2, "e_bullet"+ (me.size + 1) +".png", 2, false));
		me.shot = false;
	}
	if (tick % 2 === 0 && me.shot && me.type == 0) {
		bullets.push(new Bullet(me.x + me.xoff - 12, me.y + me.yoff + 8, 0, .2, "e_bullet"+ me.size +".png", 1, false));
		me.shot = false;
	}
}
var noShoot = function(me) {
	//nothing
}
//moving functions
var sinXMove = function(me) {
	me.y += me.speed * 2;
	me.x += Math.sin(me.timer/50);
}
var CsinXMove = function(me) {
	me.y += me.speed * 2;
	me.x -= Math.sin(me.timer/50);
}

var fastYMove = function(me) {
	me.y += me.speed * 6;
}

var CircleMove = function(me) {
	me.y += Math.cos(me.timer/20) * 5 + me.speed;
	me.x += Math.sin(me.timer/20) * 5;
}
var CCircleMove = function(me) {
	me.y += Math.cos(me.timer/20) * 5 + me.speed;
	me.x -= Math.sin(me.timer/20) * 5;
}

var StrafeMove = function(me) {
	if(me.timer < 100)
	{
		me.x += 5;
	}
	else {
		me.y += me.speed * 2;
	}
}
var CStrafeMove = function(me) {
	if(me.timer < 100)
	{
		me.x -= 5;
	}
	else {
		me.y += me.speed * 2;
	}
}

var spawn = function(time, enemy) {
	this.time = time;
	this.enemy = enemy;
	this.fresh = true;
}

var spawnTime = new Array();

function loadGame()
{
	ctx = document.getElementById("canvas").getContext('2d');
	gamestate = MENU;
	
	bg_image = new Image(); bg_image.src = "bg.png";
	gamebg = new Image(); gamebg.src = "gamebg.png";
	gamebg2 = new Image(); gamebg2.src = "gamebg2.png";
	menu_image = new Image(); menu_image.src = "menu.png";
	gameover_image = new Image(); gameover_image.src = "gameover.png";
	healthbar = new Image(); healthbar.src = "life.png";
	heart = new Image(); heart.src = "heart.png";
	shipselect = new Image(); shipselect.src = "shipselect.png";
	ships = new Image(); ships.src = "ships.png";
	
	aud.generatepattern(0.1, 0.8, 8, 2, 231232);
	aud.playstop();
	
	gameLoop();
}

function gameLoop()
{
	update(delta);
	draw();

	window.setTimeout(gameLoop, delta);
}

function reset()
{
	player.reset();
	aud.playstop();
	aud.playstop();
	bullets = new Array();
	enemies = new Array();
	tick = 0;
	addspawns();
}

function collisionVSplayer()
{
	for (i = 0; i < bullets.length; i++)
	{
		if (!bullets[i].playerbullet && player.hitbox().hits(bullets[i].hitbox()))
		{
			if (player.type != 2 || bullets[i].damage > 1) {
				reset();
			}
		}
	}
	for (i = 0; i < enemies.length; i++)
	{
		if (player.hitbox().hits(enemies[i].hitbox()))
		{		
			reset();
		}
	}
	
	if (player.lives <= 0)
	{
		gamestate = GAMEOVER;
		aud.generatepattern(0.9, 0.2, 5, 1, 8745);
		aud.playstop();
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
				if (enemies[i].type == 2)
					enemies[i].health -= (bullets[j].damage - 1);
				else
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

function addspawns()
{
	spawnTime = new Array();
	spawnTime.push(new spawn(8, new BasicEnemy(50, -20, 0, "small", CircleMove, twoSecShoot)));
	spawnTime.push(new spawn(16, new BasicEnemy(50, -20, 0, "small", CircleMove, twoSecShoot)));
	spawnTime.push(new spawn(24, new BasicEnemy(50, -20, 0, "small", CircleMove, twoSecShoot)));
	spawnTime.push(new spawn(8, new BasicEnemy(450, -20, 0, "small", CCircleMove, twoSecShoot)));
	spawnTime.push(new spawn(16, new BasicEnemy(450, -20, 0, "small", CCircleMove, twoSecShoot)));
	spawnTime.push(new spawn(24, new BasicEnemy(450, -20, 0, "small", CCircleMove, twoSecShoot)));
	spawnTime.push(new spawn(48, new BasicEnemy(100, -20, 0, "large", CircleMove, twoSecShoot)));
	spawnTime.push(new spawn(48, new BasicEnemy(450, -20, 0, "large", CCircleMove, twoSecShoot)));
	
	spawnTime.push(new spawn(180, new BasicEnemy(0, -20, 0, "small", fastYMove, noShoot)));
	spawnTime.push(new spawn(184, new BasicEnemy(50, -20, 0, "small", fastYMove, noShoot)));
	spawnTime.push(new spawn(188, new BasicEnemy(100, -20, 0, "small", fastYMove, noShoot)));
	spawnTime.push(new spawn(192, new BasicEnemy(150, -20, 0, "small", fastYMove, noShoot)));
	spawnTime.push(new spawn(196, new BasicEnemy(200, -20, 0, "small", fastYMove, noShoot)));
	spawnTime.push(new spawn(180, new BasicEnemy(450, -20, 0, "small", fastYMove, noShoot)));
	spawnTime.push(new spawn(184, new BasicEnemy(400, -20, 0, "small", fastYMove, noShoot)));
	spawnTime.push(new spawn(188, new BasicEnemy(350, -20, 0, "small", fastYMove, noShoot)));
	spawnTime.push(new spawn(192, new BasicEnemy(300, -20, 0, "small", fastYMove, noShoot)));
	spawnTime.push(new spawn(196, new BasicEnemy(250, -20, 0, "small", fastYMove, noShoot)));
	
	spawnTime.push(new spawn(244, new BasicEnemy(0, -20, 0, "medium", sinXMove, twoSecShoot)));
	spawnTime.push(new spawn(260, new BasicEnemy(125, -20, 0, "medium", sinXMove, twoSecShoot)));
	spawnTime.push(new spawn(260, new BasicEnemy(250, -20, 0, "medium", CsinXMove, twoSecShoot)));
	spawnTime.push(new spawn(244, new BasicEnemy(375, -20, 0, "medium", CsinXMove, twoSecShoot)));
	
	spawnTime.push(new spawn(300, new BasicEnemy(-50, 0, 0, "small", StrafeMove, twoSecShoot)));
	spawnTime.push(new spawn(308, new BasicEnemy(-150, 25, 0, "small", StrafeMove, twoSecShoot)));
	spawnTime.push(new spawn(316, new BasicEnemy(-250, 50, 0, "small", StrafeMove, twoSecShoot)));
	spawnTime.push(new spawn(300, new BasicEnemy(500, 0, 0, "small", CStrafeMove, twoSecShoot)));
	spawnTime.push(new spawn(308, new BasicEnemy(600, 25, 0, "small", CStrafeMove, twoSecShoot)));
	spawnTime.push(new spawn(316, new BasicEnemy(700, 50, 0, "small", CStrafeMove, twoSecShoot)));
	
	spawnTime.push(new spawn(340, new BasicEnemy(-50, 0, 0, "small", StrafeMove, twoSecShoot)));
	spawnTime.push(new spawn(348, new BasicEnemy(-150, 25, 0, "small", StrafeMove, twoSecShoot)));
	spawnTime.push(new spawn(356, new BasicEnemy(-250, 50, 0, "small", StrafeMove, twoSecShoot)));
	spawnTime.push(new spawn(340, new BasicEnemy(500, 0, 0, "small", CStrafeMove, twoSecShoot)));
	spawnTime.push(new spawn(348, new BasicEnemy(600, 25, 0, "small", CStrafeMove, twoSecShoot)));
	spawnTime.push(new spawn(356, new BasicEnemy(700, 50, 0, "small", CStrafeMove, twoSecShoot)));

}

function update(dt)
{
	if (gamestate == MENU)
	{
		if (menuoption == 0 && (32 in keysDown))
		{
			player = new Player(240, 500);
			gamestate = GAME;
			aud.generatepattern(0.8, 0.8, 8, 2, 99999);
			aud.playstop();
			tick = 0;	
			addspawns();
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
		
		for (i = 0; i < particles.length; i++)
		{
			particles[i].update(dt);
			if (particles[i].time == 0)
			{
				particles.splice(i, 1);
				i--;
			}
		}
		
		scroll += 0.3;
		scroll2 += 0.5;
		if (scroll > 600)
			scroll -= 600;
		if (scroll2 > 600)
			scroll2 -= 600;
	}
}

function spawnEnemies(timer) {
	for (i = 0; i < spawnTime.length; i++) 
	{
		if (spawnTime[i].time == tick && spawnTime[i].fresh)
		{
			enemies.push(spawnTime[i].enemy);
			enemies[enemies.length - 1].type = player.type;
			spawnTime[i].fresh = false;
		}
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
		ctx.drawImage(gamebg, 0, scroll);
		ctx.drawImage(gamebg, 0, scroll - 600);
		ctx.drawImage(gamebg2, 0, scroll2);
		ctx.drawImage(gamebg2, 0, scroll2 - 600);
		player.draw(ctx);
		
		for (i = 0; i < bullets.length; i++)
		{
			bullets[i].draw(ctx);
		}
		for (i = 0; i < enemies.length; i++)
		{
			enemies[i].draw(ctx);
		}
		for (i = 0; i < particles.length; i++)
		{
			particles[i].draw(ctx);
		}
		
		ctx.drawImage(ships, 10, 40);
		ctx.drawImage(shipselect, 10 + 4 + 16 * player.type, 40 + 4);
		
		ctx.drawImage(healthbar, 10, 10);
		ctx.drawImage(heart, 10 + 4, 10 + 4);
		if (player.lives > 1)
			ctx.drawImage(heart, 10 + 4 + 16, 10 + 4);
		if (player.lives > 2)
			ctx.drawImage(heart, 10 + 4 + 16 * 2, 10 + 4);
	}
}
