

Drop TABLE Users CASCADE;
CREATE TABLE Users
(
    id SERIAL UNIQUE,
    username VARCHAR(13),
    password_digest VARCHAR(13),
    email  VARCHAR(27) UNIQUE,
    phone_number  VARCHAR(12) UNIQUE,
    experience INTEGER,
    PRIMARY Key (id)
);


INSERT INTO Users(username, password_digest, email, phone_number, experience) VALUES
('Jerell Davis','home','blah@gmail.com','342-233-1093',0),
('Bob Davis','home','blahh@gmail.com','341-233-1093',0),
('NIck Davis','home','blahhhh@gmail.com','346-233-1093',0);

Drop TABLE Users_Personal_Info ;
CREATE TABLE Users_Personal_Info
(
    id INTEGER NOT NULL,
    resume VARCHAR NOT NULL,
    email VARCHAR(27),
    phone_number VARCHAR(10),
    cover_letter VARCHAR(13),
    resume_2 VARCHAR(13),
    cover_letter_2 VARCHAR(13),
    email_notification VARCHAR(20),
    phone_notification VARCHAR(20),
    experience INTEGER,
    FOREIGN KEY (id) REFERENCES Users(id),
    FOREIGN KEY (email) REFERENCES Users(email)
    -- FOREIGN KEY (phone_number) REFERENCES Users(phone_number)
);

Drop TABLE Jobs;
CREATE TABLE Jobs
(
    job_id INTEGER NOT NULL,
    id INTEGER NOT NULL,
    job_email VARCHAR(13),
    job_phone_number VARCHAR(13),
    progress_in_search VARCHAR(13),
    company_name VARCHAR(27),
    title_of_position VARCHAR(10),
    salary VARCHAR(20),
    date_applied VARCHAR(20),
    notes VARCHAR(50),
    PRIMARY KEY (job_id),
    FOREIGN KEY (id) REFERENCES Users(id)
);


Drop TABLE Resumes;
CREATE TABLE Resumes
(
    resume_id SERIAL UNIQUE,
    id INTEGER NOT NULL,
    company_name VARCHAR(13),
    job_email VARCHAR(17),
    phone_number VARCHAR(13),
    PRIMARY KEY (resume_id),
    FOREIGN KEY (id) REFERENCES Users(id)
);



INSERT INTO Resumes(id,company_name, job_email, phone_number) VALUES
(2,'Apple','blah@gmail.com','342-233-1093'),
(1,'Google ','blahh@gmail.com','341-233-1093'),
(1,'Microsoft','blahhhh@gmail.com','346-233-1093');
