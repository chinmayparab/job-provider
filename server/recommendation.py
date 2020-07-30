import datetime
import time
import pandas as pd
from flask import jsonify

df1 = pd.read_excel('courses.xlsx')


def levelConv(level):
    yay = []
    for i in level:

        if i == 'Intermediate':
            yay.append(2)
        elif i == 'Beginner':
            yay.append(1)
        elif i == 'Advanced':
            yay.append(0)
    return yay


def findSkill(aam):
    j = 0    # course id 0 se rakhega to ye -1 kar dena
    maam = []
    for i in df1['skills_taught']:
        j += 1
        if aam.lower() in i.lower():
            maam.append(j)
    return maam


def main(skillList, level):
    convLevel = levelConv(level)  # agar 0 aya to aagekaamayega se kaam chalena
    cats = []
    preds = []
    for skillSelect, levelselec in zip(skillList, convLevel):
        k = findSkill(skillSelect)
        # category , agar uper -1 rakhega to ye +1 hata dena
        mainCategory = df1['category'][k[0]+1]
        cats.append(mainCategory)
        # first df
        yofo = df1.loc[df1['course_id'].isin(k)]  # naya df
        if levelselec == 1:
            yofo[yofo['level'] == 'Intermediate']
        elif levelselec == 2:
            yofo[yofo['level'] == 'Advanced']
        elif levelselec == 0:
            yofo[yofo['level'] == 'Advanced']
        for i in yofo['course_id']:
            preds.append(i)

    mmm = []
    for i in range(len(level)):
        yyy = findSkill(level[i])
        sss = [x for x in yyy if x not in preds]
        for f in sss:
            mmm.append(f)
    for i in mmm:
        preds.append(i)

    yofo1 = df1[df1['category'] == mainCategory]
    yofo1.sort_values(by=['price'], inplace=True, ascending=True)
    for i in yofo1['course_id']:
        preds.append(i)

    resp = jsonify({'courses': preds})
    return resp
