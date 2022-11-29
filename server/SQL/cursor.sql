delimiter //

use PROJECT_MANAGEMENT_SYSTEM//

CREATE OR REPLACE procedure PTG()
begin
    DECLARE grade varchar(5);
    DECLARE project varchar(50);
    declare team varchar(50);
    declare team_id varchar(50);
    declare remark varchar(255);
    declare gradedBy varchar(12);
    declare is_done INTEGER DEFAULT 0;
    DECLARE ptg_cursor cursor for select t.team_name,t.team_id,p.project_name,g.grade,g.remark,g.gradedBy from TEAM t,GRADE g,PROJECT p where t.team_id=p.team_id and g.project_id=p.project_id;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET is_done = 1;

    open ptg_cursor;
    getLoop: loop
        fetch next from ptg_cursor into team,team_id,project,grade,remark,gradedBy;
        if is_done=1 THEN LEAVE getLoop;
        end if;
        select team,team_id,project,grade,remark,gradedBy;
    end loop;
    close ptg_cursor;
end;//

delimiter ;