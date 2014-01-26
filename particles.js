var particles = new Array();

var Particle = function(x, y, vx, vy, time)
{
	this.x = x;
	this.y = y;
	this.vx = vx;
	this.vy = vy;
	this.image = new Image();
	this.time = time;
	this.image.src = "green_par" + (Math.floor(Math.random() * 2.99) + 1) + ".png";
	var self = this;
	
	this.update = function(dt)
	{
		self.x += self.vx * dt;
		self.y += self.vy * dt;
		self.time--;
	}
	
	this.draw = function(ctx)
	{
		ctx.drawImage(self.image, self.x - (self.x % 1), self.y - (self.y % 1));		
	}
}