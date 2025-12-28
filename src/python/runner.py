from dungeon import Dungeon
import pyautogui
import time
import json
import os
import threading

filename = 'user-setting.json'
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
          time.sleep(1.1)
          pyautogui.click()
          

    time.sleep(1)

def inside_dungeon():
  while True:
    if (exit_sign := d.exitchecker()):
      if 'exit' in exit_sign.lower():
        pyautogui.keyDown('W')
      else:
        pyautogui.keyUp('W')

    time.sleep(0.05)

dungeonthread = threading.Thread(target=dungeon_interval, daemon=True)
exitthread = threading.Thread(target=inside_dungeon, daemon=True)
dungeonthread.start()
exitthread.start()

while True:
  time.sleep(1)