# 89-3210 Course - Exercise 2 - Youtube Project with Server Side 

This project is a simplified version of YouTube, allowing users to watch videos as a guest or a registered user, so you can upload videos, write comments and see other user's profiles and their videos.

In this exercise, we were asked to add a server to the application so it consists of two main folders:
1. youtube - this is the client side, created using React in the first exercise and modified to work with the server
2. server – as the name implies, this is the server folder. Using express and mongoose.

Please note:
1. **main** branch is the branch for exercise 1
2. **part_2_main** is the branch for exercise 2
   
## A brief explanation about the workflow:

1.	Analysing the requirements from the exercise’s pdf
2.	Putting the requirements in a jira project
3.	Dividing related tasks to each group member (for example, registration and sign-in is one part and upload videos is another). Each group member with a feature branch of its own
4.	Merging everything and working on the main branch until the submitted version
Link to Jira: https://tomerbarak2.atlassian.net/jira/software/projects/YOUT/boards/4

## Features
- Home screen suggests top 10 most viewed videos and 10 more random videos, randomly
- Watch videos
- User registration and sign in
- Upload videos for registered users
- User Profile that consists user's videos
- Logged-in user can edit/delete its account
- Comment on videos and edit or delete comments
- Dark mode and light mode

## Installation

To get started with the project, follow these steps:

**Clone the repository:**
 get to your desired folder and clone the repository with the following command:
##### git clone https://github.com/guybaruch1/Youtube.git

**Create configuration file:**
under server/config, create a file called ".env.local" which consist the following lines:

#### CONNECTION_STRING = "mongodb://localhost:YOUR_PORT_OF_CHOICE"
#### PORT = 8080
#### SECRET_KEY=your_secret_key

Make sure port is 8080 in SECRET_KEY is as defined above. You can choose your own MongoDB port.

**Drop `id_1` Index:**
In case an `id_1` index appears in the `videomodels` collection in the `test` database (or the database you use), user will be limited to upload just a single video.
The solution is dropping it using the following command in your MongoDB shell or MongoDB Compass:
#### use test
#### db.videomodels.dropIndex("id_1")

**Install dependencies:**
#### cd Youtube/web/youtube
#### npm run build

**Run the project with running the server:**
 start the development server using
#### cd Youtube/web/server
#### npm install custom-env express body-parser cors mongoose path
#### npm start

The application should now be running on [http://localhost:8080](http://localhost:8080).
