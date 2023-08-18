#!/usr/bin/env node

import fs from "fs";
import { execute } from "./src/execute.js";

const birlFilePath = process.argv[2];
const input = process.argv[3];

try {
  const birlCode = fs.readFileSync(birlFilePath, "utf-8");
  execute(birlCode, input)
    .then((result) => {
      if (result.error != null) {
        console.error("Erro:");
        console.error(result.error);
      }
    })
    .catch((error) => {
      console.error("Erro ao executar o código BIRL:", error);
    });
} catch (error) {
  console.error("Erro ao ler o arquivo BIRL:", error);
}
