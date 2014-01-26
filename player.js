var Player = function(x, y)
{
	this.lives = 3;
	this.x = x;
	this.y = y;
	this.sx = x;
	this.sy = y;
	this.xoff = 18;
	this.yoff = 8;
	this.speed;
	this.type = 0;
	this.bullettimer = 0;
	this.aship_im = new Image();
	this.aship_im.src = "playera.png";
	this.bship_im = new Image();
	this.bship_im.src = "playerb.png";
	this.cship_im = new Image();
	this.cship_im.src = "playerc.png";
	var self = this;
	var shotcounterA = 0;
	var shotcounterB = 0;

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
		if (87 in keysDown && !(83 in keysDown))
		{
			if ((65 in keysDown && !(68 in keysDown)) || (68 in keysDown && !(65 in keysDown)))
				self.y -= self.speed * dt * 0.7;
			else
				self.y -= self.speed * dt;
		}
		// down
		if (83 in keysDown && !(87 in keysDown))
		{
			if ((65 in keysDown && !(68 in keysDown)) || (68 in keysDown && !(65 in keysDown)))
				self.y += self.speed * dt * 0.7;
			else
				self.y += self.speed * dt;
		}
		// left
		if (65 in keysDown && !(68 in keysDown))
		{
			if ((83 in keysDown && !(87 in keysDown)) || (87 in keysDown && !(83 in keysDown)))
				self.x -= self.speed * dt * 0.7;
			else
				self.x -= self.speed * dt;
		}
		// right
		if (68 in keysDown && !(65 in keysDown))
		{
			if ((83 in keysDown && !(87 in keysDown)) || (87 in keysDown && !(83 in keysDown)))
				self.x += self.speed * dt * 0.7;
			else
				self.x += self.speed * dt;			
		}
		
		if (self.x < -10) self.x = -10;
		if (self.x > 480) self.x = 480;
		if (self.y < -10) self.y = -10;
		if (self.y > 580) self.y = 580;
	
		if (self.bullettimer < 0)
		{
			self.bullettimer = (self.type == 1? 100 : self.type == 2? 40 : 120);
			if (self.type == 2)
			{
				if (Math.random() < 0.5) 
					bullets.push(new Bullet(self.x + self.xoff, self.y + self.yoff, (Math.random() - 0.5) * 0.07, -0.4, "big_p_bullet.png", 4, true)); 
				else
					bullets.push(new Bullet(self.x + self.xoff, self.y + self.yoff, (Math.random() - 0.5) * 0.07, -0.4, "big_p_bullet.png", 4, true));
				
				switch (shotcounterB) { case 0: pb1.play(); break; case 1: pb2.play(); break; case 2: pb3.play(); break; case 3: pb4.play(); break;
										case 4: pb5.play(); break; case 5: pb6.play(); break; case 6: pb7.play(); break; case 7: pb8.play(); break;
										case 8: pb9.play(); break; case 9: pb10.play(); break; case 10: pb11.play(); break; case 11: pb12.play(); break;
										case 12: pb13.play(); break; case 13: pb14.play(); break; case 14: pb15.play(); break; case 15: pb16.play(); break;}
				shotcounterB++;
				shotcounterB %= 16;
			}
			else
			{
				bullets.push(new Bullet(self.x + self.xoff - 2, self.y + self.yoff, 0, (self.type == 1? -0.6 : -0.4), "bigger_p_bullet.png", 7, true)); 	
				switch (shotcounterA) { case 0: pa1.play(); break; case 1: pa2.play(); break; case 2: pa3.play(); break;
										case 3: pa4.play(); break; case 4: pa5.play(); break; case 5: pa6.play(); break;}
				shotcounterA++;
				shotcounterA %= 6;
			}
			if (self.type == 0)
			{
				bullets.push(new Bullet(self.x + self.xoff - 12, self.y + self.yoff + 8, -0.01, -0.4, "big_p_bullet.png", 4, true)); 		
				bullets.push(new Bullet(self.x + self.xoff - 18, self.y + self.yoff + 8, -0.02, -0.4, "small_p_bullet.png", 2, true)); 		
				bullets.push(new Bullet(self.x + self.xoff - 24, self.y + self.yoff + 8, -0.04, -0.4, "small_p_bullet.png", 2, true)); 		
				bullets.push(new Bullet(self.x + self.xoff + 26, self.y + self.yoff + 8, 0.04, -0.4, "small_p_bullet.png", 2, true)); 		
				bullets.push(new Bullet(self.x + self.xoff + 20, self.y + self.yoff + 8, 0.02, -0.4, "small_p_bullet.png", 2, true)); 		
				bullets.push(new Bullet(self.x + self.xoff + 14, self.y + self.yoff + 8, 0.01, -0.4, "big_p_bullet.png", 4, true)); 	
				switch (shotcounterA) { case 0: pa1.play(); break; case 1: pa2.play(); break; case 2: pa3.play(); break;
										case 3: pa4.play(); break; case 4: pa5.play(); break; case 5: pa6.play(); break;}
				shotcounterA++;
				shotcounterA %= 6;
				switch (shotcounterB) { case 0: pb1.play(); break; case 1: pb2.play(); break; case 2: pb3.play(); break; case 3: pb4.play(); break;
										case 4: pb5.play(); break; case 5: pb6.play(); break; case 6: pb7.play(); break; case 7: pb8.play(); break;
										case 8: pb9.play(); break; case 9: pb10.play(); break; case 10: pb11.play(); break; case 11: pb12.play(); break;
										case 12: pb13.play(); break; case 13: pb14.play(); break; case 14: pb15.play(); break; case 15: pb16.play(); break;}
				shotcounterB++;
				shotcounterB %= 16;
				switch (shotcounterB) { case 0: pb1.play(); break; case 1: pb2.play(); break; case 2: pb3.play(); break; case 3: pb4.play(); break;
										case 4: pb5.play(); break; case 5: pb6.play(); break; case 6: pb7.play(); break; case 7: pb8.play(); break;
										case 8: pb9.play(); break; case 9: pb10.play(); break; case 10: pb11.play(); break; case 11: pb12.play(); break;
										case 12: pb13.play(); break; case 13: pb14.play(); break; case 14: pb15.play(); break; case 15: pb16.play(); break;}
				shotcounterB++;
				shotcounterB %= 16;
			}
		}
		else
			self.bullettimer-=dt;
		
		if (Math.random() > 0.7) {
			particles.push(new Particle(self.x + self.xoff, self.y + 20, Math.random() * 0.1 - 0.05, 0.2, 20));
			if (self.type == 1)
			{
				particles.push(new Particle(self.x + self.xoff + 12, self.y + 18, Math.random() * 0.1 - 0.05, 0.2, 20));
				particles.push(new Particle(self.x + self.xoff - 12, self.y + 18, Math.random() * 0.1 - 0.05, 0.2, 20));
			}
		}
		
		if (49 in keysDown || 74 in keysDown) { // 1 or j
			self.type = 0;
			self.shipSettings();
		}
		
		if (50 in keysDown || 75 in keysDown) { // 2 or k
			self.type = 1;
			self.shipSettings();
		}
		
		if (51 in keysDown || 76 in keysDown) { // 3 or l
			self.type = 2;
			self.shipSettings();
		}
		
		if (69 in keysDown && !swap)
		{
			self.type += 1;
			self.type %= 3;
			swap = true;
			self.shipSettings();
			swaps.play();
		}
		if (81 in keysDown && !swap)
		{			
			self.type -= 1;
			if (self.type < 0) self.type = 2;
			swap = true;
			self.shipSettings();
			swaps.play();
		}
		if (!(81 in keysDown) && !(69 in keysDown))
			swap = false;
	}
	
	this.hitbox = function()
	{
		if (self.type == 0)
			return new Hitbox(self.x - 10, self.y + 6, 50, 20);
		else
			return new Hitbox(self.x + 7, self.y + 6, 22, 20);
	}
	
	this.shipSettings = function()
	{
		switch(self.type)
		{
		case 0: self.speed = 0.15; break;
		case 1: self.speed = 0.3; break;
		case 2: self.speed = 0.2; break;
		}
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
	
	this.shipSettings();
	
}