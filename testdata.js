mapItems.items = [];
mapItems.items.push(mapItems.makeRoad({x:0,y:200,scale:100,rotation:-90}));
mapItems.items.push(mapItems.makeRoad({x:500,y:0,scale:100}));
mapItems.items.push(mapItems.makeRoad({x:570,y:0,scale:100}));
mapItems.items.push(mapItems.makeCar({x:500,y:40,bodyColor:'green',roofColor:'black',scale:1}));
mapItems.items.push(mapItems.makeCar({x:570,y:150,bodyColor:'green',roofColor:'black',scale:1}));

map.mapRefresh();