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


def create_resume_projects(naam):
    conn = mysql.connect()
    cur = conn.cursor(pymysql.cursors.DictCursor)
    try:
        cur.execute("INSERT INTO resume_projects(user_id,title,start_month,end_month,description,project_link) VALUES('" + str(naam['user_id']) +
                    "','"+str(request.json['title']) + "','"+str(request.json['start_month']) +
                    "','"+str(request.json['end_month']) + "','"+str(request.json['description']) + "','"+str(request.json['project_link'])+"');")
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


def delete_resume_projects(naam):
    conn = mysql.connect()
    cur = conn.cursor(pymysql.cursors.DictCursor)
    try:
        cur.execute("DELETE FROM resume_projects WHERE user_id ='" +
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


def update_resume_projects(naam):
    conn = mysql.connect()
    cur = conn.cursor(pymysql.cursors.DictCursor)
    cur.execute("Select * from resume_projects Where user_id = '" +
                str(naam['user_id'])+"';")
    records = cur.fetchall()
    try:
        if len(records) > 0:
            cur.execute("UPDATE resume_projects SET title = '"+str(
                request.json['title'])+"', start_month = '"+str(request.json['start_month']) + "', end_month = '"+str(request.json['end_month']) +
                "', description = '"+str(request.json['description'])+"', project_link = '"+str(request.json['project_link']) +
                "' WHERE user_id = '"+str(naam['user_id'])+"';")
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
