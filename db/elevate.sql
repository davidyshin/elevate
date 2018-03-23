DROP DATABASE IF EXISTS elevate;
CREATE DATABASE elevate;
\c elevate;
Drop TABLE Users
CASCADE;
CREATE TABLE Users
(
    id SERIAL UNIQUE,
    first_name VARCHAR,
    last_name VARCHAR,
    photo_url VARCHAR,
    password_digest VARCHAR NOT NULL,
    username VARCHAR UNIQUE,
    phone_number VARCHAR (10) UNIQUE,
    email_notification VARCHAR(1),
    phone_notification VARCHAR(1),
    experience INTEGER,
    PRIMARY KEY (id)
);
INSERT INTO Users
    (first_name, last_name, photo_url, password_digest, username, phone_number, email_notification, phone_notification, experience)
VALUES
    ('DemoUser', 'DemoUser', 'https://i.imgur.com/wuyr6CT.png', '$2a$10$brAZfSmByFeZmPZ/MH5zne9YDhugjW9CtsBGgXqGfix0g1tcooZWq', 'demo@elevate.app', '3412331093', 'N', 'N', 0),
    ('Nick', 'Davis', 'https://i.imgur.com/ePbPHIY.png', '$2a$10$brAZfSmByFeZmPZ/MH5zne9YDhugjW9CtsBGgXqGfix0g1tcooZWq', 'blah@ghmail.com', '3022331093', 'N', 'N', 0),
    ('Bob', 'Davis', 'https://i.imgur.com/XsVmYKK.png', '$2a$10$brAZfSmByFeZmPZ/MH5zne9YDhugjW9CtsBGgXqGfix0g1tcooZWq', 'blahhh@gmail.com', '9422331093', 'N', 'N', 0);
Drop TABLE Jobs
CASCADE;
CREATE TABLE Jobs
(
    job_id SERIAL UNIQUE,
    user_id INTEGER NOT NULL,
    company_name VARCHAR,
    resume_url VARCHAR,
    cover_url VARCHAR,
    company_logo VARCHAR,
    job_posting_url VARCHAR,
    position_title VARCHAR,
    job_email VARCHAR,
    job_phone_number VARCHAR,
    date_applied DATE,
    date_logged DATE,
    progress_in_search INTEGER,
    salary VARCHAR,
    PRIMARY KEY (job_id),
    FOREIGN KEY (user_id) REFERENCES Users(id)
);
INSERT INTO Jobs
    (user_id, company_name, resume_url, cover_url, company_logo, job_posting_url, position_title, job_email, job_phone_number, date_applied, date_logged, progress_in_search, salary)
VALUES
    (1, 'Apple', 'http://davidsh.in/ds-resume.pdf', 'https://docs.google.com/document/d/18Q4rYQQqEN3xcO3nF-GJy6Fo7Za5gKl5Z93GJeu9olw/edit?usp=sharing', 'https://logo.clearbit.com/apple.com', 'https://www.indeed.com/q-Apple-Software-Engineer-jobs.html', 'Software Engineer', 'hiring@apple.com', '3471218976', '2018-01-02', '2018-03-15', 4, '70,000'),
    (1, 'Facebook', 'http://helencho.io/images/helenchoresume.pdf', 'https://docs.google.com/document/d/18Q4rYQQqEN3xcO3nF-GJy6Fo7Za5gKl5Z93GJeu9olw/edit?usp=sharing', 'https://logo.clearbit.com/facebook.com', 'https://www.facebook.com/careers/jobs/a0I1200000JXv00EAD/' , 'Software Engineer, Full Stack', 'hiring@facebook.com', '3471218976', '2018-01-02', '2018-03-16', 4, '70,000'),
    (1, 'Twitch', 'http://helencho.io/images/helenchoresume.pdf', 'https://docs.google.com/document/d/18Q4rYQQqEN3xcO3nF-GJy6Fo7Za5gKl5Z93GJeu9olw/edit?usp=sharing', 'https://logo.clearbit.com/twitch.tv', 'https://jobs.lever.co/twitch/a5f652d5-4f30-40ae-a860-14b869b5a445' , 'Software Engineer', 'hiring@twitch.tv', '3471218976', '2018-01-02', '2018-03-20', 4, '70,000'),
    (1, 'Google', 'http://helencho.io/images/helenchoresume.pdf', 'https://docs.google.com/document/d/18Q4rYQQqEN3xcO3nF-GJy6Fo7Za5gKl5Z93GJeu9olw/edit?usp=sharing', 'https://logo.clearbit.com/google.com', 'https://careers.google.com/jobs#!t=jo&jid=/google/software-engineer-76-9th-ave-new-york-ny-10011-usa-2748170192&', 'Software Engineer', 'hiring@google.com', '3471218976', '2018-01-02', '2018-03-19', 3, '70,000'),
    (1, 'LinkedIn', 'http://davidsh.in/ds-resume.pdf', 'https://docs.google.com/document/d/18Q4rYQQqEN3xcO3nF-GJy6Fo7Za5gKl5Z93GJeu9olw/edit?usp=sharing', 'https://logo.clearbit.com/linkedin.com', 'https://www.linkedin.com/jobs/view/626966558/', 'Senior Software Engineer', 'hiring@linkedin.com', '3471218976', '2018-01-02', '2018-03-22', 4, '70,000'),
    (1, 'KickStarter', 'http://davidsh.in/ds-resume.pdf', 'https://docs.google.com/document/d/18Q4rYQQqEN3xcO3nF-GJy6Fo7Za5gKl5Z93GJeu9olw/edit?usp=sharing', 'https://logo.clearbit.com/apple.com', 'https://angel.co/kickstarter/jobs/291580-front-end-engineer?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic', 'Front End Engineer', 'hiring@kickstarter.com', '3471218976', '2018-01-02', '2018-03-22', 1, '70,000');
