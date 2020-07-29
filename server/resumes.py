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


def create_resume(naam):
    conn = mysql.connect()
    cur = conn.cursor(pymysql.cursors.DictCursor)
    try:
        cur.execute("INSERT INTO resume(resume_id,user_id,email,location,phone_no,additional_details) VALUES('" +
                    get_random_alphanumeric_string(8)+"','"+str(naam['user_id']) + "','"+str(request.json['email']) + "','"+str(request.json['location']) +
                    "','"+str(request.json['phone_no']) + "','"+str(request.json['additional_details']) + "');")
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


def delete_resume(naam):
    conn = mysql.connect()
    cur = conn.cursor(pymysql.cursors.DictCursor)
    try:
        cur.execute("DELETE FROM resume WHERE user_id ='" +
                    str(naam['user_id'])+"';")
        conn.commit()
        if cur:
            resp = jsonify({'message': 'successfully deleted.'})
            resp.status_code = 200
            return resp
        resp = jsonify({'message': 'Invalid RESUME ID.'})
        resp.status_code = 401
        return resp
    finally:
        cur.close()
        conn.close()


def update_resume(naam):
    conn = mysql.connect()
    cur = conn.cursor(pymysql.cursors.DictCursor)
    cur.execute("Select * from resume Where user_id = '" +
                str(naam['user_id'])+"';")
    records = cur.fetchall()
    try:
        if len(records) > 0:
            cur.execute("UPDATE resume SET email = '"+str(
                request.json['email'])+"', location = '"+str(request.json['location']) + "', phone_no = '"+str(request.json['phone_no']) +
                "', additional_details = '"+str(request.json['additional_details']) + "' WHERE user_id = '"+str(naam['user_id'])+"';")
            conn.commit()
            if cur:
                resp = jsonify({'message': 'success'})
                resp.status_code = 200
                return resp
            resp = jsonify({'message': 'Error.'})
            resp.status_code = 401
            return resp
        resp = jsonify({'message': 'No resume with given User ID found.'})
        resp.status_code = 401
        return resp
    finally:
        cur.close()
        conn.close()
