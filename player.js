var Player = function(x, y)
{
	this.lives = 3;
	this.x = x;
	this.y = y;
	this.sx = x;
	this.sy = y;
	this.speed = 2.0;
	this.type = 0;
	this.aship_im = new Image();
	this.aship_im.src = "playera.png";
	this.bship_im = new Image();
	this.bship_im.src = "playerb.png";
	var self = this;

	var swap = false;
	
	this.reset = function()
	{
		self.lives--;
		self.x = self.sx;
		self.y = self.sy;
		
		return self.lives;
	}
	
	this.update = function(dt)
	{
		// up
		if (38 in keysDown && !(40 in keysDown))
		{
			if ((37 in keysDown && !(39 in keysDown)) || (39 in keysDown && !(37 in keysDown)))
				self.y -= Math.sqrt(self.speed);
			else
				self.y -= self.speed;
		}
		// down
		if (40 in keysDown && !(38 in keysDown))
		{
			if ((37 in keysDown && !(39 in keysDown)) || (39 in keysDown && !(37 in keysDown)))
				self.y += Math.sqrt(self.speed);
			else
				self.y += self.speed;
		}
		// left
		if (37 in keysDown && !(39 in keysDown))
		{
			if ((40 in keysDown && !(38 in keysDown)) || (38 in keysDown && !(40 in keysDown)))
				self.x -= Math.sqrt(self.speed);
			else
				self.x -= self.speed;
		}
		// right
		if (39 in keysDown && !(37 in keysDown))
		{
			if ((40 in keysDown && !(38 in keysDown)) || (38 in keysDown && !(40 in keysDown)))
				self.x += Math.sqrt(self.speed);
			else
				self.x += self.speed;			
		}
	
		
		if (81 in keysDown && !swap)
		{
			self.type += 1;
			self.type %= 2;
			swap = true;
			self.shipSettings();
		}
		if (87 in keysDown)
		{
			//shoot
		}
		if (69 in keysDown && !swap)
		{			
			self.type -= 1;
			if (self.type < 0) self.type = 1;
			swap = true;
			self.shipSettings();
		}
		if (!(81 in keysDown) && !(69 in keysDown))
			swap = false;
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
}