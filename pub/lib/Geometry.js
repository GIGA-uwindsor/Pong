
var Geometry = (function(module) {

	module.isCircleIntersectingRect = function (cx, cy, cRad, rect) {
		var rWidthHalf = rect.getWidth()/2;
		var rHeightHalf = rect.getHeight()/2;

		// Step A: calculate the absolute values of the x and y difference between the center 
		// of the circle and the center of the rectangle. 
		// This collapses the four quadrants down into one, so that the calculations do not
		// have to be done four times.
		var circleDistX = Math.abs(cx - rect.getX() - rWidthHalf);
		var circleDistY = Math.abs(cy - rect.getY() - rHeightHalf);

		// Step B: eliminate the easy cases where the circle is far enough away from the 
		// rectangle (in either direction) that no intersection is possible.
		if (circleDistX > rWidthHalf + cRad || circleDistY > rHeightHalf + cRad)
			return false;

		// Step C: eliminates the easy cases where the circle's center lies inside the rect. 
		// This check allows us to usually skip the expensive step D.
		// This check is only valid after Step B.
		if (circleDistX <= rWidthHalf || circleDistY <= rHeightHalf)
			return true;

		// Step D: compute the distance from the center of the circle and the corner, and then 
		// verify that the distance is not more than the radius of the circle.
		var cornerDistance = (circleDistX-rWidthHalf)*(circleDistX-rWidthHalf) + 
							 (circleDistY-rHeightHalf)*(circleDistY-rHeightHalf);
		return cornerDistance <= (cRad*cRad);
	}

})({});
