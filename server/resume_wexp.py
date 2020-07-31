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


def create_resume_job_details(naam):
    conn = mysql.connect()
    cur = conn.cursor(pymysql.cursors.DictCursor)
    try:
        cur.execute("INSERT INTO resume_job_details(user_id,job_title,organiztion,job_location,start_date,end_date,description,type) VALUES('" +
                    str(naam['user_id'])+"','"+str(request.json['job_title']) + "','"+str(request.json['organization']) +
                    "','"+str(request.json['job_location']) + "','"+str(request.json['start_date']) + "','"+str(request.json['end_date']) +
                    "','"+str(request.json['description']) + "','"+str(request.json['type']) + "');")
        conn.commit()
        if cur:
            resp = jsonify({'message': 'success'})
            resp.status_code = 200
            return resp
        resp = jsonify({'message': 'Error.'})
        resp.status_code = 401
        return resp
    finally:
        cur.close()
        conn.close()


def delete_resume_job_details(naam):
    conn = mysql.connect()
    cur = conn.cursor(pymysql.cursors.DictCursor)
    try:
        cur.execute("DELETE FROM resume_job_details WHERE user_id ='" +
                    str(naam['user_id'])+"';")
        conn.commit()
        if cur:
            resp = jsonify({'message': 'successfully deleted.'})
            resp.status_code = 200
            return resp
        resp = jsonify({'message': 'Invalid User ID.'})
        resp.status_code = 401
        return resp
    finally:
        cur.close()
        conn.close()


def update_resume_job_details(naam):
    conn = mysql.connect()
    cur = conn.cursor(pymysql.cursors.DictCursor)
    cur.execute("Select * from resume_job_details Where user_id = '" +
                str(naam['user_id'])+"';")
    records = cur.fetchall()
    try:
        if len(records) > 0:
            cur.execute("UPDATE resume_job_details SET job_title = '"+str(
                request.json['jobtitle'])+"', organiztion = '"+str(request.json['organiztion']) + "', job_location = '"+str(request.json['job_location']) +
                "', start_date = '"+str(request.json['start_date']) + "', end_date = '"+str(request.json['end_date']) +
                "', description = '"+str(request.json['description']) +
                "', type = '"+str(request.json['type']) + "'  WHERE user_id = '"+str(naam['user_id'])+"';")
            conn.commit()
            if cur:
                resp = jsonify({'message': 'success'})
                resp.status_code = 200
                return resp
            resp = jsonify({'message': 'Error.'})
            resp.status_code = 401
            return resp
        resp = jsonify({'message': 'Invalid User ID.'})
        resp.status_code = 401
        return resp
    finally:
        cur.close()
        conn.close()
