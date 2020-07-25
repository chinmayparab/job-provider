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
