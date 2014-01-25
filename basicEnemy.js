var BasicEnemy = function(x, y, type, size)
{
	this.x = x;
	this.y = y;
	this.xoff = 30;
	this.yoff = 8;
	this.timer = 0;
	this.health = 30; 
	this.speed = 1;
	this.type = type;
	this.aship_im = new Image();
	this.aship_im.src = "enemya_" + size + ".png";
	this.bship_im = new Image();
	this.bship_im.src = "enemyb_" + size + ".png";
	var self = this;
	
	this.update = function(dt)
	{
		if (self.timer % 100 === 0 && self.type === 0) {
			bullets.push(new Bullet(self.x + self.xoff - 12, self.y + self.yoff + 8, 0, .2, "big_p_bullet.png", 1, false));
		}
		if (self.timer % 200 === 0) {
			bullets.push(new Bullet(self.x + self.xoff - 12, self.y + self.yoff + 8, 0, .2, "big_p_bullet.png", 1, false));
		}
		self.y += self.speed;
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