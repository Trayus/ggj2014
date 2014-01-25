function Hitbox(x, y, w, h)
{
	this.x1 = x;
	this.x2 = x + w;
	this.y1 = y;
	this.y2 = y + h;
	var self = this;
	
	this.hits = function(other)
	{
		if (self.x1 < other.x2 && self.x2 > other.x1 &&
			self.y1 < other.y2 && self.y2 > other.y1)
		{
			return true;
		}
		return false;
	}
}