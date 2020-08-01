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


def ustatus():
    conn = mysql.connect()
    cur = conn.cursor(pymysql.cursors.DictCursor)
    try:
        cur.execute("SET SQL_SAFE_UPDATES = 0; Update enrolled_jobs SET  status ='" +
                    str(request.json["ustatus"])+"' Where user_id ='"+str(request.json['user_id'])+"' and  job_id = '"+str(request.json['job_id'])+"'; SET SQL_SAFE_UPDATES = 1;")
        resp = jsonify({"message": 'success'})
        resp.status_code = 200
        return resp
    finally:
        cur.close()
        conn.close()


def dispstatus():
    conn = mysql.connect()
    cur = conn.cursor(pymysql.cursors.DictCursor)
    try:
        j = request.json['user_id']
        k = request.json['job_id']
        cur.execute("Select * FROM enrolled_jobs WHERE user_id ='" +
                    str(j)+"' and job_id = '"+str(k)+"';")
        r = cur.fetchone()
        return jsonify({'status': r['status']})
    finally:
        cur.close()
        conn.close()


def enrollments_courses_count(naam):

    conn = mysql.connect()
    cur = conn.cursor(pymysql.cursors.DictCursor)
    cur1 = conn.cursor(pymysql.cursors.DictCursor)
    try:
        a = []
        cur.execute("Select course_id FROM courses WHERE posted_by ='" +
                    str(naam['username'])+"';")
        if cur.rowcount > 0:
            for rec in cur:
                cur1.execute("Select user_id FROM enrolled_courses WHERE course_id ='" +
                             str(rec['course_id'])+"';")
                if cur1.rowcount > 0:
                    for rec in cur1:
                        a.append(rec['user_id'])
                else:
                    continue
            if a != []:
                resp = jsonify({"enrolled_by": len(a)})
            else:
                resp = jsonify({"enrolled_by": 'no enrollments'})
            conn.commit()
        return resp
    finally:
        cur.close()
        cur1.close()
        conn.close()


def applicantjobs_count(naam):

    conn = mysql.connect()
    cur = conn.cursor(pymysql.cursors.DictCursor)
    cur1 = conn.cursor(pymysql.cursors.DictCursor)
    try:
        a = []
        cur.execute("Select job_id FROM job WHERE posted_by ='" +
                    str(naam['username'])+"';")
        if cur.rowcount > 0:
            for rec in cur:
                cur1.execute("Select user_id FROM enrolled_jobs WHERE job_id ='" +
                             str(rec['job_id'])+"';")
                if cur1.rowcount > 0:
                    for rr in cur1:
                        a.append(rr['user_id'])
                else:
                    continue
            if a != []:
                resp = jsonify({"enrolled_by": len(a)})
            else:
                resp = jsonify({"enrolled_by": 'no applicants'})
            conn.commit()
        return resp
    finally:
        cur.close()
        cur1.close()
        conn.close()
