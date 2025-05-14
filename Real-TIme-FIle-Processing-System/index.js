import { readFile, writeFile, unlink } from "node:fs";
import { Buffer } from "node:buffer";
import { randomInt } from "node:crypto";

// console.log(num)
const removeFile = async (path, time) => {
  try {
    setTimeout(() => {
      unlink(
        path,
        (err) => {
          if (err) throw err;
          console.log("path was deleted");
        },
        time
      );
    });
  } catch (error) {
    console.log(error.message);
  }
};

setInterval(() => {
  const filename = Date.now();
  let num = randomInt(1, 10);

  const data = new Uint8Array(
    Buffer.from(`File started processing with the duration of ${num} seconds`)
  );

  writeFile(`./Processing/${filename}.txt`, data, (err) => {
    if (err) throw err;
    if (num>6) {
      writeFile(`./Crashed/logs.txt`, `Final-Status : Crashed ${new Date()}`, (err) => {
        if (err) throw err;
        console.log("The file has been saved to crashed file!");
      });
    }else if(num<=5){
        writeFile(`./In-Progress/logs.txt`, `In-Process ${new Date()}`, (err) => {
        if (err) throw err;
        console.log("The file has been moved to In-Progress file!");
      });
      writeFile(`./Completed/logs.txt`, `Final-Status : Completed ${new Date()}`, (err) => {
        if (err) throw err;
        console.log("The file has been moved to completed file!");
      });
    }
    console.log("The file has been saved!");
  });
  //   removeFile(`./Processing/${filename}.txt`,`${num*1000}`)
}, 3000);


