from djitellopy import tello
import KeyPressModule as kp
from time import sleep
import sys
import cv2
import numpy as np
import math

# Parameters
#################################################
fSpeed = 117/10 # Forward Speed in cm/s (15cm/s)
aSpeed = 360/10 # Angular Speed Degrees/s (50d/s)
interval = 0.25

dInterval = fSpeed*interval
aInterval = aSpeed*interval
#################################################
x, y = 500, 500
a = 0 
yaw = 0

#   Initialize pygame
kp.init()

#   Initialize and connect to drone
myDrone = tello.Tello()
myDrone.connect()
print(myDrone.get_battery())
#

points = [(0,0), (0,0)]

def getKeyboardInput():

    #   Instructions:
    #################
    #   Left - Right
    lr = 0

    #   Forward - Back
    fb = 0

    #   Up - Down
    ud = 0

    #   Yaw Velocity
    yv = 0

    #################

    # Max Value: 100
    speed = 15
    aspeed = 50
    d = 0
    global x, y, yaw, a

    # Flag in order to stop the program
    stop = 0

    # key = cv2.waitKey(1)
    # print(key)

    if kp.getKey("LEFT"):
        lr = speed
        d = dInterval
        a = -180
    elif kp.getKey("RIGHT"):
        lr = -speed
        d = -dInterval
        a = -180

    if kp.getKey("UP"):
        fb = speed
        d = dInterval
        a = 270
    elif kp.getKey("DOWN"):
        fb = -speed
        d = -dInterval
        a = -90

    if kp.getKey("w"):
        ud = speed
    elif kp.getKey("s"):
        ud = -speed

    if kp.getKey("d"):
        yv = aspeed
        yaw -= aInterval
    elif kp.getKey("a"):
        yv = -aspeed
        yaw += aInterval

    if kp.getKey("e"):
        myDrone.land()
    if kp.getKey("q"):
        myDrone.takeoff()

    sleep(interval)
    a += yaw
    x += int(d*math.cos(math.radians(a)))
    y += int(d*math.sin(math.radians(a)))


    return [lr, fb, ud, yv, x, y]

def drawPoints(img, points):

    for point in points:
        cv2.circle(img, point, 5, (0,0,255), cv2.FILLED)
    cv2.circle(img, points[-1], 8, (0,0,255), cv2.FILLED)
    cv2.putText(img, f'({(points[-1][0]-500)/100}, {(points[-1][1]-500)/100})m',
                (points[-1][0]+10,points[-1][1]+30), cv2.FONT_HERSHEY_PLAIN, 1, (255,0,255), 1)
  
while True:
    vals = getKeyboardInput()
    print(vals)
    myDrone.send_rc_control(vals[0], vals[1], vals[2], vals[3])
    sleep(0.05)

    img = np.zeros((1000,1000,3), np.uint8)
    if(points[-1][0] != vals[4] or points[-1][1] != vals[5]):
        points.append((vals[4], vals[5]))
    drawPoints(img, points)
    cv2.imshow("Output", img)
    cv2.waitKey(1)
