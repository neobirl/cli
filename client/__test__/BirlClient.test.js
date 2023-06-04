import assert from 'assert';
import { describe, it } from 'node:test';
import { BirlClient } from '../BirlClient.js';
const birlClient = new BirlClient();

describe('Conversion to C', () => {
	const imports =
		'#include <stdio.h>\n#include <math.h>\n#include <stdbool.h>\n\n';

	it('should return a string value', () => {
		const code = birlClient['convertToC']('HORA DO SHOW\nBIRL');
		assert.equal(typeof code, 'string');
	});

	it('should import all libs', () => {
		const code = birlClient['convertToC']('HORA DO SHOW\nBIRL');
		assert.equal(code.includes(imports), true);
	});

	it(`should replace "HORA DO SHOW" for "int main(void){" `, () => {
		const code = birlClient['convertToC']('HORA DO SHOW');
		assert.strictEqual(code, imports + 'int main (void) {');
	});

	it(`should replace "BIRL" for "}" `, () => {
		const code = birlClient['convertToC']('BIRL');
		assert.strictEqual(code, imports + '}');
	});

	it(`should replace "BORA CUMPADE" for "return" `, () => {
		const code = birlClient['convertToC']('BORA CUMPADE');
		assert.strictEqual(code, imports + 'return');
	});

	it(`should replace "CE QUER VER ESSA PORRA?" for "printf" `, () => {
		const code = birlClient['convertToC']('CE QUER VER ESSA PORRA?');
		assert.strictEqual(code, imports + 'printf');
	});

	it(`should replace "QUE QUE CE QUER MONSTRAO?" for "scanf" `, () => {
		const code = birlClient['convertToC']('QUE QUE CE QUER MONSTRAO?');
		assert.strictEqual(code, imports + 'scanf');
	});

	it(`should replace "SAI FILHO DA PUTA" for "break" `, () => {
		const code = birlClient['convertToC']('SAI FILHO DA PUTA');
		assert.strictEqual(code, imports + 'break');
	});

	it(`should replace "VAMO MONSTRO" for "continue" `, () => {
		const code = birlClient['convertToC']('VAMO MONSTRO');
		assert.strictEqual(code, imports + 'continue');
	});

	it(`should replace "ELE QUE A GENTE QUER?" for "if" `, () => {
		const code = birlClient['convertToC']('ELE QUE A GENTE QUER?');
		assert.strictEqual(code, imports + 'if  {');
	});

	it(`should replace "NAO VAI DAR NAO" for "else" `, () => {
		const code = birlClient['convertToC']('NAO VAI DAR NAO');
		assert.strictEqual(code, imports + '} else {');
	});

	it(`should replace "QUE NUM VAI DAR O QUE?" for "else if" `, () => {
		const code = birlClient['convertToC']('QUE NUM VAI DAR O QUE?');
		assert.strictEqual(code, imports + '} else if  {');
	});

	it(`should replace "QUE NAO VAI DAR O QUE?" for "else if" `, () => {
		const code = birlClient['convertToC']('QUE NAO VAI DAR O QUE?');
		assert.strictEqual(code, imports + '} else if  {');
	});

	it(`should replace "DERRUBAR ARVORES" for "switch  {"`, () => {
		const code = birlClient['convertToC']('DERRUBAR ARVORES');
		assert.strictEqual(code, imports + 'switch  {');
	});

	it(`should replace "ARVORE" for "case :"`, () => {
		const code = birlClient['convertToC']('ARVORE');
		assert.strictEqual(code, imports + 'case :');
	});

	it(`should replace "IBERAPUERA" for "default:"`, () => {
		const code = birlClient['convertToC']('IBERAPUERA');
		assert.strictEqual(code, imports + 'default:');
	});

	it(`should replace "NEGATIVA BAMBAM" for "while" `, () => {
		const code = birlClient['convertToC']('NEGATIVA BAMBAM');
		assert.strictEqual(code, imports + 'while  {');
	});

	it(`should replace "MAIS QUERO MAIS" for "for" `, () => {
		const code = birlClient['convertToC']('MAIS QUERO MAIS');
		assert.strictEqual(code, imports + 'for  {');
	});

	it(`should replace "OH O HOME AI PO" for " {" `, () => {
		const code = birlClient['convertToC']('OH O HOME AI PO ()');
		assert.strictEqual(code, imports + ' {');
	});

	it(`should replace "AJUDA O MALUCO TA DOENTE" for "" `, () => {
		const code = birlClient['convertToC']('AJUDA O MALUCO TA DOENTE');
		assert.equal(code, imports + ' ');
	});

	it(`should replace "AJUDA O MALUCO QUE TA DOENTE" for "" `, () => {
		const code = birlClient['convertToC']('AJUDA O MALUCO TA DOENTE');
		assert.equal(code, imports + ' ');
	});

	it(`should replace "FRANGO" for "char" `, () => {
		const code = birlClient['convertToC']('FRANGO');
		assert.equal(code, imports + 'char');
	});

	it(`should replace "MONSTRO" for "int" `, () => {
		const code = birlClient['convertToC']('MONSTRO');
		assert.equal(code, imports + 'int');
	});

	it(`should replace "MONSTRINHO" for "short" `, () => {
		const code = birlClient['convertToC']('MONSTRINHO');
		assert.equal(code, imports + 'short');
	});

	it(`should replace "MONSTRAO" for "long" `, () => {
		const code = birlClient['convertToC']('MONSTRAO');
		assert.equal(code, imports + 'long');
	});

	it(`should replace "TRAPEZIO" for "float" `, () => {
		const code = birlClient['convertToC']('TRAPEZIO');
		assert.equal(code, imports + 'float');
	});

	it(`should replace "TRAPEZIO DESCENDENTE" for "double" `, () => {
		const code = birlClient['convertToC']('TRAPEZIO DESCENDENTE');
		assert.equal(code, imports + 'double');
	});

	it(`should replace "BICEPS" for "unsigned" `, () => {
		const code = birlClient['convertToC']('BICEPS');
		assert.equal(code, imports + 'unsigned');
	});

	it(`should replace "TREZE MEMO" for "bool" `, () => {
		const code = birlClient['convertToC']('TREZE MEMO');
		assert.equal(code, imports + 'bool');
	});

	it(`should replace "FIBRA" for "const"`, () => {
		const code = birlClient['convertToC']('FIBRA');
		assert.equal(code, imports + 'const');
	});

	it(`should replace "MUTANTE" for "struct"`, () => {
		const code = birlClient['convertToC']('MUTANTE');
		assert.equal(code, imports + 'struct');
	});
});
