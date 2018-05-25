var mapItems = {
    items : [],
    characters : [],

    curIdx : 0,

    mapObject : function() {
        this.sortIdx = mapItems.curIdx++;
        this.startX = null;
        this.startY = null;

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

    // makeCar
    makeCar : function(inOpts) {
        var retObj = new mapItems.mapObject();

        if (!inOpts.x || !inOpts.y)
        {
            return null;
        }

        // a "standard unit" for the length of the car
        var stdbody = 3;

        var scale = inOpts.scale;
        if (!scale)
        {
            scale = 1;
        }

        var rotation = inOpts.rotation;
        if (!rotation)
        {
            rotation = 0;
        }

        retObj.startX = inOpts.x;
        retObj.startY = inOpts.y;

        var linePath = [];
        linePath[0] = {x:0,y:0,fill:true,color:inOpts.bodyColor};
        linePath[1] = {x:0,y:3*scale};
        linePath[2] = {x:1*scale,y:3*scale};
        linePath[3] = {x:1*scale,y:0};
        linePath[4] = {x:0,y:0};
        retObj.linePaths[0] = linePath;

        linePath = [];
        linePath[0] = {x:0,y:1*scale,fill:true,color:inOpts.roofColor};
        linePath[1] = {x:0,y:2*scale};
        linePath[2] = {x:1*scale,y:2*scale};
        linePath[3] = {x:1*scale,y:1*scale};
        linePath[4] = {x:0,y:1*scale};
        retObj.linePaths[1] = linePath;

        retObj = mapItems.rotateObject(retObj, rotation);

        return retObj;
    },

    // makeRoad
    makeRoad : function(inOpts) {
        var retObj = new mapItems.mapObject();

        if (inOpts.x == null || inOpts.y == null)
        {
            return null;
        }

        // a "standard unit" for the length of the car
        var stdlane = 1;

        var scale = inOpts.scale;
        if (!scale)
        {
            scale = 1;
        }

        var rotation = inOpts.rotation;
        if (!rotation)
        {
            rotation = 0;
        }

        retObj.startX = inOpts.x;
        retObj.startY = inOpts.y;

        var linePath = [];
        linePath[0] = {x:0,y:0,fill:true,color:'gray'};
        linePath[1] = {x:0,y:scale};
        linePath[2] = {x:2*stdlane,y:scale};
        linePath[3] = {x:2*stdlane,y:0};
        linePath[4] = {x:0,y:0};
        retObj.linePaths[0] = linePath;

        linePath = [];
        var marker = .1
        linePath[0] = {x:stdlane - marker/2,y:0,fill:true,color:'white'};
        linePath[1] = {x:stdlane - marker/2,y:scale};
        linePath[2] = {x:stdlane + marker/2,y:scale};
        linePath[3] = {x:stdlane + marker/2,y:0};
        linePath[4] = {x:stdlane - marker/2,y:0};
        retObj.linePaths[1] = linePath;

        retObj = mapItems.rotateObject(retObj, rotation);

        return retObj;
    }

    // makeBuilding
    // makeSidewalk

}
