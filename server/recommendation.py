from flask import jsonify
import pandas as pd
df1 = pd.read_excel('courses.xlsx')


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
