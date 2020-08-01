import pymysql
from app import app
from db_config import mysql
from flask import jsonify
import pandas as pd

conn = mysql.connect()
cur = conn.cursor(pymysql.cursors.DictCursor)
cur.execute("Select title,category,skills_taught,level,course_id from courses ;")
records = cur.fetchall()


def convert(list):
    return tuple(list)


dataa = []
for r in range(0, len(records)):
    list = [(category) for category in records[r].values()]
    dataa.append(convert(list))

df1 = pd.DataFrame(
    dataa, columns=['title', 'category', 'skills_taught', 'level', 'course_id'])


def apna_cat_predictor(skill_list, level_list, cats_list):
    fin_biz = ["Business", "Finance & Accounting", "Marketing",
               "Office Productivity", "Personal Development"]

    IT_biz = ["Development", "Business", "IT & Software", "Design",
              "Marketing", "Finance & Accounting", "Office Productivity"]

    IT = ["Development", "IT & Software", "Design",
          "Marketing", "Teaching & Academics"]

    fit_lifestyl = ["Personal Development", "Lifestyle", "Photography",
                    "Music", "Teaching & Academics", "Health & Fitness"]

    fincount = 0
    itbizcount = 0
    itcount = 0
    fitcount = 0

    skill_list = skill_list
    level_list = level_list
    cats_list = cats_list

    for j in cats_list:
        for i in fin_biz:
            if str(i) == str(j):
                fincount += 1
        for i in IT_biz:
            if str(i) == str(j):
                itbizcount += 1
        for i in IT:
            if str(i) == str(j):
                itcount += 1
        for i in fit_lifestyl:
            if str(i) == str(j):
                fitcount += 1
        list1 = {}
        list1['fincount'] = fincount
        list1['itbizcount'] = fincount
        list1['itcount'] = itcount
        list1['fitcount'] = fitcount

    return max(list1)


def levelConv(level):
    yay = []
    for i in level:

        if i == 'Intermediate':
            yay.append(2)
        elif i == 'Beginner':
            yay.append(1)
        elif i == 'Advanced':
            yay.append(0)
    print(yay)
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
        if convLevel == 1:
            yofo[yofo['level'] == 'Intermediate']
        elif convLevel == 2:
            yofo[yofo['level'] == 'Advanced']
        elif convLevel == 0:
            yofo[yofo['level'] == 'Advanced']

        for i in yofo['title']:
            preds.append(i)
    return jsonify({"results": preds})


def mainMain(skills, level):
    finalSkill = []
    finalLevel = []
    for i, j in zip(skills, level):
        for k in df1['skills_taught']:
            if i.lower() in k.lower():
                finalSkill.append(i)
                finalLevel.append(j)
                break
    return main(finalSkill, finalLevel)
