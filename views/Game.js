function HorizantalWall(y, x1, x2, timeLeft, id){
	this.id = id;
	this.type = 0;
	this.y = parseInt(y);
	this.x1 = parseInt(x1);
	this.x2 = parseInt(x2);
	this.timeLeft = parseInt(timeLeft) * 62;
	this.occupies = function(p){
		return p.y == this.y && p.x >= this.x1 && p.x <= this.x2;
	}
	this.toString = function(){
		return "Horizantal Wall at " + y + " from " + x1 + " to " + x2;
	}
	this.nw = false;//for hunter use
} 

function VerticalWall(x, y1, y2, timeLeft, id){
	this.id = id;
	this.type = 1;
	this.x = parseInt(x);
	this.y1 = parseInt(y1);
	this.y2 = parseInt(y2);
    this.timeLeft = parseInt(timeLeft)*62;
	this.occupies = function(p){
		return p.x == this.x && p.y >= this.y1 && p.y <= this.y2;
	}
	this.toString = function(){
    	return "Vertical Wall at " + x + " from " + y1 + " to " + y2;
    }
    this.nw = false;//for hunter use
} 

function Point(x, y){
	this.x = parseInt(x);
	this.y = parseInt(y);

	this.equals = function(p){
		return this.x == p.x && this.y == p.y;
	}
}

