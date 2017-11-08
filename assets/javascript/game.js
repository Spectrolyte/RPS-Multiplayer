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

$(document).ready(function () {

// player choices: rock, paper, scissors
var choices = ['rock','paper','scissors'];

var p1 = {
	data: {
		name: '',
		wins: 0,
		losses: 0
	},
	choice: '',
	turn: false
};

var p2 = {
	data: {
		name: '',
		wins: 0,
		losses: 0
	},
	choice: '',
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

// --------------FIREBASE--------------
// data stored in firebase: player names, wins, losses.
// listens for changes in values in firebase db
database.ref().on('value', function (snapshot) {

})

// when two players are present, start the game -- player1's turn
var connectionsRef = database.ref("/connections");

var connectedRef = database.ref(".info/connected");

connectedRef.on("value", function(snap) {
  if (snap.val()) {
    var con = connectionsRef.push(true);
    con.onDisconnect().remove();
  }
});

connectionsRef.on("value", function(snap) {
  $("#test").text(snap.numChildren());
});






















});