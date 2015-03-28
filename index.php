<!DOCTYPE html>
<head>
	 <title>MTurk Experiment</title>
	 <meta charset="utf-8">
	 <link rel="stylesheet" href="css/style.css">
	 <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
	 <script src="//code.jquery.com/ui/1.11.3/jquery-ui.js"></script>
</head>
<body>
	 <div id="mainContent" class="content">
			<h1> Welcome to our experiment</h1>
			<p>
			During this experiment you will be presented with a number of Concentration puzzle games.
			The puzzle games will be presented to you in three blocks.
			each block lasts about 15 minutes.
			An alert will be presented after completion of a block, 
			at which you can take a small break.
			We would like to urge you to complete the puzzles 
			<b>in as few steps as possible</b>.
			</p>
			<p>
			Prior to the actual experiment, you will be presented two introductory puzzles.

			<h3>Concentration</h3>
			Concentration, also known as Memory, Pelmanism, Shinkei-suijaku, Pexeso or simply Pairs,
			is a card game in which all of the cards are laid face down on a surface.
			The objective of the game is to find pairs of matching cards.<br>
			In our version of the game there is never more then 1 card open, 
			clicking on a new card will either result in a match or in closing the previously open card.

			Cards in our puzzles do not show an image as in the regular Concentration game. 
			Instead, they show equations, for instance '2 + 2 = X' or '1 + 3 = X'.

			<h4>Cards are considered a match when their x-values correspond!</h4>
			So, 'X + 2 = 5' matches 'X + 7 = 10',
			but 'X + 2 = 5' does <b>not</b>
			match with 'X + 2 = 7'.

			<h3>Payment</h3>
			Completing the experiment will result in a payment of $2.00 + bonuses.
			A bonus of $0.10 is <b>earned</b> for each puzzle solved in fewer than 30 steps.
			For each game solved in more than 38 steps, $0.10 is <b>subtracted</b>
			from your bonus. You can earn a maximum bonus of $3.00, 
			resulting in a <b>maximum payment of $5.00</b>.
			<br>
			<br>
			<h4>IMPORTANT: Games have to be solved in fewer than 38 steps ON AVERAGE. If you take more steps, you will NOT be paid.<h4>

			<h3>After completion</h3>
			As stated in the HIT, after completion of this experiment a unique code is generated,
			which has to be filled in on the HIT-page.
			After submitting your code,
			your experimental data will be evaluated,
			and we will process your payment.
			This is done within 5 working days.
			<br>
			<br>
			<br>
			<form id="form" method="post" action="intro.php" class="form">
				 <input type="hidden" id="diffOrder" name="diffOrder" value="<?php echo $_GET['order'] ?>">
				 <button type="submit" form="form" value="Submit">Take me to the experiment</button>
			</div>
			<br>
			<br>
			<br>
	 </form>
</body>
</html>
