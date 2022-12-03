//  --- UAV Early Forest Fire Prediction Project ---
//  --------------------------------------------------------------------
//  This file contains the code about GIS Analysis of our program.
//  Import this file on: Google Earth Engine.
//  This specific area (polygon) is located in Eretria, Euboea Greece.

//  After run, enable only the Layers:
//  - Layer 3
//  - Geometry [black]: polygon

//  From this script, we'll obtain:
//  The coordinates from our polygon in order to pass it after on GeoGebra of extended analysis.
//  The graphic idea about the drone's range in our area of interest.
//  Also, we are testing the Mean Elevation of this area. We'd like to have as much as possible ->(0).
//  Last but not least, we are able to see the area of the polygon.

// ---------------------------------------------------------------------
var polygon =
    /* color: #98ff00 */
    /* shown: false */
    ee.Geometry.Polygon([
      [
        [23.800966156784177, 38.385898843453276],
        [23.800946040216566, 38.385898843453276],
        [23.800919218126417, 38.385891484914204],
        [23.800915194812895, 38.38586415319112],
        [23.80090178376782, 38.38583156535393],
        [23.80088166720021, 38.385804233608205],
        [23.800857527319074, 38.38576218474846],
        [23.800830705228925, 38.38570331630373],
        [23.800794072814146, 38.385671801017004],
        [23.800741769738355, 38.38562975208027],
        [23.800710924334684, 38.38560242025826],
        [23.800666667885938, 38.38556247373063],
        [23.800626434750715, 38.38554670535838],
        [23.80059827155606, 38.38556772985395],
        [23.800545968480268, 38.38554144923351],
        [23.800496347613493, 38.38553198820785],
        [23.800431974597135, 38.38551516860355],
        [23.80038235373036, 38.38550465634889],
        [23.80030322856442, 38.385474170801736],
        [23.800237514443555, 38.38543527542982],
        [23.800205327935377, 38.38539217512839],
        [23.80026066210846, 38.385373273045275],
        [23.800259321003953, 38.385341736214826],
        [23.800220428973237, 38.385312301827355],
        [23.80017617252449, 38.38529863585767],
        [23.800146668225327, 38.385312301827355],
        [23.800105093985596, 38.38532807025072],
        [23.80006083753685, 38.38530389200016],
        [23.800012557774583, 38.38526604776568],
        [23.799969642430344, 38.38525553547482],
        [23.799975006848374, 38.38521558875557],
        [23.799989758997956, 38.38515566863537],
        [23.800005852252045, 38.3851272854032],
        [23.799960254698792, 38.385116773092165],
        [23.79993075039963, 38.385123080478984],
        [23.799881129532853, 38.385024264689164],
        [23.79984089639763, 38.38495488330927],
        [23.799776523381272, 38.384887604331865],
        [23.799721538096467, 38.38481717158532],
        [23.799658506184617, 38.38474884124333],
        [23.799622296362916, 38.38469943310965],
        [23.799661425774307, 38.384670111770106],
        [23.799629239266128, 38.38457970527382],
        [23.7995702306678, 38.38449981106677],
        [23.799516586487503, 38.384384174558164],
        [23.799430755799026, 38.38427694781223],
        [23.79937711161873, 38.38413608106132],
        [23.799326149647445, 38.384045673897546],
        [23.799314258150737, 38.38392721096539],
        [23.799290118269603, 38.383847316037624],
        [23.799272683911006, 38.383776882278084],
        [23.79932364588229, 38.383752703509],
        [23.799335715822856, 38.38371065345655],
        [23.799284753851573, 38.383682269657335],
        [23.799252567343395, 38.38366334711834],
        [23.79920696979014, 38.38365598835185],
        [23.79921233420817, 38.38362024576102],
        [23.799261955074947, 38.383584503152555],
        [23.799279389433543, 38.3835676830954],
        [23.799248544029872, 38.383522479172406],
        [23.799314258150737, 38.38349830031827],
        [23.7993437624499, 38.38346045513908],
        [23.7993437624499, 38.38343207124169],
        [23.79938131337611, 38.383414199893146],
        [23.799405453257243, 38.38337845718288],
        [23.799394724421184, 38.38335532953739],
        [23.7993974066302, 38.38333325314162],
        [23.799418864302318, 38.383359534564406],
        [23.799472508482616, 38.383382662208525],
        [23.799510059408824, 38.38340578984527],
        [23.79957577352969, 38.38342681496316],
        [23.799551633648555, 38.38346571141517],
        [23.799607960037868, 38.383504607846234],
        [23.799666968636195, 38.38357609312445],
        [23.79971256618945, 38.383617092002154],
        [23.799760845951717, 38.38367911590119],
        [23.799739388279598, 38.3836948846806],
        [23.799794373564403, 38.3837222172234],
        [23.799850699953716, 38.383764267269136],
        [23.799909708552043, 38.383808419790824],
        [23.799933848433177, 38.38386098228151],
        [23.8000102913901, 38.38392826221387],
        [23.800050524525325, 38.38397451713104],
        [23.80010550981013, 38.384010259546784],
        [23.800171223930995, 38.38405966815123],
        [23.80019662465368, 38.384096664761366],
        [23.800242222206933, 38.38413240711676],
        [23.800298548596245, 38.38413240711676],
        [23.80040047253881, 38.3841345096077],
        [23.800497032063348, 38.384163944474494],
        [23.800488985436303, 38.38421440421825],
        [23.800588227169854, 38.38423332661307],
        [23.800671375649316, 38.38432583602771],
        [23.80081085051809, 38.38446249744643],
        [23.800934232132775, 38.38456341648219],
        [23.801081753628594, 38.38467905270424],
        [23.801285601513726, 38.38482202086865],
        [23.801411665337426, 38.38491242706207],
        [23.801489449398858, 38.38507431694],
        [23.801489449398858, 38.38519205480544],
        [23.80145726289068, 38.385208874484874],
        [23.801508224861962, 38.38526984578997],
        [23.80146799172674, 38.385320304762224],
        [23.801400936501366, 38.38528456299383],
        [23.801371432202203, 38.38530979247923],
        [23.80141434754644, 38.385364456334074],
        [23.801411665337426, 38.38541701769396],
        [23.80130974139486, 38.385391788245975],
        [23.80127755488668, 38.38545065694426],
        [23.801344610112054, 38.38545065694426],
        [23.80147335614477, 38.385499013339164],
        [23.80147335614477, 38.385591521134955],
        [23.801376796620232, 38.38559993092869],
        [23.801470673935754, 38.385686131258254],
        [23.8014250763825, 38.38582279010677],
        [23.80128828372274, 38.385877453573876],
        [23.801119304554803, 38.38590268285245],
        [23.800982511895043, 38.385934219438305],
      ],
    ]),

