# This script is a part of the DroneFireDetection Project
# Its purpose is to calculate the relative position of the drone during the surveiilance
# Initial lat. & long. is the drone's starting position

import math

# Radius of the earth in kilometer
earth = 6378.137
pi = math.pi

# Put the initial lat. position below
latitude = 38.40897829609685

# Put the initial long. position below
longitude = 23.736446096576476


# 1 meter in degree
m = (1 / ((2 * pi / 360) * earth)) / 1000

new_latitude = latitude + (5 * m)

new_longitude = longitude + (5 * m) / math.cos(latitude * (pi/180))

print(str(new_latitude) + "," + str(new_longitude))
