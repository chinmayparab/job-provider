# -*- coding: utf-8 -*-
"""
Created on Tue Jun 23 17:56:30 2020

@author: user
"""

import pymysql
import jwt
import datetime
import requests
from app import app
from db_config import mysql
from flask import jsonify
from flask import flash, request, session, make_response, render_template, Response
from werkzeug.security import generate_password_hash, check_password_hash
from functools import wraps
from flask_cors import CORS

from werkzeug.utils import secure_filename
import os
import jsonpickle
import numpy as np
import cv2
# importing files named ocr extractpdf
import ocr as ocr  # not a python package.
import extractpdf as extractpdf  # not a python package.
import jobs as job  # not a python package.

CORS(app)


# USER SIDE REQUESTS.

def check_for_token(param):
    @wraps(param)
    def wrapped(*args, **kwargs):
        token = request.args.get('token')
        if not token:
            return jsonify({'message': 'Missing Token'}), 403
        try:
            data = jwt.decode(token, app.config['SECRET_KEY'])
        except:
            return jsonify({'message': 'Invalid Token'}), 403
        return param(*args, **kwargs)
    return wrapped


@app.route('/user')
@check_for_token
def user():
    try:
        conn = mysql.connect()
        cur = conn.cursor(pymysql.cursors.DictCursor)
        cur.execute("Select * from users;")
        rows = cur.fetchall()
        resp = jsonify(rows)
        resp.status_code = 200
        return resp
    except Exception as e:
        print(e)
    finally:
        cur.close()
        conn.close()


@app.route('/login', methods=['POST'])
def login():
    app.config["SECRET_KEY"] = "SIh2020jobocr"
    conn = mysql.connect()
    cur = conn.cursor(pymysql.cursors.DictCursor)
    if(request.json['type'] == 0):
        cur.execute("Select * from users Where phone_no = " +
                    str(request.json['contact'])+";")
        rows = cur.rowcount
        if rows != 0:
            token = jwt.encode({'number': request.json['contact'], 'exp': datetime.datetime.utcnow(
            ) + datetime.timedelta(seconds=120)}, app.config['SECRET_KEY'])
            print(token.decode('utf-8'))
            resp = jsonify({'token': token.decode('utf-8')})
            resp.status_code = 200
            return resp
        else:
            resp = jsonify({'message': 'ERROR Occured.'})
            return resp
        cur.close()
        conn.close()
    elif (request.json['type'] == 1):
        cur.execute("Select passw from users Where phone_no = " +
                    str(request.json['contact'])+";")
        records = cur.fetchall()
        for row in records:
            if check_password_hash(row["passw"], request.json['password']):
                token = jwt.encode({'number': request.json['contact'], 'exp': datetime.datetime.utcnow(
                ) + datetime.timedelta(seconds=120)}, app.config['SECRET_KEY'])
                print(token.decode('utf-8'))
                resp = jsonify({'token': token.decode('utf-8')})
                resp.status_code = 200
                return resp
            else:
                resp = jsonify({'message': 'ERROR Occured.'})
                return resp
            cur.close()
            conn.close()
    else:
        resp = jsonify({'message': 'ERROR.'})
        return resp


@app.route('/register', methods=['POST'])
def register():
    conn = mysql.connect()
    cur = conn.cursor(pymysql.cursors.DictCursor)
    try:
        check = cur.execute("SELECT  phone_no FROM users WHERE ( email = '"+str(
            request.json['email'])+"' AND phone_no = '"+str(request.json['contact'])+"');")
        if check:
            resp = jsonify({'message': 'User already Exists!!'})
            resp.status_code = 300  # invalid
            return resp
        else:
            cur.execute("Insert into users(email,lname,fname,passw,is_verified,phone_no) VALUES ('"+str(request.json['email'])+"','"+str(
                request.json['lname'])+"','"+str(request.json['fname'])+"','"+generate_password_hash(str(request.json['passw']))
                + "',1,'"+str(request.json['contact'])+"');")
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


# ADMIN SIDE REQUESTS.


