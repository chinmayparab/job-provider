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


def create_resume_skills(naam):
    conn = mysql.connect()
    cur = conn.cursor(pymysql.cursors.DictCursor)
    try:
        cur.execute("INSERT INTO resume_skills(user_id,skill_id,level) VALUES('" + str(naam['user_id']) + "','"+str(request.json['skill_id']) +
                    "','"+str(request.json['level'])+"');")
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


def delete_resume_skills(naam):
    conn = mysql.connect()
    cur = conn.cursor(pymysql.cursors.DictCursor)
    try:
        cur.execute("DELETE FROM resume_skills WHERE user_id ='" +
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


def update_resume_skills(naam):
    conn = mysql.connect()
    cur = conn.cursor(pymysql.cursors.DictCursor)
    cur.execute("Select * from resume_skills Where user_id = '" +
                str(naam['user_id'])+"';")
    records = cur.fetchall()
    try:
        if len(records) > 0:
            cur.execute("UPDATE resume_skills SET skill_id = '"+str(
                request.json['skill_id'])+"', level = '"+str(request.json['level']) +
                "' WHERE user_id = '"+str(naam['user_id'])+"';")
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
