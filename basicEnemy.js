var BasicEnemy = function(x, y, type, size, move, shoot)
<<<<<<< .mine
var BasicEnemy = function(x, y, type, size)
=======
var BasicEnemy = function(x, y, type, move, shoot)
>>>>>>> .theirs
{
	this.x = x;
	this.y = y;
	this.xoff = 30;
	this.yoff = 8;
	this.timer = 0;
	this.health = 30; 
	this.speed = 1;
	this.type = type;
	this.move = move;
	this.shoot = shoot;
	this.aship_im = new Image();
	this.aship_im.src = "enemya_" + size + ".png";
	this.bship_im = new Image();
	this.bship_im.src = "enemyb_" + size + ".png";
	var self = this;
	
	this.update = function(dt)
	{
		self.shoot(self);
		self.move(self);
		self.timer++;
	}
	
	this.shipSettings = function()
	{
		switch(self.type)
		{
			case 0: self.speed = 2; 
			break;
			case 1: self.speed = 3; 
			break;
		}
	}
	
	this.hitbox = function()
	{
		if (self.type == 0)
			return new Hitbox(self.x - 10, self.y + 6, 60, 26);
		else
			return new Hitbox(self.x + 6, self.y + 6, 22, 20);	
	}
	
	this.draw = function(ctx)
	{
		if (self.type == 0)
			ctx.drawImage(self.aship_im, (self.x - 10) - (self.x % 1), self.y - (self.y % 1));
		else
			ctx.drawImage(self.bship_im, self.x - (self.x % 1), self.y - (self.y % 1));
	}
}