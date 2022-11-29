use PROJECT_MANAGEMENT_SYSTEM;

delimiter $$

DECLARE ptg cursor for select t.team_name,p.project_name,g.grade,g.remark,g.gradedBy from TEAM t,GRADE g,PROJECT p where t.team_id=p.team_id and g.project_id=p.project_id;

CREATE procedure PTG
begin
    DECLARE grade varchar(5);
    DECLARE project varchar(50);
    declare team varchar(50);
    declare remark varchar(255);
    declare gradedBy varchar(12);

    open ptg;
    fetch ptg into (team,project,grade,remark,gradedBy);
    for: loop
    
    close ptg;
end;$$

delimiter ;