// var strm = ee.Image("CGIAR/SRTM90_V4");
// Define a Polygon object.
// var polygon = ee.Geometry.Polygon(
    // [[[-122.092, 37.424],
      // [-122.086, 37.418],
      // [-122.079, 37.425],
      // [-122.085, 37.423]]]);
      
//  Load the SRTM image.
//  Our dataset.
var srtm = ee.Image('CGIAR/SRTM90_V4');

// Apply an algorithm to an image.
var slope = ee.Terrain.slope(srtm);

Map.addLayer(slope, {min:0, max:50}, 'slope');

// Apply the area method to the Polygon object.
var polygonArea = polygon.area({'maxError': 1});

// Print the result to the console.
print('polygon.area(...) =', polygonArea);

// Display relevant geometries on the map.
Map.setCenter(23.79302, 38.39272, 15);
Map.addLayer(polygon,
            {'color': 'black'},
            'Geometry [black]: polygon');
            
            
//Create circle(s) 

var table = ee.FeatureCollection([
    //  This gonna be the centre of our drone.
  ee.Geometry.Point([23.800452, 38.384849]),
  // ee.Geometry.Point([10, 0.1]),
  // ee.Geometry.Point([10, 0.2])
])


var buffered = table.map(function (feature) {
    //  The first parameter defines the 'radius' of our drone's range.
    //  It's expressed in meters.
    return feature.buffer(20, 1)
})
Map.addLayer(buffered.draw({color: 'FF0000', strokeWidth: 0}), {opacity: 1})


