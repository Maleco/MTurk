function randInt(min,max) 
{ 
	return Math.floor(Math.random()*(max-min+1)+min); 
}

function generateFormulas(difficulty) 
{
	// Clear previous results
	formulas.length = 0;
	xvalues.length = 0;

	// Generate the formulas
	if (difficulty == 1) 
		// 2 + 1 = X
	// X = <2,9>
	{
		for(i=2; i < 10; i++) {
			do {
				var first = randInt(0,i);
				var second = randInt(0,i);
			} while ((first+second) != i );
			do {
				var third = randInt(0,i);
				var fourth = randInt(0,i);
			} while (third+fourth != first+second || 
				third == first || third == second || fourth == first || fourth == second
			); 

			// Save the generated formulas + values
			formulas.push(first + ' + ' + second + ' = X');
			formulas.push(third + ' + ' + fourth + ' = X');
			xvalues.push(first+second);
			xvalues.push(third+fourth);
		}
	} else if (difficulty == 2) 
		// X + 3 = 12
	// X = <2,9>, "3" <2,9>
	{
		for(i=2; i < 10; i++) {
			var first  = randInt(2,9);
			var second = i + first;
			do {
				var third = randInt(2,9);
				var fourth = i + third;
			} while ( third == first);
			formulas.push('X' + ' + ' + first + ' = ' + second);
			formulas.push('X' + ' + ' + third + ' = ' + fourth);
			xvalues.push(i);
			xvalues.push(i);
		}
	} else if (difficulty == 3) 
		// 6 * X + 4 = 16
	// "6" <2,9>, X = <2,9>, "4" <2,9>
	{
		for(i=2; i < 10; i++) {
			var first  = randInt(2,4);
			var second = randInt(2,9);
			do {
				var third = randInt(2,9);
				var fourth = randInt(2,9);
			} while ( third == first || fourth == second);
			formulas.push(first  + ' * X + ' + second + ' = ' + (first*i+second));
			formulas.push(third  + ' * X + ' + fourth + ' = ' + (third*i+fourth));
			xvalues.push(i);
			xvalues.push(i);
		}
	}
}

