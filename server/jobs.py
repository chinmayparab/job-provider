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
import datetime


def get_random_alphanumeric_string(length):
    letters_and_digits = string.ascii_letters + string.digits
    result_str = ''.join((random.choice(letters_and_digits)
                          for i in range(length)))
    return result_str


def create_job(naam):
    conn = mysql.connect()
    cur = conn.cursor(pymysql.cursors.DictCursor)
    try:
        datetimee = datetime.datetime.fromtimestamp(
            int(request.json['closing_date']) / 1e3).strftime("%Y-%m-%d %H:%M:%S")
        date_int = datetime.datetime.fromtimestamp(
            int(request.json['datetime_interview']) / 1e3).strftime("%Y-%m-%d %H:%M:%S")
        cur.execute("INSERT INTO job(posted_by,job_id,closing_date,description,pos_names,no_postions,stipend,qualification,extra_info,interview_mode,interveiw_loc,date_time_interview,is_online_test) VALUES('" + str(naam['username'])+"','" +
                    get_random_alphanumeric_string(8)+"','"+str(datetimee) + "','"+str(request.json['description']) + "','"+str(request.json['jobtitle']) +
                    "','"+str(request.json['vacancies']) + "','"+str(request.json['stipend']) + "','"+str(request.json['qualification']) + "','"+str(request.json['extra_info']) +
                    "','"+str(request.json['interview_mode'])+"','" + str(request.json['interview_location']) + "','"+str(date_int) + "','"+str(request.json['is_onlinetest']) + "');")
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


def delete_job(naam):
    conn = mysql.connect()
    cur = conn.cursor(pymysql.cursors.DictCursor)
    try:
        cur.execute("DELETE FROM job WHERE job_id ='"+str(
            request.json['job_id'])+"' and posted_by = '"+naam['username']+"';")
        conn.commit()
        if cur:
            resp = jsonify({'message': 'successfully deleted.'})
            resp.status_code = 200
            return resp
        resp = jsonify({'message': 'Invalid Job ID.'})
        resp.status_code = 401
        return resp
    finally:
        cur.close()
        conn.close()


def update_job(naam):
    conn = mysql.connect()
    cur = conn.cursor(pymysql.cursors.DictCursor)
    cur.execute("Select * from job Where job_id = '" +
                str(request.json['job_id'])+"' and posted_by = '"+naam['username']+"';")
    records = cur.fetchall()
    try:
        if len(records) > 0:
            datetimee = datetime.datetime.fromtimestamp(
                int(request.json['closing_date']) / 1e3).strftime("%Y-%m-%d %H:%M:%S")
            date_int = datetime.datetime.fromtimestamp(
                int(request.json['datetime_interview']) / 1e3).strftime("%Y-%m-%d %H:%M:%S")
            cur.execute("UPDATE job SET description = '"+str(
                request.json['description'])+"', closing_date = '" + str(datetimee) + "', pos_names = '"+str(request.json['jobtitle']) +
                "', no_postions = '"+str(request.json['vacancies']) + "', stipend = '"+str(request.json['stipend']) + "', qualification = '"+str(request.json['qualification']) +
                "', extra_info = '"+str(request.json['extra_info']) + "', interview_mode = '"+str(request.json['interview_mode']) + "', interveiw_loc = '"+str(request.json['interview_location']) +
                "', date_time_interview = '"+str(date_int) + "', is_online_test = '"+str(
                    request.json['is_onlinetest']) + "' WHERE job_id = '"+str(request.json['job_id'])+"' and posted_by = '"+naam['username']+" ';"
            )
            conn.commit()
            if cur:
                resp = jsonify({'message': 'success'})
                resp.status_code = 200
                return resp
            resp = jsonify({'message': 'Error.'})
            resp.status_code = 401
            return resp
        resp = jsonify({'message': 'No jobs with given Id found.'})
        resp.status_code = 403
        return resp
    finally:
        cur.close()
        conn.close()
