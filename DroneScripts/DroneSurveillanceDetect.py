import torch
import numpy as np
import cv2
from time import time
import sys
from djitellopy import tello
import os
import KeyPressModule as kp

class FireDetection:
    """
    Class implements Yolo5 Model to make inferences on a Dji Ryze Tech Tello Drone Video, using OpenCV2.
    """

    def __init__(self, capture_index, model_name):
        """
        Initializes the class with youtube url and output file.
        :param capture_index:
        :param model_name: Actually, there are the 'pre-trained' weights file that are we going to test our model.
        """

        kp.init()
        self.capture_index = capture_index
        self.model = self.load_model(model_name)
        self.classes = self.model.names
        # self.device = 'cpu'
        self.device = 'cuda' if torch.cuda.is_available() else 'cpu'
        print("Using Device: ", self.device)

    def get_video_capture(self):
        """
        Creates a new video streaming object to extract video frame by frame to make prediction on.
        :return: opencv2 video capture object, with lowest quality frame available for video.
        """
        return cv2.VideoCapture(self.capture_index)

    def getKeyboardInput(self, myDrone):

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
        speed = 75

        # Flag in order to stop the program
        stop = 0

        # key = cv2.waitKey(1)
        # print(key)

        if kp.getKey("LEFT"):
            lr = speed
        elif kp.getKey("RIGHT"):
            lr = -speed

        if kp.getKey("UP"):
            fb = speed
        elif kp.getKey("DOWN"):
            fb = -speed

        if kp.getKey("w"):
            ud = speed
        elif kp.getKey("s"):
            ud = -speed

        if kp.getKey("d"):
            yv = speed
        elif kp.getKey("a"):
            yv = -speed

        if kp.getKey("b"):
            stop = 1
        elif kp.getKey("c"):
            stop = 2

        if kp.getKey("e"):
            myDrone.land()
        if kp.getKey("q"):
            myDrone.takeoff()

        return [lr, fb, ud, yv, stop]

    def load_model(self, model_name):
        """
        Loads Yolo5 model from pytorch hub, if we don't have any pre-trained model of our own
        :param model_name: The 'pre-trained' weights we have trained our own.
        :return: Trained pytorch model
        """
        if model_name:
            # model_state = torch.hub.load('/home/dimitris/W_UAV_R/DroneProgramming/tests', 'custom', path='/home/dimitris/W_UAV_R/DroneProgramming/tests/models/fireModel.pt', source='local')
            # model = torch.load(model_state, strict=True)
            # model = torch.hub.load('/home/dimitris/W_UAV_R/DroneProgramming/tests', 'custom', path='/home/dimitris/W_UAV_R/DroneProgramming/tests/models/fireModel.pt', source='local')

            # model = torch.hub.load('ultralytics/yolov5', 'custom', path=model_name, force_reload=True)
            model = torch.hub.load('/home/dimitris/W_UAV_R/DroneProgramming/yolo_v5/yolov5', 'custom', path=model_name, force_reload=True, source='local')

            # torch.save(model.state_dict(), '/home/dimitris/W_UAV_R/DroneProgramming/tests/models/fire_Model.pt')

            # sys.path.insert(0, '/home/dimitris/W_UAV_R/DroneProgramming/tests/models/fire_Model.pt')
            # model = torch.hub.load('/home/dimitris/W_UAV_R/DroneProgramming/tests/models/' , 'custom' ,path='/home/dimitris/W_UAV_R/DroneProgramming/tests/models/fire_Model.pt', source='local')

            # path = '/home/dimitris/W_UAV_R/DroneProgramming/tests/best.pt'
            # model = torch.hub.load('yolov5/torch/hub/ultralytics_yolov5_master', 'custom', path=path, force_reload=True)

            # torch.save(model.state_dict(), '/home/dimitris/W_UAV_R/DroneProgramming/tests/models/fireModel.pt' )
        else:
            model = torch.hub.load('ultralytics/yolov5', 'yolov5s', pretrained=True)
        return model

    def score_frame(self, frame):
        """
        Takes a single frame as input, and scores the frame using yolo5 model.
        :param frame:   Input frame in numpy/list/tuple format.
        :return:    Labels and Coordinates of objects detected by model in frame.
        """
        self.model.to(self.device)
        frame = [frame]
        results = self.model(frame)
        labels, cord = results.xyxyn[0][:, -1], results.xyxyn[0][:, :-1]
        return labels, cord

    def class_to_label(self, x):
        """
        For a given label value, return corresponding string label.
        :param x: numeric label
        :return: corresponding string label
        """
        return self.classes[int(x)]


    def plot_boxes(self, results, frame):
        """
        Takes a frame and its results as input, and plots the bounding boxes and label on to the frame.
        :param results: Contains labels and coordinates predicted by model on the given frame.
        :param frame:   Frame which has been scored.
        :return:    Frame with bounding boxes and labels ploted on it.
        """
        labels, cord = results
        # nump = results.numpy_function
        # print(nump)
        n = len(labels)
        x_shape, y_shape = frame.shape[1], frame.shape[0]
        for i in range(n):
            row = cord[i]
            if row[4] >= 0.2:
                score = float("{:.4f}".format(row[4]))
                x1, y1, x2, y2 = int(row[0]*x_shape), int(row[1]*y_shape), int(row[2]*x_shape), int(row[3]*y_shape)
                bgr = (0, 255, 0)
                cv2.rectangle(frame, (x1, y1), (x2, y2), bgr, 2)
                # cv2.rectangle(frame, (x1, y1), (x2, y2), 2)
                cv2.putText(frame, self.class_to_label(labels[i]) + str(score), (x1, y1), cv2.FONT_HERSHEY_SIMPLEX, 0.9, bgr, 2)
                # cv2.putText(frame, self.class_to_label(labels[i]), (x1, y1), cv2.FONT_HERSHEY_SIMPLEX, 0.9, 2)


        return frame

    def __call__(self, *args, **kwargs):
        """
        This function is called when class is executed, it runs the loop to read the video frame by frame,
        and write the output into a new file.
        :return:
        """
        kp.init()
        myDrone = tello.Tello()
        myDrone.connect()
        print("Battery of my drone is:", myDrone.get_battery())

        myDrone.streamon()

        pic_counter = 0

        # #
        # frame = myDrone.get_frame_read().frame

        # cap = self.get_video_capture()
        # print(cap)
        # assert cap.isOpened()

        while True:

            # ret, frame = cap.read()
            # assert ret
            vals = self.getKeyboardInput(myDrone)
            print(vals)
            if (vals[4] == 1):
                myDrone.land()
                myDrone.streamoff()
                myDrone.__del__()
                cv2.destroyAllWindows()
                sys.exit("Program terminated by pressing 'b' button.\n")
            #
            myDrone.send_rc_control(vals[0], vals[1], vals[2], vals[3])


            frame = myDrone.get_frame_read().frame

            frame = cv2.resize(frame, (1024, 720))

            start_time = time()

            # frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            # frame = cv2.cvtColor(frame, cv2)

            results = self.score_frame(frame)
            frame = self.plot_boxes(results, frame)
            print(results)

            end_time = time()
            fps = 1/np.round(end_time - start_time, 2)

            cv2.putText(frame, f'FPS: {int(fps)}', (20, 70), cv2.FONT_HERSHEY_SIMPLEX, 1.5, (0, 255, 0), 2)

            cv2.imshow('YOLOv5 Detection', frame)

            if (vals[4] ==2 ):
                # cv2.imwrite("picture_fire.png", frame)
                pic_counter += 1
                pic_str = 'picture' + str(pic_counter) + ".png"
                cv2.imwrite(pic_str, frame)

            if cv2.waitKey(5) & 0xFF == 27:
                break

        # cap.release()


# Create a new object and execute.
detector = FireDetection(capture_index=0, model_name='best_New.pt')
detector()





