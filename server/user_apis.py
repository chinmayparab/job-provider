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


def user(naam):
    try:
        conn = mysql.connect()
        cur = conn.cursor(pymysql.cursors.DictCursor)
        cur.execute("Select * from users WHERE user_id=" +
                    str(naam['user_id'])+";")
        rows = cur.fetchall()
        resp = jsonify(rows)
        resp.status_code = 200
        return resp
    except Exception as e:
        print(e)
    finally:
        cur.close()
        conn.close()


def applied_jobs(naam):
    conn = mysql.connect()
    cur = conn.cursor(pymysql.cursors.DictCursor)
    try:
        cur.execute("Select * FROM enrolled_jobs WHERE user_id ='" +
                    str(naam['user_id'])+"';")
        joblists = cur.fetchall()
        if cur:
            resp = jsonify({'applied-jobs': joblists})
            resp.status_code = 200
            conn.commit()
            return resp
        resp = jsonify({'message': 'No Jobs Applied.'})
        resp.status_code = 401
        return resp
    finally:
        cur.close()
        conn.close()


def my_courses(naam):
    conn = mysql.connect()
    cur = conn.cursor(pymysql.cursors.DictCursor)
    try:
        cur.execute(
            "Select * FROM enrolled_courses WHERE user_id ='" + str(naam['user_id'])+"';")
        mycourses = cur.fetchall()
        if cur:
            resp = jsonify({'enrolled-courses': mycourses})
            resp.status_code = 200
            conn.commit()
            return resp
        resp = jsonify({'message': 'No Courses Applied.'})
        resp.status_code = 401
        return resp
    finally:
        cur.close()
        conn.close()
