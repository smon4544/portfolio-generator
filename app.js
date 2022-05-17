// ** Creates a new array based on the values in process.argv starting at the third index and ending 
//    with the final index. **
// ** To return through the last index in the array, we provide the length of the array as the second 
//    argument. **

      // const profileDataArgs = process.argv.slice(2);

// ** Create a function that takes the input and displays some output. **
// ** A function that can take in the array of command-line arguments. **

      // const printProfileData = profileDataArr => {

          // ** The function prints them one by one. **
          // ** Using a for loop to iterate through an array, and using arrayName[i] syntax to access the 
          //    array at that iteration. **
          // ** This... **

        // for (let i = 0; i < profileDataArr.length; i += 1) {
          // console.log(profileDataArr[i]);
        // }

        // console.log('================');

        // ** Accepts a function as an argument and executes that function on each element of the array, 
        //    using the value of the element at that iteration as its argument. **
        // ** Is the same as this... **
        // ** This is a lot cleaner and meant specifically for arrays. **

        // profileDataArr.forEach(profileItem => console.log(profileItem));
      // };

      // printProfileData(profileDataArgs);

// ---------------------------------------------NEW-CODE------------------------------------------ //

// ** This function returns a string. **
// ** In this function, which has no parameters, we need parentheses to hold the place where parameters 
//    would've been. **
// ** In the special case when a function has only a single statement, the curly braces, {}, are 
//    unnecessary and the return statement is implied. **

      // const generatePage = () => 'Name: Jane, Github: janehub';

// ** Print the function call to check if this function returns a string. **
      
      // console.log(generatePage());

//--------TEMPLATE LITERALS---------//

// ** To make this function dynamic, we could add arguments to the function expression, then insert the 
//    data into the string using interpolation, which is the substitution of text for a variable we 
//    build into the string. **

// ** Use template literals to insert the variables inside the function block. **

      // const generatePage = (userName, githubName) => `Name: ${userName}, Github: ${githubName}`;

// ** Display the return from the function call to make sure the function still work. **

      // console.log(generatePage('Jane', 'janehub'));

//--------MULTI-LINE STRINGS---------//

// ** Template literals allow us to do easily something that would be difficult with regular strings: 
//    multi-line text. **
// ** To do this, simply enter a keyboard return in the template literal wherever you want a line break 
//    to occur, just as you would do if you were entering a line break in a word processor. **
// ** Here, we've returned the very same string as before, but we added carriage returns manually within 
//    the template literal. **

      // const generatePage = (userName, githubName) => {
          // return `
            //  Name: ${userName}
            // GitHub: ${githubName}
          // `;
      // };

// ** Display the return from the function call to make sure the function still work. **

      //console.log(generatePage('Jane', 'janehub'));

// ---------------------------------------------NEW-CODE------------------------------------------ //

// ** The require statement is a built-in function that's globally available in Node.js. It allows 
//    the app.js file to access the fs module's functions through the fs assignment. **
      
      // const fs = require('fs');

// ** Holds the user command-line argument. **

      // const profileDataArgs = process.argv.slice(2, process.argv.length);

// ** Collect command-line arguments. **
// ** Extract those arguments and store them into distinct variables. **

      // const [name, github] = profileDataArgs;

// ** (replace) Use the array index. **

      // (replace) const name = profileDataArgs[0];
      // (replace) const github = profileDataArgs[1];

// ** Change the generatePage() function in app.js to generate HTML in the output. **

      // const generatePage = (name, github) => {
          // return `
              // <!DOCTYPE html> 
              // <html lang="en"> 
              // <head>
                  // <meta charset="UTF-8">
                  // <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  // <meta http-equiv="X-UA-Compatible" content="ie=edge">
                  // <title>Portfolio Demo</title>
              // </head>
      
              // <body>
                  // <h1>${name}</h1>
                  // <h2><a href="https://github.com/${github}">Github</a></h2>
              // </body>
              // </html>
          // `;
      // };
   
// ** (replace) Function that can receive input and display the data dynamically.
      // (replace) const generatePage = (userName, githubName) => {
          // return `
              // Name: ${userName}
              // GitHub: ${githubName}
          // `;
      // };

// ** The fs.writeFile() function definition has three arguments. The first argument is the name of 
//    the file that's being created. The next argument is the data that will write onto the file, in 
//    this case the HTML template literal. The last parameter is a callback function that will be used 
//    for error handling. **

// ** The first argument is the file name that will be created, or the output file. The second argument 
//    is the data that's being written: the HTML string template. The third argument is the callback 
//    function that will handle any errors as well as the success message. **

      // fs.writeFile('index.html', generatePage(name, github), err => {

          // ** In the callback function block, a conditional statement checks for the err being returned 
          //    by the callback function. If err exists, an error message is displayed. **
          // ** Rather than silently displaying the error with console.log(err);, the below statement 
          //    creates an exception and stops the execution of the code. **
    
          // if (err) throw err;
          
          // ** A console.log() success statement that directs users to inspect the newly created file. **

          //    console.log('Portfolio complete! Check out index.html to see the output!');
      // });

// ** (replace) Edit the console.log() to print the return of generatePage() with those two variables as arguments. **
// ** (replace) Add another one above it so we can log the name and github inputs and confirm they match. **

      // ** console.log(Name, GitHub);
      // ** console.log(generatePage(Name, GitHub));

      
// ---------------------------------------------NEW-CODE------------------------------------------ //

// ** Refactored code: always try to limit the functions and files to a single responsibility. **

      // const fs = require('fs');

// ** With this statement, the object in the module.exports assignment will be reassigned to the generatePage variable in 
//    the app.js file. Note here that the variable name is arbitrary; however, the relative path to include the file must be exact. **

      // const generatePage = require('./src/page-template.js');

      // const profileDataArgs = process.argv.slice(2);

      // const [name, github] = profileDataArgs;

      // fs.writeFile('./index.html', generatePage(name, github), err => {
         // if (err) throw new Error(err);

         // console.log('Portfolio complete! Check out index.html to see the output!');
      // });

// ---------------------------------------------NEW-CODE------------------------------------------ //

// Since we're not going to use process.argv to capture data anymore and we're using Inquirer instead, delete any 
// code mentioning it.

const inquirer = require('inquirer');

inquirer
  // Notice that inquirer's prompt method can receive an array of objects in its argument, known as the question object.
  // The properties of the question object identify the type, name, and question message of this particular question.
  .prompt([
    {
      // "Input" was chosen as the type of question because the answer will be a text reply.
      type: 'input',
      name: 'name',
      message: 'What is your name?'
    }
  ])
  // The answer object is returned as a Promise. We'll explore Promises more later, but for now understand that this 
  // is a new tool for dealing with asynchronous functions that will return the answer object in the then function.
  .then(answers => console.log(answers));

// const fs = require('fs');
// const generatePage = require('./src/page-template');

// const pageHTML = generatePage(name, github);

// fs.writeFile('./index.html', pageHTML, err => {
//   if (err) throw err;

//   console.log('Portfolio complete! Check out index.html to see the output!');
// });

