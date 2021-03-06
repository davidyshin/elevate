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
    email_notification boolean DEFAULT FALSE,
    phone_notification boolean DEFAULT FALSE,
    notification_interval INTEGER default 7,
    experience INTEGER,
    PRIMARY KEY (id)
);
INSERT INTO Users
    (first_name, last_name, photo_url, password_digest, username, phone_number, email_notification, phone_notification, experience)
VALUES
    ('Joseph', 'Gaines', 'https://i.imgur.com/wuyr6CT.png', '$2a$10$brAZfSmByFeZmPZ/MH5zne9YDhugjW9CtsBGgXqGfix0g1tcooZWq', 'joey.reed.gaines@gmail.com', '3412331093', 'N', 'N', 1350),
    ('Helen', 'Cho', 'https://i.imgur.com/ePbPHIY.png', '$2a$10$brAZfSmByFeZmPZ/MH5zne9YDhugjW9CtsBGgXqGfix0g1tcooZWq', 'blah@ghfdmail.com', '3022331093', 'N', 'N', 1300),
    ('David', 'Shin', 'https://i.imgur.com/XsVmYKK.png', '$2a$10$brAZfSmByFeZmPZ/MH5zne9YDhugjW9CtsBGgXqGfix0g1tcooZWq', 'blfdfahhh@gmail.com', '9422331093', 'N', 'N', 1300),
    ('Sami', 'Alaa', 'https://i.imgur.com/XsVmYKK.png', '$2a$10$brAZfSmByFeZmPZ/MH5zne9YDhugjW9CtsBGgXqGfix0g1tcooZWq', 'blahhddh@gmail.com', '9422331043', 'N', 'N', 1300),
    ('Jerell', 'Davis', 'https://i.imgur.com/XsVmYKK.png', '$2a$10$brAZfSmByFeZmPZ/MH5zne9YDhugjW9CtsBGgXqGfix0g1tcooZWq', 'blahhhd@gmafdil.com', '9422331090', 'N', 'N', 1300);
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
    job_status VARCHAR,
    salary VARCHAR,
    PRIMARY KEY (job_id),
    FOREIGN KEY (user_id) REFERENCES Users(id)
);
INSERT INTO Jobs
    (user_id, company_name, resume_url, cover_url, company_logo, job_posting_url, position_title, job_email, job_phone_number, date_applied, date_logged, progress_in_search, job_status, salary)
VALUES
    (1, 'Apple', 'resume-8ds-resume.pdf', 'cover-9-Cover Letter - ShopKeep.docx', 'https://logo.clearbit.com/apple.com', 'https://www.indeed.com/q-Apple-Software-Engineer-jobs.html', 'Software Engineer', 'hiring@apple.com', '3471218976', '2018-04-05', '2018-04-05', 4, 'offered', '$70,000'),
    (1, 'Facebook', 'resume-8ds-resume.pdf', 'cover-9-Cover Letter - ShopKeep.docx', 'https://logo.clearbit.com/facebook.com', 'https://www.facebook.com/careers/jobs/a0I1200000JXv00EAD/', 'Software Engineer, Full Stack', 'hiring@facebook.com', '3471218976', '2018-04-07', '2018-04-07', 4, 'awaiting', '70,000'),
    (1, 'Twitch', 'resume-8ds-resume.pdf', 'cover-9-Cover Letter - ShopKeep.docx', 'https://logo.clearbit.com/twitch.tv', 'https://jobs.lever.co/twitch/a5f652d5-4f30-40ae-a860-14b869b5a445' , 'Software Engineer', 'hiring@twitch.tv', '3471218976', '2018-04-08', '2018-04-08', 4, 'rejected', '70,000'),
    (1, 'Google', 'resume-8ds-resume.pdf', 'cover-9-Cover Letter - ShopKeep.docx', 'https://logo.clearbit.com/google.com', 'https://careers.google.com/jobs#!t=jo&jid=/google/software-engineer-76-9th-ave-new-york-ny-10011-usa-2748170192&', 'Software Engineer', 'hiring@google.com', '3471218976', '2018-04-03', '2018-04-03', 4, 'awaiting', '70,000'),
    (1, 'LinkedIn', 'resume-8ds-resume.pdf', 'cover-9-Cover Letter - ShopKeep.docx', 'https://logo.clearbit.com/linkedin.com', 'https://www.linkedin.com/jobs/view/626966558/', 'Senior Software Engineer', 'hiring@linkedin.com', '3471218976', '2018-04-05', '2018-04-05', 4, 'rejected', '70,000'),
    (1, 'KickStarter', 'resume-8ds-resume.pdf', 'cover-9-Cover Letter - ShopKeep.docx', 'https://logo.clearbit.com/apple.com', 'https://angel.co/kickstarter/jobs/291580-front-end-engineer?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic', 'Front End Engineer', 'hiring@kickstarter.com', '3471218976', '2018-04-05', '2018-04-02', 4, 'awaiting', '70,000'),
    (1, 'Coalition for Queens - C4Q', 'resume-8ds-resume.pdf', 'cover-9-Cover Letter - ShopKeep.docx', 'https://logo.clearbit.com/c4q.nyc', 'https://www.c4q.nyc/careers/', 'Web Development Technical Expert', 'hello@c4q.nyc', '3478416090', '2018-04-08', '2018-04-08', 4, 'awaiting', '');
