//  --- UAV Early Forest Fire Prediction Project ---
//  --------------------------------------------------------------------
//  This file contains the code about GIS Analysis of our program.
//  Import this file on: Google Earth Engine.

//  After run, click on the inspector and test on the pixels about the elevation and the slope of the area.

//  From this script, we'll obtain:
//  The slope and the elevation of different points on our area.

// ---------------------------------------------------------------------
//  Our dataset
var strm = ee.Image("NASA/NASADEM_HGT/001");

print(strm);
Map.addLayer(strm, { min: 0, max: 120 });

var slope = ee.Terrain.slope(strm);
Map.addLayer(slope, { min: 0, max: 60 }, "slope");
