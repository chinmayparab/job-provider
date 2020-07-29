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

import resumes as resume  # not a python package.
import resume_edu as r_edu  # not a python package.
import resume_work as r_work  # not a python package.
import resume_skills as r_skills  # not a python package.
import resume_projects as r_projects  # not a python package.
import resume_trainings as r_trainings  # not a python package.
import resume_wexp as r_wexp  # not a python package.
import resume_fetch as getresume  # not a python package.

import user_apis as user_side
import no_auth_apis as no_auth
import courses as courses
CORS(app)

# Fetch All Courses


@app.route('/allcourses', methods=['POST'])
def all_courses():
    response = no_auth.all_courses()
    return response


# Fetch All Skills
@app.route('/allskills', methods=['POST'])
def all_skills():
    response = no_auth.all_skills()
    return response

# Fetch jobs


@app.route('/fetch-jobs', methods=['POST'])
def fetch_jobs():
    response = no_auth.fetch_jobs()
    return response

# USER SIDE REQUESTS.


def check_for_token(param):
    @wraps(param)
    def wrapped(*args, **kwargs):
        token = ''
        if 'Authorization' in request.headers:
            token = request.headers['Authorization']
        # token = request.args.get('token')
        if not token:
            return jsonify({'message': 'Missing Token'}), 403
        try:
            data = jwt.decode(token, app.config['SECRET_KEY'])
            # can use this data to fetch current user with contact number encoded in token
        except:
            return jsonify({'message': 'Invalid Token'}), 403
        return param(*args, **kwargs)
    return wrapped


# Get current active user
@app.route('/user')
@check_for_token
def user():
    response = user_side.user()
    return response


@app.route('/login', methods=['POST'])
def login():
    app.config["SECRET_KEY"] = "SIh2020jobocr"
    conn = mysql.connect()
    cur = conn.cursor(pymysql.cursors.DictCursor)
    if(request.json['type'] == 0):
        cur.execute("Select * from users Where phone_no = " +
                    str(request.json['contact'])+";")
        rows = cur.rowcount
        records = cur.fetchall()
        if rows != 0:
            for data in records:
                token = jwt.encode({'number': request.json['contact'], 'user_id': data["user_id"],  'exp': datetime.datetime.utcnow(
                ) + datetime.timedelta(minutes=120)}, app.config['SECRET_KEY'])
                print(token.decode('utf-8'))
                resp = jsonify({'token': token.decode('utf-8')})
                resp.status_code = 200
                return resp
        else:
            resp = jsonify({'message': 'ERROR Occured.'})
            resp.status_code = 401
            return resp
        cur.close()
        conn.close()
    elif (request.json['type'] == 1):
        cur.execute("Select user_id,passw from users Where phone_no = " +
                    str(request.json['contact'])+";")
        records = cur.fetchall()
        for row in records:
            if check_password_hash(row["passw"], request.json['password']):
                token = jwt.encode({'number': request.json['contact'],  'user_id': row["user_id"], 'exp': datetime.datetime.utcnow(
                ) + datetime.timedelta(minutes=120)}, app.config['SECRET_KEY'])
                print(token.decode('utf-8'))
                resp = jsonify({'token': token.decode('utf-8')})
                resp.status_code = 200
                return resp
            else:
                resp = jsonify({'message': 'ERROR Occured.'})
                resp.status_code = 401
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
            resp.status_code = 401
            return resp
    finally:
        cur.close()
        conn.close()


@app.route('/resume-details', methods=['POST'])
# @check_for_token
def get_resume():
    token = request.headers['Authorization']
    username = jwt.decode(token, app.config['SECRET_KEY'])
    if(request.json['want'] == "personaldetails"):
        results = getresume.fetch_pd(username)
        resp = jsonify({'output': results})
        resp.status_code = 200
        return resp
    elif(request.json['want'] == "edu_details"):
        results = getresume.fetch_edu(username)
        resp = jsonify({'output': results})
        resp.status_code = 200
        return resp
    elif(request.json['want'] == "job_details"):
        results = getresume.fetch_jobs(username)
        resp = jsonify({'output': results})
        resp.status_code = 200
        return resp
    elif(request.json['want'] == "projects_lists"):
        results = getresume.fetch_projects(username)
        resp = jsonify({'output': results})
        resp.status_code = 200
        return resp
    elif(request.json['want'] == "skills_list"):
        results = getresume.fetch_skills(username)
        resp = jsonify({'output': results})
        resp.status_code = 200
        return resp
    elif(request.json['want'] == "trainings_list"):
        results = getresume.fetch_trainings(username)
        resp = jsonify({'output': results})
        resp.status_code = 200
        return resp
    elif(request.json['want'] == "work_examples"):
        results = getresume.fetch_wexamples(username)
        resp = jsonify({'output': results})
        resp.status_code = 200
        return resp
    elif(request.json['want'] == "everything"):
        resp = getresume.fetch_all(username)
        return resp
    else:
        resp = jsonify({'message': 'Invalid Request.'})
        return resp


