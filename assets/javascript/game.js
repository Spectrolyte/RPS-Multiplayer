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
	// check how many people are connected
		// if more than 2, prevent player from joining the room
	// if user is new, create new child node in firebase
	// else if user is returning, load their previous stats
$('#submit-btn').click(function (event) {
	// prevents page refresh/form submission
	event.preventDefault();

	var username = $('#username').val();

	if (!p1.data.name) {
		p1.data.name = username;
		$('.game-content').show();

		userStatsRef.push({
			name: p1.data.name,
			wins: p1.data.wins,
			losses: p1.data.losses
		});

	}
	else if (!p2.data.name) {
		p2.data.name = username;
		$('.game-content').show();

		userStatsRef.push({
			name: p1.data.name,
			wins: p1.data.wins,
			losses: p1.data.losses
		});
	}
	else {
		alert('Sorry, there\'s no more room!');
	}
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

// determining player turns -- turn prop?
	// hide/show buttons depending on who's turn it is
// check if players are ready, then start game
function startGame () {
	if (p1.ready && p2.ready) {
		// display buttons to player one
		$('#player1').show();
	}
}

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
var userStatsRef = database.ref('/userStats');
// listens for changes in values in firebase db
userStatsRef.on('value', function (snapshot) {

})

// when two players are present, start the game -- player1's turn
var connectionsRef = database.ref("/connections");
// spectators
// var connectionsRef = database.ref("/connections/spectators");
var connectedRef = database.ref(".info/connected");

connectedRef.on("value", function(snapshot) {
  if (snapshot.val()) {
    var con = connectionsRef.push(true);
    con.onDisconnect().remove();
  }
});

connectionsRef.on("value", function(snapshot) {
  $("#test").text(snapshot.numChildren());
/*  if (snapshot.numChildren() > 2) {
  	$('.rules-and-form').hide();
  	alert('Unable to join');
  }*/
});

// whenever someone enters the room
connectionsRef.on('child_added', function () {
	// 
})

// if the number of connections is more than 2, send user alert that they can't join, but offer spectator mode





















});