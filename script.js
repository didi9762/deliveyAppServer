import { exec } from 'child_process';

const commands = ['node router.js', 'node clientRecive.js', 'node clientSend.js'];

commands.forEach((command) => {
  exec(`start cmd /k ${command}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });
});