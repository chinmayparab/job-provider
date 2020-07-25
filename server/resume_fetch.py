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


def fetch_pd():
    conn = mysql.connect()
    cur = conn.cursor(pymysql.cursors.DictCursor)
    cur.execute("Select * from resume Where user_id = '" +
                str(request.json['user_id'])+"';")
    records = cur.fetchall()
    if len(records) > 0:
        return records
    return 'empty'


def fetch_edu():
    conn = mysql.connect()
    cur = conn.cursor(pymysql.cursors.DictCursor)
    cur.execute("Select * from resume_edu_details Where user_id = '" +
                str(request.json['user_id'])+"';")
    records = cur.fetchall()
    if len(records) > 0:
        return records
    return 'empty'


def fetch_jobs():
    conn = mysql.connect()
    cur = conn.cursor(pymysql.cursors.DictCursor)
    cur.execute("Select * from resume_job_details Where user_id = '" +
                str(request.json['user_id'])+"';")
    records = cur.fetchall()
    if len(records) > 0:
        return records
    return 'empty'


def fetch_projects():
    conn = mysql.connect()
    cur = conn.cursor(pymysql.cursors.DictCursor)
    cur.execute("Select * from resume_projects Where user_id = '" +
                str(request.json['user_id'])+"';")
    records = cur.fetchall()
    if len(records) > 0:
        return records
    return 'empty'


def fetch_skills():
    conn = mysql.connect()
    cur = conn.cursor(pymysql.cursors.DictCursor)
    cur.execute("Select * from resume_skills Where user_id = '" +
                str(request.json['user_id'])+"';")
    records = cur.fetchall()
    if len(records) > 0:
        return records
    return 'empty'


def fetch_trainings():
    conn = mysql.connect()
    cur = conn.cursor(pymysql.cursors.DictCursor)
    cur.execute("Select * from resume_trainings Where user_id = '" +
                str(request.json['user_id'])+"';")
    records = cur.fetchall()
    if len(records) > 0:
        return records
    return 'empty'


def fetch_wexamples():
    conn = mysql.connect()
    cur = conn.cursor(pymysql.cursors.DictCursor)
    cur.execute("Select * from resume_work_examples Where user_id = '" +
                str(request.json['user_id'])+"';")
    records = cur.fetchall()
    if len(records) > 0:
        return records
    return 'empty'


def fetch_all():

    personal_details = fetch_pd()

    edu_details = fetch_edu()

    job_details = fetch_jobs()

    projects_list = fetch_projects()

    skills_list = fetch_skills()

    trainings_list = fetch_trainings()

    work_examples = fetch_wexamples()

    print(personal_details, edu_details, job_details,
          projects_list, skills_list, trainings_list, work_examples)

    resp = jsonify({'personal_details': personal_details, 'edu_details': edu_details, 'job_details':
                    job_details, 'projects_list': projects_list, 'skills_list':
                    skills_list, 'trainings_list': trainings_list, 'work_examples': work_examples})
    resp.status_code = 200
    return resp