@app.route('/resume', methods=['POST'])
@check_for_token
def cud_resume():
    token = request.headers['Authorization']
    username = jwt.decode(token, app.config['SECRET_KEY'])
    if(request.json['mode'] == "add"):
        resp = resume.create_resume(username)
        return resp
    elif(request.json['mode'] == "delete"):
        resp = resume.delete_resume(username)
        return resp
    elif(request.json['mode'] == "update"):
        resp = resume.update_resume(username)
        return resp
    else:
        resp = jsonify({'message': 'Invalid Request.'})
        return resp


@app.route('/resume-edu', methods=['POST'])
@check_for_token
def cud_resume_edu():
    token = request.headers['Authorization']
    username = jwt.decode(token, app.config['SECRET_KEY'])
    if(request.json['mode'] == "add"):
        resp = r_edu.create_resume_edu(username)
        return resp
    elif(request.json['mode'] == "delete"):
        resp = r_edu.delete_resume_edu(username)
        return resp
    elif(request.json['mode'] == "update"):
        resp = r_edu.update_resume_edu(username)
        return resp
    else:
        resp = jsonify({'message': 'Invalid Request.'})
        return resp


@app.route('/resume-work', methods=['POST'])
@check_for_token
def cud_resume_work():
    token = request.headers['Authorization']
    username = jwt.decode(token, app.config['SECRET_KEY'])
    if(request.json['mode'] == "add"):
        resp = r_work.create_resume_w()
        return resp
    elif(request.json['mode'] == "delete"):
        resp = r_work.delete_resume_w()
        return resp
    elif(request.json['mode'] == "update"):
        resp = r_work.update_resume_w()
        return resp
    else:
        resp = jsonify({'message': 'Invalid Request.'})
        return resp


@app.route('/resume-trainings', methods=['POST'])
@check_for_token
def cud_resume_trainings():
    token = request.headers['Authorization']
    username = jwt.decode(token, app.config['SECRET_KEY'])
    if(request.json['mode'] == "add"):
        resp = r_trainings.create_resume_trainings(username)
        return resp
    elif(request.json['mode'] == "delete"):
        resp = r_trainings.delete_resume_trainings(username)
        return resp
    elif(request.json['mode'] == "update"):
        resp = r_trainings.update_resume_trainings(username)
        return resp
    else:
        resp = jsonify({'message': 'Invalid Request.'})
        return resp


@app.route('/resume-workexp', methods=['POST'])
@check_for_token
def cud_resume_workexp():
    token = request.headers['Authorization']
    username = jwt.decode(token, app.config['SECRET_KEY'])
    if(request.json['mode'] == "add"):
        resp = r_wexp.create_resume_job_details(username)
        return resp
    elif(request.json['mode'] == "delete"):
        resp = r_wexp.delete_resume_job_details(username)
        return resp
    elif(request.json['mode'] == "update"):
        resp = r_wexp.update_resume_job_details(username)
        return resp
    else:
        resp = jsonify({'message': 'Invalid Request.'})
        return resp


@app.route('/resume-skills', methods=['POST'])
@check_for_token
def cud_resume_skills():
    token = request.headers['Authorization']
    username = jwt.decode(token, app.config['SECRET_KEY'])
    if(request.json['mode'] == "add"):
        resp = r_skills.create_resume_skills(username)
        return resp
    elif(request.json['mode'] == "delete"):
        resp = r_skills.delete_resume_skills(username)
        return resp
    elif(request.json['mode'] == "update"):
        resp = r_skills.update_resume_skills(username)
        return resp
    else:
        resp = jsonify({'message': 'Invalid Request.'})
        return resp


