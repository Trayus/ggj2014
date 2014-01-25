
var Bullet = function(x, y, vx, vy, imagename, damage, playerbullet)
{
	this.x = x;
	this.y = y;
	this.vx = vx;
	this.vy = vy;
	this.damage = damage;
	this.playerbullet = playerbullet;
	this.image = new Image();
	this.image.src = imagename;
	var self = this;
	
	this.update = function(dt)
	{
		self.x += self.vx * dt;
		self.y += self.vy * dt;
	}
	
	this.hitbox = function()
	{
		return new Hitbox(self.x, self.y, self.image.width, self.image.height);
	}
	
	this.draw = function(ctx)
	{
		ctx.drawImage(self.image, self.x - (self.x % 1), self.y - (self.y % 1));		
	}
}