// Compute the mean elevation in the polygon.
var meanDict = srtm.reduceRegion({
  reducer: ee.Reducer.mean(),
  geometry: polygon,
  scale: 90
});

// Get the mean from the dictionary and print it.
var mean = meanDict.get('elevation');
print('Mean elevation', mean);

var district = ee.FeatureCollection(polygon);

var boundbox = district.geometry().bounds();
Map.centerObject(boundbox); Map.addLayer(boundbox); Map.addLayer(polygon, {color: 'red'});
print(district);

// return the list of coordinates
var listCoords = ee.Array.cat(boundbox.coordinates(), 1); 

// get the X and Y -coordinates
var xCoords = listCoords.slice(1, 0, 1);
var yCoords = listCoords.slice(1, 1, 2);

// reduce the arrays to find the max (or min) value
var xMin = xCoords.reduce('min', [0]).get([0,0]); print('xMin',xMin);
var xMax = xCoords.reduce('max', [0]).get([0,0]); print('xMax',xMax);
var yMin = yCoords.reduce('min', [0]).get([0,0]); print('yMin',yMin);
var yMax = yCoords.reduce('max', [0]).get([0,0]); print('yMax',yMax);

print(polygon.coordinates())

// After the run, remove the comments and feed the .ipynb file within this directory with this input:

