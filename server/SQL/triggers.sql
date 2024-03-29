delimiter //

use PROJECT_MANAGEMENT_SYSTEM//

-- trigger for max size of the team
CREATE TRIGGER max_team_size  
AFTER INSERT  
ON STUDENT_IN_TEAM  
FOR EACH ROW  
BEGIN  
DECLARE count_st int DEFAULT 0;  
select COUNT(*) into count_st FROM STUDENT_IN_TEAM where team_id=NEW.team_id;
IF (count_st > 5) 
THEN 
    signal sqlstate 'ERROR' set message_text = 'Team limit execedded';
END IF;
END;//


-- trigger for min size of the team
CREATE TRIGGER min_team_size    
BEFORE UPDATE
    ON PROJECT
    FOR EACH ROW
BEGIN
    DECLARE team varchar(50);  
    DECLARE count_t int DEFAULT 0;
    IF (NEW.`status` ="SUBMITTED") THEN 
        select t.team_id into team from TEAM t inner join PROJECT p on (p.team_id=t.team_id) where  p.project_id=OLD.project_id;
        select count(*) into count_t from STUDENT_IN_TEAM where team_id=team;
        IF (count_t < 2) 
            THEN 
            signal sqlstate 'ERROR' set message_text = 'Team should have atleast 2 members before submitting';
        END IF;
    END IF;
END;//


-- trigger for duplicate project inside a team
CREATE TRIGGER duplicate_project    
BEFORE INSERT
    ON PROJECT
    FOR EACH ROW
BEGIN
    DECLARE count_t int DEFAULT 0;
    IF (NEW.`status` ="CREATED") THEN 
        select count(*) into count_t from PROJECT where project_name=NEW.project_name and team_id=NEW.team_id;
        IF (count_t > 0) 
            THEN 
            signal sqlstate 'ERROR' set message_text = 'The project for the same team already exists';
        END IF;
    END IF;
END;//


-- trigger for deleting team if all team members are deleted
CREATE  TRIGGER delete_team    
AFTER DELETE
    ON STUDENT_IN_TEAM
    FOR EACH ROW
BEGIN
    DECLARE count_t int DEFAULT 0;
    select count(*) into count_t from STUDENT_IN_TEAM where team_id=OLD.team_id;
    IF (count_t = 0) THEN
        DELETE FROM TEAM WHERE team_id=OLD.team_id;
    END IF;
END;//

delimiter ;