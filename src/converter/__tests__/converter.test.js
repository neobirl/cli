import assert from "assert";
import { describe, it } from "node:test";
import { Converter } from "../converter.js";

describe("Conversion to C", () => {
  const IMPORTS =
    "#include <stdio.h>\n#include <math.h>\n#include <stdbool.h>\n\n";

  it("should return a string value", () => {
    const code = new Converter("HORA DO SHOW\nBIRL").convertToC();
    assert.equal(typeof code, "string");
  });

  it("should import all libs", () => {
    const code = new Converter("HORA DO SHOW\nBIRL").convertToC();
    assert.equal(code.includes(IMPORTS), true);
  });

  it(`should replace "HORA DO SHOW" for "int main(void){" `, () => {
    const code = new Converter("HORA DO SHOW").convertToC();
    assert.strictEqual(code, IMPORTS + "int main (void) {");
  });

  it(`should replace "BIRL" for "}" `, () => {
    const code = new Converter("BIRL").convertToC();
    assert.strictEqual(code, IMPORTS + "}");
  });

  it(`should replace "BORA CUMPADE" for "return" `, () => {
    const code = new Converter("BORA CUMPADE").convertToC();
    assert.strictEqual(code, IMPORTS + "return");
  });

  it(`should replace "CE QUER VER ESSA PORRA?" for "printf" `, () => {
    const code = new Converter("CE QUER VER ESSA PORRA?").convertToC();
    assert.strictEqual(code, IMPORTS + "printf");
  });

  it(`should replace "QUE QUE CE QUER MONSTRAO?" for "scanf" `, () => {
    const code = new Converter("QUE QUE CE QUER MONSTRAO?").convertToC();
    assert.strictEqual(code, IMPORTS + "scanf");
  });

  it(`should replace "SAI FILHO DA PUTA" for "break" `, () => {
    const code = new Converter("SAI FILHO DA PUTA").convertToC();
    assert.strictEqual(code, IMPORTS + "break");
  });

  it(`should replace "VAMO MONSTRO" for "continue" `, () => {
    const code = new Converter("VAMO MONSTRO").convertToC();
    assert.strictEqual(code, IMPORTS + "continue");
  });

  it(`should replace "ELE QUE A GENTE QUER?" for "if" `, () => {
    const code = new Converter("ELE QUE A GENTE QUER?").convertToC();
    assert.strictEqual(code, IMPORTS + "if  {");
  });

  it(`should replace "NAO VAI DAR NAO" for "else" `, () => {
    const code = new Converter("NAO VAI DAR NAO").convertToC();
    assert.strictEqual(code, IMPORTS + "} else {");
  });

  it(`should replace "QUE NUM VAI DAR O QUE?" for "else if" `, () => {
    const code = new Converter("QUE NUM VAI DAR O QUE?").convertToC();
    assert.strictEqual(code, IMPORTS + "} else if  {");
  });

  it(`should replace "QUE NAO VAI DAR O QUE?" for "else if" `, () => {
    const code = new Converter("QUE NAO VAI DAR O QUE?").convertToC();
    assert.strictEqual(code, IMPORTS + "} else if  {");
  });

  it(`should replace "DERRUBAR ARVORES" for "switch  {"`, () => {
    const code = new Converter("DERRUBAR ARVORES").convertToC();
    assert.strictEqual(code, IMPORTS + "switch  {");
  });

  it(`should replace "ARVORE" for "case :"`, () => {
    const code = new Converter("ARVORE").convertToC();
    assert.strictEqual(code, IMPORTS + "case :");
  });

  it(`should replace "IBERAPUERA" for "default:"`, () => {
    const code = new Converter("IBERAPUERA").convertToC();
    assert.strictEqual(code, IMPORTS + "default:");
  });

  it(`should replace "NEGATIVA BAMBAM" for "while" `, () => {
    const code = new Converter("NEGATIVA BAMBAM").convertToC();
    assert.strictEqual(code, IMPORTS + "while  {");
  });

  it(`should replace "MAIS QUERO MAIS" for "for" `, () => {
    const code = new Converter("MAIS QUERO MAIS").convertToC();
    assert.strictEqual(code, IMPORTS + "for  {");
  });

  it(`should replace "OH O HOME AI PO" for " {" `, () => {
    const code = new Converter("OH O HOME AI PO ()").convertToC();
    assert.strictEqual(code, IMPORTS + " {");
  });

  it(`should replace "AJUDA O MALUCO TA DOENTE" for "" `, () => {
    const code = new Converter("AJUDA O MALUCO TA DOENTE").convertToC();
    assert.equal(code, IMPORTS + " ");
  });

  it(`should replace "AJUDA O MALUCO QUE TA DOENTE" for "" `, () => {
    const code = new Converter("AJUDA O MALUCO TA DOENTE").convertToC();
    assert.equal(code, IMPORTS + " ");
  });

  it(`should replace "FRANGO" for "char" `, () => {
    const code = new Converter("FRANGO").convertToC();
    assert.equal(code, IMPORTS + "char");
  });

  it(`should replace "MONSTRO" for "int" `, () => {
    const code = new Converter("MONSTRO").convertToC();
    assert.equal(code, IMPORTS + "int");
  });

  it(`should replace "MONSTRINHO" for "short" `, () => {
    const code = new Converter("MONSTRINHO").convertToC();
    assert.equal(code, IMPORTS + "short");
  });

  it(`should replace "MONSTRAO" for "long" `, () => {
    const code = new Converter("MONSTRAO").convertToC();
    assert.equal(code, IMPORTS + "long");
  });

  it(`should replace "TRAPEZIO" for "float" `, () => {
    const code = new Converter("TRAPEZIO").convertToC();
    assert.equal(code, IMPORTS + "float");
  });

  it(`should replace "TRAPEZIO DESCENDENTE" for "double" `, () => {
    const code = new Converter("TRAPEZIO DESCENDENTE").convertToC();
    assert.equal(code, IMPORTS + "double");
  });

  it(`should replace "BICEPS" for "unsigned" `, () => {
    const code = new Converter("BICEPS").convertToC();
    assert.equal(code, IMPORTS + "unsigned");
  });

  it(`should replace "TREZE MEMO" for "bool" `, () => {
    const code = new Converter("TREZE MEMO").convertToC();
    assert.equal(code, IMPORTS + "bool");
  });

  it(`should replace "FIBRA" for "const"`, () => {
    const code = new Converter("FIBRA").convertToC();
    assert.equal(code, IMPORTS + "const");
  });

  it(`should replace "MUTANTE" for "struct"`, () => {
    const code = new Converter("MUTANTE").convertToC();
    assert.equal(code, IMPORTS + "struct");
  });
});
