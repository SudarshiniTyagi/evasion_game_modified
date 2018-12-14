$(document).ready(function(){
  //input functions
  $("#gameModeInput").change(function() {
    $("#HunterNameInput").val("");
    $("#PreyNameInput").val("");
    if($("#gameModeInput option:selected").val() == "CvH") $("#HunterNameInput").val("COM");
    if($("#gameModeInput option:selected").val() == "HvC") $("#PreyNameInput").val("COM");
  });
  $("input[name='WallCoolDown']").click(function() {
    var tmp = this.value;
    $("#wallCoolDownerror").hide();
    if(tmp == "Fast") $("#wallCoolDownInput").val("10");
    else if(tmp == "Medium") $("#wallCoolDownInput").val("25");
    else if(tmp == "Slow") $("#wallCoolDownInput").val("50");
    else $("#wallCoolDownerror").show();

  });
  $("#wallCoolDownInput").bind('keyup mouseup', function () {
    console.log("changed");
    $("input[name='WallCoolDown'][value='Custom']").prop("checked", true);
    $("#wallCoolDownerror").hide();
    if($("#wallCoolDownInput").val() < 1 || $("#wallCoolDownInput").val() > 100) 
      $("#wallCoolDownerror").show(); 
  });
  $("#wallNumInput").bind('keyup mouseup', function () {
    console.log("wall number changed");
    $("#wallnumbererror").hide();
    if($("#wallNumInput").val() < 2 || $("#wallNumInput").val() > 9) 
      $("#wallnumbererror").show();
  });
$("#wallDelTimeInput").bind('keyup mouseup', function () {
    console.log("wall number changed");
    $("#walldelnumbererror").hide();
    if($("#wallDelTimeInput").val() < 2 || $("#wallDelTimeInput").val() > 20)
        $("#walldelnumbererror").show();
});
  $('#gameScore').val(-1);
});

//init hover
$(document).ready(function(){
  $('[data-toggle="popover"]').popover();
});

//init canvas
$(document).ready(function(){
  $("#time").val(0);
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');

  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, 303, 303);

  ctx.translate(0.5, 0.5);

  ctx.lineCap = "square";

  ctx.fillStyle = "black";
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(301, 0);
  ctx.lineTo(301, 301);
  ctx.lineTo(0, 301);
  ctx.lineTo(0, 0);
  ctx.stroke();
  color = randomColor({
    luminosity: 'bright',
    count: 10
  });
});

var checkData = function(){
  var wallCoolDownValid = ! ($("#wallCoolDownInput").val() < 1 || $("#wallCoolDownInput").val() > 100);
  var wallNumValid = ! ($("#wallNumInput").val() < 2 || $("#wallNumInput").val() > 9);
  var wallDelTime = ! ($("#wallDelTimeInput").val() < 2 || $("#wallDelTimeInput").val() > 20);
  if(wallCoolDownValid && wallNumValid && wallDelTime){
    $("#Setting").modal("hide");
    gameStart();
  }
  else{
    alert("Please check inputs");
  }
}

