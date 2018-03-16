

Drop TABLE Users
CASCADE;
CREATE TABLE Users
(
    id SERIAL UNIQUE,
    username VARCHAR(13),
    password_digest VARCHAR(13),
    email VARCHAR(27) UNIQUE,
    phone_number VARCHAR(12) UNIQUE,
    email_notification VARCHAR(20),
    phone_notification VARCHAR(20),
    experience INTEGER,
    PRIMARY Key (id)
);


INSERT INTO Users
    (username, password_digest, email, phone_number,email_notification,phone_notification, experience)
VALUES
    ('Jerell Davis', 'home', 'blah@gmail.com', '341-233-1093', 'N', 'N', 0),
    ('Nick Davis', 'home', 'blah@ghmail.com', '302-233-1093', 'N', 'N', 0),
    ('Bob Davis', 'home', 'blahhh@gmail.com', '942-233-1093', 'N', 'N', 0);


Drop TABLE Users_Personal_Info CASCADE;
CREATE TABLE Users_Personal_Info
(
    id INTEGER NOT NULL,
    resume_url VARCHAR NOT NULL,
    cover_letter_url VARCHAR(23),
    cover_letter_2_url VARCHAR(23),
    FOREIGN KEY (id) REFERENCES Users(id)
);

Drop TABLE Jobs CASCADE;
CREATE TABLE Jobs
(
    job_id SERIAL UNIQUE,
    user_id INTEGER NOT NULL,
    company_name VARCHAR(27),
    position_title VARCHAR(16),
    job_email VARCHAR(23),
    job_phone_number VARCHAR(16),
    progress_in_search VARCHAR(3),
    salary VARCHAR(20),
    date_applied VARCHAR(20),
    notes VARCHAR(50),
    PRIMARY KEY (job_id),
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

INSERT INTO Jobs
    (user_id, company_name, position_title, job_email,job_phone_number, progress_in_search,salary, date_applied,notes)
VALUES
    (1,'Apple','Junior Developer','blurb@gmail','347-121-8976','A','70,000','2-12-2018','N/A'),
    (3,'Apple','Junior Developer','threeblurb@gmail','347-121-8976','A','70,000','2-10-2018','N/A'),
    (1,'Apple','Junior Developer','blurb@gmail','347-121-8976','A','70,000','2-03-2018','N/A'),
    (2,'Apple','Junior Developer','blurnnb@gmail','347-121-8976','A','70,000','2-02-2018','N/A'),
    (1,'Apple','Junior Developer','blurnnb@gmail','347-121-8976','A','70,000','2-22-2018','N/A'),
    (3,'Apple','Junior Developer','blurnnb@gmail','347-121-8976','A','70,000','2-17-2018','N/A');
  



Drop TABLE Resumes CASCADE;
CREATE TABLE Resumes
(
    resume_id SERIAL UNIQUE,
    user_id INTEGER NOT NULL,
    job_id INTEGER NOT NULL,
    resume_url VARCHAR(20),
    FOREIGN KEY (job_id) REFERENCES Jobs(job_id),
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

INSERT INTO Resumes
    (user_id,job_id, resume_url)
VALUES
    (1, 1, '@blurbs.com'),
    (2, 2, '@blurb.com'),
    (3, 3, '@blurssbssss.com'),
    (1, 4, '@blurbs.com'),
    (2, 5, '@blurb.com');

