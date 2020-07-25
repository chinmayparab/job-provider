# API documentation
## Admin
### Register
```
POST http://127.0.0.1:5000/admin/register 
{
  username: ...,
  password: ...
}
```
### Login
```
POST http://127.0.0.1:5000/admin/login
{
  username: ...,
  password: ...
}
```
### OCR
```
POST http://127.0.0.1:5000/admin/post-job
header: {
  Authorization: ...
}
formdata: {
  file: ...
}
```
### Add Job
```
POST http://127.0.0.1:5000/admin/cud_job
header: {
  Authorization: ...
}
{
  mode: 'add',
  closing_date: ...,
  description: ...,
  jobtitle: ...,
  vacancies: ...,
  stipend: ...,
  qualification: ...,
  extra_info: ...,
  interview_mode: ...,
  interview_location: ...,
  datetime_interview: ...,
  is_onlinetest: ...
}
```
