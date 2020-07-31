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
import resume_fetch as rf


def postedjobs():

    conn = mysql.connect()
    cur = conn.cursor(pymysql.cursors.DictCursor)
    try:
        a = []
        cur.execute("Select * FROM enrolled_jobs WHERE job_id ='" +
                    str(request.json['job_id'])+"';")
        if cur.rowcount > 0:
            for rec in cur:
                a.append(rec['user_id'])
        if a != []:
            resp = jsonify({"jobs-applicants": a})
        else:
            resp = jsonify({"jobs-applicants": 'no applicants'})
        conn.commit()
        return resp
    finally:
        cur.close()
        conn.close()


def applicantdetails():
    conn = mysql.connect()
    cur = conn.cursor(pymysql.cursors.DictCursor)
    try:
        id_Dict = {}
        id_Dict['user_id'] = request.json['user_id']
        f = rf.fetch_all(id_Dict)
        return f
    finally:
        cur.close()
        conn.close()
