DROP DATABASE IF EXISTS elevate;
CREATE DATABASE elevate;

\c elevate;

Drop TABLE Users
CASCADE;
CREATE TABLE Users
(
    id SERIAL UNIQUE,
    first_name VARCHAR(13),
    last_name VARCHAR(13),
    photo_url VARCHAR,
    password_digest VARCHAR NOT NULL,
    username VARCHAR(57) UNIQUE,
    phone_number VARCHAR (10) UNIQUE,
    email_notification VARCHAR(1),
    phone_notification VARCHAR(1),
    experience INTEGER,
    PRIMARY KEY (id)
);

INSERT INTO Users
    (first_name, last_name, photo_url, password_digest, username, phone_number, email_notification, phone_notification, experience)
VALUES
    ('Jerell', 'Davis', 'https://avatars3.githubusercontent.com/u/12574319?s=400&v=4', '$2a$10$brAZfSmByFeZmPZ/MH5zne9YDhugjW9CtsBGgXqGfix0g1tcooZWq', 'blah@gmail.com', '3412331093', 'N', 'N', 0),
    ('Nick', 'Davis', 'https://avatars3.githubusercontent.com/u/12574319?s=400&v=4', '$2a$10$brAZfSmByFeZmPZ/MH5zne9YDhugjW9CtsBGgXqGfix0g1tcooZWq', 'blah@ghmail.com', '3022331093', 'N', 'N', 0),
    ('Bob', 'Davis', 'https://avatars3.githubusercontent.com/u/12574319?s=400&v=4', '$2a$10$brAZfSmByFeZmPZ/MH5zne9YDhugjW9CtsBGgXqGfix0g1tcooZWq', 'blahhh@gmail.com', '9422331093', 'N', 'N', 0);




Drop TABLE Jobs
CASCADE;
CREATE TABLE Jobs
(
    job_id SERIAL UNIQUE,
    user_id INTEGER NOT NULL,
    resume_url VARCHAR ,
    cover_url VARCHAR ,
    job_posting_url VARCHAR(27),
    company_logo VARCHAR(57),
    company_url VARCHAR(57),
    position_title VARCHAR(16),
    job_email VARCHAR(53),
    job_phone_number VARCHAR(10),
    progress_in_search VARCHAR(1),
    salary VARCHAR(20),
    date_applied DATE,
    PRIMARY KEY (job_id),
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

INSERT INTO Jobs
    (user_id, company_name, resume_url, cover_url, company_logo, job_posting_url, position_title, job_email, job_phone_number, progress_in_search, salary)
VALUES
    (1, 'Apple', 'RESUME URL', 'COVER URL', 'COMPANY LOGO', 'company_url', 'Junior Developer', 'blurb@gmail', '3471218976', 'A', '70,000'),
    (2, 'Apple', 'RESUME URL', 'COVER URL', 'COMPANY LOGO', 'company_url' , 'Junior Developer', 'blurnnb@gmail', '3471218976', 'A', '70,000'),
    (1, 'Apple', 'RESUME URL', 'COVER URL', 'COMPANY LOGO', 'company_url' , 'Junior Developer', 'blurb@gmail', '3471218976', 'A', '70,000'),
    (2, 'Apple', 'RESUME URL', 'COVER URL', 'COMPANY LOGO', 'company_url', 'Junior Developer', 'blurnnb@gmail', '3471218976', 'A', '70,000'),
    (3, 'Apple', 'RESUME URL', 'COVER URL', 'COMPANY LOGO', 'company_url', 'Junior Developer', 'threeblurb@gmail', '3471218976', 'A', '70,000'),
    (3, 'Apple', 'RESUME URL', 'COVER URL', 'COMPANY LOGO', 'company_url', 'Junior Developer', 'blurnnb@gmail', '3471218976', 'A', '70,000');

Drop TABLE Resumes CASCADE;
Drop TABLE Cover_Letters CASCADE;
CREATE TABLE Interview
(
    job_id INTEGER,
    contact VARCHAR,
    note VARCHAR,
    FOREIGN KEY (job_id) REFERENCES Jobs(job_id)
);
INSERT INTO Interview
    (job_id, contact, note)
VALUES
    (1, 'First Note', 'davidsh.in/coverletter.pdf'),
    (2, 'Second Note', 'davidsh.in/coverletter.pdf'),
    (3, 'Third Note', 'http://helencho.io/images/helenchocoverletter.pdf'),
    (4, 'Fourth Note', 'file:///Users/c4q/Downloads/Jerell-Daviscoverletter.pdf'),
    (5, 'Fifth Note', '@blurb.com');





Drop TABLE Rank_Badges;
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
    ('https://drive.google.com/file/d/1Ig8MivzctCcUDuz7UqSjLzgar4p8-5ue/view?usp=sharing', 'rookie', '2');


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
    ('https://drive.google.com/file/d/16fcWlOZQH-bc98Tc-dSvkeQFXkyfJGqo/view?usp=sharing', '25-apps'),
    ('https://drive.google.com/file/d/1mGrNYmuCmUn4L_SDRDaqGI3xoI2Ake5B/view?usp=sharing', '50-apps'),
    ('https://drive.google.com/file/d/121mVMSFP6CxmBng1Y79L9kNsF2vnGSjo/view?usp=sharing', '100-apps'),
    ('https://drive.google.com/file/d/1a4KZJ5EUiZ5nrmGs_VF_9ygBlP-4Ce8r/view?usp=sharing', '200-apps');




DROP TABLE Achievement_Badges_Earned;
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

