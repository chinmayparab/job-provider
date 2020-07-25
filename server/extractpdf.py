import requests
import json
import cv2
from pdf2image import convert_from_path, convert_from_bytes
from pdf2image.exceptions import PDFInfoNotInstalledError, PDFPageCountError, PDFSyntaxError


def yoohoo(filename):
    a = []
    UPLOAD_FOLDER = 'D:/_dev/jobSetu/server/uploads/'
    urll = UPLOAD_FOLDER+filename
    from pdf2image import convert_from_path
  # iske andar pdf kuch bhi kar k aajana chaiye
    pages = convert_from_path(urll)

    for i in pages:
        addr = 'http://127.0.0.1:5000/extraction'
        test_url = addr
        i.save('out.jpg', 'JPEG')
        # prepare headers for http request
        content_type = 'image/jpeg'
        headers = {'content-type': content_type}

        img = cv2.imread('out.jpg')
        # encode image as jpeg
        _, img_encoded = cv2.imencode('.jpg', img)
        # send http request with image and receive response
        response = requests.post(
            test_url, data=img_encoded.tostring(), headers=headers)
        # decode response
        a.append(json.loads(response.text))

    return a
