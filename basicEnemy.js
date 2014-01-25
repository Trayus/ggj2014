var BasicEnemy = function(x, y, type)
{
	this.x = x;
	this.y = y;
	this.xoff = 30;
	this.yoff = 8;
	this.timer = 0;
	this.health = 3; 
	this.speed = 1;
	this.type = type;
	this.aship_im = new Image();
	this.aship_im.src = "playera.png";
	this.bship_im = new Image();
	this.bship_im.src = "playerb.png";
	var self = this;
	
	this.update = function(dt)
	{
		if (self.timer % 100 === 0 && self.type === 0) {
		  bullets.push(new Bullet(self.x + self.xoff - 12, self.y + self.yoff + 8, 0, .2, "big_p_bullet.png", false));
		}
		if (self.timer % 200 === 0) {
		  bullets.push(new Bullet(self.x + self.xoff - 12, self.y + self.yoff + 8, 0, .2, "big_p_bullet.png", false));
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
	
	this.draw = function(ctx)
	{
		if (self.type == 0)
			ctx.drawImage(self.aship_im, (self.x - 10) - (self.x % 1), self.y - (self.y % 1));
		else
			ctx.drawImage(self.bship_im, self.x - (self.x % 1), self.y - (self.y % 1));
	}
	
	this.draw = function(ctx)
	{
		if (self.type == 0)
			ctx.drawImage(self.aship_im, (self.x - 10) - (self.x % 1), self.y - (self.y % 1));
		else
			ctx.drawImage(self.bship_im, self.x - (self.x % 1), self.y - (self.y % 1));
	}
}