
var MyPreyMove1 = function(preyxpos, preyypos, walls, tick){
    if(tick == 0){
        p1randomMovex = 1;
        p1randomMovey = -1;
    }
    if(preyxpos === 0){
        p1randomMovex = 1;
    }
    if(preyxpos === 299){
        p1randomMovex = -1;
    }
    if(preyypos === 0){
        p1randomMovey = 1;
    }
    if(preyypos === 299){
        p1randomMovey = -1;
    }

    var xhurdles = [];
    var yhurdles = [];
    for(var i = 0; i<walls.length; i++){
        wall = walls[i];
        if(wall.type === 0){
            // HorizontalWall
            wallypos = wall.y;
            yhurdles.push(wallypos)
        }
        if(wall.type === 1){
            // VerticalWall
            wallxpos = wall.x;
            xhurdles.push(wallxpos)
        }
    }

    for(var i = 0; i<xhurdles.length; i++){
        xhurdle = xhurdles[i];
        if(preyxpos + p1randomMovex === xhurdle){
            if (xhurdle > preyxpos){
                p1randomMovex = -1;
            }
            else{
                p1randomMovex = 1;
            }
            break;
        }
    }
    for(var i = 0; i< yhurdles.length; i++){
        yhurdle = yhurdles[i];
        if(preyypos + p1randomMovey === yhurdle){
            if (yhurdle > preyypos){
                p1randomMovey = -1;
            }
            else{
                p1randomMovey = 1;
            }
            break;
        }
    }

    return [p1randomMovex, p1randomMovey];
}

var MyPreyMove2 = function(preyxpos, preyypos, walls, tick){
    if(tick == 0){
        p2randomMovex = 1;
        p2randomMovey = -1;
    }
    if(preyxpos === 0){
        p2randomMovex = 1;
    }
    if(preyxpos === 299){
        p2randomMovex = -1;
    }
    if(preyypos === 0){
        p2randomMovey = 1;
    }
    if(preyypos === 299){
        p2randomMovey = -1;
    }

    var xhurdles = [];
    var yhurdles = [];
    for(var i = 0; i<walls.length; i++){
        wall = walls[i];
        if(wall.type === 0){
            // HorizontalWall
            wallypos = wall.y;
            yhurdles.push(wallypos)
        }
        if(wall.type === 1){
            // VerticalWall
            wallxpos = wall.x;
            xhurdles.push(wallxpos)
        }
    }

    for(var i = 0; i<xhurdles.length; i++){
        xhurdle = xhurdles[i];
        if(preyxpos + p2randomMovex === xhurdle){
            if (xhurdle > preyxpos){
                p2randomMovex = -1;
            }
            else{
                p2randomMovex = 1;
            }
            break;
        }
    }
    for(var i = 0; i< yhurdles.length; i++){
        yhurdle = yhurdles[i];
        if(preyypos + p2randomMovey === yhurdle){
            if (yhurdle > preyypos){
                p2randomMovey = -1;
            }
            else{
                p2randomMovey = 1;
            }
            break;
        }
    }

    return [p2randomMovex, p2randomMovey];
}

var MyPreyMove3 = function(preyxpos, preyypos, walls, tick){
    if(tick == 0){
        p3randomMovex = 1;
        p3randomMovey = -1;
    }
    if(preyxpos === 0){
        p3randomMovex = 1;
    }
    if(preyxpos === 299){
        p3randomMovex = -1;
    }
    if(preyypos === 0){
        p3randomMovey = 1;
    }
    if(preyypos === 299){
        p3randomMovey = -1;
    }

    var xhurdles = [];
    var yhurdles = [];
    for(var i = 0; i<walls.length; i++){
        wall = walls[i];
        if(wall.type === 0){
            // HorizontalWall
            wallypos = wall.y;
            yhurdles.push(wallypos)
        }
        if(wall.type === 1){
            // VerticalWall
            wallxpos = wall.x;
            xhurdles.push(wallxpos)
        }
    }

    for(var i = 0; i<xhurdles.length; i++){
        xhurdle = xhurdles[i];
        if(preyxpos + p3randomMovex === xhurdle){
            if (xhurdle > preyxpos){
                p3randomMovex = -1;
            }
            else{
                p3randomMovex = 1;
            }
            break;
        }
    }
    for(var i = 0; i< yhurdles.length; i++){
        yhurdle = yhurdles[i];
        if(preyypos + p3randomMovey === yhurdle){
            if (yhurdle > preyypos){
                p3randomMovey = -1;
            }
            else{
                p3randomMovey = 1;
            }
            break;
        }
    }

    return [p3randomMovex, p3randomMovey];
}


var dis4 = function(x1, y1, x2, y2){
	return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}