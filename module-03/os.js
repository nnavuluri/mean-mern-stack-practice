var os=require("os");   
console.log("Operating System Info:");
console.log("Platform: "+os.platform());
console.log("Architecture: "+os.arch());
console.log("CPU Cores: "+os.cpus().length);
console.log("Total Memory: "+(os.totalmem()/1024/1024).toFixed(2)+" MB");
console.log("Free Memory: "+(os.freemem()/1024/1024).toFixed(2)+" MB");