// 0: [23.800966156784177,38.385898843453276]
// 1: [23.800946040216566,38.385898843453276]
// 2: [23.800919218126417,38.385891484914204]
// 3: [23.800915194812895,38.38586415319112]
// 4: [23.80090178376782,38.38583156535393]
// 5: [23.80088166720021,38.385804233608205]
// 6: [23.800857527319074,38.38576218474846]
// 7: [23.800830705228925,38.38570331630373]
// 8: [23.800794072814146,38.385671801017004]
// 9: [23.800741769738355,38.38562975208027]
// 10: [23.800710924334684,38.38560242025826]
// 11: [23.800666667885938,38.38556247373063]
// 12: [23.800626434750715,38.38554670535838]
// 13: [23.80059827155606,38.38556772985395]
// 14: [23.800545968480268,38.38554144923351]
// 15: [23.800496347613493,38.38553198820785]
// 16: [23.800431974597135,38.38551516860355]
// 17: [23.80038235373036,38.38550465634889]
// 18: [23.80030322856442,38.385474170801736]
// 19: [23.800237514443555,38.38543527542982]
// 20: [23.800205327935377,38.38539217512839]
// 21: [23.80026066210846,38.385373273045275]
// 22: [23.800259321003953,38.385341736214826]
// 23: [23.800220428973237,38.385312301827355]
// 24: [23.80017617252449,38.38529863585767]
// 25: [23.800146668225327,38.385312301827355]
// 26: [23.800105093985596,38.38532807025072]
// 27: [23.80006083753685,38.38530389200016]
// 28: [23.800012557774583,38.38526604776568]
// 29: [23.799969642430344,38.38525553547482]
// 30: [23.799975006848374,38.38521558875557]
// 31: [23.799989758997956,38.38515566863537]
// 32: [23.800005852252045,38.3851272854032]
// 33: [23.799960254698792,38.385116773092165]
// 34: [23.79993075039963,38.385123080478984]
// 35: [23.799881129532853,38.385024264689164]
// 36: [23.79984089639763,38.38495488330927]
// 37: [23.799776523381272,38.384887604331865]
// 38: [23.799721538096467,38.38481717158532]
// 39: [23.799658506184617,38.38474884124333]
// 40: [23.799622296362916,38.38469943310965]
// 41: [23.799661425774307,38.384670111770106]
// 42: [23.799629239266128,38.38457970527382]
// 43: [23.7995702306678,38.38449981106677]
// 44: [23.799516586487503,38.384384174558164]
// 45: [23.799430755799026,38.38427694781223]
// 46: [23.79937711161873,38.38413608106132]
// 47: [23.799326149647445,38.384045673897546]
// 48: [23.799314258150737,38.38392721096539]
// 49: [23.799290118269603,38.383847316037624]
// 50: [23.799272683911006,38.383776882278084]
// 51: [23.79932364588229,38.383752703509]
// 52: [23.799335715822856,38.38371065345655]
// 53: [23.799284753851573,38.383682269657335]
// 54: [23.799252567343395,38.38366334711834]
// 55: [23.79920696979014,38.38365598835185]
// 56: [23.79921233420817,38.38362024576102]
// 57: [23.799261955074947,38.383584503152555]
// 58: [23.799279389433543,38.3835676830954]
// 59: [23.799248544029872,38.383522479172406]
// 60: [23.799314258150737,38.38349830031827]
// 61: [23.7993437624499,38.38346045513908]
// 62: [23.7993437624499,38.38343207124169]
// 63: [23.79938131337611,38.383414199893146]
// 64: [23.799405453257243,38.38337845718288]
// 65: [23.799394724421184,38.38335532953739]
// 66: [23.7993974066302,38.38333325314162]
// 67: [23.799418864302318,38.383359534564406]
// 68: [23.799472508482616,38.383382662208525]
// 69: [23.799510059408824,38.38340578984527]
// 70: [23.79957577352969,38.38342681496316]
// 71: [23.799551633648555,38.38346571141517]
// 72: [23.799607960037868,38.383504607846234]
// 73: [23.799666968636195,38.38357609312445]
// 74: [23.79971256618945,38.383617092002154]
// 75: [23.799760845951717,38.38367911590119]
// 76: [23.799739388279598,38.3836948846806]
// 77: [23.799794373564403,38.3837222172234]
// 78: [23.799850699953716,38.383764267269136]
// 79: [23.799909708552043,38.383808419790824]
// 80: [23.799933848433177,38.38386098228151]
// 81: [23.8000102913901,38.38392826221387]
// 82: [23.800050524525325,38.38397451713104]
// 83: [23.80010550981013,38.384010259546784]
// 84: [23.800171223930995,38.38405966815123]
// 85: [23.80019662465368,38.384096664761366]
// 86: [23.800242222206933,38.38413240711676]
// 87: [23.800298548596245,38.38413240711676]
// 88: [23.80040047253881,38.3841345096077]
// 89: [23.800497032063348,38.384163944474494]
// 90: [23.800488985436303,38.38421440421825]
// 91: [23.800588227169854,38.38423332661307]
// 92: [23.800671375649316,38.38432583602771]
// 93: [23.80081085051809,38.38446249744643]
// 94: [23.800934232132775,38.38456341648219]
// 95: [23.801081753628594,38.38467905270424]
// 96: [23.801285601513726,38.38482202086865]
// 97: [23.801411665337426,38.38491242706207]
// 98: [23.801489449398858,38.38507431694]
// 99: [23.801489449398858,38.38519205480544]
// 100: [23.80145726289068,38.385208874484874]
// 101: [23.801508224861962,38.38526984578997]
// 102: [23.80146799172674,38.385320304762224]
// 103: [23.801400936501366,38.38528456299383]
// 104: [23.801371432202203,38.38530979247923]
// 105: [23.80141434754644,38.385364456334074]
// 106: [23.801411665337426,38.38541701769396]
// 107: [23.80130974139486,38.385391788245975]
// 108: [23.80127755488668,38.38545065694426]
// 109: [23.801344610112054,38.38545065694426]
// 110: [23.80147335614477,38.385499013339164]
// 111: [23.80147335614477,38.385591521134955]
// 112: [23.801376796620232,38.38559993092869]
// 113: [23.801470673935754,38.385686131258254]
// 114: [23.8014250763825,38.38582279010677]
// 115: [23.80128828372274,38.385877453573876]
// 116: [23.801119304554803,38.38590268285245]
// 117: [23.800982511895043,38.385934219438305]
// 118: [23.800966156784177,38.385898843453276]