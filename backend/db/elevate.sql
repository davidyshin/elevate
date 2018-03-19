

Drop TABLE Users CASCADE;
CREATE TABLE Users
(
    id SERIAL UNIQUE,
    first_name VARCHAR(13),
    last_name VARCHAR(13),
    password_digest VARCHAR NOT NULL,
    username VARCHAR(57) UNIQUE,
    phone_number VARCHAR (10) UNIQUE,
    email_notification VARCHAR(1),
    phone_notification VARCHAR(1),
    experience INTEGER,
    PRIMARY Key (id)
);

INSERT INTO Users
    (first_name, last_name, password_digest, username, phone_number, email_notification, phone_notification, experience)
VALUES
    ('Jerell', 'Davis', '$2a$10$brAZfSmByFeZmPZ/MH5zne9YDhugjW9CtsBGgXqGfix0g1tcooZWq', 'blah@gmail.com', '3412331093', 'N', 'N', 0),
    ('Nick', 'Davis', '$2a$10$brAZfSmByFeZmPZ/MH5zne9YDhugjW9CtsBGgXqGfix0g1tcooZWq', 'blah@ghmail.com', '3022331093', 'N', 'N', 0),
    ('Bob', 'Davis', '$2a$10$brAZfSmByFeZmPZ/MH5zne9YDhugjW9CtsBGgXqGfix0g1tcooZWq', 'blahhh@gmail.com', '9422331093', 'N', 'N', 0);



Drop TABLE Jobs CASCADE;
CREATE TABLE Jobs
(
    job_id SERIAL UNIQUE,
    user_id INTEGER NOT NULL,
    company_name VARCHAR(27),
    position_title VARCHAR(16),
    job_email VARCHAR(53),
    job_phone_number VARCHAR(10),
    progress_in_search VARCHAR(1),
    salary VARCHAR(20),
    date_applied VARCHAR(20),
    interview_1 VARCHAR,
    interview_2 VARCHAR,
    interview_3 VARCHAR,
    notes VARCHAR,
    PRIMARY KEY (job_id),
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

INSERT INTO Jobs
    (user_id, company_name, position_title, job_email, job_phone_number, progress_in_search, salary, date_applied, interview_1, notes)
VALUES
    (1, 'Apple', 'Junior Developer', 'blurb@gmail', '3471218976', 'A', '70,000','2122018', '03/19/2018', 'N/A'),
    (3, 'Apple', 'Junior Developer', 'threeblurb@gmail', '3471218976', 'A', '70,000','2102018', '03/19/2018', 'N/A'),
    (1, 'Apple', 'Junior Developer', 'blurb@gmail', '3471218976', 'A','70,000', '2032018', '03/19/2018', 'N/A'),
    (2, 'Apple', 'Junior Developer', 'blurnnb@gmail', '3471218976', 'A','70,000', '2022018', '03/19/2018', 'N/A'),
    (1, 'Apple', 'Junior Developer', 'blurnnb@gmail', '3471218976', 'A','70,000', '2222018', '03/19/2018', 'N/A'),
    (3, 'Apple', 'Junior Developer', 'blurnnb@gmail', '3471218976', 'A','70,000', '2172018','03/19/2018', 'N/A');
  


Drop TABLE Resumes CASCADE;
CREATE TABLE Resumes
(
    resume_id SERIAL UNIQUE,
    user_id INTEGER NOT NULL,
    job_id INTEGER NOT NULL,
    resume_url VARCHAR,
    FOREIGN KEY (job_id) REFERENCES Jobs(job_id),
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

INSERT INTO Resumes
    (user_id, job_id, resume_url)
VALUES
    (1, 1, 'davidsh.in/resume.pdf'),
    (1, 2, 'davidsh.in/resume.pdf'),
    (1, 3, 'http://helencho.io/images/helenchoresume.pdf'),
    (1, 4, 'file:///Users/c4q/Downloads/Jerell-Davis%20(2).pdf'),
    (1, 5, '@blurb.com');



Drop TABLE Cover_Letters CASCADE;
CREATE TABLE Cover_Letters
(
    cover_letter_id SERIAL UNIQUE,
    user_id INTEGER NOT NULL,
    job_id INTEGER NOT NULL,
    cover_letter_url VARCHAR,
    FOREIGN KEY (job_id) REFERENCES Jobs(job_id),
    FOREIGN KEY (user_id) REFERENCES Users(id)
);


Drop TABLE Rank_Badges;
CREATE TABLE Rank_Badges
(
    badge_id VARCHAR,
    badge_url VARCHAR,
    badge_name VARCHAR,
    PRIMARY KEY (badge_id)
);


Drop TABLE Achievement_Badges;
CREATE TABLE Achievement_Badges
(
    badge_id VARCHAR,
    badge_url VARCHAR,
    badge_name VARCHAR,
    PRIMARY KEY (badge_id)
)

