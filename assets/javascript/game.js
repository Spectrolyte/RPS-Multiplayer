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

$(document).ready(function () {

// game logic:
	// rock > scissors > paper > rock
function result (p1Choice, p2Choice) {
	// when p1 picked rock
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
		// round is a draw
		$('#round-result').text('draw');
		}
	}
	// when p1 picked scissors
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
		// round is a draw
		$('#round-result').text('draw');
		}
	}
	// when p1 picked paper
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
		// round is a draw
		$('#round-result').text('draw');
		}
	}
}

// player choices: rock, paper, scissors
var choices = ['rock','paper','scissors'];

var p1 = {
	data: {
		name: '',
		wins: 0,
		losses: 0
	}
	choice: '',
	turn: false
};

var p2 = {
	data: {
		name: '',
		wins: 0,
		losses: 0
	}
	choice: '',
	turn: false
};

// data stored in firebase: player names, wins, losses.

// listens for changes in values in firebase db
firebase.database().ref().on('value', function (snapshot) {

})


// appear as buttons when it is the user's turn
function renderButtons () {
	var btnDiv = $('<div>');

	for (var i=0; i< choices.length; i++) {
		var btn = $('<button>');
		btn.addClass('rps-choices').attr('data-value', choices[i]).text(choices[i]);
		btnDiv.append(btn);
	}
	
	// hide on initial page load
	$('.player').append(btnDiv).hide();
}

// when two players are present, start the game -- player1's turn
var players = [];

// determining player turns -- turn prop?
	// hide/show buttons depending on who's turn it is

// upon rps-choice button click
	// grab value and set it to that player's choice
$('.rps-choices').click(function () {
	// if it's player1's turn
	p1.choice = $(this).attr('data-value');
	// if player2's turn
	p2.choice = $(this).attr('data-value');
})






















});