import { Command } from 'commander';
import * as fs from 'fs';
import * as path from 'path';

const packageJsonPath = path.join(__dirname, '../package.json');
const packageJsonData = fs.readFileSync(packageJsonPath, 'utf8');
const packageJsonObj = JSON.parse(packageJsonData);
const version = packageJsonObj.version;

const program = new Command();

program
    .version(version)
    .requiredOption('-n, --name <type>', 'Name of the app to create')
    .parse(process.argv);

const options = program.opts();

const appDir = path.join(process.cwd(), options.name);

if (!fs.existsSync(appDir)){
    fs.mkdirSync(appDir);
    fs.copyFileSync(
        path.join(__dirname, '../templates', 'template.js'),
        path.join(appDir, 'index.js')
    );
    console.log(`App created successfully at ${appDir}`);
} else {
    console.error(`Directory ${appDir} already exists. Please choose a different name.`);
}
