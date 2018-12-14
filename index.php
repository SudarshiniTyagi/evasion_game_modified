<!DOCTYPE html>
<html>
<head>
    <?php $base = "../../" ?>
    <base href="../../">
    <script src="js/jquery-2.2.4.min.js"></script>
    <script src="js/facebox.js"></script>
    <script src="js/gameSettings.js"></script>
    <link rel="stylesheet" type="text/css" href="css/facebox.css"/>
    <link rel="stylesheet" type="text/css" href="css/main.css"/>
    <link rel="stylesheet" type="text/css" href="css/bootstrap.css"/>
    <script type="text/javascript">
        jQuery(document).ready(function($) {
            $('a[rel*=facebox]').facebox()
        })
    </script>
</head>
<body>
<div class="container">
    <?php include $base."header.php"; ?>
    <nav>
        <ul>
        <li><a href="">Home</a></li>
        </ul>
        <?php include $base."leftMenuGame.php"; ?>
    </nav>
    <article>
        <h1 id="gameName">Kiwi Hunting Game</h1>
        <h3 id="groupName">By Kiwi Engine</h3>
        <div class="jumbotron">
        <h3>Instruction:</h3>
        <p>- There are two hunters in this game. Your goal as a hunter is to catch more then half the number of preys before the other hunter by building walls to let yourself bouncing around. The game won't stop until one of the hunter catches more than half the number of preys.</p>
        <h3>Rules of the game:</h3>
        <ul>
            <li><span style="color:red"> Rule #1: </span>The hunter moves as fast as the prey, and it changes direction only by bouncing off a wall, which means you cannot control the moves of it.</li>
            <li><span style="color:red"> Rule #2: </span>The preys, on the other hand, move randomly in whichever direction it wants provided it doesn't pass through a wall.</li>
            <li><span style="color:red"> Rule #3: </span>The hunter catches the preys by building horizontal and vertical walls as its current position to get close to the prey and trap it.</li>
            <li><span style="color:red"> Rule #4: </span>You can specify the number of walls that the hunters can build(N) and the time interval between building consecutive walls(W).</li>
        </div>
        <h3>Leaderboard</h3>
        <div id="scoreArea", class="jumbotron">
            <?php
            include $base."getScore.php";
            /*
            * arg1: gameName, should be the same as the dir name
            * arg2: if your score is sortable, pass 1 if higher score is better, 0
            *       if smaller score is better. Otherwise no need to pass variable
            */
            getScore("Evasion", 0);
            ?>
        </div>
        <h3>Play game in pop up window:<h3>
        <form id="gameSettings" class="well"></form>
        <h4>Screenshot:</h4>
        <img src="games/Evasion/views/screenshot.png" width="100%" heigth="100%"></img>
    </article>
    <?php include $base."footer.php"; ?>
</div>
<script type="text/javascript">
    newWindowBtn(2000,2000,"games/Evasion_sudo/views/index.html",[]);
</script>
</body>
</html>