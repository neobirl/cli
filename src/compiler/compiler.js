import { exec } from "child_process";

export class Compiler {
  #filePath = "";

  constructor(filePath) {
    this.#filePath = filePath;
  }

  async compile() {
    const { compileCommand, removeCommand } = this.#generateCommands(
      this.#filePath
    );

    try {
      return new Promise((resolve, reject) => {
        exec(compileCommand, (error, stdout) => {
          if (error) {
            console.error(error);

            reject({
              error: "ERRO AO COMPILAR, PORRA!" + error,
              stdout: null,
            });
          }

          console.log("\n" + stdout);

          resolve(stdout);
        }).on("close", () => {
          exec(removeCommand, (error) => {
            if (error) console.error(error);
          });
        });
      });
    } catch (error) {
      return {
        error: "ERRO AO EXECUTAR O COMPILADOR, CARALHO!\n" + error,
        stdout: null,
      };
    }
  }

  #generateCommands(filePath, platform = process.platform) {
    const windowsCommands = {
      compileCommand: `gcc ${filePath}.c -o ${filePath}.exe && .\\${filePath}.exe < ${filePath}.txt`,
      removeCommand: `del "${filePath}.*"`,
    };

    const unixCommands = {
      compileCommand: `gcc ${filePath}.c -o ${filePath} -lm && timeout 2s ${filePath} < ${filePath}.txt`,
      removeCommand: `rm ${filePath}*`,
    };

    switch (platform) {
      case "win32":
        return windowsCommands;

      default:
        return unixCommands;
    }
  }
}