var gameStart = function(){
  $("#gameMode").text($("#gameModeInput").val());
  $("#HunterName").text($("#HunterNameInput").val());
  $("#PreyName").text($("#PreyNameInput").val());
  $("#wallNum").text($("#wallNumInput").val());
  $("#wallDelTime").text($("#wallDelTimeInput").val());
  $("#wallCoolDown").text($("#wallCoolDownInput").val());
  $("#easyMove").text($("#easyMoveInput").prop("checked") ? "On" : "Off");
  if($("#gameModeInput").val() == "HvH")
    $('#textArea').val("Welcome " + $("#HunterNameInput").val() + ", " + $("#PreyNameInput").val());
  if($("#gameModeInput").val() == "CvH")
    $('#textArea').val("Welcome " + $("#PreyNameInput").val());
  if($("#gameModeInput").val() == "HvC")
    $('#textArea').val("Welcome " + $("#HunterNameInput").val());
  appendText("Game Start!");
  $('#wallArea').empty();
  var gameMode = $("#gameModeInput").val();
  var HunterName = $("#HunterNameInput").val();
  var PreyName = $("#PreyNameInput").val();
  var wallNum = $("#wallNumInput").val();
  var wallDelTime = $("#wallDelTimeInput").val();
  var wallCoolDown = $("#wallCoolDownInput").val();
  var easyMove = $("#easyMoveInput").prop("checked");

  var wallActionH1 = -1;
  var wallActionH2 = -1;

  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');

  $("#gameEnd").val("false");
  var tick = 0;
  var Game = new game(wallNum, wallCoolDown, wallDelTime, gameMode == "CvH");
  var buildWall = false;
  $(document).keydown(function(e) {
    leftpress = false;
    rightpress = false;
    uppress = false;
    downpress = false;
        if(e.which == 83) //HH1 (S)
            wallActionH1 = 0;
        else if(e.which == 65) //VH1 (A)
            wallActionH1 = 1;
        else if(e.which == 76) // HH2 (L)
            wallActionH2 = 0;
        else if(e.which == 75) // VH2 (K)
            wallActionH2 = 1;

        else return; // exit this handler for other keys
    e.preventDefault(); // prevent the default action (scroll / move caret)
  });
  var drawInterval = setInterval(function(){
    console.log($("#gameEnd").val());
    if($("#gameEnd").val() == "false"){
      var hunter1XPos = Game.hunter1Pos.x;
      var hunter1YPos = Game.hunter1Pos.y;
      var hunter1XVel = Game.hunter1XVel;
      var hunter1YVel = Game.hunter1YVel;

      var hunter2XPos = Game.hunter2Pos.x;
      var hunter2YPos = Game.hunter2Pos.y;
      var hunter2XVel = Game.hunter2XVel;
      var hunter2YVel = Game.hunter2YVel;

      min = Math.ceil(-1);
      max = Math.floor(1);

      var prey1XPos = Game.prey1Pos.x;
      var prey1YPos = Game.prey1Pos.y;

      var prey2XPos = Game.prey2Pos.x;
      var prey2YPos = Game.prey2Pos.y;

      var prey3XPos = Game.prey3Pos.x;
      var prey3YPos = Game.prey3Pos.y;

      var Prey1Move = MyPreyMove1(prey1XPos, prey1YPos, Game.hunter1walls.concat(Game.hunter2walls), Game.ticknum, 0);
      var PreyX1Move = Prey1Move[0];
      var PreyY1Move = Prey1Move[1];

      var Prey2Move = MyPreyMove2(prey2XPos, prey2YPos, Game.hunter1walls.concat(Game.hunter2walls), Game.ticknum, 1);
      var PreyX2Move = Prey2Move[0];
      var PreyY2Move = Prey2Move[1];

      var Prey3Move = MyPreyMove3(prey3XPos, prey3YPos, Game.hunter1walls.concat(Game.hunter2walls), Game.ticknum, 2);
      var PreyX3Move = Prey3Move[0];
      var PreyY3Move = Prey3Move[1];

      if(gameMode == "CvH"){
        var hunter1Action = HunterAction(hunter1XPos, hunter1YPos, hunter1XVel, hunter1YVel, prey1XPos, prey1YPos, Game.WallTimer, Game.hunter1walls, wallNum);
        console.log(hunter1Action);
        wallActionH1 = hunter1Action[0];
      }
      if(gameMode == "HvC"){
          var hunter2Action = HunterAction(hunter2XPos, hunter2YPos, hunter2XVel, hunter2YVel, prey1XPos, prey1YPos, Game.WallTimer, Game.hunter2walls, wallNum);
          console.log(hunter2Action);
          wallActionH2 = hunter2Action[0];
      }
      
      var gameEnd = Game.tick(wallActionH1, wallActionH2, PreyX1Move, PreyY1Move, PreyX2Move, PreyY2Move, PreyX3Move, PreyY3Move);
      wallActionH1 = -1;
      wallActionH2 = -1;
      console.log(Game.state());
      //clear board
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, 303, 303);

      ctx.translate(0.5, 0.5);

      ctx.lineCap = "square";

      ctx.strokeStyle = "black";
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(301, 0);
      ctx.lineTo(301, 301);
      ctx.lineTo(0, 301);
      ctx.lineTo(0, 0);
      ctx.stroke();

      //draw hunter1
      ctx.fillStyle = "red";
      ctx.fillRect(Game.hunter1Pos.x, Game.hunter1Pos.y, 3, 3);
      //draw hunter1
      ctx.fillStyle = "blue";
      ctx.fillRect(Game.hunter2Pos.x, Game.hunter2Pos.y, 3, 3);
      //draw prey 1
      if(Game.preysLeftToCatch.indexOf(1) !== -1){
          ctx.fillStyle = "green";
          ctx.fillRect(Game.prey1Pos.x, Game.prey1Pos.y, 3, 3);
      }
      //draw prey 2
      if(Game.preysLeftToCatch.indexOf(2) !== -1) {
          ctx.fillStyle = "green";
          ctx.fillRect(Game.prey2Pos.x, Game.prey2Pos.y, 3, 3);
      }
      //draw prey 3
      if(Game.preysLeftToCatch.indexOf(3) !== -1) {
          ctx.fillStyle = "green";
          ctx.fillRect(Game.prey3Pos.x, Game.prey3Pos.y, 3, 3);
      }
      //draw wall
      for(w in Game.hunter1walls){
        var wall = Game.hunter1walls[w];
        if(wall.type == 0){
          ctx.strokeStyle = color[w];
          ctx.beginPath();
          ctx.moveTo(wall.x1, wall.y);
          ctx.lineTo(wall.x2, wall.y);
          ctx.stroke();
        }
        else if(wall.type == 1){
          ctx.strokeStyle = color[w];
          ctx.beginPath();
          ctx.moveTo(wall.x, wall.y1);
          ctx.lineTo(wall.x, wall.y2);
          ctx.stroke();
        }
      }
      for(w in Game.hunter2walls){
          var wall = Game.hunter2walls[w];
          if(wall.type == 0){
              ctx.strokeStyle = color[w];
              ctx.beginPath();
              ctx.moveTo(wall.x1, wall.y);
              ctx.lineTo(wall.x2, wall.y);
              ctx.stroke();
          }
          else if(wall.type == 1){
              ctx.strokeStyle = color[w];
              ctx.beginPath();
              ctx.moveTo(wall.x, wall.y1);
              ctx.lineTo(wall.x, wall.y2);
              ctx.stroke();
            }
        }
      ctx.translate(-0.5, -0.5);
      if(gameEnd) gameEnd = "end";
      $("#gameEnd").val(gameEnd);
    }else{
      $("#gameScore").val(Game.ticknum);
      clearInterval(drawInterval);
    }
  }, 1000/60);

  console.log("End!");

}

