function isCircleIntersectingRect(c:Circle, r:Rect):Bool
{
	var rWidthHalf:Float = r.width/2;
	var rHeightHalf:Float = r.height/2;

	// Step A: calculate the absolute values of the x and y difference between the center of the circle and the center of the rectangle. 
	// This collapses the four quadrants down into one, so that the calculations do not have to be done four times.
	var circleDistX:Float = Math.abs(c.center.x - r.x - rWidthHalf);
	var circleDistY:Float = Math.abs(c.center.y - r.y - rHeightHalf);

	// Step B: eliminate the easy cases where the circle is far enough away from the rectangle (in either direction) that no intersection is possible.
	if (circleDistX > rWidthHalf + c.radius || circleDistY > rHeightHalf + c.radius)
		return false;

	// Step C: eliminates the easy cases where the circle's center lies inside the rect. This check allows us to usually skip the expensive step D.
	// This check is only valid after Step B.
	if (circleDistX <= rWidthHalf || circleDistY <= rHeightHalf)
		return true;

	// Step D: compute the distance from the center of the circle and the corner, and then verify that the distance is not more than the radius of the circle.
	var cornerDistance:Float = (circleDistX-rWidthHalf)*(circleDistX-rWidthHalf) + 
							   (circleDistY-rHeightHalf)*(circleDistY-rHeightHalf);
	return cornerDistance <= (c.radius*c.radius);
}
