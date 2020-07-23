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


def get_random_alphanumeric_string(length):
    letters_and_digits = string.ascii_letters + string.digits
    result_str = ''.join((random.choice(letters_and_digits)
                          for i in range(length)))
    return result_str


def create_job():
    conn = mysql.connect()
    cur = conn.cursor(pymysql.cursors.DictCursor)
    try:
        cur.execute("INSERT INTO job(job_id,closing_date,description,pos_names,no_postions,stipend,qualification,extra_info,interview_mode,interveiw_loc,date_time_interview,is_online_test) VALUES('" +
                    get_random_alphanumeric_string(8)+"','"+str(request.json['closing_date']) + "','"+str(request.json['description']) + "','"+str(request.json['jobtitle']) +
                    "','"+str(request.json['vacancies']) + "','"+str(request.json['stipend']) + "','"+str(request.json['qualification']) + "','"+str(request.json['extra_info']) +
                    "','"+str(request.json['interview_mode']) + "','"+str(request.json['interview_location']) + "','"+str(request.json['datetime_interview']) + "','"+str(request.json['is_onlinetest']) + "');")
        conn.commit()
        if cur:
            resp = jsonify({'message': 'success'})
            resp.status_code = 200
            return resp
        resp = jsonify({'message': 'Error.'})
        return resp
    finally:
        cur.close()
        conn.close()


def delete_job():
    conn = mysql.connect()
    cur = conn.cursor(pymysql.cursors.DictCursor)
    try:
        cur.execute("DELETE FROM job WHERE job_id ='"+str(
            request.json['jobid'])+"';")
        conn.commit()
        if cur:
            resp = jsonify({'message': 'successfully deleted.'})
            resp.status_code = 200
            return resp
        resp = jsonify({'message': 'Invalid Job ID.'})
        return resp
    finally:
        cur.close()
        conn.close()


def update_job():
    conn = mysql.connect()
    cur = conn.cursor(pymysql.cursors.DictCursor)
    try:
        cur.execute("UPDATE job SET description = '"+str(
            request.json['description'])+"', closing_date = '"+str(request.json['closing_date']) + "', pos_names = '"+str(request.json['jobtitle']) +
            "', no_postions = '"+str(request.json['vacancies']) + "', stipend = '"+str(request.json['stipend']) + "', qualification = '"+str(request.json['qualification']) +
            "', extra_info = '"+str(request.json['extra_info']) + "', interview_mode = '"+str(request.json['interview_mode']) + "', interveiw_loc = '"+str(request.json['interview_location']) +
            "', date_time_interview = '"+str(request.json['datetime_interview']) + "', is_online_test = '"+str(request.json['is_onlinetest']) + "' WHERE job_id = '"+str(request.json['jobid'])+"';")
        conn.commit()
        if cur:
            resp = jsonify({'message': 'success'})
            resp.status_code = 200
            return resp
        resp = jsonify({'message': 'Error.'})
        return resp
    finally:
        cur.close()
        conn.close()
