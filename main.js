var ctx;
var MENU = 1, GAME = 2, GAMEOVER = 3, VICTORY = 4;
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
var bossOut = false;

aud.ontick = function() {
	tick++; 
};

//shooting functions
var twoSecShoot = function(me) {
	if (tick % 8 === 0 && me.shot) {
		if (me.type != 0) {
			bullets.push(new Bullet(me.x + 18 * me.graphicSize, me.y + 28 * me.graphicSize, 0.02, .2, "e_bullet"+ me.size +".png", me.size, false));
			bullets.push(new Bullet(me.x + 18 * me.graphicSize, me.y + 28 * me.graphicSize, -0.02, .2, "e_bullet"+ me.size +".png", me.size, false));
		}
		else {
			bullets.push(new Bullet(me.x + 28 * me.graphicSize - 10, me.y + 28 * me.graphicSize, 0.02, .2, "e_bullet"+ me.size +".png", me.size, false));
			bullets.push(new Bullet(me.x + 28 * me.graphicSize - 10, me.y + 28 * me.graphicSize, -0.02, .2, "e_bullet"+ me.size +".png", me.size, false));
		}
		me.shot = false;
	}
	if (tick % 2 === 1) {
		me.shot = true;
	}
	if (tick % 8 === 4 && me.shot) {
		if (me.type != 0)
		bullets.push(new Bullet(me.x + 18 * me.graphicSize, me.y + 28 * me.graphicSize, 0, .2, "e_bullet"+ (me.size + 1) +".png", me.size + 1, false));
		else
		bullets.push(new Bullet(me.x + 28 * me.graphicSize - 10, me.y + 28 * me.graphicSize, 0, .2, "e_bullet"+ (me.size + 1) +".png", me.size + 1, false));
		me.shot = false;
	}
	if (tick % 2 === 0 && me.shot && me.type == 0) {
		bullets.push(new Bullet(me.x + 28 * me.graphicSize - 10, me.y + 28 * me.graphicSize, 0.02, .2, "e_bullet"+ me.size +".png", me.size, false));
		bullets.push(new Bullet(me.x + 28 * me.graphicSize - 10, me.y + 28 * me.graphicSize, -0.02, .2, "e_bullet"+ me.size +".png", me.size, false));
		me.shot = false;
	}
}
var threeSecShoot = function(me) {
	if (tick % 8 === 0 && me.shot) {
		if (me.type != 0) {
			bullets.push(new Bullet(me.x + 18 * me.graphicSize, me.y + 28 * me.graphicSize, 0.02, .3, "e_bullet"+ me.size +".png", me.size, false));
			bullets.push(new Bullet(me.x + 18 * me.graphicSize, me.y + 28 * me.graphicSize, -0.02, .3, "e_bullet"+ me.size +".png", me.size, false));
		}
		else {
			bullets.push(new Bullet(me.x + 28 * me.graphicSize - 10, me.y + 28 * me.graphicSize, 0.02, .3, "e_bullet"+ me.size +".png", me.size, false));
			bullets.push(new Bullet(me.x + 28 * me.graphicSize - 10, me.y + 28 * me.graphicSize, -0.02, .3, "e_bullet"+ me.size +".png", me.size, false));
		}
		me.shot = false;
	}
	if (tick % 2 === 1) {
		me.shot = true;
	}
	if (tick % 8 === 4 && me.shot) {
		if (me.type != 0)
		bullets.push(new Bullet(me.x + 18 * me.graphicSize, me.y + 28 * me.graphicSize, 0, .3, "e_bullet"+ (me.size + 1) +".png", me.size + 1, false));
		else
		bullets.push(new Bullet(me.x + 28 * me.graphicSize - 10, me.y + 28 * me.graphicSize, 0, .3, "e_bullet"+ (me.size + 1) +".png", me.size + 1, false));
		me.shot = false;
	}
	if (tick % 2 === 0 && me.shot && me.type == 0) {
		bullets.push(new Bullet(me.x + 28 * me.graphicSize - 10, me.y + 28 * me.graphicSize, 0.02, .3, "e_bullet"+ me.size +".png", me.size, false));
		bullets.push(new Bullet(me.x + 28 * me.graphicSize - 10, me.y + 28 * me.graphicSize, -0.02, .3, "e_bullet"+ me.size +".png", me.size, false));
		me.shot = false;
	}
}