function game(wallNum, wallCoolDown, wallDeleteTime, isCom){
	this.ticknum = 0;
	this.maxWalls = parseInt(wallNum);
	this.wallPlacementDelay = parseInt(wallCoolDown);
	this.wallDeleteTime = parseInt(wallDeleteTime);
	this.preysLeftToCatch = [1, 2, 3];

	this.wallTimerH1 = 0;
	this.wallTimerH2 = 0;

	this.hunter1Pos = new Point(0, 0);
	this.prevhunter1Pos = new Point(0, 0);
	this.hunter1XVel = 1;
	this.hunter1YVel = 1;
	this.hunter1Caught = [];

    this.hunter2Pos = new Point(299, 299);
    this.prevhunter2Pos = new Point(0, 0);
    this.hunter2XVel = 1;
    this.hunter2YVel = 1;
    this.hunter2Caught = [];

	this.prey1Pos = new Point(Math.floor(Math.random()*300), Math.floor(Math.random()*300));
	this.prey1XVel = 0;
	this.prey1YVel = 0;

    this.prey2Pos = new Point(Math.floor(Math.random()*300), Math.floor(Math.random()*300));
    this.prey2XVel = 0;
    this.prey2YVel = 0;

    this.prey3Pos = new Point(Math.floor(Math.random()*300), Math.floor(Math.random()*300));
    this.prey3XVel = 0;
    this.prey3YVel = 0;


	this.hunter1walls = new Array();
	this.hunter2walls = new Array();
	this.isCom = isCom;


	this.state = function(){
		var s =  "ticknum = " + this.ticknum 
				+ ", wallTimer = " + this.wallTimer
				+ ", hunter1Pos = " + this.hunter1Pos.x + ", " + this.hunter1Pos.y
				+ ", hunter1XVel = " + this.hunter1XVel
				+ ", hunter1YVel = " + this.hunter1YVel
                + ", hunter2Pos = " + this.hunter2Pos.x + ", " + this.hunter2Pos.y
                + ", hunter2XVel = " + this.hunter2XVel
                + ", hunter2YVel = " + this.hunter2YVel
				+ "\nprey1Pos = " + this.prey1Pos.x + ", " + this.prey1Pos.y
				+ ", prey1XVel = " + this.prey1XVel
				+ ", prey1YVel = " + this.prey1YVel
                + ", prey2Pos = " + this.prey2Pos.x + ", " + this.prey2Pos.y
                + ", prey2XVel = " + this.prey2XVel
                + ", prey2YVel = " + this.prey2YVel
                + ", prey3Pos = " + this.prey3Pos.x + ", " + this.prey3Pos.y
                + ", prey3XVel = " + this.prey3XVel
                + ", prey3YVel = " + this.prey3YVel
				+ "\nhunter1walls:" ;
		for(w in this.hunter1walls){
			s = s + "\n\t" + this.hunter1walls[w].toString();
		}
		s = ", hunter2walls:";
        for(w in this.hunter2walls){
            s = s + "\n\t" + this.hunter2walls[w].toString();
        }
		return s;
	}

	this.isOccupiedH1 = function(p) {
	    if(p.x < 0 || p.x >= 300 || p.y < 0 || p.y >= 300){
	      return true;
	    }
	    for(wall in this.hunter1walls){
		    if(this.hunter1walls[wall].occupies(p)){
		        return true;
		    }
	    }
	    return false;
	}

    this.isOccupiedH2 = function(p) {
        if(p.x < 0 || p.x >= 300 || p.y < 0 || p.y >= 300){
            return true;
        }
        for(wall in this.hunter2walls){
            if(this.hunter2walls[wall].occupies(p)){
                return true;
            }
        }
        return false;
    }

	this.addWallHunter1 = function(wall){
	    if(this.wallTimerH1 <= 0){
	    	for(var i = 0; i < this.maxWalls; i++){
	    		if(!(i in this.hunter1walls)){
	    			wall.id = i;
	    			this.hunter1walls[i] = wall;
	    			this.wallTimerH1 = this.wallPlacementDelay;
	    			appendText("Add a " + wall.toString());
	    			appendWall(i);
	    			return true;
	    		}
	    	}
	    	if(!this.isCom) appendText("Max Wall Reached Please Deleted a Wall");
	    }
	    else{
	    	if(!this.isCom) appendText("Too Soon to Build Another Wall! Pls wait " + this.wallTimer);
	    }
    	return false;
	}

    this.addWallHunter2 = function(wall){
        if(this.wallTimerH2 <= 0){
            for(var i = 0; i < this.maxWalls; i++){
                if(!(i in this.hunter2walls)){
                    wall.id = i;
                    this.hunter2walls[i] = wall;

                    var lala = this.hunter2walls[i];
                    console.log(lala.id);
                    this.wallTimerH2 = this.wallPlacementDelay;
                    appendText("Add a " + wall.toString());
                    appendWall(i);
                    return true;
                }
            }
            if(!this.isCom) appendText("Max Wall Reached Please Deleted a Wall");
        }
        else{
            if(!this.isCom) appendText("Too Soon to Build Another Wall! Pls wait " + this.wallTimer);
        }
        return false;
    }

	this.removeWallH1 = function(){
	    if(this.hunter1walls.length !== 0){
	        var wall = this.hunter1walls[0]
            if (wall.timeLeft === 0){
                this.hunter1walls.splice(0, 1);
                // delete this.hunter1walls[0];
                $("#wall_" + wall.id).remove();
                appendText("Deleted Wall id " + wall.id);
            }
        }

        for(var i = 0; i<this.hunter1walls.length; i++){
            this.hunter1walls[i].timeLeft = this.hunter1walls[i].timeLeft - 1;
        }
	}

    this.removeWallH2 = function(){
        if(this.hunter2walls.length !== 0){
            var wall = this.hunter2walls[0]
            if (wall.timeLeft === 0){
                this.hunter2walls.splice(0, 1);
                // delete this.hunter2walls[0]
                $("#wall_" + wall.id).remove();
                appendText("Deleted Wall id " + wall.id);
            }
        }

        for(var i = 0; i<this.hunter2walls.length; i++){
            this.hunter2walls[i].timeLeft = this.hunter2walls[i].timeLeft - 1;
        }
    }

	this.buildWallH1 = function(type){
		if(type == 0){//horizontal
			var greater = new Point(this.prevhunter1Pos.x, this.prevhunter1Pos.y);
			var lesser = new Point(this.prevhunter1Pos.x, this.prevhunter1Pos.y);
			while(!this.isOccupiedH1(greater) && !this.isOccupiedH2(greater)){
				if(greater.equals(this.hunter1Pos) || greater.equals(this.prey1Pos) || greater.equals(this.prey2Pos) || greater.equals(this.prey3Pos))
					return false;
				greater.x++;
			}
			while(!this.isOccupiedH1(lesser) && !this.isOccupiedH2(lesser)){
				if(lesser.equals(this.hunter1Pos) || lesser.equals(this.prey1Pos) || lesser.equals(this.prey2Pos) || lesser.equals(this.prey3Pos))
					return false;
				lesser.x--;
			}
			return this.addWallHunter1(new HorizantalWall(this.hunter1Pos.y, lesser.x + 1, greater.x - 1, this.wallDeleteTime));
		}
		if(type == 1){//vertical
			var greater = new Point(this.prevhunter1Pos.x, this.prevhunter1Pos.y);
			var lesser = new Point(this.prevhunter1Pos.x, this.prevhunter1Pos.y);
			while(!this.isOccupiedH1(greater) && !this.isOccupiedH2(greater)){
				if(greater.equals(this.hunter1Pos) || greater.equals(this.prey1Pos) || greater.equals(this.prey2Pos) || greater.equals(this.prey3Pos))
					return false;
				greater.y++;
			}
			while(!this.isOccupiedH1(lesser) && !this.isOccupiedH2(lesser)){
				if(lesser.equals(this.hunter1Pos) || lesser.equals(this.prey1Pos) || lesser.equals(this.prey2Pos) || lesser.equals(this.prey3Pos))
					return false;
				lesser.y--;
			}
			return this.addWallHunter1(new VerticalWall(this.hunter1Pos.x, lesser.y + 1, greater.y - 1, this.wallDeleteTime));
		}
		return false;
	}

    this.buildWallH2 = function(type){
        if(type == 0){//horizontal
            var greater = new Point(this.prevhunter2Pos.x, this.prevhunter2Pos.y);
            var lesser = new Point(this.prevhunter2Pos.x, this.prevhunter2Pos.y);
            while(!this.isOccupiedH1(greater) && !this.isOccupiedH2(greater)){
                if(greater.equals(this.hunter2Pos) || greater.equals(this.prey2Pos))
                    return false;
                greater.x++;
            }
            while(!this.isOccupiedH1(lesser) && !this.isOccupiedH2(lesser)){
                if(lesser.equals(this.hunter2Pos) || lesser.equals(this.prey2Pos))
                    return false;
                lesser.x--;
            }
            return this.addWallHunter2(new HorizantalWall(this.hunter2Pos.y, lesser.x + 1, greater.x - 1, this.wallDeleteTime));
        }
        if(type == 1){//vertical
            var greater = new Point(this.prevhunter2Pos.x, this.prevhunter2Pos.y);
            var lesser = new Point(this.prevhunter2Pos.x, this.prevhunter2Pos.y);
            while(!this.isOccupiedH1(greater) && !this.isOccupiedH2(greater)){
                if(greater.equals(this.hunter2Pos) || greater.equals(this.prey2Pos))
                    return false;
                greater.y++;
            }
            while(!this.isOccupiedH1(lesser) && !this.isOccupiedH2(lesser)){
                if(lesser.equals(this.hunter2Pos) || lesser.equals(this.prey2Pos))
                    return false;
                lesser.y--;
            }
            return this.addWallHunter2(new VerticalWall(this.hunter2Pos.x, lesser.y + 1, greater.y - 1, this.wallDeleteTime));
        }
        return false;
    }

	this.canPreyMove = function(){
	    return (this.ticknum % 2) != 0;
	}

	this.captured = function(hunterPos, preyPos){
		if(dis(hunterPos, preyPos) < 4.0){
			var points = pointsBetween(hunterPos, preyPos);
			for(pt in points){
			    if(this.isOccupiedH1(pt) || this.isOccupiedH2(pt)){
			        return false;
			    }
		    }

		    return true;
		}
		return false;
	}

	this.checkCaptured = function () {
        if (this.preysLeftToCatch.indexOf(1) !== -1 && this.captured(this.hunter1Pos, this.prey1Pos)){
            this.hunter1Caught.push(1);
            var todeleteindex1 = this.preysLeftToCatch.indexOf(1);
            this.preysLeftToCatch.splice(todeleteindex1, 1);
            appendText("Prey 1 Captured by Hunter 1!!");
        }
        if (this.preysLeftToCatch.indexOf(2) !== -1 && this.captured(this.hunter1Pos, this.prey2Pos)){
            this.hunter1Caught.push(2);
            var todeleteindex2 = this.preysLeftToCatch.indexOf(2);
            this.preysLeftToCatch.splice(todeleteindex2, 1);
            appendText("Prey 2 Captured by Hunter 1!!");
        }
        if (this.preysLeftToCatch.indexOf(3) !== -1 && this.captured(this.hunter1Pos, this.prey3Pos)){
            this.hunter1Caught.push(3);
            var todeleteindex3 = this.preysLeftToCatch.indexOf(3);
            this.preysLeftToCatch.splice(todeleteindex3, 1);
            appendText("Prey 3 Captured by Hunter 1!!");
        }
        if (this.preysLeftToCatch.indexOf(1) !== -1 && this.captured(this.hunter2Pos, this.prey1Pos)){
            this.hunter2Caught.push(1);
            var todeleteindex4 = this.preysLeftToCatch.indexOf(1);
            this.preysLeftToCatch.splice(todeleteindex4, 1);
            appendText("Prey 1 Captured by Hunter 2!!");
        }
        if (this.preysLeftToCatch.indexOf(2) !== -1 && this.captured(this.hunter2Pos, this.prey2Pos)){
            this.hunter2Caught.push(2);
            var todeleteindex5 = this.preysLeftToCatch.indexOf(2);
            this.preysLeftToCatch.splice(todeleteindex5, 1);
            appendText("Prey 2 Captured by Hunter 2!!");
        }
        if (this.preysLeftToCatch.indexOf(3) !== -1 && this.captured(this.hunter2Pos, this.prey3Pos)){
            this.hunter2Caught.push(3);
            var todeleteindex6 = this.preysLeftToCatch.indexOf(3);
            this.preysLeftToCatch.splice(todeleteindex6, 1);
            appendText("Prey 3 Captured by Hunter 2!!");
        }
    }

	this.moveH2 = function(){
		var tmpXVel = this.hunter2XVel;
		var tmpYVel = this.hunter2YVel;

	    var target = pointadd(this.hunter2Pos, tmpXVel, tmpYVel);
	    if(!this.isOccupiedH1(target) && !this.isOccupiedH2(target)){
			this.hunter2Pos = target;
	    } 
	    else {
	    	if(tmpXVel == 0 || tmpYVel == 0){
	    		if(tmpXVel == 0)
	    			this.hunter2YVel = -tmpYVel;
	    		else
	    			this.hunter2XVel = -tmpXVel;
	    	}
	    	else{
	    		var oneRight = this.isOccupiedH1(pointadd(this.hunter2Pos, tmpXVel, 0)) || this.isOccupiedH2(pointadd(this.hunter2Pos, tmpXVel, 0));
	    		var oneUp = this.isOccupiedH1(pointadd(this.hunter2Pos, 0, tmpYVel)) || this.isOccupiedH2(pointadd(this.hunter2Pos, 0, tmpYVel));
	    		if(oneRight && oneUp){
	    			this.hunter2XVel = -tmpXVel;
	    			this.hunter2YVel = -tmpYVel;
	    		}
	    		else if(oneRight){
	    			this.hunter2XVel = -tmpXVel;
	    			this.hunter2Pos.y = target.y;
	    		}
	    		else if(oneUp){
	    			this.hunter2YVel = -tmpYVel;
	    			this.hunter2Pos.x = target.x;
	    		}
	    		else{
	    			var twoUpOneRight = this.isOccupiedH1(pointadd(this.hunter2Pos, tmpXVel, tmpYVel * 2)) || this.isOccupiedH2(pointadd(this.hunter2Pos, tmpXVel, tmpYVel * 2));
	    			var oneUpTwoRight = this.isOccupiedH1(pointadd(this.hunter2Pos, tmpXVel * 2, tmpYVel)) || this.isOccupiedH1(pointadd(this.hunter2Pos, tmpXVel * 2, tmpYVel));
	    			if((twoUpOneRight && oneUpTwoRight) || (!twoUpOneRight && ! oneUpTwoRight)){
	    				this.hunter2XVel = -tmpXVel;
	    				this.hunter2YVel = -tmpYVel;
	    			}
	    			else if(twoUpOneRight){
	    				this.hunter2XVel = -tmpXVel;
	    				this.hunter2Pos.y = target.y;
	    			}
	    			else{
	    				this.hunter2YVel = -tmpYVel;
	    				this.hunter2Pos.x = target.x;
	    			}
	    		}
	    	}
    	}
    }

    this.moveH1 = function(){
        var tmpXVel = this.hunter1XVel;
        var tmpYVel = this.hunter1YVel;

        var target = pointadd(this.hunter1Pos, tmpXVel, tmpYVel);
        if(!this.isOccupiedH1(target) && !this.isOccupiedH2(target)){
            this.hunter1Pos = target;
        }
        else {
            if(tmpXVel == 0 || tmpYVel == 0){
                if(tmpXVel == 0)
                    this.hunter1YVel = -tmpYVel;
                else
                    this.hunter1XVel = -tmpXVel;
            }
            else{
                var oneRight = this.isOccupiedH1(pointadd(this.hunter1Pos, tmpXVel, 0)) || this.isOccupiedH2(pointadd(this.hunter1Pos, tmpXVel, 0));
                var oneUp = this.isOccupiedH1(pointadd(this.hunter1Pos, 0, tmpYVel)) || this.isOccupiedH2(pointadd(this.hunter1Pos, 0, tmpYVel));
                if(oneRight && oneUp){
                    this.hunter1XVel = -tmpXVel;
                    this.hunter1YVel = -tmpYVel;
                }
                else if(oneRight){
                    this.hunter1XVel = -tmpXVel;
                    this.hunter1Pos.y = target.y;
                }
                else if(oneUp){
                    this.hunter1YVel = -tmpYVel;
                    this.hunter1Pos.x = target.x;
                }
                else{
                    var twoUpOneRight = this.isOccupiedH1(pointadd(this.hunter1Pos, tmpXVel, tmpYVel * 2)) || this.isOccupiedH2(pointadd(this.hunter1Pos, tmpXVel, tmpYVel * 2));
                    var oneUpTwoRight = this.isOccupiedH1(pointadd(this.hunter1Pos, tmpXVel * 2, tmpYVel)) || this.isOccupiedH2(pointadd(this.hunter1Pos, tmpXVel * 2, tmpYVel));
                    if((twoUpOneRight && oneUpTwoRight) || (!twoUpOneRight && ! oneUpTwoRight)){
                        this.hunter1XVel = -tmpXVel;
                        this.hunter1YVel = -tmpYVel;
                    }
                    else if(twoUpOneRight){
                        this.hunter1XVel = -tmpXVel;
                        this.hunter1Pos.y = target.y;
                    }
                    else{
                        this.hunter1YVel = -tmpYVel;
                        this.hunter1Pos.x = target.x;
                    }
                }
            }
        }
    }

    this.isGameOver = function(){
        if (this.hunter1Caught.length === 2 || this.hunter2Caught.length === 2){
            if (this.hunter1Caught.length > this.hunter2Caught.length){
                appendText("Hunter 1 Wins!!\nGame End!\nTime: "+this.ticknum);
            }
            else if(this.hunter2Caught.length > this.hunter1Caught.length){
                appendText("Hunter 2 Wins!!\nGame End!\nTime: "+this.ticknum);
            }
            else {
                appendText("SOME FUCK UP HAPPENED");
            }

            return true;

        }
        else{
            return false
        }
    }

    this.tick = function(wallActionH1, wallActionH2, prey1XMove, prey1YMove, prey2XMove, prey2YMove, prey3XMove, prey3YMove){
    	// console.log("wallAction = " , wallAction, "wallDelete = " , wallDelete, "preyXMove = " , preyXMove, "preyYMove = " , preyYMove);
    	this.prevhunter1Pos = new Point(this.hunter1Pos.x, this.hunter1Pos.y);
    	this.prevhunter2Pos = new Point(this.hunter2Pos.x, this.hunter2Pos.y);
    	this.moveH1();
    	this.moveH2();
    	this.buildWallH1(wallActionH1);
    	this.buildWallH2(wallActionH2);
        this.removeWallH1();
        this.removeWallH2();
    	prey1NewPoint = new Point(this.prey1Pos.x + prey1XMove, this.prey1Pos.y + prey1YMove)
    	prey2NewPoint = new Point(this.prey2Pos.x + prey2XMove, this.prey2Pos.y + prey2YMove)
    	prey3NewPoint = new Point(this.prey3Pos.x + prey3XMove, this.prey3Pos.y + prey3YMove)
        if(!this.isOccupiedH1(prey1NewPoint) && !this.isOccupiedH2(prey1NewPoint)){
            this.prey1Pos = prey1NewPoint
        }
        if(!this.isOccupiedH1(prey2NewPoint) && !this.isOccupiedH2(prey2NewPoint)){
            this.prey2Pos = prey2NewPoint
        }
        if(!this.isOccupiedH1(prey3NewPoint) && !this.isOccupiedH2(prey3NewPoint)){
            this.prey3Pos = prey3NewPoint
        }

    	this.ticknum++;
    	if(this.wallTimerH1 > 0) this.wallTimerH1 = this.wallTimerH1 - 1;
    	if(this.wallTimerH2 > 0) this.wallTimerH2 = this.wallTimerH2 - 1;
    	this.checkCaptured();
    	return this.isGameOver();
    }
}

