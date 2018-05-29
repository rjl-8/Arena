@{
Page.Title = "Arena";

var debug = "";

var db = Database.Open("GenericDataConnString");

var sql = "";

//var rsBattles = db.Query("SELECT battle_id, battle_name, webchat_id, map_id FROM arena.battles");

//   pull list of existing entry types
//var rsObjects = db.Query("SELECT type, x, y, angle options FROM arena.map_objects WHERE map_id = 1");
}

<script src="/js/general_ajax.js"></script>
<script src="/js/general_util.js"></script>
<!--<script src="/js/web_chat.js"></script>-->

<script src="js/dragFloat.js"></script>

<script src="js/map.js"></script>
<script src="js/map_objects.js"></script>
<script src="js/characters.js"></script>

<script>
var user_id = '@Request["user_id"]';
var battle_id = '@Request["battle_id"]';
console.log('user_id=' + user_id);
console.log('battle_id=' + battle_id);
</script>

<!DOCTYPE html>

<html lang="en">
    <head>
        <meta charset="utf-8" />

        <link rel='stylesheet' type='text/css' href='Site.css'>

        <script type='text/javascript' src='https://code.jquery.com/jquery-3.3.1.js'></script>

        <script>
        </script>
    </head>

    <body>

    <div id='div_map'>
    </div>

    <div id='div_menu' style='cursor: default'>
        <img src='images/hamburger.jpg' onclick='$("#div_menu_items").toggleClass("hidden")'></img>
        <div id='div_menu_items' class='hidden'>
            <div class='menu_item' onclick='$("#div_character").toggleClass("hidden");$("#div_menu_items").toggleClass("hidden")'>Toggle Character View</div>
            <div class='menu_item' onclick='$("#div_mover").toggleClass("hidden");$("#div_menu_items").toggleClass("hidden")'>Toggle Mover View</div>
            <div class='menu_item' onclick='$("#div_turn").toggleClass("hidden");$("#div_menu_items").toggleClass("hidden")'>Toggle Turn View</div>

            <div class='menu_item' onclick='$("#div_dice").toggleClass("hidden")'>
                Toggle Dice View
            </div>
            <div id='div_dice' class='hidden'>
                <select id='sel_dice'>
                </select>

                <button id='btn_rollDice'>Roll</button>

                <div id='div_diceResults'>
                </div>
            </div>
            <div class='menu_item' onclick='$("#div_zoom").toggleClass("hidden")'>
                Zoom
            </div>

            <div id='div_zoom' class='hidden'>
                <select class='menu_item' id='sel_scale' onchange='map.setScale(this.options[this.options.selectedIndex].value)'>
                    <option value='.25'>4x</option>
                    <option value='.5'>2x</option>
                    <option value='1' selected>1x</option>
                    <option value='2'>.5x</option>
                    <option value='4'>.25x</option>
                </select>
            </div>
        </div>
    </div>

    <div id='div_character' class='floaty hidden'>
    something
    </div>

    <div id='div_mover' class='floaty hidden'>
    </div>

    <div id='div_turn' class='floaty hidden'>
    </div>


    </body>
</html>

<script>
//   Init the map
map.mapSetup("div_map", "id_canvas");


function pageinit() {
    // add event listeners
    // *******************

    // do floaty scrolling
    document.getElementById('div_map').addEventListener('scroll', dragFloat.moveFloaty());

    // enable drag and drop
    document.getElementById('div_character').addEventListener('mousedown', dragFloat.mouseDown, false);
    document.getElementById('div_mover').addEventListener('mousedown', dragFloat.mouseDown, false);
    document.getElementById('div_turn').addEventListener('mousedown', dragFloat.mouseDown, false);
//    document.getElementById('div_dice').addEventListener('mousedown', dragFloat.mouseDown, false);
    document.getElementsByTagName('body')[0].addEventListener('mouseup', dragFloat.mouseUp, false);

    // dice roll button
    document.getElementById('btn_rollDice').addEventListener('click', map.rollDice, false);

    // fill number of dice select
    var sel_dice = document.getElementById('sel_dice').options;
    for (var i = 0; i < 30; i ++) {
        var a = document.createElement('option');
        a.text = i + 1;
        a.value = i + 1;
        sel_dice[i] = a;
    }
}

function debug(injunk) {
    console.log(injunk);
    map.setScale(injunk);
}

window.onload = pageinit();
</script>