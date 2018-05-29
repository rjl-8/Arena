var mapItems = {
    items : [],
    characters : [],

    curIdx : 0,

    mapObject : function() {
        this.sortIdx = mapItems.curIdx++;
        this.startX = null;
        this.startY = null;

        this.origStartX = null;
        this.origStartY = null;

        this.owner = 'admin';

        // x/y values are factors multiplied by hexlength + startX/Y
        // default (null) color = black
        // array of arrays - multiple line paths with each path having multiple points
        // only fill and color count on first element of path array
        // sample (triangle filled)
        //      path:[
        //               {x:0,y:0,fill:true,color:green}
        //              ,{x:0,y:1}
        //              ,{x:1,y:1}
        //              ,{x:0,y:0}
        //           ]
        this.linePaths = new Array();
        // array of arc settings
        // cc = counterclockwise
        this.arcs = new Array(); // sample {x:0,y:0,r:1,begAngle:0,endAngle:Math.PI,cc:false,fill:null,color:null}
    },
    
    rotateObject : function(inObj, theta) {
        var retObj = inObj;

        theta = (Math.PI/2)/90*theta;

        // rotate linePaths
        for (var i = 0; i < inObj.linePaths.length; i++)
        {
            for (var j = 0; j < inObj.linePaths[i].length; j++)
            {
                var x1 = inObj.linePaths[i][j].x;
                var y1 = inObj.linePaths[i][j].y;
                var r = Math.sqrt(x1*x1 + y1*y1);
                var alpha = Math.atan(y1/x1);

                var x2 = r * Math.cos(alpha + theta);
                var y2 = r * Math.sin(alpha + theta);
                if (isNaN(x2))
                {
                    x2 = 0;
                }
                if (isNaN(y2))
                {
                    y2 = 0;
                }
                retObj.linePaths[i][j].x = x2;
                retObj.linePaths[i][j].y = y2;
            }
        }

        // rotate arcs zzz??

        return retObj;
    },

    drawObject : function(inObj) {
        // scaling starting position
        if (!inObj.origStartX) {
            inObj.origStartX = inObj.startX;
            inObj.origStartY = inObj.startY;
        }
        console.log('startX=' + inObj.startX + ' startY=' + inObj.startY)
        inObj.startX = inObj.origStartX / map.Scale;
        inObj.startY = inObj.origStartY / map.Scale;
        console.log('startX=' + inObj.startX + ' startY=' + inObj.startY)

        // line paths
        for (var i = 0; i < inObj.linePaths.length; i++)
        {
            map.canvasContext.beginPath();
            map.canvasContext.moveTo(inObj.startX + inObj.linePaths[i][0].x * map.HexSideLen, inObj.startY + inObj.linePaths[i][0].y * map.HexSideLen);
            for (var j = 1; j < inObj.linePaths[i].length; j++)
            {
                map.canvasContext.lineTo(inObj.startX + inObj.linePaths[i][j].x * map.HexSideLen, inObj.startY + inObj.linePaths[i][j].y * map.HexSideLen);
            }
            // process options
            if (inObj.linePaths[i][0].color)
                map.canvasContext.fillStyle = inObj.linePaths[i][0].color;
            else
                map.canvasContext.fillStyle = 'black';

            if (inObj.linePaths[i][0].fill)
                map.canvasContext.fill();
            else
                map.canvasContext.closePath();

            map.canvasContext.stroke();
        }

        // arcs
        for (var i = 0; i < inObj.arcs.length; i++)
        {
            var x = inObj.startX + inObj.arcs[i].x * map.HexSideLen;
            var y = inObj.startY + inObj.arcs[i].y * map.HexSideLen;
            var r = inObj.arcs[i].r * map.HexSideLen;
            map.canvasContext.arc(x, y, r, inObj.arcs[i].begAngle, inObj.arcs[i].endAngle, inObj.arcs[i].cc);

            // process options
            if (inObj.arcs[i].color)
                map.canvasContext.strokeStyle = inObj.arcs[i].color;
            else
                map.canvasContext.strokeStyle = 'black';

            if (inObj.arcs[i].fill)
                map.canvasContext.fill();
            else
                map.canvasContext.stroke();
        }
    },

    drawItems : function() {
        for (var i = 0; i < mapItems.items.length; i++)
        {
            mapItems.drawObject(mapItems.items[i]);
        }
    },

    // item "constructors"
    // *******************
    make : function(inOpts) {
        var retObj = new mapItems.mapObject();

        if (!inOpts.x || !inOpts.y || !inOpts.type) {
            console.log('mapItem options not specified correctly')
            console.log(inOpts);
            return null;
        }
        
        if (!inOpts.scale) {
            inOpts.scale = 1;
        }

        if (!inOpts.rotation) {
            inOpts.rotation = 0;
        }

        retObj.startX = inOpts.x;
        retObj.startY = inOpts.y;
        retObj.origStartX = inOpts.x;
        retObj.origStartY = inOpts.y;

        if (inOpts.type == 'car') {
            retObj = mapItems.makeCar(inOpts, retObj);
        }
        else if (inOpts.type == 'road') {
            retObj = mapItems.makeRoad(inOpts, retObj);
        }

        retObj = mapItems.rotateObject(retObj, inOpts.rotation);
        
        return retObj;
    },

    makeRect : function(x1, y1, x2, y2) {
        var linePath = [];
        linePath[0] = {x:x1,y:y1};
        linePath[1] = {x:x1,y:y2};
        linePath[2] = {x:x2,y:y2};
        linePath[3] = {x:x2,y:y1};
        linePath[4] = {x:x1,y:y1};

        return linePath;
    },

    // makeCar
    makeCar : function(inOpts, inObj) {
        // default colors
        // "body" color
        if (!inOpts.color1) {
            inOpts.color1 = 'blue';
        }
        // "roof" color
        if (!inOpts.color2) {
            inOpts.color2 = 'black';
        }

        inObj.linePaths[0] = mapItems.makeRect(0, 0, 1*inOpts.scale, 3*inOpts.scale);
        inObj.linePaths[0][0].fill = true;
        inObj.linePaths[0][0].color = inOpts.color1;
        inObj.linePaths[1] = mapItems.makeRect(0, 1*inOpts.scale, 1*inOpts.scale, 2*inOpts.scale);
        inObj.linePaths[1][0].fill = true;
        inObj.linePaths[1][0].color = inOpts.color2;

        return inObj;
    },

    // makeRoad
    makeRoad : function(inOpts, inObj) {
        // a "standard unit" for the width of a car
        var stdlane = 1.4;
        var marker = .1

        inObj.linePaths[0] = mapItems.makeRect(0, 0, 2*stdlane, inOpts.scale);
        inObj.linePaths[0][0].fill = true;
        inObj.linePaths[0][0].color = 'gray';
        inObj.linePaths[1] = mapItems.makeRect(stdlane - marker/2, 0, stdlane + marker/2, inOpts.scale);
        inObj.linePaths[1][0].fill = true;
        inObj.linePaths[1][0].color = 'white';

        return inObj;
    }

    // makeBuilding
    // makeSidewalk

}
