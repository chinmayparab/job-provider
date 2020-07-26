import pymysql
import jwt
import datetime
import requests
from app import app
from db_config import mysql
from flask import jsonify
from flask import flash, request, session, make_response, render_template, Response
from functools import wraps
from flask_cors import CORS
import random
import string


def all_courses():
    try:
        conn = mysql.connect()
        cur = conn.cursor(pymysql.cursors.DictCursor)
        all = "Select * from courses"
        if(request.json['skill'] != ""):
            cur.execute(all+"WHERE skill_taught = '" +
                        request.json['skill']+"';")
        else:
            cur.execute(all+";")

        rows = cur.fetchall()
        resp = jsonify(rows)
        resp.status_code = 200
        return resp
    except Exception as e:
        print(e)
    finally:
        cur.close()
        conn.close()


def all_skills():
    try:
        conn = mysql.connect()
        cur = conn.cursor(pymysql.cursors.DictCursor)
        cur.execute("Select * from skills WHERE title LIKE '" +
                    request.json['skill']+"%';")
        rows = cur.fetchall()
        resp = jsonify(rows)
        resp.status_code = 200
        return resp
    except Exception as e:
        print(e)
    finally:
        cur.close()
        conn.close()


def fetch_jobs():
    conn = mysql.connect()
    cur = conn.cursor(pymysql.cursors.DictCursor)

    all = "Select * from job "

    if(request.json['location'] != ""):
        bylocation = "WHERE interveiw_loc = '" + \
            str(request.json['location'])+"';"
        cur.execute(all+bylocation)

    elif(request.json['title'] != ""):
        bytitle = "WHERE pos_names ='" + str(request.json['title'])+"';"
        cur.execute(all+bytitle)

    elif(request.json['title'] != "" and request.json['location'] != ""):
        byloc_title = "WHERE pos_names = '" + \
            str(request.json['title'])+"' AND interveiw_loc = '" + \
            str(request.json['location'])+"';"
        cur.execute(all+byloc_title)

    elif(request.json['start'] != "" and request.json['end'] != ""):
        start_end = "WHERE stipend BETWEEN " + \
            str(request.json['start'])+" AND " + str(request.json['end'])+";"
        cur.execute(all+start_end)

    else:
        cur.execute(all+";")

    records = cur.fetchall()
    if records:
        resp = jsonify(records)
        resp.status_code = 200
        return resp
    else:
        resp = jsonify({'message': 'ERROR.'})
        resp.status_code = 401
        return resp
    cur.close()
    conn.close()