def check_for_token_admin(param):
    @wraps(param)
    def wrapped(*args, **kwargs):
        token = request.args.get('token')
        if not token:
            return jsonify({'message': 'Missing Token'}), 403
        try:
            data = jwt.decode(token, app.config['SECRET_KEY_ADMIN'])
        except:
            return jsonify({'message': 'Invalid Token'}), 403
        return param(*args, **kwargs)
    return wrapped


@app.route('/admin/login', methods=['POST'])
def admin_login():
    app.config["SECRET_KEY_ADMIN"] = "SIH2020ADMIN"
    conn = mysql.connect()
    cur = conn.cursor(pymysql.cursors.DictCursor)

    cur.execute("Select password from admin Where username = '" +
                str(request.json['username'])+"';")
    records = cur.fetchall()
    for row in records:
        if check_password_hash(row["password"], request.json['password']):
            token = jwt.encode({'username': request.json['username'], 'exp': datetime.datetime.utcnow(
            ) + datetime.timedelta(minutes=10)}, app.config['SECRET_KEY_ADMIN'])
            print(token.decode('utf-8'))
            resp = jsonify({'token': token.decode('utf-8')})
            resp.status_code = 200
            return resp
        else:
            resp = jsonify({'message': 'ERROR Occured.'})
            return resp
        cur.close()
        conn.close()


@app.route('/admin/register', methods=['POST'])
def admin_register():
    conn = mysql.connect()
    cur = conn.cursor(pymysql.cursors.DictCursor)
    try:
        cur.execute("Insert into admin(username,password) VALUES ('"+str(
            request.json['username'])+"','"+generate_password_hash(str(request.json['password'])) + "');")
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


@app.route('/admin/post-job', methods=['POST'])
@check_for_token_admin
def upload_file():
    s = []
    # check if the post request has the file part
    if 'file' not in request.files:
        resp = jsonify({'message': 'No file part in the request'})
        resp.status_code = 400
        return resp
    file = request.files['file']
    if file.filename == '':
        resp = jsonify({'message': 'No file selected for uploading'})
        resp.status_code = 400
        return resp
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        s = extractpdf.yoohoo(filename)
        resp = jsonify({"Description": s[0]["Description"], "Links": s[0]["Links"], "NameOfPosition": s[0]
                        ["NameOfPosition"], "NumberOfPosition": s[0]["NumberOfPosition"], "Stipend": s[0]["Stipend"], "Bubbles-extras": s[0]["AllText"].split('\n\n')})
        resp.status_code = 201
        return resp
    else:
        resp = jsonify(
            {'message': 'Allowed file type is .pdf only.'})
        resp.status_code = 400
        return resp


def allowed_file(filename):
    ALLOWED_EXTENSIONS = set(['pdf'])
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/extraction', methods=['POST'])
def test():
    r = request
# convert string of image data to uint8
    nparr = np.fromstring(r.data, np.uint8)
    # decode image
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    # do some fancy processing here....
    a, b, c, d, e, f = ocr.ocr(img)
    # build a response dict to send back to client
    response = {'NameOfPosition': a, 'NumberOfPosition': b, 'Stipend': c, 'Description': d, 'AllText': e, 'Links': f
                }
    # encode response using jsonpickle
    response_pickled = jsonpickle.encode(response)

    return Response(response=response_pickled, status=200, mimetype="application/json")


@app.route('/cud_job', methods=['POST'])
@check_for_token_admin
def crud_job():

    if(request.json['mode'] == "add"):
        resp = job.create_job()
        return resp
    elif(request.json['mode'] == "delete"):
        resp = job.delete_job()
        return resp
    elif(request.json['mode'] == "update"):
        resp = job.update_job()
        return resp
    else:
        resp = jsonify({'message': 'Invalid Request.'})
        return resp


@app.errorhandler(404)
def not_found(error=None):
    message = {
        'status': 404,
        'message': 'Not Found ' + request.url,
    }

    resp = jsonify(message)
    resp.status_code = 404

    return resp


if __name__ == "__main__":
    app.run()
