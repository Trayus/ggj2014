var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

var spacePress = false;


var checkInput = function()
{
	if (87 in keysDown)
	{
	}
	if (83 in keysDown)
	{
	}
	if (68 in keysDown || 74 in keysDown)
	{
	}
	if (32 in keysDown && !spacePress)
	{
		spacePress = true;
		if (!gameover)
		{
			paused = !paused;
			if (!paused)
			{
				then = new Date().getTime();
			}
		}
	}
	else if (!(32 in keysDown))
		spacePress = false;
	if (82 in keysDown)
	{
		restart();
	}
}
var checkBasicInput = function()
{
	if (32 in keysDown && !spacePress)
	{
		spacePress = true;
		if (!gameover)
		{
			paused = !paused;
			if (!paused)
			{
				then = new Date().getTime();
			}
		}
	}
	else if (!(32 in keysDown))
		spacePress = false;
	if (82 in keysDown)
	{
		restart();
	}
}