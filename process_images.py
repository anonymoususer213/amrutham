import os
from PIL import Image

user_uploaded_dir = r"C:\Users\raghu\.gemini\antigravity-ide\brain\31236ab4-9f30-425d-8b36-27f329186632\.user_uploaded"
output_dir = r"c:\Users\raghu\OneDrive\Desktop\Final cut\code\public\assets"

def remove_black_background(input_path, output_path, low_thresh=18, high_thresh=32):
    img = Image.open(input_path).convert("RGBA")
    datas = img.getdata()
    
    new_data = []
    for item in datas:
        # item is (R, G, B, A)
        r, g, b, a = item
        brightness = max(r, g, b)
        if brightness <= low_thresh:
            new_data.append((r, g, b, 0))
        elif brightness < high_thresh:
            # smooth transition
            alpha = int(((brightness - low_thresh) / (high_thresh - low_thresh)) * 255)
            new_data.append((r, g, b, alpha))
        else:
            new_data.append((r, g, b, 255))
            
    img.putdata(new_data)
    
    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)
        
    img.save(output_path, "PNG")
    print(f"Saved {output_path} with size {img.size}")

remove_black_background(os.path.join(user_uploaded_dir, "media_1788561928703.jpg"), os.path.join(output_dir, "product-black-urad.png"))
remove_black_background(os.path.join(user_uploaded_dir, "media_1788561928721.jpg"), os.path.join(output_dir, "product-health-mix.png"))
