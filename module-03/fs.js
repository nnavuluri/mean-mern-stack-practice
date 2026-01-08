fs=require("fs");
console.log("File System Info:");
console.log("Current Directory Files:", fs.readdirSync("."));
fs.writeFileSync("sample.txt", "Node is awesome ,but synchronous fs is not!");
console.log("Created sample.txt file.");
console.log("file creation End");

fs.writeFile("async_sample.txt", "This is asynchronous file write example.", handleFilecreation);
console.log("Asyn file creation End");

function handleFilecreation(err){
    if(err)       throw err;
    console.log("Asynchronous file created: async_sample.txt");
};

// inlinne callback function example / arrow function
fs.writeFile("async_sample.txt", "This is asynchronous file write example.", (err) => {

    if(err)       throw err;
    console.log("Asynchronous file created: async_sample.txt through inlinne callback function example / arrow function");
});

fs.appendFile("sample.txt", "\n Appending new data to sample.txt file.", (err) => {

    if(err)       throw err;
    console.log("Data appended to sample.txt file.Nag");
});

fs.rename("sample.txt", "renamed_sample.txt", (err) => {

    if(err)       throw err;
    console.log("File renamed to renamed_sample.txt");
});

fs.unlink("async_sample.txt", (err) => {            
    if(err)       throw err;
    console.log("async_sample.txt file deleted.");
});

fs.readFile("renamed_sample.txt", "utf8", (err, data) => {
    if(err)       throw err;
    console.log("Content of renamed_sample.txt:");
    console.log(data);
});