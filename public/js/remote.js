var socket = io();

var initialConfig;

// Socket to emit type of connection to server
socket.emit('type', 'remote');

// Button handler to send signal to server to pause time
$('#start').click(function () {
	socket.emit('start time', '');
});

// Button handler to send signal to server to start time
$('#stop').click(function () {
	socket.emit('pause time', '');
});

// Button handler to send signal to server to reset clock
$('#resetclock').click(function () {
	socket.emit('reset clock', '');
});

// Button handler to send signal to server to reset shot clock
$('#shotclock').click(function () {
	socket.emit('reset shot clock', '');
});

// Button handler to send signal to server to start a timeout
$('#timeout').click(function () {
	socket.emit('start timeout', '');
});

$('#midlabel1st').addClass('active-btn');

// Button handler to send signal to server to start a timeout
$('#midlabel1st').click(function () {
	changeActiveButton('#midlabel1st', '1ST');
});
$('#midlabel2nd').click(function () {
	changeActiveButton('#midlabel2nd', '2ND');
});
$('#midlabel3rd').click(function () {
	changeActiveButton('#midlabel3rd', '3RD');
});
$('#midlabel4th').click(function () {
	changeActiveButton('#midlabel4th', '4TH');
});
$('#midlabelht').click(function () {
	changeActiveButton('#midlabelht', 'HT');
});
$('#midlabelft').click(function () {
	changeActiveButton('#midlabelft', 'FT');
});
$('#ads').click(function () {
	if($('#ads').hasClass('active-btn')) {
		$('#ads').removeClass('active-btn');
		socket.emit('ads', {show: false});
	} else {
		$('#ads').addClass('active-btn');
		socket.emit('ads', {show: true});
	}
});


function changeActiveButton(id, emitLabel) {
	$('.game-button').removeClass('active-btn');
	$(id).addClass('active-btn');
	socket.emit('mid label', {label: emitLabel});
}

// Functions to give functionality to plus and minus buttons

$('#teamhomeplus').click(function () {
	var val = parseInt($('#teamhomescore').attr('value'));
	val++;
	$('#teamhomescore').attr('value', val);
	changeScore(initialConfig.team_home, val);
});

$('#teamawayplus').click(function () {
	var val = parseInt($('#teamawayscore').attr('value'));
	val++;
	$('#teamawayscore').attr('value', val);
	changeScore(initialConfig.team_away, val);
});

$('#teamhomeminus').click(function () {
	var val = parseInt($('#teamhomescore').attr('value'));
	val--;
	$('#teamhomescore').attr('value', val);
	changeScore(initialConfig.team_home, val);
});

$('#teamawayminus').click(function () {
	var val = parseInt($('#teamawayscore').attr('value'));
	val--;
	$('#teamawayscore').attr('value', val);
	changeScore(initialConfig.team_away, val);
});

$('#teamhomeplus2').click(function () {
	var val = parseInt($('#teamhomescore').attr('value'));
	val+=2;
	$('#teamhomescore').attr('value', val);
	changeScore(initialConfig.team_home, val);
});

$('#teamawayplus2').click(function () {
	var val = parseInt($('#teamawayscore').attr('value'));
	val+=2;
	$('#teamawayscore').attr('value', val);
	changeScore(initialConfig.team_away, val);
});

$('#teamhomeplus3').click(function () {
	var val = parseInt($('#teamhomescore').attr('value'));
	val+=3;
	$('#teamhomescore').attr('value', val);
	changeScore(initialConfig.team_home, val);
});

$('#teamawayplus3').click(function () {
	var val = parseInt($('#teamawayscore').attr('value'));
	val+=3;
	$('#teamawayscore').attr('value', val);
	changeScore(initialConfig.team_away, val);
});

/**
 * Function to change the score of a team
 * @param  {Strong} scoreTeam Name of the team that scored
 * @param  {Number} newScore  New score of the team
 */
function changeScore (scoreTeam, newScore) {
	var out = {
		score: newScore,
		team: scoreTeam
	};
	socket.emit('update score', out);
}

socket.on('initial game state', function (state) {
	initialConfig = state;
	$('#teamhometitle').text(initialConfig.team_home);
	$('#teamawaytitle').text(initialConfig.team_away);
	$('#teamhomescore').attr('value', initialConfig.team_home_score);
	$('#teamawayscore').attr('value', initialConfig.team_away_score);
});

function updatePageTimeStatus (status) {
	var status;
	if (status === 'start') {
		status = 'Clock Running';
	} else {
		status = 'Clock Stopped';
	}
	$('#timerstatus').text(status);
}
