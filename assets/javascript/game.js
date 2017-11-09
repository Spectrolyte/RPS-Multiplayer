// Initialize Firebase
var config = {
	apiKey: "AIzaSyAA5loVvVusMCIaHbr3gNRrym0yoCO68hY",
	authDomain: "rps-multiplayer-72abc.firebaseapp.com",
	databaseURL: "https://rps-multiplayer-72abc.firebaseio.com",
	projectId: "rps-multiplayer-72abc",
	storageBucket: "rps-multiplayer-72abc.appspot.com",
	messagingSenderId: "962662587269"
};

firebase.initializeApp(config);

var database = firebase.database();

var player1Ref = database.ref('/player1');
var player2Ref = database.ref('/player2');

var initialName = 'No One';
var initialWins = 0;
var initialLosses = 0;

player1Ref.set({
	name: initialName,
	wins: initialWins,
	losses: initialLosses
})

player2Ref.set({
	name: initialName,
	wins: initialWins,
	losses: initialLosses
})


$(document).ready(function () {

// player choices: rock, paper, scissors
var choices = ['rock','paper','scissors'];

var numPlayers = 0;

var p1 = {
	data: {
		name: '',
		wins: 0,
		losses: 0
	},
	choice: '',
	ready: false,
	turn: false
};

var p2 = {
	data: {
		name: '',
		wins: 0,
		losses: 0
	},
	choice: '',
	ready: false,
	turn: false
};

// game logic: rock > scissors > paper > rock
function result (p1Choice, p2Choice) {
	// when p1 picks rock
	if (p1Choice === 'rock') {
		if (p2Choice === 'scissors') {
			p1.wins++;
			p2.losses++;
			$('#round-result').text('player1 wins');
		}
		else if (p2Choice === 'paper') {
			p1.losses++
			p2.wins++;
			$('#round-result').text('player2 wins');
		}
		else {
		$('#round-result').text('draw');
		}
	}
	// when p1 picks scissors
	else if (p1Choice === 'scissors') {
		if (p2Choice === 'paper') {
			p1.wins++;
			p2.losses++;
			$('#round-result').text('player1 wins');
		}
		else if (p2Choice === 'rock') {
			p1.losses++
			p2.wins++;
			$('#round-result').text('player2 wins');
		}
		else {
		$('#round-result').text('draw');
		}
	}
	// when p1 picks paper
	else if (p1Choice === 'paper') {
		if (p2Choice === 'rock') {
			p1.wins++;
			p2.losses++;
			$('#round-result').text('player1 wins');
		}
		else if (p2Choice === 'scissors') {
			p1.losses++
			p2.wins++;
			$('#round-result').text('player2 wins');
		}
		else {
		$('#round-result').text('draw');
		}
	}
}

// on initial page load, ask user for name
	// hide other game content, then reveal when they've entered a name
$('.game-content').hide();

// upon submission:
	// if user is new, create new child node in firebase
	// else if user is returning, load their previous stats
$('#submit-btn').click(function (event) {
	// prevents page refresh/form submission
	event.preventDefault();

	var p1NoName = (p1.data.name === initialName);
	var p2NoName = (p2.data.name === initialName);

	if (p1NoName && p2NoName) {
		p1.data.name = $('#username').val();
		$('#p1-name').text(p1.data.name);
		$('#p1-gamephase').text('Waiting for player 2...');
		$('#player1').show();

		player1Ref.set({
			name: p1.data.name,
			wins: p1.data.wins,
			losses: p1.data.losses
		})

		/*userStatsRef.push({
			name: p1.data.name,
			wins: p1.data.wins,
			losses: p1.data.losses
		});*/

		startGame();

	}

	else if (!p1NoName && p2NoName) {
		p2.data.name = $('#username').val();
		$('#p2-name').text(p2.data.name);
		$('#player2').show();

		player2Ref.set({
			name: p1.data.name,
			wins: p1.data.wins,
			losses: p1.data.losses
		})
		
		/*userStatsRef.push({
			name: p2.data.name,
			wins: p2.data.wins,
			losses: p2.data.losses
		});*/

		startGame();
	}
	
})

player1Ref.on('value', function (snapshot) {
	console.log(snapshot.val());

	p1.data.name = snapshot.val().name;
	p1.data.wins = snapshot.val().wins;
	p1.data.losses = snapshot.val().losses;

	snapshot.val().name = p1.data.name;
	snapshot.val().wins = p1.data.wins;
	snapshot.val().losses = p1.data.losses;
})

player2Ref.on('value', function (snapshot) {
	console.log(snapshot.val());

	p2.data.name = snapshot.val().name;
	p2.data.wins = snapshot.val().wins;
	p2.data.losses = snapshot.val().losses;

	snapshot.val().name = p2.data.name;
	snapshot.val().wins = p2.data.wins;
	snapshot.val().losses = p2.data.losses;
})


// attach buttons to player divs and hide
function renderButtons (player) {
	var btnDiv = $('<div>');

	for (var i=0; i< choices.length; i++) {
		var btn = $('<button>');
		btn.addClass('rps-choices').attr('data-value', choices[i]).text(choices[i]);
		btnDiv.append(btn);
		console.log(btn);
	}
	
	$(player).append(btnDiv);
}

// game start -- run when two players are present/names exist
function startGame () {
	// start with player1
	var playersPresent = p1.data.name && p2.data.name;

	if (playersPresent && !p1.turn) {
		p1.turn = true;
		renderButtons('#player1');
		$('#p2-gamephase').text('Your opponent is choosing...');
	}
	else if (playersPresent && p1.turn && !p2.turn) {
		p2.turn = true;
		renderButtons('#player2');
		$('#p1-gamephase').text('Your opponent is choosing...');
	}
	else if (playersPresent && p1.turn && p2.turn) {
		result(p1.choice, p2.choice);
	}

}

// upon rps-choice button click
	// grab value and set it to that player's choice
$('.rps-choices').click(function () {
	// if it's player1's turn
	if (p1.turn && !p2.turn) {
		p1.choice = $(this).attr('data-value');
		$('#player1').remove($('.rps-choices'));
		startGame();
	}
	// if player2's turn
	else if (p1.turn && p2.turn) {
		p2.choice = $(this).attr('data-value');
		$('#player2').remove($('.rps-choices'));
		startGame();
	}
})

// --------------FIREBASE--------------
// data stored in firebase: player names, wins, losses.

var userStatsRef = database.ref('/userStats');
// listens for changes in values in firebase db
userStatsRef.on('value', function (snapshot) {

})

// when two players are present, start the game -- player1's turn
var connectionsRef = database.ref("/connections");
var connectedRef = database.ref(".info/connected");

connectionsRef.on("value", function(snapshot) {
	if (snapshot.numChildren() > 2) {
		/*window.location.replace('../../redirect.html');*/
		$('.rules-and-form').hide();
	}
});

// whenever someone enters the room
connectionsRef.on('child_added', function (childSnapshot, prevChildKey) {
	
})

connectedRef.on("value", function(snapshot) {
  if (snapshot.val()) {
    var con = connectionsRef.push(true);
    con.onDisconnect().remove();
  }
});























});