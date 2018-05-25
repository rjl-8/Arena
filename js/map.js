var map = {

    debug : true,

    Scale : null,
    CanvasName : null,
    canvasObj : null,
    canvasContext : null,
    canvasHeight : 4000,
    canvasWidth : 4000,

    BaseHexSideLen : 30,
    HexSideLen : null,
    HexWidth : null,
    
    prev_x : null, prev_y : null,
    prev_hex_x : null, prev_hex_y : null,

    mapSetup : function (inHomeObjId, inCanvasName)
    {
        var obj_canvas = document.createElement("canvas");
        obj_canvas.setAttribute("id", inCanvasName);
        obj_canvas.setAttribute("width", this.canvasWidth);
        obj_canvas.setAttribute("height", this.canvasHeight);
        obj_canvas.setAttribute("onclick", "map.clickmap()");
        obj_canvas.setAttribute("class", "canvas");
        obj_canvas.style.height = '' + this.canvasHeight + ' px';
        obj_canvas.style.width = '' + this.canvasWidth + ' px';

        document.getElementById(inHomeObjId).appendChild(obj_canvas);

        this.setCanvasName(inCanvasName);
        this.setScale(1);
    },

    setBaseHexSideLen : function (inVal)
    {
        // not sure this will be used
        this.BaseHexSideLen = inVal;
        this.setScale(this.Scale);
    },

    setScale : function (inVal)
    {
        this.Scale = inVal;

        this.HexSideLen = this.BaseHexSideLen * this.Scale;
        this.HexWidth = Math.sqrt(Math.pow(this.HexSideLen + this.HexSideLen * Math.sin(Math.PI/6), 2) + Math.pow(this.HexSideLen * Math.cos(Math.PI/6), 2));

        // dont redraw the previous hex when resetting the scale
        this.prev_hex_x = null;
        this.prev_hex_y = null;

        this.mapRefresh();
    },

    setCanvasName : function (inVal)
    {
        this.CanvasName = inVal;
        this.canvasObj = document.getElementById(this.CanvasName);
        this.canvasContext = this.canvasObj.getContext("2d");
    },

    drawHexMap : function ()
    {
        if (!this.canvasContext)
        {
            return;
        }

        var r = this.HexSideLen;
        var x, y;
        var row, col;
        var cellno;
        x = 0;
        y = 0;
        row = 0;
        cellno = 0;
        while (y < this.canvasHeight)
        {
            x = 0;
            y = row * (r * Math.cos(Math.PI/6) + 0);
            col = 0;
            this.canvasContext.font = "8px verdana";
            while (x < this.canvasWidth)
            {
                x = col * (r + 2 * r * Math.sin(Math.PI/6) + r);
                if (row % 2 != 0)
                {
                    x = x + r + r * Math.sin(Math.PI/6);
                }
                this.drawHex(x, y, {});
//                this.canvasContext.fillText(Math.round(x) + ' ' + Math.round(y), x + r * Math.sin(Math.PI/6), y + this.HexSideLen/3);
                this.canvasContext.fillText(row + ' ' + col, x + r * Math.sin(Math.PI/6), y + this.HexSideLen/3);
                col++;
                cellno++;
            }
            row++;
        }
    },

    drawHex : function (inX, inY, inOpts)
    {
        if (!this.canvasContext)
            return;

        var r = this.HexSideLen;

        if (this.debug && inY < 10 && 1==-1)
        {
            console.log('hex x=' + inX + ' y=' + inY + ' r=' + r);
        }
        //     1________6
        //     /        \
        //    /          \
        //  2/            \5
        //   \            /
        //    \          /
        //     \________/
        //     3         4
        this.canvasContext.beginPath();
        // 1
        this.canvasContext.moveTo(inX + r * Math.sin(Math.PI/6), inY);
        // 2
        this.canvasContext.lineTo(inX, inY + r * Math.cos(Math.PI/6));
        // 3
        this.canvasContext.lineTo(inX + r * Math.sin(Math.PI/6), inY + 2 * r * Math.cos(Math.PI/6));
        // 4
        this.canvasContext.lineTo(inX + r + r * Math.sin(Math.PI/6), inY + 2 * r * Math.cos(Math.PI/6));
        // 5
        this.canvasContext.lineTo(inX + r + 2 * r * Math.sin(Math.PI/6), inY + r * Math.cos(Math.PI/6));
        // 6
        this.canvasContext.lineTo(inX + r + r * Math.sin(Math.PI/6), inY);
        // back to 1
        this.canvasContext.lineTo(inX + r * Math.sin(Math.PI/6), inY);

        // process options
        if (inOpts.color)
            this.canvasContext.strokeStyle = inOpts.color;
        else
            this.canvasContext.strokeStyle = 'black';

        if (inOpts.fill)
            this.canvasContext.fill();
        else
            this.canvasContext.closePath();

        this.canvasContext.stroke();
    },
    
    drawLine : function (inLineObj) {
        if (!this.canvasContext)
            return;

        this.canvasContext.beginPath();
        this.canvasContext.moveTo(inLineObj.x1, inLineObj.y1);
        this.canvasContext.lineTo(inLineObj.x2, inLineObj.y2);
        this.canvasContext.closePath();

        if (inLineObj.color)
            this.canvasContext.strokeStyle = inLineObj.color;
        else
            this.canvasContext.strokeStyle = 'black';

        this.canvasContext.stroke();
    },
    
    clickmap : function ()
    {
        if (!this.canvasContext)
            return;

        var x, hexx, y, hexy;
        var colraw, rowraw;

        // calculate x and col
        x = window.event.x + document.getElementById('div_map').scrollLeft;
        colraw = Math.round(x / (this.HexSideLen + this.HexSideLen * Math.sin(Math.PI/6)) - .5);

        // calculate y and row
        y = window.event.y + document.getElementById('div_map').scrollTop;
        if (colraw % 2 == 0)
        {
            rowraw = Math.round(y / (2 * this.HexSideLen * Math.cos(Math.PI/6)) - .5);
        }
        else
        {
            rowraw = y - this.HexSideLen * Math.cos(Math.PI/6);
            rowraw = Math.round(rowraw / (2 * this.HexSideLen * Math.cos(Math.PI/6)) - .5);
        }

        // calculate the hex x and y based on row and col
        hexx = Math.round(colraw * (this.HexSideLen + this.HexSideLen * Math.sin(Math.PI/6)));
        if (colraw % 2 == 0)
        {
            hexy = Math.round(rowraw * (2 * this.HexSideLen * Math.cos(Math.PI/6)));
        }
        else
        {
            hexy = Math.round(rowraw * (2 * this.HexSideLen * Math.cos(Math.PI/6)) + this.HexSideLen * Math.cos(Math.PI/6));
        }

        // found a square on the map, need to convert to proper hex
        // the square starts from the x of 2 and the y of 1
        // and proceeds to the x of 6 and the y of 4
        // ********************************************************
        //     1________6
        //     /        \
        //    /          \
        //  2/            \5
        //   \            /
        //    \          /
        //     \________/
        //     3         4

        // triangle with 1-2 as a side
        var x1 = hexx + -1 * this.HexSideLen * Math.cos(2*Math.PI/3);
        var x2 = hexx;
        var y1 = hexy;
        var y2 = hexy + this.HexSideLen * Math.cos(Math.PI/6);
        var slope12 = (y1-y2)/(x1-x2);
        var int12 = y2 - slope12 * x2;
        var calcy12 = slope12 * x + int12;
        if (this.debug && 1==-1)
        {
            console.log('x=' + x + ' y=' + y);
            console.log('x1=' + x1 + ' y1=' + y1 + ' x2=' + x2 + ' y2=' + y2);
            console.log('slope12=' + slope12);
            console.log('int12=' + int12);
            console.log('calcy12=' + calcy12);

            this.drawLine({x1:x1, y1:y1, x2:x2, y2:y2, color: 'green'});
        }
        if (y < calcy12)
        {
            colraw--;
            if (colraw % 2 != 0) {
                rowraw--;
            }
        }

        // triangle with 2-3 as a side
        var x3 = x1;
        var y3 = y2 + (y2 - y1);
        var slope23 = (y2-y3)/(x2-x3);
        var int23 = y2 - slope23 * x2;
        var calcy23 = slope23 * x + int23;
        if (this.debug && 1==-1)
        {
            console.log('x=' + x + ' y=' + y);
            console.log('x2=' + x2 + ' y2=' + y2 + ' x3=' + x3 + ' y3=' + y3);
            console.log('slope23=' + slope23);
            console.log('int23=' + int23);
            console.log('calcy23=' + calcy23);
        }
        if (y > calcy23)
        {
            colraw--;
            if (colraw % 2 == 0) {
                rowraw++;
            }
        }

        // calculate the hex x and y based on row and col
        hexx = Math.round(colraw * (this.HexSideLen + this.HexSideLen * Math.sin(Math.PI/6)));
        if (colraw % 2 == 0)
        {
            hexy = Math.round(rowraw * (2 * this.HexSideLen * Math.cos(Math.PI/6)));
        }
        else
        {
            hexy = Math.round(rowraw * (2 * this.HexSideLen * Math.cos(Math.PI/6)) + this.HexSideLen * Math.cos(Math.PI/6));
        }

        if (this.debug && 1==-1)
        {
            console.log('winx=' + window.event.x + ' winy=' + window.event.y);
            console.log('scrollx=' + document.getElementById('div_map').scrollLeft + ' scrolly=' + document.getElementById('div_map').scrollTop);
            console.log('x=' + x + ' y=' + y);
            console.log('hexx=' + hexx + ' hexy=' + hexy);
            console.log('row=' + rowraw + ' col=' + colraw);
        }

        this.drawHex(this.prev_hex_x, this.prev_hex_y, {});
        this.drawHex(hexx, hexy, {'color':'red'});

        // save new x,y as prev values
        this.prev_x = x;
        this.prev_y = y;
        this.prev_hex_x = hexx;
        this.prev_hex_y = hexy;
    
//        drawObject(document.getElementById("id_add_object_type")[document.getElementById("id_add_object_type").selectedIndex].value, x, y, "");
    //    drawNorthFacingCar(x, y, "");
    },

    getHexXY : function (inRow, inCol) {
    },

    mapRefresh : function ()
    {
        if (!this.canvasContext)
        {
            return;
        }

        this.canvasContext.strokeStyle = "white";
        this.canvasContext.fillStyle = "white";
        this.canvasContext.rect(0, 0, this.canvasWidth, this.canvasHeight);
        this.canvasContext.fill();
        this.canvasContext.strokeStyle = "black";
        this.canvasContext.fillStyle = "black";
    
        mapItems.drawItems();
        this.drawHexMap();
    },

    rollDice : function () {
        var results = [];
        var numDice = document.getElementById('sel_dice').options.selectedIndex + 1

        // fill results
        for (var i = 0; i < numDice; i++)
        {
            results[i] = parseInt(Math.random() * 6 + 1);
        }

        // sort results in descending order
        for (var i = 0; i < numDice; i++)
        {
            var max = results[i];
            var maxidx = i;
            for (var j = i; j < numDice; j++)
            {
                if (results[j] > max)
                {
                    max = results[j];
                    maxidx = j;
                }
            }

            if (maxidx != i)
            {
                // use max var for swap
                results[maxidx] = results[i];
                results[i] = max;
            }
        }

        // clear results div
        $('#div_diceResults').html('');

        // build result images in results div
        for (var i = 0; i < numDice; i++)
        {
            var img = document.createElement('img');
            img.src = 'images/dice' + results[i] + '.jpg'
            img.height = '20';
            img.width = '20';
            document.getElementById('div_diceResults').appendChild(img);
        }

        // save the dice results somehow zzz
    }
}