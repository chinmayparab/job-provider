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


def fetch_pd(naam):
    conn = mysql.connect()
    cur = conn.cursor(pymysql.cursors.DictCursor)
    cur.execute("Select * from resume Where user_id = '" +
                str(naam['username'])+"';")
    records = cur.fetchall()
    if len(records) > 0:
        return records
    return 'empty'


def fetch_edu(naam):
    conn = mysql.connect()
    cur = conn.cursor(pymysql.cursors.DictCursor)
    cur.execute("Select * from resume_edu_details Where user_id = '" +
                str(naam['username'])+"';")
    records = cur.fetchall()
    if len(records) > 0:
        return records
    return 'empty'


def fetch_jobs(naam):
    conn = mysql.connect()
    cur = conn.cursor(pymysql.cursors.DictCursor)
    cur.execute("Select * from resume_job_details Where user_id = '" +
                str(naam['username'])+"';")
    records = cur.fetchall()
    if len(records) > 0:
        return records
    return 'empty'


def fetch_projects(naam):
    conn = mysql.connect()
    cur = conn.cursor(pymysql.cursors.DictCursor)
    cur.execute("Select * from resume_projects Where user_id = '" +
                str(naam['username'])+"';")
    records = cur.fetchall()
    if len(records) > 0:
        return records
    return 'empty'


def fetch_skills(naam):
    conn = mysql.connect()
    cur = conn.cursor(pymysql.cursors.DictCursor)
    cur.execute("Select * from resume_skills Where user_id = '" +
                str(naam['username'])+"';")
    records = cur.fetchall()
    if len(records) > 0:
        return records
    return 'empty'


def fetch_trainings(naam):
    conn = mysql.connect()
    cur = conn.cursor(pymysql.cursors.DictCursor)
    cur.execute("Select * from resume_trainings Where user_id = '" +
                str(naam['username'])+"';")
    records = cur.fetchall()
    if len(records) > 0:
        return records
    return 'empty'


def fetch_wexamples(naam):
    conn = mysql.connect()
    cur = conn.cursor(pymysql.cursors.DictCursor)
    cur.execute("Select * from resume_work_examples Where user_id = '" +
                str(naam['username'])+"';")
    records = cur.fetchall()
    if len(records) > 0:
        return records
    return 'empty'


def fetch_all(naam):

    personal_details = fetch_pd(naam)

    edu_details = fetch_edu(naam)

    job_details = fetch_jobs(naam)

    projects_list = fetch_projects(naam)

    skills_list = fetch_skills(naam)

    trainings_list = fetch_trainings(naam)

    work_examples = fetch_wexamples(naam)

    print(personal_details, edu_details, job_details,
          projects_list, skills_list, trainings_list, work_examples)

    resp = jsonify({'personal_details': personal_details, 'edu_details': edu_details, 'job_details':
                    job_details, 'projects_list': projects_list, 'skills_list':
                    skills_list, 'trainings_list': trainings_list, 'work_examples': work_examples})
    resp.status_code = 200
    return resp
