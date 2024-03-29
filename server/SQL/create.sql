drop database PROJECT_MANAGEMENT_SYSTEM;
create database PROJECT_MANAGEMENT_SYSTEM;
use PROJECT_MANAGEMENT_SYSTEM;

create table USER(
    first_name char(20) NOT NULL,
    last_name char(20),
    username varchar(12) primary key,
    email varchar(50) UNIQUE,
    password varchar(255) NOT NULL,
    joined_on DATETIME,
    mobile bigint(15) NOT NULL,
    address varchar(255),
    type char(1) NOT NULL
);

create table STUDENT(
    s_id varchar(12) primary key,
    git_link varchar(255),
    constraint foreign key(s_id) references USER(username) ON DELETE CASCADE
);

create table TEACHER(
    t_id varchar(12) primary key,
    subject char(20) NOT NULL,
    constraint foreign key(t_id) references USER(username) ON DELETE CASCADE
);

create table TEAM(
    team_id varchar(50) primary key,
    team_name varchar(50) NOT NULL,
    team_desc varchar(255)
);

create table PROJECT(
    project_id varchar(50) primary key,
    project_name varchar(50) NOT NULL,
    description varchar(255),
    sub_link varchar(255),
    status char(10),
    team_id varchar(50) NOT NULL,
    constraint foreign key(team_id) references TEAM(team_id) ON DELETE CASCADE
);

create table GRADE(
    project_id varchar(50) PRIMARY KEY,
    grade varchar(5) NOT NULL,
    remark varchar(255),
    gradedBy varchar(12),
    constraint foreign key(project_id) references PROJECT(project_id) ON DELETE CASCADE,
    constraint foreign key(gradedBy) references TEACHER(t_id) ON DELETE SET NULL
);

create table STUDENT_IN_TEAM(
    s_id varchar(12),
    team_id varchar(50),
    joined_on DATETIME,
    constraint pk primary key(s_id,team_id),
    constraint foreign key(team_id) references TEAM(team_id) ON DELETE CASCADE,
    constraint foreign key(s_id) references STUDENT(s_id)
);