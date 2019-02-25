import inquirer from 'inquirer';
import downloadGit from 'download-git-repo';
import child_process from 'child_process';
import preSpinner from 'cli-spinner';
import fetch from 'node-fetch';
const Spinner = preSpinner.Spinner;

let projectName = process.argv[2] || null;
const projects = {
  dom: 'DOM',
  node: 'Node.js',
  nodeReactApi: 'Node-React-API',
};
const questions = [
  {
    type: 'list',
    message: 'Select project boilerplate',
    name: 'project',
    choices: [
      {
        name: 'DOM',
      },
      {
        name: 'Node.js',
      },
      {
        name: 'Node-React-Api',
      },
    ],
  },
];

if (!projectName) {
  questions.unshift({
    type: 'input',
    name: 'projectName',
    message: 'Select project name',
    validate(name) {
      if (!name.match(' ') || !name) {
        projectName = name;
        return true;
      }

      return 'Invalid name';
    },
  });
}

inquirer
  .prompt(questions)
  .then(answers => fetchDevEnv(answers.project.toLowerCase()));

let projectPath;

function fetchDevEnv(type) {
  projectPath = `./${projectName}`;
  let selectedProject = 'webdevenv/';
  // Select the project
  if (type === 'dom') selectedProject += projects.dom;
  if (type === 'node.js') selectedProject += projects.node;
  if (type === 'node-react-api')
    selectedProject += projects.nodeReactApi;
  // Download project
  console.log('started download');
  downloadGit(selectedProject, projectPath, err => {
    if (err) {
      console.error(err);
    }
    console.log('finished download');
    npmInstall();
  });
}

const obj = new Spinner({
  text: 'Installing project',
  stream: process.stderr,
  onTick(msg) {
    this.clearLine(this.stream);
    this.stream.write(msg);
  },
});
obj.setSpinnerString(0);

function npmInstall() {
  console.clear();
  obj.start();
  child_process.exec(
    'npm i',
    {
      cwd: projectPath,
    },
    err => {
      if (err) {
        fetch(
          'http://logs-01.loggly.com/inputs/d8b77b98-163a-4435-95a2-96a25b438104/tag/http/',
          {
            method: 'POST',
            body: JSON.stringify(err),
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          },
        );
        obj.stop(1);
        console.log('Installation error!\n');
        console.log('Run "npm install" manually!\n\n');
        console.log(
          'And then go into the project folder and run:',
        );
        console.log('"npm start help"');
        return 0;
      }
      obj.stop(1); // clears console
      console.log('Installation finished!\n');
      console.log('Go into the project folder and run:');
      console.log('"npm start help"');
    },
  );
}
