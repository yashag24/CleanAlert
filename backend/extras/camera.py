from pymongo import MongoClient
import gridfs
import datetime

client = MongoClient("mongodb://<username>:<password>@<host>:<port>/<db>")
db = client["your-db-name"]
fs = gridfs.GridFS(db)

filename = f"camera_{datetime.datetime.now().isoformat()}.jpg"
with open("captured_image.jpg", "rb") as img_file:
    fs.put(img_file,
           filename=filename,
           metadata={
               "latitude": 31.39493,
               "longitude": 75.53773,
               "source": "camera1",
               "processed": False,
               "user": {"id": "camera-1"}
           })

print("Image uploaded to GridFS successfully.")