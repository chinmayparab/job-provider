import jsonpickle
import numpy as np
import cv2
import pytesseract


def ocr(imo):
    pytesseract.pytesseract.tesseract_cmd = 'D:/Tesseract-OCR/tesseract.exe'
    text = pytesseract.image_to_string(imo)
    y = text.split()
    a = 0
    # 2nd
    st = []
    gg = 0
    for i in y:
        if i.find('Stipend') != -1:
            st.append(gg)
        gg += 1
    # y[ff[1]+2]
    links = []
    for i in y:
        if i.find('www.') != -1:
            links.append(y.index(i))
    for i in y:
        if i.find('https://') != -1:
            links.append(y.index(i))
    shh = []
    for i in links:
        shh.append(y[i])
    lonks = " ".join(shh)
    # 3rd
    Npos = []
    r = 0
    for i in y:

        if i.find('Name') != -1:
            if y[r+1].find('of') != -1:
                if y[r+2].find('Position:') != -1:
                    Npos.append(r+3)
        r += 1
    position = []
    z = 0
    for i in y:
        if i.find('Number') != -1:
            if y[z+1].find('of') != -1:
                if y[z+2].find('Position') != -1:
                    position.append(z+3)
        z += 1
    disEnd = []
    Description = []
    lom = 0
    flag = 0
    dis = []
    for i in y:
        if i.find('Description') != -1:
            cnt = lom
            dis.append(lom)
            for j in y[lom:]:
                if j.find('\n\n'):
                    flag = 1
                    disEnd.append(cnt)
                cnt += 1
            if flag == 1:
                Description.append(' '.join(y[lom+1:disEnd[-1]]))
                flag = 0
            elif flag == 0:
                Description.append(' '.join(y[lom+1:]))
        lom += 1
    NameOfPosition = []
    NumberOfPosition = []
    Stipend = []
    for i in range(len(st)):
        NumberOfPosition.append(' '.join(y[position[i]:st[i]]))
        Stipend.append(' '.join(y[st[i]+1:dis[i]]))
        NameOfPosition.append(' '.join(y[Npos[i]:position[i]-3]))
    return NameOfPosition, NumberOfPosition, Stipend, Description, text, lonks
