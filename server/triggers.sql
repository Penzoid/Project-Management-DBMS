use PROJECT_MANAGEMENT_SYSTEM;


-- trigger for max size of the team
drop TRIGGER max_team_size;

delimiter //
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
delimiter ;


-- trigger for min size of the team
drop TRIGGER min_team_size;

delimiter //
CREATE TRIGGER min_team_size    
BEFORE UPDATE
    ON PROJECT
    FOR EACH ROW
BEGIN
    DECLARE team varchar(12);  
    DECLARE count_t int DEFAULT 0;
    IF (NEW.`status` ="submitted") THEN 
        select t.team_id into team from TEAM t inner join PROJECT p on (p.project_id=t.project_id) where  project_id=OLD.project_id;
        select team_id,count(*) into count_t from STUDENT_IN_TEAM where team_id=team;
        IF (count_t < 2) 
            THEN 
            signal sqlstate 'ERROR' set message_text = 'team should have atleast 3 members before submitting';
        END IF;
    END IF;
END;//
delimiter ;
