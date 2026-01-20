import mss
import time
import PIL
import pytesseract
import numpy as np
import datetime
from PIL import Image
import cv2

dungeon_monitor = {'top':188, 'left': 820, 'width': 250, 'height': 50}
exit_monitor = {'top': 131, 'left': 696, 'width': 100, 'height': 50}

class Dungeon:
	def dungeonchecker(self):
		while True:
			with mss.mss() as sct:
				dungeonimage = sct.grab(dungeon_monitor)

				arraydungeon = np.array(dungeonimage)
				graydungeon = np.mean(arraydungeon[..., :3], axis=2).astype(np.uint8)

				dungeonthreshold = 100
				dungeonblackwhite = np.where(graydungeon > dungeonthreshold, 0 , 255).astype(np.uint8)

				dungeon_image = Image.fromarray(dungeonblackwhite)
				dungeon_image = dungeon_image.resize((dungeon_image.width*3, dungeon_image.height*3), Image.Resampling.NEAREST)

				dungeontext = pytesseract.image_to_string(dungeon_image, config = '--psm 7')

				return(dungeontext.strip())
		

	def exitchecker(self):
		while True:
			with mss.mss() as sct:
				exitimage = sct.grab(exit_monitor)
				arrayexit = np.array(exitimage)
				grayexit = np.mean(arrayexit[..., :3], axis=2).astype(np.uint8)

				exitthreshold = 200
				exitblackwhite = np.where(grayexit > exitthreshold, 0, 255).astype(np.uint8)

				exit_image = Image.fromarray(exitblackwhite)
				exit_image = exit_image.resize((exit_image.width*3, exit_image.height*3), Image.Resampling.NEAREST)

				exittext = pytesseract.image_to_string(exit_image, config = '--psm 7')
				return(exittext.strip())