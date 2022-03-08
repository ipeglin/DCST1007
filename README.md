<style>
    body {
  background-color: #1D1D1D;
  min-height: 100vh;
  margin: 0;
  font-family: "Droid Sans", sans-serif;
    }
    body:before {
        content: "";
        position: fixed;
        top: 0px;
        left: 50%;
        bottom: 0px;
        transform: translateX(-50%);
        width: 4px;
        background-color: #fff;
    }
    body .entries {
        width: calc(100% - 80px);
        max-width: 800px;
        margin: auto;
        position: relative;
        left: -5px;
    }
    body .entries .entry {
        width: calc(50% - 80px);
        float: left;
        padding: 20px;
        clear: both;
        text-align: right;
    }
    body .entries .entry:not(:first-child) {
        
    }
    body .entries .entry .title {
        font-size: 32px;
        margin-bottom: 12px;
        position: relative;
        color: #fff;
    }
    body .entries .entry .title:before {
        content: "";
        position: absolute;
        width: 8px;
        height: 8px;
        border: 4px solid #ffffff;
        background-color: #1D1D1D;
        border-radius: 100%;
        top: 50%;
        transform: translateY(-50%);
        right: -73px;
        z-index: 1000;
    }
    body .entries .entry .title.big:before {
        width: 24px;
        height: 24px;
        transform: translate(8px, -50%);
    }
    body .entries .entry .body {
        color: #aaa;
    }
    body .entries .entry .body p {
        line-height: 1.4em;
    }
    body .entries .entry:nth-child(2n) {
        text-align: left;
        float: right;
    }
    body .entries .entry:nth-child(2n) .title:before {
        left: -63px;
    }
    body .entries .entry:nth-child(2n) .title.big:before {
        transform: translate(-8px, -50%);
    }
</style>

# DCST1007
This repository contains assignments from the course [DCST1007](https://www.ntnu.edu/studies/courses/DCST1007) at [NTNU, Trondheim](https://www.ntnu.edu/).


## Previous exams
<div class="entries">
  <div class="entry">
    <div class="title big"><a href="https://github.com/ipeglin/DCST1007/tree/master/Exams/Exam-V21">2021, Spring Exam</></div>
    <!-- <div class="body">
      <p>Rerum sit libero possimus amet excepturi. Exercitationem enim dolores sunt praesentium dolorum praesentium.</p>
    </div> -->
  </div>
  <div class="entry">
    <div class="title big">2020, Spring Exam (Coming Soon)</div>
    <!-- <div class="body">
      <p>Impedit dolorem commodi explicabo fugit aut alias voluptatem. Magnam earum rerum quae dicta quibusdam aliquam ut.</p>
    </div> -->
  </div>
</div>


## Assignments

### [OOP1](https://github.com/ipeglin/DCST1007/tree/master/Assignments/js-ov01-ian-philip-eglin) - Introduction to OOP with JavaScript
Experimenting with the pure basics of Object Oriented Programming in JavaScript. Some of the variable names and such is in Norwegian since some of the points required it.

### [OOP2](https://github.com/ipeglin/DCST1007/tree/master/Assignments/js-ov02-ian-philip-eglin) - Continuation of OOP with JavaScript
Further exploring the posibilities that opens up when using OOP. Experimenting a bit with inheritance and class extentions. Also probably gonna start up a bank in the foreseeable future. Kappa.

### [OOP3](https://github.com/ipeglin/DCST1007/tree/master/Assignments/js-ov03-ian-philip-eglin) - Drawing bubbles with canvas
Learning to take use of the canvas element in HTML and how it can be manipulatet with JavaScript. When it comes the the OOP aspect of this assignment, there were very little difference in difficulty and pure code, as compared to the previous assignments.

### [OOP4](https://github.com/ipeglin/DCST1007/tree/master/Assignments/js-ov04-ian-philip-eglin) - Promises
Exploring the world of promises and what they can be used for. Created simple functions for validating and sizing up a number compared to 10, as well as a function that makes a *"shouting"* array and sorts it alphabetaically. Both of the functions will reject and provide a new error message in the console if the input is something unexpected.

### [OOP5](https://github.com/ipeglin/DCST1007/tree/master/Assignments/js-ov05-ian-philip-eglin) - JSON
Once again trying to use JSON as a database such as previously done in one of last years [DCST1003 Assignments](https://github.com/ipeglin/DCST1003/tree/master/Assignments/js-ov09-ian-philip-eglin). In this assignment, the array containing informations with the highest mountains in every norwegian county, was to be declared in the JS file and then stored locally using setItem. As we still don't have much experience with JSON this improved some of my understanding of it's abilities.

### [OOP6](https://github.com/ipeglin/DCST1007/tree/master/Assignments/js-ov06-ian-philip-eglin/src) - Static applications
Getting started with the React framework. The assignment was to make a resume with static pages using the framework and running it in electron.

### [OOP7](https://github.com/ipeglin/DCST1007/tree/master/Assignments/js-ov07-ian-philip-eglin/src) - Dynamic applications with database communication
Implementing the use of databases to create dynamic applications that writes out the information from the databases. This assignment is also created with the use of the React framework.

### [OOP8](https://github.com/ipeglin/DCST1007/tree/master/Assignments/js-ov08-ian-philip-eglin/src) - User input, component preferances and service classes
Creating even more dynamic applications which allows the user to directly change the informastion in the database from the app. Methods that allow this are stored in a separate JavaScript file and exported. There are some problems with this solution, and it could definitely be improved, but seeing as I do not have prior knowledge of databases this is has to be good enough.

### [OOP9](https://github.com/ipeglin/DCST1007/tree/master/Assignments/js-ov09-ian-philip-eglin/src) - Reusable components and splitted conditional objects
Using widgets and glasses for regular HTML element. By taking advantage of bootstrap the code is easier to produce and you can bypass some basic (and terrifying) CSS scripting. This means that you can easily make a basic GUI for database interaction with just JS which is GREAT! I don't like CSS if you hadn't guessed it already...

### [OOP10](https://github.com/ipeglin/DCST1007/tree/master/Assignments/js-ov10-ian-philip-eglin/src) - Static type checking
Converting the OOP9 code to use typescript to make sure that all variables in the code are run with the intended type. No functionality was deleted or appended, but I removed the stores.js file and implemented the two methods into studentService and groupService in services.js