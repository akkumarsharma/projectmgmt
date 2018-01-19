//change prefix in front of method to call webapi else nodejs will be used

export class ApiActionList {
   public static get Post_Resource_New(): string { return "resource/PostResourceNew"; };
   public static get Get_Resource_List(): string { return "resource/GetAllResources"; };
   public static get Get_Resource_UniqueId_Availablity(): string {return "resource/GetResourceUniqueIdAvailability/?uniqueId="}

   public static get Post_Project_New(): string { return "project/PostProjectNew"; };
   public static get Get_Project_List(): string { return "project/GetAllProjects"; };

   public static get Post_Activity_New(): string { return "activity/PostActivityNew"; };
   public static get Get_Activity_List(): string { return "activity/GetAllActivities"; };

   public static get Post_Project_Resource_Assigned(): string { return "projectresourceassignments/PostProjectResourceAssigned"; };
   public static get Update_Project_Resource_Assigned(): string { return "projectresourceassignments/UpdateProjectResourceAssigned/?id="; };
   public static get Get_Project_Resource_Assigned(): string { return "projectresourceassignments/GetAllProjectResourceAssigned"; };

   public static get Post_SubActivity_New(): string { return "subactivity/PostSubActivityNew"; };
   public static get Get_SubActivity_List(): string { return "subactivity/GetAllSubActivities"; };
   public static get Delete_SubActivity_Item():string {return "subactivity/DeleteSubActivity?id=";}; 
   public static get Edit_SubActivity_Item():string {return "subactivity/UpdateSubActivity?id=";}; 

   public static get Post_User_Login(): string { return "user/PostUserlogin"; };
   public static get Post_User_Register(): string { return "user/PostUserRegister"; };
   public static get Get_User_Availablity(): string {return "user/GetUserAvailableity/?username="}
   
}