var drawCanvas = function(ctx, text){
  var text = text.split(" ");
  var data = text.map(function (string) {
    return parseInt(string)
  });

  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, 303, 303);

  ctx.translate(0.5, 0.5);

  ctx.lineCap = "square";

  ctx.fillStyle = "black";
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(301, 0);
  ctx.lineTo(301, 301);
  ctx.lineTo(0, 301);
  ctx.lineTo(0, 0);
  ctx.stroke();

  ctx.fillStyle = "red";
  ctx.fillRect(data[0] + 1, data[1] + 1, 1, 1);

  ctx.fillStyle = "green";
  ctx.fillRect(data[2] + 1, data[3] + 1, 1, 1);

  for (var i = 0; i < data[4]; i++) {
    var type = data[5 + i * 4];
    if (type == 0) {
      var y = data[5 + i * 4 + 1] + 1;
      var x0 = data[5 + i * 4 + 2] + 1;
      var x1 = data[5 + i * 4 + 3] + 1;

      ctx.fillStyle = "black";
      ctx.beginPath();
      ctx.moveTo(x0, y);
      ctx.lineTo(x1, y);
      ctx.stroke();
    } else if (type == 1) {
      var x = data[5 + i * 4 + 1] + 1;
      var y0 = data[5 + i * 4 + 2] + 1;
      var y1 = data[5 + i * 4 + 3] + 1;

      ctx.fillStyle = "black";
      ctx.beginPath();
      ctx.moveTo(x, y0);
      ctx.lineTo(x, y1);
      ctx.stroke();
    }
  }

  ctx.translate(-0.5, -0.5);
}

var appendText = function(text){
  $('#textArea').val($('#textArea').val() + "\n" + text);
  $('#textArea').scrollTop($('#textArea')[0].scrollHeight);
}

var wallClicked = function(id){
  console.log("clicked!", id);
  wallDelete = id;
}

var save = function() {
  if ($('#gameScore').val() != -1) {
      $.get('../../../dbman/saveScore.php', {gamename:'Evasion', playername:'H/P', score:$('#gameScore').val()});
      appendText("score saved");
  }
};

