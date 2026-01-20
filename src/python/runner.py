import sys
from dungeon import Dungeon
import pyautogui
import time
import json
import os
import threading

def get_config():
    filename = 'user-settings.json'
    
    # in production mode
    if getattr(sys, 'frozen', False):
        application_path = os.path.dirname(sys.executable)

    # in development mode
    else:
        application_path = os.path.dirname(os.path.abspath(__file__))

    file_path = os.path.join(application_path, filename)

    with open(file_path, 'r') as file:
        return json.load(file)
  
dungeon_difficulty = get_config()

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

def runMacro():
  dungeonthread = threading.Thread(target=dungeon_interval, daemon=True)
  dungeonthread.start()


def stopMacro():
  exitthread = threading.Thread(target=inside_dungeon, daemon=True)
  exitthread.start()

if __name__ == "__main__":
    print("Starting Macro")
    runMacro()

    try:
        sys.stdin.read() 
    except KeyboardInterrupt:
        pass

# dungeonthread = threading.Thread(target=dungeon_interval, daemon=True)
# exitthread = threading.Thread(target=inside_dungeon, daemon=True)
# dungeonthread.start()
# exitthread.start()