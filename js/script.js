var board = $('#board');
var winner = 2; // where the Joker is at start
var joker = '<div class="prize"><p>Joker</p></div>'; // the Joker face
var winDiv = '<a class="prize-button" href="#">Get Prize</a>'; // What to add to Joker when user is currect (button by default)
var lossDiv = '<p class="loss">You didn\'t got the prize</p>'; // What to write instead of prize on Joker when user is wrong
var swapAmount = 10; // How many swaps to do when shuffling
var swapSpeed = 900; // the speed on each swap

$(window).load(function(){
	
	// Init Game and show Joker
	winner = $('[data-card=' + winner +']');
	winner.find('.back').append(joker);
	board.addClass('game-ended');
	winner.toggleClass('hover');
	
	// After a delay...
	setTimeout( function() {
		// Hide and remove Joker
		winner.toggleClass('hover');
		winner.find('.back .prize').remove();
		
		
		// Shuffle Cards
		shuffleCards(function(){ 
			// Only after shuffle is ended:
			// Enable Click (after small delay for animation to end)
			setTimeout( function() {
				board.removeClass('game-ended').on('click', '.flip-container', function() {
					// Restore Jocker
					winner.find('.back').append(joker);
					// Show selected card and lock game
					$(this).toggleClass('hover');
					board.addClass('game-ended').off('click', '.flip-container');
					if(this == winner[0]) {
						// Guess Right - WIN
						winner.find('.back .prize').append(winDiv);
					}
					else {
						// Guess Wrong - LOSE
						// Show Joker after small delay
						winner.find('.back .prize').append(lossDiv);
						setTimeout( function() {
							winner.addClass('hover');
						}, 1000);	
					}
				});
			}, 1500);
		});
		
	}, 1500);
	var zIndex = 10;
	// Shuffle Cards Function
	function shuffleCards(callback) {
		var cards = board.find('.flip-container');
		var cardsAmount = cards.length;
		var swapMap = [];
		/*cards.each(function(){
			$(this).css('top', $(this).offset().top);
			$(this).css('left', $(this).offset().left);
		});
		cards.each(function(){
			$(this).css('position','absolute');
		});*/
		
		// Creat array of all cards
		for (i=0;i<cardsAmount;i++) swapMap[i]=i;

		function doSetTimeout(i){setTimeout(function(){
			swapMap = shuffle(swapMap);
			/*console.log(swapMap);*/
			// Swap the first 2 (random location) cards
			swapCard($(cards[swapMap[0]]), $(cards[swapMap[1]]));
			// Report to main that swap ended
			if(i+1==swapAmount) callback();
		}, swapSpeed * (i+1));}
		for(i=0; i<swapAmount; i++) doSetTimeout(i);
	};
	
	// Swap 2 cards Function
	function swapCard(loc1, loc2) {
		
		var temp = loc2.offset();
		loc2.offset(loc1.offset()).css('z-index', zIndex);
		zIndex++;
		// Swap will curve and not just switch horizontal
		setTimeout( function() {	
			loc1.offset(temp);
		}, 200);
		loc1.offset({top: temp.top+50, left: temp.left});
	};

	// Shuffle array Function
	function shuffle(array) {
	  var tmp, current, top = array.length;
	  if(top) while(--top) {
		current = Math.floor(Math.random() * (top + 1));
		tmp = array[current];
		array[current] = array[top];
		array[top] = tmp;
	  }
	  return array;
	};

});
