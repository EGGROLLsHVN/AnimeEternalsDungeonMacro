from dungeon import Dungeon
import pyautogui
import time
import json
import os
import threading

filename = 'default-config.json'
file_path = os.path.join(os.getcwd(), filename)

with open(file_path, 'r') as file:
  dungeon_difficulty = json.load(file)

d = Dungeon()

def dungeon_interval():
  while True:

    now = time.localtime()
    minutes_passed = now.tm_min % 10

    if minutes_passed == 0 or minutes_passed == 1 or minutes_passed == 2:
      if (dungeon_key := d.dungeonchecker()):
        if any(key in dungeon_key.lower() and dungeon_difficulty.get(key, False) for key in dungeon_difficulty):
          pyautogui.moveTo(884, 285)
          time.sleep(0.5)
          pyautogui.click
          break

    time.sleep(1)

dungeonthread = threading.Thread(target=dungeon_interval, daemon=True)
dungeonthread.start()

while True:
  time.sleep(1)