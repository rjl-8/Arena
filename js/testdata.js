mapItems.items = [];
mapItems.items.push(mapItems.make({type:'road',x:0,y:200,scale:100,rotation:-90}));
mapItems.items.push(mapItems.make({type:'road',x:500,y:0,scale:100}));
mapItems.items.push(mapItems.make({type:'road',x:570,y:0,scale:100}));
mapItems.items.push(mapItems.make({type:'sidewalk',x:470,y:0,scale:100}));
mapItems.items.push(mapItems.make({type:mapItems.testmakeSidewalk,x:370,y:0,scale:100}));
mapItems.items.push(mapItems.make({type:'car',x:510,y:40,color1:'green',color2:'black',scale:1}));
mapItems.items.push(mapItems.make({type:'car',x:580,y:150,color1:'green',color2:'black',scale:1}));

map.mapRefresh();