-- Drop TABLE Resumes CASCADE;
-- Drop TABLE Cover_Letters CASCADE;
DROP TABLE Interview
CASCADE;
CREATE TABLE Interview
(
    job_id INTEGER,
    user_id INTEGER,
    contact VARCHAR,
    interview_date DATE,
    interview_time TIME,
    note VARCHAR,
    FOREIGN KEY (job_id) REFERENCES Jobs(job_id)
);
INSERT INTO Interview
    (job_id, user_id, contact, interview_date, interview_time, note)
VALUES
    (1, 1, 'Helen, helencho@ac.c4q.nyc', '2018-03-28', '11:30:00', 'Interviewer was so mean'),
    (2, 1, 'David, 3478030075', '2018-03-28', '12:00:00', 'I think I went to college with someone there'),
    (3, 1, 'Jerell Davis (Dunno his #)', '2018-03-28', '10:00:00', 'Forgot to print out my resume, must remember for next time.'),
    (4, 1, 'Sami, dunno his email either..', '2018-03-28', '01:30:00', 'I definitely killed it'),
    (5, 1, 'Reed', '2018-03-28', '03:00:00', 'Meet at C4Q');
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
    ('https://i.imgur.com/oXc6QpZ.png', 'Dreamer', '1'),
    ('https://i.imgur.com/kgCWbNC.png', 'Believer', '2'),
    ('https://i.imgur.com/UEK9qaU.png', 'Stargazer', '3'),
    ('https://i.imgur.com/fHUUSnY.png', 'Thinker', '4'),
    ('https://i.imgur.com/Iyb6DwP.png', 'Go Getter', '5'),
    ('https://i.imgur.com/3fAyRfg.png', 'Hustler', '6'),
    ('https://i.imgur.com/C1PuhC7.png', 'Explorer', '7'),
    ('https://i.imgur.com/ne9xFjt.png', 'Achiever', '8'),
    ('https://i.imgur.com/HNSG7UF.png', 'Adventurer', '9');
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
    ('https://i.imgur.com/mQHNt1Q.png', 'Account Created'),
    ('https://i.imgur.com/JnXrVwe.png', '1st Job Logged!'),
    ('https://i.imgur.com/iS4Z8A8.png', '25 Jobs Logged'),
    ('https://i.imgur.com/YOAIvIf.png', '50 Jobs Logged'),
    ('https://i.imgur.com/neNEt6U.png', '100 Jobs Logged'),
    ('https://i.imgur.com/IaCdBLf.png', '200 Jobs Logged'),
    ('https://i.imgur.com/cgXtUDF.png', '300 Jobs Loged'),
    ('https://i.imgur.com/SswcmG3.png', '400 Jobs Logged'),
    ('https://i.imgur.com/Pn2fACR.png', '500 Jobs Logged'),
    ('https://i.imgur.com/iZE8JRG.png', '1st Interview Saved'),
    ('https://i.imgur.com/XAHcpNe.png', '5 Interviews Saved'),
    ('https://i.imgur.com/eFi0iJo.png', '10 Interviews Saved'),
    ('https://i.imgur.com/rjXM2x8.png', '15 Interviews Saved'),
    ('https://i.imgur.com/W9XD2Gr.png', '1st Rejection'),
    ('https://i.imgur.com/eky29ct.png', '1st Job Offer!'),
    ('https://i.imgur.com/wgl8Pv1.png', 'Night Crawler');

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
    (1, 2),
    (1, 10),
    (1, 11),
    (1, 14),
    (1, 15);
DROP TABLE Forum_Posts
CASCADE;
CREATE TABLE Forum_Posts
(
    post_id SERIAL UNIQUE,
    user_id INTEGER,
    post_title VARCHAR,
    post_description VARCHAR,
    post_date DATE,
    PRIMARY KEY (post_id),
    FOREIGN KEY (user_id) REFERENCES Users(id)
);
DROP TABLE Forum_Comments
CASCADE;
CREATE Table Forum_Comments
(
    comment_id SERIAL UNIQUE ,
    post_id INTEGER,
    user_id INTEGER,
    comment VARCHAR,
    comment_date DATE,
    PRIMARY KEY (comment_id),
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (post_id) REFERENCES Forum_Posts(post_id)
);