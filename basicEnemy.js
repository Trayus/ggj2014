var BasicEnemy = function(x, y, type, size, move, shoot)
{
	this.boss = false;
	this.x = x;
	this.y = y;
	this.xoff = 30;
	this.yoff = 8;
	this.timer = 0;
	this.size = (size == "small"? 1 : (size == "medium")? 2 : 3);
	this.graphicSize = (size == "small"? 1 : (size == "medium")? 2 : 4);
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
	this.fracture_data = new Array();
	this.fracture_time = 0;
	
	this.update = function(dt)
	{
		if (self.fracture_time > 0)
		{
			self.fracture_time++;
			
			self.move(self);
			self.fracture_data[2] = self.x - Math.floor(self.fracture_time / 2);
			self.fracture_data[3] = self.y - Math.floor(self.fracture_time / 2);
			self.fracture_data[4] = self.x + self.fracture_data[0] + Math.floor(self.fracture_time / 2);
			self.fracture_data[5] = self.y + self.fracture_data[1] + Math.floor(self.fracture_time / 2);
		}
		else
		{
			if (self.type == 1)
				self.speed = 1.5;
			self.shoot(self);
			self.move(self);
			self.timer++;
			if (self.y > 700) {
				self.y -= 820;
			}
		}
	}
	
	this.die = function()
	{
		if (self.fracture_time == 0)
		{
			self.fracture_time = 1;
			
			if (self.type == 0)
				self.fracture_data[0] = Math.floor(Math.random() * 20 * self.graphicSize) + 20 * self.graphicSize;
			else
				self.fracture_data[0] = Math.floor(Math.random() * 15 * self.graphicSize) + 15 * self.graphicSize;
			if (self.type == 0)
				self.fracture_data[1] = Math.floor(Math.random() * 10 * self.graphicSize) + 10 * self.graphicSize;
			else
				self.fracture_data[1] = Math.floor(Math.random() * 15 * self.graphicSize) + 15 * self.graphicSize;
			self.fracture_data[2] = self.x;
			self.fracture_data[3] = self.y;
			self.fracture_data[4] = self.x + self.fracture_data[0];
			self.fracture_data[5] = self.y + self.fracture_data[1];
			self.fracture_data[6] = self.fracture_data[4] - self.fracture_data[2];
			self.fracture_data[7] = self.fracture_data[5] - self.fracture_data[3];
			self.fracture_data[8] = (self.type == 0? 60 : 40) * self.graphicSize - self.fracture_data[0];
			self.fracture_data[9] = (self.type == 0? 30 : 40) * self.graphicSize - self.fracture_data[1];
		}
	}
	
	this.hitbox = function()
	{
		if (self.fracture_time > 0) return new Hitbox(0, 0, 0, 0);
	
		if (self.type == 0)
			return new Hitbox(self.x - 10, self.y + 6, 60 * self.graphicSize, 22 * self.graphicSize);
		else
			return new Hitbox(self.x + 5 * self.graphicSize, self.y + 16, 28 * self.graphicSize, 16 * self.graphicSize);	
	}
	
	this.draw = function(ctx)
	{
		if (self.fracture_time > 0)
		{
			if (self.type == 0)
			{
				ctx.drawImage(self.aship_im, 0, 0, self.fracture_data[6], self.fracture_data[7],
					(self.fracture_data[2] - 10) - (self.fracture_data[2] % 1), self.fracture_data[3] - (self.fracture_data[3] % 1),
					self.fracture_data[6], self.fracture_data[7]);
				ctx.drawImage(self.aship_im, 0, self.fracture_data[1], self.fracture_data[6], self.fracture_data[9],
					(self.fracture_data[2] - 10) - (self.fracture_data[2] % 1), self.fracture_data[5] - (self.fracture_data[5] % 1),
					self.fracture_data[6], self.fracture_data[9]);
				ctx.drawImage(self.aship_im, self.fracture_data[0], 0, self.fracture_data[8], self.fracture_data[7],
					(self.fracture_data[4] - 10) - (self.fracture_data[4] % 1), self.fracture_data[3] - (self.fracture_data[3] % 1),
					self.fracture_data[8], self.fracture_data[7]);
				ctx.drawImage(self.aship_im, self.fracture_data[0], self.fracture_data[1], self.fracture_data[8], self.fracture_data[9],
					(self.fracture_data[4] - 10) - (self.fracture_data[4] % 1), self.fracture_data[5] - (self.fracture_data[5] % 1),
					self.fracture_data[8], self.fracture_data[9]);
			}
			else if (self.type == 1)
			{
				ctx.drawImage(self.bship_im, 0, 0, self.fracture_data[6], self.fracture_data[7],
					(self.fracture_data[2] - 10) - (self.fracture_data[2] % 1), self.fracture_data[3] - (self.fracture_data[3] % 1),
					self.fracture_data[6], self.fracture_data[7]);
				ctx.drawImage(self.bship_im, 0, self.fracture_data[1], self.fracture_data[6], self.fracture_data[9],
					(self.fracture_data[2] - 10) - (self.fracture_data[2] % 1), self.fracture_data[5] - (self.fracture_data[5] % 1),
					self.fracture_data[6], self.fracture_data[9]);
				ctx.drawImage(self.bship_im, self.fracture_data[0], 0, self.fracture_data[8], self.fracture_data[7],
					(self.fracture_data[4] - 10) - (self.fracture_data[4] % 1), self.fracture_data[3] - (self.fracture_data[3] % 1),
					self.fracture_data[8], self.fracture_data[7]);
				ctx.drawImage(self.bship_im, self.fracture_data[0], self.fracture_data[1], self.fracture_data[8], self.fracture_data[9],
					(self.fracture_data[4] - 10) - (self.fracture_data[4] % 1), self.fracture_data[5] - (self.fracture_data[5] % 1),
					self.fracture_data[8], self.fracture_data[9]);
			}
			else
			{
				ctx.drawImage(self.cship_im, 0, 0, self.fracture_data[6], self.fracture_data[7],
					(self.fracture_data[2] - 10) - (self.fracture_data[2] % 1), self.fracture_data[3] - (self.fracture_data[3] % 1),
					self.fracture_data[6], self.fracture_data[7]);
				ctx.drawImage(self.cship_im, 0, self.fracture_data[1], self.fracture_data[6], self.fracture_data[9],
					(self.fracture_data[2] - 10) - (self.fracture_data[2] % 1), self.fracture_data[5] - (self.fracture_data[5] % 1),
					self.fracture_data[6], self.fracture_data[9]);
				ctx.drawImage(self.cship_im, self.fracture_data[0], 0, self.fracture_data[8], self.fracture_data[7],
					(self.fracture_data[4] - 10) - (self.fracture_data[4] % 1), self.fracture_data[3] - (self.fracture_data[3] % 1),
					self.fracture_data[8], self.fracture_data[7]);
				ctx.drawImage(self.cship_im, self.fracture_data[0], self.fracture_data[1], self.fracture_data[8], self.fracture_data[9],
					(self.fracture_data[4] - 10) - (self.fracture_data[4] % 1), self.fracture_data[5] - (self.fracture_data[5] % 1),
					self.fracture_data[8], self.fracture_data[9]);
			}
		}
		else
		{
			if (self.type == 0)
				ctx.drawImage(self.aship_im, (self.x - 10) - (self.x % 1), self.y - (self.y % 1));
			else if (self.type == 1)
				ctx.drawImage(self.bship_im, self.x - (self.x % 1), self.y - (self.y % 1));
			else
				ctx.drawImage(self.cship_im, self.x - (self.x % 1), self.y - (self.y % 1));
		}
	}
}