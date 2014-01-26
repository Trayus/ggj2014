var BasicEnemy = function(x, y, type, size, move, shoot)
{
	this.boss = false;
	this.x = x;
	this.y = y;
	this.xoff = 30;
	this.yoff = 8;
	this.timer = 0;
	this.size = (size == "small"? 1 : (size == "medium")? 2 : 3);
	this.health = 20 * this.size; 
	this.type = type;
	this.speed = 1;
	console.log(this.speed);
	this.move = move;
	this.shoot = shoot;
	this.aship_im = new Image();
	this.aship_im.src = "enemya_" + size + ".png";
	this.bship_im = new Image();
	this.bship_im.src = "enemyb_" + size + ".png";
	this.cship_im = new Image();
	this.cship_im.src = "enemyc_" + size + ".png";
	var self = this;
	var shot = true;
	
	this.update = function(dt)
	{
		if (self.type == 1)
			self.speed = 1.5;
		self.shoot(self);
		self.move(self);
		self.timer++;
		if (self.y > 700) {
			self.y -= 800;
		}
	}
	
	this.hitbox = function()
	{
		if (self.size == 3) {
			if (self.type == 0)
				return new Hitbox(self.x - 10, self.y + 6, 60 * 4, 22 * 4);
			else
				return new Hitbox(self.x + 5 * 4, self.y + 16, 28 * 4, 16 * 4);	
		}
		if (self.type == 0)
			return new Hitbox(self.x - 10, self.y + 6, 60 * self.size, 22 * self.size);
		else
			return new Hitbox(self.x + 5 * self.size, self.y + 16, 28 * self.size, 16 * self.size);	
	}
	
	this.draw = function(ctx)
	{
		if (self.type == 0)
			ctx.drawImage(self.aship_im, (self.x - 10) - (self.x % 1), self.y - (self.y % 1));
		else if (self.type == 1)
			ctx.drawImage(self.bship_im, self.x - (self.x % 1), self.y - (self.y % 1));
		else
			ctx.drawImage(self.cship_im, self.x - (self.x % 1), self.y - (self.y % 1));
	}
}