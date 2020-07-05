const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
process.stdout.write("ec >> ");
rl.on("line", function(line) {
    console.clear();
    if(line.startsWith("compile")){
        let code=fs.readFileSync(line.replace("compile ",""), 'utf8');
        run(code);

    }else{
        run(line);
    }
    process.stdout.write("ec >> ");
}).on("close", function() {
  process.exit();
});