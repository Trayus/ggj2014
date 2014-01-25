var Player = function(x, y)
{
	this.lives = 3;
	this.x = x;
	this.y = y;
	this.sx = x;
	this.sy = y;
	this.speed = 2.0;
	this.base_im = new Image();
	this.base_im.src = "playercore.png";
	this.aship_im = new Image();
	this.aship_im.src = "playera.png";
	this.bship_im = new Image();
	this.bship.src = "playerb.png";
	var self = this;
	
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
	}
	
	this.draw = function(ctx)
	{
		ctx.drawImage(self.base_im, self.x, self.y);
	}
}