-- Drop TABLE Resumes CASCADE;
-- Drop TABLE Cover_Letters CASCADE;
DROP TABLE Interview
CASCADE;
CREATE TABLE Interview
(
    job_id INTEGER,
    contact VARCHAR,
    interview_date DATE,
    interview_time TIME,
    note VARCHAR,
    FOREIGN KEY (job_id) REFERENCES Jobs(job_id)
);
INSERT INTO Interview
    (job_id, contact, interview_date, interview_time, note)
VALUES
    (1, 'Helen, helencho@ac.c4q.nyc', '2018-03-28', '11:30:00', 'Interviewer was so mean'),
    (2, 'David, 3478030075', '2018-03-28', '12:00:00', 'I think I went to college with someone there'),
    (3, 'Jerell Davis (Dunno his #)', '2018-03-28', '10:00:00', 'Forgot to print out my resume, must remember for next time.'),
    (4, 'Sami, dunno his email either..', '2018-03-28', '01:30:00', 'I definitely killed it'),
    (5, 'Reed', '2018-03-28', '03:00:00', 'Meet at C4Q');
Drop TABLE Rank_Badges
CASCADE;
CREATE TABLE Rank_Badges
(
    badge_id SERIAL UNIQUE,
    badge_url VARCHAR UNIQUE,
    badge_name VARCHAR,
    badge_level VARCHAR,
    PRIMARY KEY (badge_id)
);
INSERT INTO Rank_Badges
    (badge_url, badge_name, badge_level)
VALUES
    ('https://i.imgur.com/6xkiznp.png', 'novice', '1'),
    ('https://i.imgur.com/nWNDLWD.png', 'amateur', '2');
Drop TABLE Achievement_Badges
CASCADE;
CREATE TABLE Achievement_Badges
(
    badge_id SERIAL UNIQUE,
    badge_url VARCHAR UNIQUE,
    badge_name VARCHAR,
    PRIMARY KEY (badge_id)
);
INSERT INTO Achievement_Badges
    (badge_url, badge_name)
VALUES
    ('https://i.imgur.com/VHB6Qtm.png', '25-apps'),
    ('https://i.imgur.com/NXZj2nF.png', '50-apps'),
    ('https://i.imgur.com/dneiFhs.png', '100-apps'),
    ('https://i.imgur.com/1JU7iNE.png', '200-apps'),
    ('https://i.imgur.com/kEE766y.png', '300-apps'),
    ('https://i.imgur.com/yLOUrI6.png', '1st-rejection');
DROP TABLE Achievement_Badges_Earned
CASCADE;
CREATE TABLE Achievement_Badges_Earned
(
    user_id INTEGER,
    badge_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (badge_id) REFERENCES Achievement_Badges(badge_id)
);
INSERT INTO Achievement_Badges_Earned
    (user_id, badge_id)
VALUES
    (1, 1),
    (1, 1),
    (1, 1),
    (2, 3),
    (2, 2),
    (2, 1);

