var Boss = function(x, y, type, move, shoot)
{
	this.boss = true;
	this.x = x;
	this.y = y;
	this.xoff = 30;
	this.yoff = 8;
	this.timer = 0;
	this.speed = 1;
	this.health = 500;
	this.type = type;
	this.wingType;
	this.move = move;
	this.shoot = shoot;
	this.ship11_im = new Image();
	this.ship11_im.src = "enemy_boss_11.png";
	this.ship12_im = new Image();
	this.ship12_im.src = "enemy_boss_12.png";
	this.ship13_im = new Image();
	this.ship13_im.src = "enemy_boss_13.png";
	this.ship21_im = new Image();
	this.ship21_im.src = "enemy_boss_21.png";
	this.ship22_im = new Image();
	this.ship22_im.src = "enemy_boss_22.png";
	this.ship23_im = new Image();
	this.ship23_im.src = "enemy_boss_23.png";
	this.ship31_im = new Image();
	this.ship31_im.src = "enemy_boss_31.png";
	this.ship32_im = new Image();
	this.ship32_im.src = "enemy_boss_32.png";
	this.ship33_im = new Image();
	this.ship33_im.src = "enemy_boss_33.png";
	
	var homeshot = true;
	var altshot = true;
	var mcshot = true;
	var wingshot = true;
	var self = this;
	this.fracture_time = 0;
	
	this.update = function(dt)
	{
		self.shoot(self);
		self.move(self);
		self.wingType = player.type;
		self.timer++;
	}
	
	this.hitbox = function()
	{
		return new Hitbox(self.x, self.y + 6, 210, 80);
	}
	
	this.die = function()
	{
		self.fracture_time = 9999999;
	}
	
	this.draw = function(ctx)
	{
		ctx.fillStyle = '#ff0000';
		ctx.fillRect(0,0, self.health, 10);
		if (self.type == 0) {
			if (self.wingType == 0) {
				ctx.drawImage(self.ship11_im, self.x - (self.x % 1), self.y - (self.y % 1));
			}
			if (self.wingType == 1) {
				ctx.drawImage(self.ship12_im, self.x - (self.x % 1), self.y - (self.y % 1));
			}
			if (self.wingType == 2) {
				ctx.drawImage(self.ship13_im, self.x - (self.x % 1), self.y - (self.y % 1));
			}
		}
		else if (self.type == 1) {
			if (self.wingType == 0) {
				ctx.drawImage(self.ship21_im, self.x - (self.x % 1), self.y - (self.y % 1));
			}
			if (self.wingType == 1) {
				ctx.drawImage(self.ship22_im, self.x - (self.x % 1), self.y - (self.y % 1));
			}
			if (self.wingType == 2) {
				ctx.drawImage(self.ship23_im, self.x - (self.x % 1), self.y - (self.y % 1));
			}
		}
		else {
			if (self.wingType == 0) {
				ctx.drawImage(self.ship31_im, self.x - (self.x % 1), self.y - (self.y % 1));
			}
			if (self.wingType == 1) {
				ctx.drawImage(self.ship32_im, self.x - (self.x % 1), self.y - (self.y % 1));
			}
			if (self.wingType == 2) {
				ctx.drawImage(self.ship33_im, self.x - (self.x % 1), self.y - (self.y % 1));
			}
		}

	}
}