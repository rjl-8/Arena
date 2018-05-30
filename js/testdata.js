mapItems.items = [];
mapItems.items.push(mapItems.make({type:mapItems.makeRoad,x:0,y:200,scale1:100,rotation:-90}));
mapItems.items.push(mapItems.make({type:mapItems.makeRoad,x:500,y:0,scale1:100}));
mapItems.items.push(mapItems.make({type:mapItems.makeRoad,x:570,y:0,scale1:100}));
mapItems.items.push(mapItems.make({type:mapItems.makeSidewalk,x:470,y:0,scale1:100}));
mapItems.items.push(mapItems.make({type:mapItems.makeSidewalk,x:370,y:0,scale1:100}));
mapItems.items.push(mapItems.make({type:mapItems.makeCar,x:510,y:40,color1:'green',color2:'black',scale1:1}));
mapItems.items.push(mapItems.make({type:mapItems.makeCar,x:580,y:150,color1:'green',color2:'black',scale1:1}));

map.mapRefresh();