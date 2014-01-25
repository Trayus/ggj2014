var BasicEnemy = function(x, y, type)
{
	this.health = 3;
	this.x = x;
	this.y = y;
	this.timer = 0;
	this.speed = 2.0;
	this.type = type;
	this.aship_im = new Image();
	this.aship_im.src = "playera.png";
	this.bship_im = new Image();
	this.bship_im.src = "playerb.png";
	this.timer = 0;
	var self = this;
	
	this.update = function(dt)
	{
		if (self.timer % 25 && self.type == 0) {
		  //shoot
		}
		if (self.timer % 50) {
		  //shoot
		}
		self.timer++;
	}
	
	this.shipSettings = function()
	{
		switch(self.type)
		{
		case 0: self.speed = 2; break;
		case 1: self.speed = 3; break;
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