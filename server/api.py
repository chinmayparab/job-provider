# -*- coding: utf-8 -*-
"""
Created on Tue Jun 23 17:56:30 2020

@author: user
"""

import pymysql
import python_jwt as jwt
import datetime
import requests
from functools import wraps
from app import app
from db_config import mysql
from flask import jsonify
from flask import flash, request, session, make_response, render_template
from werkzeug.security import generate_password_hash, check_password_hash
from functools import wraps


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


# ADMIN


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


@app.route('/admin/dashboard')
@check_for_token_admin
def admin_panel():
    try:
        conn = mysql.connect()
        cur = conn.cursor(pymysql.cursors.DictCursor)
        cur.execute("Select * from admin;")
        rows = cur.fetchall()
        resp = jsonify(rows)
        resp.status_code = 200
        return resp
    except Exception as e:
        print(e)
    finally:
        cur.close()
        conn.close()


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
            ) + datetime.timedelta(minutes=5)}, app.config['SECRET_KEY_ADMIN'])
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
