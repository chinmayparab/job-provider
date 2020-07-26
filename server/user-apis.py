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


def applied_jobs():
    conn = mysql.connect()
    cur = conn.cursor(pymysql.cursors.DictCursor)
    try:
        cur.execute("Select * FROM enrolled_jobs WHERE user_id ='"+str(
            request.json['user_id'])+"';")
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


def my_courses():
    conn = mysql.connect()
    cur = conn.cursor(pymysql.cursors.DictCursor)
    try:
        cur.execute("Select * FROM enrolled_courses WHERE user_id ='"+str(
            request.json['user_id'])+"';")
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
