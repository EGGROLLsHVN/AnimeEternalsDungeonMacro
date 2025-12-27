import mss
import numpy as np
from PIL import Image
import pytesseract
import time
import cv2  # 1️⃣ Import OpenCV

sct = mss.mss()

# ✅ UPDATED COORDINATES HERE
monitor = {"top": 131, "left": 696, "width": 100, "height": 50}

print("--- Press 'q' inside the preview window to quit ---")

while True:
    start_time = time.time()

    # 1️⃣ Grab region
    img = np.array(sct.grab(monitor))

    # 2️⃣ Grayscale
    gray = np.mean(img[..., :3], axis=2).astype(np.uint8)

    # 3️⃣ Threshold & Invert (The fix for Red background)
    # Any pixel brighter than 200 becomes Black (0), others White (255)
    thresh_val = 200
    binary = np.where(gray > thresh_val, 0, 255).astype(np.uint8)

    # 4️⃣ Resize (Make it bigger for Tesseract)
    # We convert to PIL for resizing, then back to numpy for OpenCV viewing
    pil_img = Image.fromarray(binary)
    pil_img = pil_img.resize((pil_img.width * 3, pil_img.height * 3), Image.Resampling.NEAREST)
    
    # Convert back to numpy so OpenCV can show it
    open_cv_image = np.array(pil_img)

    # 5️⃣ 👀 SHOW THE DEBUG WINDOW
    cv2.imshow("Bot View (What Tesseract Sees)", open_cv_image)
    
    # Press 'q' to quit the loop
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

    # 6️⃣ Read text
    # Added whitelist so it only looks for letters, ignoring symbols like '-'
    custom_config = r'--psm 7 -c tessedit_char_whitelist=ExitEXIT'
    text = pytesseract.image_to_string(pil_img, config=custom_config)
    
    print(f"Detected: '{text.strip()}' | Time: {time.time() - start_time:.2f}s")
    
    # Optional: Small sleep to prevent CPU spiking, though waitKey(1) handles some of this
    # time.sleep(0.1) 

cv2.destroyAllWindows()