var minionShoot = function(me) {
	if (tick % 8 === 0 && me.shot) {
		bullets.push(new Bullet(me.x + me.xoff - 12, me.y + me.yoff + 8, -0.02, .2, "e_bullet1.png", 1, false));
		bullets.push(new Bullet(me.x + me.xoff - 12, me.y + me.yoff + 8, 0.02, .2, "e_bullet1.png", 1, false));
		me.shot = false;
	}
	if (tick % 2 === 1) {
		me.shot = true;
	}
	if (tick % 8 === 4 && me.shot) {
		bullets.push(new Bullet(me.x + me.xoff - 12, me.y + me.yoff + 8, 0, .2, "e_bullet1.png", 1, false));
		me.shot = false;
	}
	if (tick % 2 === 0 && me.shot && me.type == 0) {
		bullets.push(new Bullet(me.x + me.xoff - 12, me.y + me.yoff + 8, -0.02, .2, "e_bullet1.png", 1, false));
		bullets.push(new Bullet(me.x + me.xoff - 12, me.y + me.yoff + 8, 0.02, .2, "e_bullet1.png", 1, false));
		me.shot = false;
	}
}

var noShoot = function(me) {
	//nothing
}
var bossShoot = function(me) {
	if (tick % 8 == 4 && me.homeshot) {
		bullets.push(new Bullet(me.x + 20, me.y + 50, 
			-Math.cos(Math.atan2((me.y + 50) - (player.y + 10), (me.x + 20) - (player.x + 20)))/10, 
			-Math.sin(Math.atan2((me.y + 50) - (player.y + 10), (me.x + 20) - (player.x + 20)))/10, 
			"e_bullet1.png", 1, false));
		bullets.push(new Bullet(me.x + 190, me.y + 50, 
			-Math.cos(Math.atan2((me.y + 50) - (player.y + 10), (me.x + 190) - (player.x + 20)))/10, 
			-Math.sin(Math.atan2((me.y + 50) - (player.y + 10), (me.x + 190) - (player.x + 20)))/10, 
			"e_bullet1.png", 1, false));
		me.homeshot = false;
	}
	if (tick % 4 == 1) {
		me.homeshot = true;
	}
	if (tick % 16 == 0 && me.mcshot) {
		bullets.push(new Bullet(me.x + 96, me.y + 60, 0, .4, "e_bullet4.png", 2, false));
		me.mcshot = false;
	}
	if (tick % 16 == 1) {
		me.mcshot = true;
	}
	if (me.type < 2) {
		if (tick % 24 == 16 && me.altshot) {
			bullets.push(new Bullet(me.x + 76, me.y + 60, 0, .3, "e_bullet3.png", 2, false));
			bullets.push(new Bullet(me.x + 116, me.y + 60, 0, .3, "e_bullet3.png", 2, false));
			me.altshot = false;
		}
		if (tick % 24 == 8 && me.altshot && me.type == 0) {
			bullets.push(new Bullet(me.x + 86, me.y + 60, -0.1, .3, "e_bullet1.png", 1, false));
			bullets.push(new Bullet(me.x + 106, me.y + 60, 0.1, .3, "e_bullet1.png", 1, false));
			me.altshot = false;
		}
		if (tick % 24 == 0 && me.altshot && me.type == 0) {
			bullets.push(new Bullet(me.x + 86, me.y + 60, 0.1, .3, "e_bullet1.png", 1, false));
			bullets.push(new Bullet(me.x + 106, me.y + 60, -0.1, .3, "e_bullet1.png", 1, false));
			me.altshot = false;
		}
		if (tick % 2 == 1) {
			me.altshot = true;
		}
	}
	
	// wing rounds
	if (tick % 2 == 1) {
		me.wingshot = true;
	}
	if (me.wingType == 2) {
		if (tick % 24 == 0 && me.wingshot) {
			bullets.push(new Bullet(me.x + 56, me.y + 60, 0, .3, "e_bullet2.png", 2, false));
			bullets.push(new Bullet(me.x + 136, me.y + 60, 0, .3, "e_bullet2.png", 2, false));
			me.wingshot = false;
		}
		if (tick % 24 == 4 && me.wingshot) {
			bullets.push(new Bullet(me.x + 56, me.y + 60, 0.1, .3, "e_bullet2.png", 2, false));
			bullets.push(new Bullet(me.x + 136, me.y + 60, 0.1, .3, "e_bullet2.png", 2, false));
			me.wingshot = false;
		}
		if (tick % 24 == 8 && me.wingshot) {
			bullets.push(new Bullet(me.x + 56, me.y + 60, -0.1, .3, "e_bullet2.png", 2, false));
			bullets.push(new Bullet(me.x + 136, me.y + 60, -0.1, .3, "e_bullet2.png", 2, false));
			me.wingshot = false;
		}
		if (tick % 24 == 12 && me.wingshot) {
			bullets.push(new Bullet(me.x + 56, me.y + 60, 0.2, .3, "e_bullet2.png", 2, false));
			bullets.push(new Bullet(me.x + 136, me.y + 60, 0.2, .3, "e_bullet2.png", 2, false));
			me.wingshot = false;
		}
		if (tick % 24 == 16 && me.wingshot) {
			bullets.push(new Bullet(me.x + 56, me.y + 60, -0.2, .3, "e_bullet2.png", 2, false));
			bullets.push(new Bullet(me.x + 136, me.y + 60, -0.2, .3, "e_bullet2.png", 2, false));
			me.wingshot = false;
		}
	}
	if (me.wingType == 1) {
		if (tick % 48 == 0 && me.wingshot) {
			enemies.push(new BasicEnemy(me.x + 146, me.y, 0, "small", CircleMove, minionShoot));
			enemies.push(new BasicEnemy(me.x + 46, me.y, 0, "small", CCircleMove, minionShoot));
			me.wingshot = false;
		}
	}
	if (me.wingType == 0) {
		if (tick % 16 == 8 && me.wingshot) {
			bullets.push(new Bullet(me.x + 8, me.y + 60, -0.15, .3, "e_bullet1.png", 1, false));
			bullets.push(new Bullet(me.x + 184, me.y + 60, 0.15, .3, "e_bullet1.png", 1, false));
			bullets.push(new Bullet(me.x + 20, me.y + 60, -0.1, .3, "e_bullet1.png", 1, false));
			bullets.push(new Bullet(me.x + 172, me.y + 60, 0.1, .3, "e_bullet1.png", 1, false));
			bullets.push(new Bullet(me.x + 32, me.y + 60, 0, .3, "e_bullet1.png", 1, false));
			bullets.push(new Bullet(me.x + 160, me.y + 60, 0, .3, "e_bullet1.png", 1, false));
			bullets.push(new Bullet(me.x + 44, me.y + 60, 0.1, .3, "e_bullet1.png", 1, false));
			bullets.push(new Bullet(me.x + 148, me.y + 60, -0.1, .3, "e_bullet1.png", 1, false));
			me.wingshot = false;
		}
	}
}
//moving functions
var noMove = function(me){}
var bossMove = function(me) {
	if (me.timer < 100) {
		me.y += 1.5;
	}
	else {
		if ((me.timer % 200) < 100) {
			me.x -= 4;
		}
		else {
			me.x += 4;
		}
	}
	if (me.type == 1) {
		if ((me.timer % 100) < 50) {
			me.y += 2;
		}
		else {
			me.y -= 2;
		}
	}
}
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
	me.x += Math.sin(me.timer/20) * 4;
}
var CCircleMove = function(me) {
	me.y += Math.cos(me.timer/20) * 5 + me.speed;
	me.x -= Math.sin(me.timer/20) * 4;
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
	victory_image = new Image(); victory_image.src = "victory.png";
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
			else {
				bullets.splice(i, 1);
				i--;
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
				if (enemies[i].boss == false) {
					if (enemies[i].type == 2)
						enemies[i].health -= (bullets[j].damage - 1);
					else
						enemies[i].health -= bullets[j].damage;
				}
				else {
					if (enemies[i].type == 2) {
						if (enemies[i].wingType == 2) {
							enemies[i].health -= (bullets[j].damage - 3);
						}
						else {
							enemies[i].health -= (bullets[j].damage - 1);
						}
					}
					else {
						if (enemies[i].wingType == 2) {
							enemies[i].health -= (bullets[j].damage - 2);
						}
						else {
							enemies[i].health -= (bullets[j].damage);
						}
					}
				}
				bullets.splice(j, 1);
				j--;
			}
		}
		if (enemies[i].health < 0)
		{	
			enemies[i].die();
		}
		if (enemies[i].fracture_time > 40)
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

	
	spawnTime.push(new spawn(24, new BasicEnemy(0, -20, 0, "small", CircleMove, twoSecShoot)));
	spawnTime.push(new spawn(32, new BasicEnemy(0, -20, 0, "small", CircleMove, twoSecShoot)));
	spawnTime.push(new spawn(40, new BasicEnemy(0, -20, 0, "small", CircleMove, twoSecShoot)));
	spawnTime.push(new spawn(24, new BasicEnemy(450, -20, 0, "small", CCircleMove, twoSecShoot)));
	spawnTime.push(new spawn(32, new BasicEnemy(450, -20, 0, "small", CCircleMove, twoSecShoot)));
	spawnTime.push(new spawn(40, new BasicEnemy(450, -20, 0, "small", CCircleMove, twoSecShoot)));
	spawnTime.push(new spawn(64, new BasicEnemy(0, -120, 0, "large", CircleMove, threeSecShoot)));
	spawnTime.push(new spawn(64, new BasicEnemy(450, -120, 0, "large", CCircleMove, threeSecShoot)));
	
	spawnTime.push(new spawn(196, new BasicEnemy(0, -20, 0, "small", fastYMove, noShoot)));
	spawnTime.push(new spawn(200, new BasicEnemy(50, -20, 0, "small", fastYMove, noShoot)));
	spawnTime.push(new spawn(204, new BasicEnemy(100, -20, 0, "small", fastYMove, noShoot)));
	spawnTime.push(new spawn(208, new BasicEnemy(150, -20, 0, "small", fastYMove, noShoot)));
	spawnTime.push(new spawn(212, new BasicEnemy(200, -20, 0, "small", fastYMove, noShoot)));
	spawnTime.push(new spawn(196, new BasicEnemy(450, -20, 0, "small", fastYMove, noShoot)));
	spawnTime.push(new spawn(200, new BasicEnemy(400, -20, 0, "small", fastYMove, noShoot)));
	spawnTime.push(new spawn(204, new BasicEnemy(350, -20, 0, "small", fastYMove, noShoot)));
	spawnTime.push(new spawn(208, new BasicEnemy(300, -20, 0, "small", fastYMove, noShoot)));
	spawnTime.push(new spawn(212, new BasicEnemy(250, -20, 0, "small", fastYMove, noShoot)));
	
	spawnTime.push(new spawn(260, new BasicEnemy(0, -120, 0, "medium", sinXMove, threeSecShoot)));
	spawnTime.push(new spawn(276, new BasicEnemy(125, -120, 0, "medium", sinXMove, threeSecShoot)));
	spawnTime.push(new spawn(276, new BasicEnemy(250, -120, 0, "medium", CsinXMove, threeSecShoot)));
	spawnTime.push(new spawn(260, new BasicEnemy(375, -120, 0, "medium", CsinXMove, threeSecShoot)));
	
	spawnTime.push(new spawn(316, new BasicEnemy(-50, 0, 0, "small", StrafeMove, twoSecShoot)));
	spawnTime.push(new spawn(324, new BasicEnemy(-150, 25, 0, "small", StrafeMove, twoSecShoot)));
	spawnTime.push(new spawn(332, new BasicEnemy(-250, 50, 0, "small", StrafeMove, twoSecShoot)));
	spawnTime.push(new spawn(316, new BasicEnemy(500, 0, 0, "small", CStrafeMove, twoSecShoot)));
	spawnTime.push(new spawn(324, new BasicEnemy(600, 25, 0, "small", CStrafeMove, twoSecShoot)));
	spawnTime.push(new spawn(332, new BasicEnemy(700, 50, 0, "small", CStrafeMove, twoSecShoot)));
	
	spawnTime.push(new spawn(356, new BasicEnemy(-50, 0, 0, "small", StrafeMove, twoSecShoot)));
	spawnTime.push(new spawn(364, new BasicEnemy(-150, 25, 0, "small", StrafeMove, twoSecShoot)));
	spawnTime.push(new spawn(372, new BasicEnemy(-250, 50, 0, "small", StrafeMove, twoSecShoot)));
	spawnTime.push(new spawn(356, new BasicEnemy(500, 0, 0, "small", CStrafeMove, twoSecShoot)));
	spawnTime.push(new spawn(364, new BasicEnemy(600, 25, 0, "small", CStrafeMove, twoSecShoot)));
	spawnTime.push(new spawn(372, new BasicEnemy(700, 50, 0, "small", CStrafeMove, twoSecShoot)));

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
			enemies.push(new BasicEnemy(0, 50, 0, "small", noMove, twoSecShoot));
			enemies.push(new BasicEnemy(0, 100, 0, "medium", noMove, twoSecShoot));
			enemies.push(new BasicEnemy(0, 200, 0, "large", noMove, twoSecShoot));
		}
	}
	else if (gamestate == GAMEOVER || gamestate == VICTORY)
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
	if (tick > 400 && bossOut == false && enemies.length==0) { 
		enemies.push(new Boss(-50, -150, player.type, bossMove, bossShoot));
		bossOut = true;
	}
	if (tick > 400 && bossOut && enemies.length==0) { 
		aud.generatepattern(0.0, 0.9, 8, 2, 99999);
		aud.playstop();
		bossOut = false;
		gamestate = VICTORY;
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
	else if (gamestate == VICTORY)
	{
		ctx.drawImage(victory_image, 0, 0);	
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
