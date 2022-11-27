use project_management;
drop TRIGGER max_team_size;
-- select @ cnt;
CREATE  TRIGGER max_team_size    
    BEFORE INSERT
        ON STUDENT_IN_TEAM
        FOR EACH ROW
    begin
        select * from STUDENT_IN_TEAM;
        select * from STUDENT_IN_TEAM;
        IF 6 > 5 then 
            signal sqlstate 'ERROR' set message_text = 'team limit execedded';
        -- raise_application_error(-20001,'team limit execedded');  
        END IF;
    end;


-- CREATE TRIGGER min_team_size    
--     BEFORE UPDATE
--         ON PROJECT
--         FOR EACH ROW when (:new.status ="submitted")
--         BEGIN
--             select t.team_name into @team from TEAM t inner join PROJECT p on (p.project_id=t.project_id) where t.project_id=old.project_id;
--             select team_name,count(*) into @cnt from STUDENT_IN_TEAM where team_name=@team;
--             if @cnt < 2 then raise_application_error(-20000,"team should have atleast 2 members");
--             end if;
--         END;    
