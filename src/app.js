import inquirer from 'inquirer';
import downloadGit from 'download-git-repo';
import child_process from 'child_process';
import preSpinner from 'cli-spinner';
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
    () => {
      obj.stop(1); // clears console
      console.log('Installation finished!\n');
      console.log('Go into the project folder and run:');
      console.log('"npm start help"');
    },
  );
}
