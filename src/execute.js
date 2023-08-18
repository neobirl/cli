import { Compiler } from "./compiler/compiler.js";
import { Converter } from "./converter/converter.js";
import { writeFile } from "./utils/writeFile.js";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export async function execute(birlCode, stdin) {
  try {
    const code = new Converter(birlCode).convertToC();
    const fileName = "birl-" + Date.now();
    const filePath = `${__dirname}/${fileName}`;
    await writeFile(`${filePath}.txt`, (stdin || ""));
    await writeFile(`${filePath}.c`, code);
    return new Compiler(filePath).compile();
  } catch (e) {
    return {
      error: "ERRO INTERNO, MONSTRO!\n" + e,
      stdout: null,
    };
  }
}
