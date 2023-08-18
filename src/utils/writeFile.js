import fs from "fs";

const writeFile = (fileName, content) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(fileName, content, (error) => {
      if (error) reject("ERRO INTERNO PAI!\n");
      else resolve();
    });
  });
};

export { writeFile };
