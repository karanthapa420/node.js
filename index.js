const { spawn } = require("child_process");
const py = spawn('python', ['py-script.py', 'soren']);

py.stdout.on('data', (data) => {
    console.log(`stdout: ${data.toString()}`);
});

py.stderr.on('data', (data) => {
    console.error(`stderr: ${data.toString()}`);
});

py.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
});
