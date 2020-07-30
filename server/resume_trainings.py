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


def create_resume_trainings(naam):
    conn = mysql.connect()
    cur = conn.cursor(pymysql.cursors.DictCursor)
    try:
        cur.execute("INSERT INTO resume_trainings(user_id,program_name,organization_name,location,start_date,end_date,description) VALUES('"
                    + str(naam['user_id']) + "','"+str(request.json['program_name']) + "','"+str(request.json['organization_name']) +
                    "','"+str(request.json['location']) + "','"+str(request.json['start_date']) + "','"+str(request.json['end_date']) + "','"+str(request.json['description']) + "');")
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


def delete_resume_trainings(naam):
    conn = mysql.connect()
    cur = conn.cursor(pymysql.cursors.DictCursor)
    try:
        cur.execute("DELETE FROM resume_trainings WHERE user_id ='" +
                    str(naam['user_id'])+"';")
        conn.commit()
        if cur:
            resp = jsonify({'message': 'successfully deleted.'})
            resp.status_code = 200
            return resp
        resp = jsonify({'message': 'Invalid user ID.'})
        resp.status_code = 401
        return resp
    finally:
        cur.close()
        conn.close()


def update_resume_trainings(naam):
    conn = mysql.connect()
    cur = conn.cursor(pymysql.cursors.DictCursor)
    cur.execute("Select * from resume_trainings Where user_id = '" +
                str(naam['user_id'])+"';")
    records = cur.fetchall()
    try:
        if len(records) > 0:
            cur.execute("UPDATE resume_job_details SET program_name = '"+str(
                request.json['program_name'])+"', organiztion_name = '"+str(request.json['organiztion_name']) + "', location = '"+str(request.json['location']) +
                "', start_date = '"+str(request.json['start_date']) + "', end_date = '"+str(request.json['end_date']) + "', description = '"+str(request.json['description']) +
                "'  WHERE user_id = '"+str(naam['user_id'])+"';")
            conn.commit()
            if cur:
                resp = jsonify({'message': 'success'})
                resp.status_code = 200
                return resp
            resp = jsonify({'message': 'Error.'})
            resp.status_code = 401
            return resp
        resp = jsonify({'message': 'Invalid user ID.'})
        resp.status_code = 401
        return resp
    finally:
        cur.close()
        conn.close()
