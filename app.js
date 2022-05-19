// const fs = require('fs');
// const generatePage = require('./src/page-template');

// const pageHTML = generatePage(name, github);

// fs.writeFile('./index.html', pageHTML, err => {
//   if (err) throw err;

//   console.log('Portfolio complete! Check out index.html to see the output!');
// });

const inquirer = require('inquirer');

// Refactor the call to inquirer.prompt() in a function so that it can be invoked on demand within the flow of the application.
const promptUser = () => {
      return inquirer.prompt([
        {
          type: 'input',
          name: 'name',
          message: 'What is your name? (Required)',
          // Notice that the validate method receives an argument. This argument is the user's input, nameInput.
          validate: nameInput => {
            // Also notice that the conditional statement in the function block of the validate method. If the condition evaluates 
            // to true, the validation has passed successfully. However, if the condition evaluates to false, the user receives a 
            // message and is prompted with the same question until an answer is received.
            if (nameInput) {
              return true;
            } else {
              console.log('Please enter your name!');
              return false;
            }
          }
        },
        {
          type: 'input',
          name: 'github',
          message: 'Enter your GitHub Username. (Required)',
          validate: usernameInput => {
            if (usernameInput) {
              return true;
            } else {
              console.log('Please enter your GitHub username!');
              return false;
            }
          }
        },
        {
          type: 'confirm',
          name: 'confirmAbout',
          message: 'Would you like to enter some information about yourself for an "About" section?',
          default: true
        },
        // Property to the prompt looking for information about the user called when. This is like the validate method we 
        // used previously, but instead of passing the value entered for that specific question in as the parameter, it passes 
        // an object of all of the answers given so far as an object.
        {
          type: 'input',
          name: 'about',
          message: 'Provide some information about yourself:',
          // The inquirer method automatically passes an object containing the user's answers to the when function. This allows 
          // us to write conditional code based on the answers the user has supplied thus far.
          when: ({ confirmAbout }) => {
            if (confirmAbout) {
              return true;
            } else {
              return false;
            }
          }
        }
      ]);
};
    
// promptUser().then(answers => console.log(answers));

// Notice that the function returns a running of inquire.prompt(), thus returning what it returns, which is a Promise. Just 
// like fetch(), which we covered previously, the Promise will resolve with a .then() method.

// So, here we're calling a function that returns the result of inquire.prompt, which is a Promise. We therefore append 
// the .then() method to the function call, since it returns a Promise, and we put into .then() whatever we wish to take 
// place after the Promise is resolved.

// This allows the function expression to have a single responsibility: to prompt the user. The Promise from inquirer can 
// now be handled by the function call, which helps maintain best practices—in contrast to how callbacks dealt with 
// asynchronous behavior.

const promptProject = portfolioData => {
  console.log(`
=================
Add a New Project
=================
`);

  // If there's no 'projects' array property, create one
  if (!portfolioData.projects) {
    portfolioData.projects = [];
  }
  return inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of your project? (Required)',
        validate: nameInput => {
          if (nameInput) {
            return true;
          } else {
            console.log('You need to enter a project name!');
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'description',
        message: 'Provide a description of the project (Required)',
        validate: descriptionInput => {
          if (descriptionInput) {
            return true;
          } else {
            console.log('You need to enter a project description!');
            return false;
          }
        }
      },
      {
        type: 'checkbox',
        name: 'languages',
        message: 'What did you this project with? (Check all that apply)',
        choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
      },
      {
        type: 'input',
        name: 'link',
        message: 'Enter the GitHub link to your project. (Required)',
        validate: linkInput => {
          if (linkInput) {
            return true;
          } else {
            console.log('You need to enter a project GitHub link!');
            return false;
          }
        }
      },
      {
        type: 'confirm',
        name: 'feature',
        message: 'Would you like to feature this project?',
        default: false
      },
      {
        type: 'confirm',
        name: 'confirmAddProject',
        message: 'Would you like to enter another project?',
        default: false
      }
    ])
    // Once the data has been collected by inquirer, you need to add the project data to the projects array.
    // use the array method push() to place the projectData from inquirer into the new projects array we just created
    .then(projectData => {
      portfolioData.projects.push(projectData);
      // Add a condition that will call the promptProject(portfolioData) function when confirmAddProject evaluates to true.
      // In this condition, we're evaluating the user response to whether they wish to add more projects. This response was 
      // captured in the answer object, projectData, in the property confirmAddProject. If the user wishes to add more projects, 
      // then this condition will evaluate to true and call the promptProject(portfolioData) function.
      if (projectData.confirmAddProject) {
        return promptProject(portfolioData);
      // If the user decides not to add more projects, then the condition will evaluate to false and trigger this statement.
      // We have to return the portfolioData in the else statement explicitly so that the object is returned. This is a critical 
      // step to retrieving the user's answer and building an HTML template.
      } else {
        return portfolioData;
      }
    });
};

promptUser()
  .then(promptProject)
  .then(portfolioData => {
    console.log(portfolioData);
  });

// In order to see if the new question types are working properly, we'll need to call the function promptProject().
// Using Promises, we can chain the functions together using the then() method.
//promptUser()
  // .then(answers => console.log(answers))
  // .then(promptProject)
  // .then(projectAnswers => console.log(projectAnswers));
// The preceding image shows that by chaining the function call to the then() method, we can control the sequence of the 
// application's control flow. We only want to prompt users with the project questions after the profile questions.