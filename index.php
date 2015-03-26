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
			The puzzles will be presented to you in three blocks of a certain difficulty (easy, medium, hard),
			the order of these blocks is not pre-determined.
			During a block, a new puzzle will be generated after completion of a puzzle until 15 minutes are reached.
			An alert will be presented after completion of a block and a short break is possible.
			We would like to urge to complete puzzles <B>as fast as possible while using as less steps as possible</b>.
			</p>
			<p>
			Prior to the actual experiment, you will be presented three easy introductory puzzles, 
			designed to make you familiar with the game.
			These introduction games are indicated with the headline: "Current Block: Intro X of 3".
			During the actual experiment this line will show the current block.

			<h3>Concentration</h3>
			Concentration, also known as Memory, Pelmanism, Shinkei-suijaku, Pexeso or simply Pairs,
			is a card game in which all of the cards are laid face down on a surface.
			The objective of the game is to turn over pairs of matching cards.<br>
			In our version of the game there is never more then 1 card open, 
			clicking on a new card will result in a match or in the closing of the previously open card.

			<h3>Payment</h3>
			Completing the experiment will result in a payment of $2.00.
			Additional bonus payments can be made by solving puzzles in less than 30 steps.
			Each quickly solved puzzle results in an additional $0.10 to a maximum of $2.00,
			Resulting in a maximum payment of $4.00.

			<h3>After completion</h3>
			As stated in the HIT, after completion of this experiment a unique code is generated,
			which has to be filled in on the HIT-page.
			After submission of the code, your experimental data will be evaluated, and we will
			decide if, and how much, you will be payed.
			This process usually takes less than 5 workdays.
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
