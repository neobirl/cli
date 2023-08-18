import assert from "assert";
import { describe, it, before, after } from "node:test";
import { Compiler } from "../compiler.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = `${__dirname}/test`;

describe("Compiler", () => {
  after(() => {
    const code = `#include <stdio.h>\nint main(){\nchar nome[50];\nprintf("HELLO MONSTRO, ");\nscanf("%s", nome);\nprintf("%s", nome);\nreturn 0;\n}`;

    fs.writeFile(`${filePath}.c`, code, (err) => {
      if (err) console.log(err);
    });

    fs.writeFile(`${filePath}.txt`, "BAMBAM", (err) => {
      if (err) console.log(err);
    });
  });
  it("should compile successfully", async () => {
    const compiler = new Compiler(filePath);
    try {
      const result = await compiler.compile();
      assert.ok(result);
    } catch (error) {
      console.log(error);
      assert.fail(JSON.stringify(error));
    }
  });

  it("should return an object with error message on compilation failure", async () => {
    const compiler = new Compiler("invalid path");
    try {
      await compiler.compile();
      assert.fail("Compilation should have failed");
    } catch (error) {
      assert.strictEqual(typeof error, "object");
      assert.strictEqual(error.stdout, null);
    }
  });

  it("should remove compiled files after compilation", async () => {
    const testCPath = `${__dirname}/test.c`;
    const testTxtPath = `${__dirname}/test.txt`;
    const testBinPath = `${__dirname}/test`;
    const testExePath = `${__dirname}/test.exe`;

    let testCExists, testTxtExists, testBinExists, testExeExists;

    try {
      await fs.promises.stat(testCPath);
      testCExists = true;
    } catch (error) {
      testCExists = false;
    }

    try {
      await fs.promises.stat(testTxtPath);
      testTxtExists = true;
    } catch (error) {
      testTxtExists = false;
    }

    try {
      await fs.promises.stat(testBinPath);
      testBinExists = true;
    } catch (error) {
      testBinExists = false;
    }

    try {
      await fs.promises.stat(testExePath);
      testExeExists = true;
    } catch (error) {
      testExeExists = false;
    }

    assert.ok(!testCExists);
    assert.ok(!testTxtExists);
    assert.ok(!testBinExists);
    assert.ok(!testExeExists);
  });
});
