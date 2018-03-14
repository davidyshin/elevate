# Component Hierarchy

**AuthFormContainer**
- AuthForm

**HomeContainer** (Global NavBar/Logged In)
- Home (First page user sees when they login)
    - JobsSummary (Analytics)
    - JobContainer (Full list of jobs applied, rejected, offered)
        - JobItem (Job List item)
- EditJob (Edit page to allow users to edit or delete job apps)
- AddJob (Form page to add job app)
- UserProfile (Info page including user level/achievements/statistics)
    - UserSummary
    - EditUser (Edit profile info, image, password)
    - UserSettings (Notification Settings, etc etc)

## Routes

|Path   | Component   |
|-------|-------------|
| "/signin" | "AuthFormContainer" |
| "/login" | "AuthFormContainer" |
| "/home" | "HomeContainer" |
| "/home/ | "JobsSummary" / "JobsContainer" |
| "/home/add" | "AddJob" |
| "/home/job/:jobId" | "EditJob" |
| "/home/user/" | "UserProfile" |
| "/home/user/edit | "EditUser" |
| "/home/tag/settings" | "UserSettings" |