var pointadd = function(p, dx, dy){
	return new Point(p.x + dx, p.y + dy);
}

var dis = function(p1, p2){
	return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}

var pointsBetween = function(p0, p1){

	var x0 = p0.x;
	var x1 = p1.x;
	var y0 = p0.y;
	var y1 = p1.y;

	var points = [];

	var steep = Math.abs(y1-y0) > Math.abs(x1-x0);

	if(steep){
		var tx0 = x0;
		x0 = y0;
		y0 = tx0;

		var tx1 = x1;
		x1 = y1;
		y1 = tx1;
	}
	if(x0 > x1){
		var tx0 = x0;
		x0 = x1;
		x1 = tx0;

		var ty0 = y0;
		y0 = y1;
		y1 = ty0;
	}

	var deltax = x1-x0;
	var deltay = Math.abs(y1-y0);
	var error = deltax / 2;
	var y = y0;
	var ystep;
	if(y0 < y1){
		ystep = 1;
	} else {
		ystep = -1;
	}

	for(var x = x0; x <= x1; x++){
		if(steep){
			points.push(new Point(y,x));
		} else {
			points.push(new Point(x,y));
		}
		error -= deltay;
		if(error < 0){
			y += ystep;
			error += deltax;
		}
	}
	return points;
}

var appendWall = function(id){
	$("#wallArea").append('<li class="list-group-item" onclick="wallClicked(' + id + ')" id = "wall_' + id + 
		'" style="background-color:' + color[id]
		+ '; font-weight:bold; font-size:1.5em">' + id + '</li>');
}




