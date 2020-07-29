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


def create_course(naam):
    conn = mysql.connect()
    cur = conn.cursor(pymysql.cursors.DictCursor)
    try:
        cur.execute("INSERT INTO courses(posted_by,title,description,category,skills_taught,level,price,url) VALUES('" + str(naam['username'])+"','" + str(request.json['title'])+"','" +
                    str(request.json['description']) + "','"+str(request.json['category']) + "','"+str(request.json['skills_taught']) +
                    "','"+str(request.json['level']) + "',"+str(request.json['price']) + ",'"+str(request.json['url']) + "');")
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


def delete_course(naam):
    conn = mysql.connect()
    cur = conn.cursor(pymysql.cursors.DictCursor)
    try:
        cur.execute("DELETE FROM courses WHERE course_id ='"+str(
            request.json['course_id'])+"' and posted_by = '"+naam['username']+"';")
        conn.commit()
        if cur:
            resp = jsonify({'message': 'successfully deleted.'})
            resp.status_code = 200
            return resp
        resp = jsonify({'message': 'Invalid Course ID.'})
        resp.status_code = 401
        return resp
    finally:
        cur.close()
        conn.close()


def update_course(naam):
    conn = mysql.connect()
    cur = conn.cursor(pymysql.cursors.DictCursor)
    cur.execute("Select * from courses Where course_id = " +
                str(request.json['course_id'])+" and posted_by = '"+naam['username']+"';")
    records = cur.fetchall()
    try:
        if len(records) > 0:
            cur.execute("UPDATE courses SET description = '"+str(
                request.json['description'])+"', title = '"+str(request.json['title']) + "', category = '"+str(request.json['category']) +
                "', skills_taught = '"+str(request.json['skills_taught']) + "', level = '"+str(request.json['level']) + "', price = "+str(request.json['price']) +
                ", url = '" +
                str(request.json['url']) + "' WHERE course_id = "+str(
                    request.json['course_id'])+" and posted_by = '"+naam['username']+"';"
            )
            conn.commit()
            if cur:
                resp = jsonify({'message': 'success'})
                resp.status_code = 200
                return resp
            resp = jsonify({'message': 'Error.'})
            resp.status_code = 401
            return resp
        resp = jsonify({'message': 'No Courses with given Id found.'})
        resp.status_code = 403
        return resp
    finally:
        cur.close()
        conn.close()
