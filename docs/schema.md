# Schema Information


## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, indexed, unique
password_digest | string    | not null
email           | string    | not null
phone_number    | string    | not null, indexed, unique
experience      | integer   | not null


## Users Personal Info
column name     | data type | details
-----------------|-----------|-----------------------
user_id          | integer   | not null, foreign key(references users)
resume           | string    | not null
resume_id        | integer   | not null, indexed, unique
cover_letter     | string    | not null, unique
resume_2         | string    | not null
resume_id_2      | integer   | not null, indexed, unique
cover_letter     | string    | not null, unique
email            | string    | not null, unique
phone_number     | string    | not null, unique
e_notification   | string    | not null
p_notification   | string    | not null
experience_level | number    | not null

## Jobs
column name     | data type | details
-------------------|-----------|-----------------------
job_id             | integer   | not null, primary key
user_id            | integer   | not null,references(user), unique 
job_email          | string    | not null, indexed, unique
job_phone_number   | string    | not null, indexed, unique
progress_in_search | string    | not null, (Value either A, I, O, or R ) 
company_name       | string    | not null
position           | string    | not null
salary             | integer   | not null
date_applied       | string    | not null
notes              | string    | not null

## Resumes
column name     | data type | details
----------------|-----------|-----------------------
resume_id       | integer   | not null, primary key
user_id         | integer   | not null,references(user), unique
email           | string    | not null, indexed, unique
phone_number    | string    | not null, indexed, unique