@app.route('/resume-projects', methods=['POST'])
@check_for_token
def cud_resume_projects():
    token = request.headers['Authorization']
    username = jwt.decode(token, app.config['SECRET_KEY'])
    if(request.json['mode'] == "add"):
        resp = r_projects.create_resume_projects(username)
        return resp
    elif(request.json['mode'] == "delete"):
        resp = r_projects.delete_resume_projects(username)
        return resp
    elif(request.json['mode'] == "update"):
        resp = r_projects.update_resume_projects(username)
        return resp
    else:
        resp = jsonify({'message': 'Invalid Request.'})
        return resp


# Get active user's applied jobs
@app.route('/user-applied-jobs')
@check_for_token
def user_applied_jobs():
    response = user_side.applied_jobs()
    return response


# Get active user's enrolled courses
@app.route('/user-enrolled-courses')
@check_for_token
def user_enrolled_courses():
    response = user_side.my_courses()
    return response


# ADMIN SIDE REQUESTS.


def check_for_token_admin(param):
    @wraps(param)
    def wrapped(*args, **kwargs):
        token = ''
        if 'Authorization' in request.headers:
            token = request.headers['Authorization']
        if not token:
            return jsonify({'message': 'Missing Token'}), 403
        try:
            data = jwt.decode(token, app.config['SECRET_KEY_ADMIN'])
            rew = data["username"]
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
            ) + datetime.timedelta(minutes=1440)}, app.config['SECRET_KEY_ADMIN'])
            print(token.decode('utf-8'))
            resp = jsonify({'token': token.decode('utf-8')})
            resp.status_code = 200
            return resp
        else:
            resp = jsonify({'message': 'ERROR Occured.'})
            resp.status_code = 401
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
        resp.status_code = 401
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

        main = []
        name = []
        pos = []
        sti = []
        desc = []
        lonk = []
        alt = []
        alt = ''

        for i in range(len(s)):
            print(i)
            for j in s[i]['NameOfPosition']:
                name.append(j)
            for j in s[i]['NumberOfPosition']:
                pos.append(j)
            for j in s[i]['Stipend']:
                sti.append(j)
            for j in s[i]['Description']:
                desc.append(j)
            for j in s[i]['Links']:
                lonk.append(j)
            alt = alt+''+s[i]['AllText']


# print(len(name), len(pos), len(sti), len(desc))

        for i in range(len(name)):
            try:
                a = name[i]
            except:
                a = ''
            try:
                b = pos[i]
            except:
                b = ''
            try:
                c = sti[i]
            except:
                c = ''
            try:
                d = desc[i]
            except:
                d = ''
            try:
                e = lonk[i]
            except:
                e = ''
            ssh = {'NameOfPosition': a, 'NumberOfPosition': b,
                   'Stipend': c, 'Description': d, 'Links': e}
            main.append(ssh)

        resp = jsonify({"jobs": main, "all-text-bubbles": alt.split("\n\n")})
        resp.status_code = 200
        return resp
    # else:
    #     resp = jsonify(
    #         {'message': 'Allowed file type is .pdf only.'})
    #     resp.status_code = 400
    #     return resp


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


@app.route('/admin/cud_job', methods=['POST'])
@check_for_token_admin
def crud_job():
    token = request.headers['Authorization']
    username = jwt.decode(token, app.config['SECRET_KEY_ADMIN'])

    if(request.json['mode'] == "add"):
        resp = job.create_job(username)
        return resp
    elif(request.json['mode'] == "delete"):
        resp = job.delete_job(username)
        return resp
    elif(request.json['mode'] == "update"):
        resp = job.update_job(username)
        return resp
    else:
        resp = jsonify({'message': 'Invalid Request.'})
        return resp


@app.route('/admin/joblist', methods=['GET'])
@check_for_token_admin
def all_jobs():
    conn = mysql.connect()
    cur = conn.cursor(pymysql.cursors.DictCursor)

    cur.execute("Select * from job ;")
    records = cur.fetchall()
    if records:
        resp = jsonify({'alljobs': records})
        resp.status_code = 200
        return resp
    else:
        resp = jsonify({'message': 'ERROR.'})
        resp.status_code = 401
        return resp
    cur.close()
    conn.close()


@app.route('/admin/cud_courses', methods=['POST'])
@check_for_token_admin
def cud_courses():
    token = request.headers['Authorization']
    username = jwt.decode(token, app.config['SECRET_KEY_ADMIN'])
    if(request.json['mode'] == "add"):
        resp = courses.create_course(username)
        return resp
    elif(request.json['mode'] == "delete"):
        resp = courses.delete_course(username)
        return resp
    elif(request.json['mode'] == "update"):
        resp = courses.update_course(username)
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
    app.run(debug=True)
