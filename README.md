# Default Value Final Project


## Description

For our project, we will create a resume application that will be customizable to the user.
This app will be different to other resume apps, such as linked-in, since we are making the app
completely customizable to the user. The web app will be available for everyone, including 
employers. The web app will be dynamic, allowing users to upload past projects to the site for display name of project, picture, and description of project. The web app, will also have password authentication and route protection so that users 
that are logged in are the only ones that can edit the website.

Here is a visual of how the project will look like. A user will be given a link. The user enters the link and is presented with our web app. The web app will have a home page, a resume page, and a projects page. On start, the web app will have no information stored about the user. The user will need to login and edit the field. They will need to login to edit the homepage, change the header, change the about me paragraph and do what ever changes that they desire. Same will go for the resume page, the user will need to login to submit their pdf to the site. And for the projects page, it will display cards that contain a title to the project, a picture, and short description about the project and what made it important. The functionality of adding projects to the site should be possible from the projects page when a user is logged-in. Only a logged-in user will be able to see a "add project" button with a form and a "remove project" button.


For this project, we want to make it a MEAN app. For the front-end we may use Angular to make form-building more secure and easier. We are going to use Node and Express to run the server and create routes. For the database, we will use MongoDB.

## Authors


| Member | Web dev level | Specialization |
| --- | --- | --- |
| Charly the knuckle head | Experinced developer | Interested in authentication and experienced in MEAN stack |
| Kaylyn the beginner | Worked with a little xml and html | I want to learn about building and creating interesting apps |
|Blanca the novice | Have basic knowledge in html | I want to learn more about testing, web development and security |
| Gino the eternal "In training" |  developer | Projects mainly in Java, Javascript.|

## Deliverable 1: Progress Report 
| Member | Accomplishments |
| --- | --- |
| Charly Sandoval |  Created Docker files for the front and backend, in the process of creating Docker compose and Env file.  |
| Kaylyn the beginner |I've implemented some test cases and I got more familiar building cloud services. I'm close to building the resume page.   |
| Blanca the novice |  I worked with CRUD operations of users, greetings, and projects entities from the database. Also implemented some CRUD tests. |
| Gino the eternal "In training" |  - Built initial views (templates) for Login form and Welcome Page and coded respective test cases. - Implement the backend API (routes) for Login GET / POST and updated respective test cases. -Created frontend UI for the Project CRUD (React Components) -Developed a Proof of Concept to deploy the application in Amazon Web Services and Helped on Docker image creation. -Updated the backend APIs (routes) for Project CRUD to support UI workflow. -Added test cases for Projects CRUD.   |


## Deliverables for checkpoint 2

- The CRUD app deliverable for checkpoint 2 will be about Projects that build up the user's portfolio.
- The Projects page will allow registering projects so the application shows them as cards in the dashboard. 
- In this page there is one “Plus”/”Add Project” button which displays the form to enter project information with the following properties:
 - Title
 - Description
 - Image (optional)
 - Link(optional)
- This Dashboard will display/list all the created projects as cards
- The Edit and Remove options of projects will be available from icons in each project card.
- Setup of Mongodb collections. Initial data load.
- Test suite for:
 - List projects
 - Create a project
 - Update a project
 - Delete project

## Deliverables for checkpoint 3
- Deliverable 1:Deployability
    - Created Docker files to make the program easily and reliably deployable in any web platform
- Deliverable 2: pass your tests
    - We were able to implement CRUD functionality for the user; create a user, login, delete user, logout, and more
    - implemented simple read for pdf
- Deliverable 3: Come up with more tests
    - We will add user input filtering into user input in loggin
    - We will ensure that multiple users are able to login in into a single profile, testing user login
    - We will ensure that user loggout will remove a users session id
    - We will ensure that users removed from the list are deleted from the database


## Deliverables for checkpoint 4

### Description:
 - The app should have four tabs: the HomePage,  Projects, Resume, and a cover letter in a list.
 - lets an   account loggin. But the user should be able to add tabs, create themes, and make it more  customizable to their preferences.This should be done throughout the whole account.
 - It should allow a user to edit the layout of the HomePage by giving the user actions to add images, background color change font style, text,giving the user the option of different themes,and being able to add links.In the Projects Page, user actions should be to add images,videos, background color, font style, text size of the overall page, different themes to display how you want to show how to display the projects, and being able to add links. 
 - Also, the Resume page should give the user actions to allow a user to edit the layout, add images,background color,change font style, text, size of the page, to the resume itself, different themes, and being able to add links. Lastly, the Cover Letter should be editable by, the owner of the account
 - Allow a user to edit the layout of the Cover Letter giving the user actions to add images, background color, change font style, text, size of the page and to the resume itself, user the option of different themes, and being able to add links
 - created a docker file to make app more deployable


## Deliverables for final project

Outline in English what the deliverables will be for the final checkpoint. This will should be
similar to the **Description** above, but written out as an explicit checklist rather than a human
readable description. Reminder that this is not *due* until checkpoint 4, but failing to plan is
planning to fail.

-	App should have four tabs: 
    -	Homepage
    -	Projects
    -	Resume
    -	Cover letter in a list. 

-	Show email address as default setting 

-	User should be able to add tabs, create themes, and make it more customizable to their preferences. 

-	Edit he layout of the Home Page: add images, background color, change font style 

-	Edit Projects Page: add images, videos, background color, font style, text size 

-	Edit Resume page:  edit the layout, add images, background color, change font style, text 

-	Edit Cover Letter layout 


For each specialization, you must list specific checkpoints that are relevant to that particular specialization.

## Specialization deliverables

For each student/team adding a specialization, name that specialization and describe what
functionality you will be adding.

# New AWS instance

1. Install Node:
  `sudo curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -`
  `sudo yum install -y nodejs`

2. Install Git
   `sudo yum install -y git`


# Installation

1. Clone the code repository

    `$ git clone git@github.com:ckanich-classrooms/final-project-defaultvalue.git`

2. Access to the parent directory.

    `$ cd final-project-defaultvalue/` 

3. Copy the file **.env.example** and rename it to **.env**

    `$ cp .env.example .env`

4. Open the **.env** file with your preferred editor and enter the *user* and *password* provided by your administrator.

5. Install libraries

    `$ npm install`

6. Start up the application for APIs

    `$ npm start &`

7. Start up the front-end 

    `cd front-end`
    `$ npm install`
    `$ npm start &`
