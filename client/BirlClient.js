const { exec } = require('child_process');
const fs = require('fs');

class BirlClient {
  printCode(code) {
    console.log('-----------------------------------------');
    console.log('CODIGO GERADO:');
    console.log(code);
    console.log('-----------------------------------------');
  }

  async writeFile(fileName, content) {
    return new Promise((resolve, reject) => {
      fs.writeFile(fileName, content, (error) => {
        if (error) reject('ERRO INTERNO PAI!\n');
        else resolve();
      });
    });
  }

  convertToC(birlCode) {
    if (!birlCode) return '';

    //Traduzindo a MAIN
    birlCode = birlCode.replace(
      /(HORA DO SHOW)(?=(?:[^"]|"[^"]*")*$)/g,
      'int main (void) {'
    );
    //Traduzindo o BIRL
    birlCode = birlCode.replace(/(BIRL)(?=(?:[^"]|"[^"]*")*$)/g, '}');
    //Traduzindo printf
    birlCode = birlCode.replace(
      /(CE QUER VER ESSA PORRA[\?]?)(?=(?:[^"]|"[^"]*")*$)/g,
      'printf'
    );
    //Traduzindo scanf
    birlCode = birlCode.replace(
      /(QUE QUE CE QUER MONSTR[AÃ]O[\?]?)(?=(?:[^"]|"[^"]*")*$)/g,
      'scanf'
    );
    //Traduzindo if
    birlCode = birlCode.replace(
      /(ELE QUE A GENTE QUER[\?]?)(?=(?:[^"]|"[^"]*")*$)(.*)/g,
      'if $2 {'
    );
    //Traduzindo else
    birlCode = birlCode.replace(
      /(N[AÃ]O VAI DAR N[AÃ]O)(?=(?:[^"]|"[^"]*")*$)/g,
      '} else {'
    );
    //Traduzindo else if
    birlCode = birlCode.replace(
      /(QUE NUM VAI DAR O QUE[\?]?)(?=(?:[^"]|"[^"]*")*$)(.*)/g,
      '} else if $2 {'
    );
    birlCode = birlCode.replace(
      /(QUE N[AÃ]O VAI DAR O QUE[\?]?)(?=(?:[^"]|"[^"]*")*$)(.*)/g,
      '} else if $2 {'
    );

    //Traduzindo Switch
    birlCode = birlCode.replace(
      /(DERRUBAR ARVORES)(?=(?:[^"]|"[^"]*")*$)(.*)/g,
      'switch $2 {'
    );

    // Traduzindo case
    birlCode = birlCode.replace(
      /(ARVORE)(?=(?:[^"]|"[^"]*")*$)(.*)/g,
      'case $2:'
    );

    // Traduzindo default
    birlCode = birlCode.replace(
      /(IBERAPUERA)(?=(?:[^"]|"[^"]*")*$)/g,
      'default:'
    );

    //Traduzindo while
    birlCode = birlCode.replace(
      /(NEGATIVA BAMBAM)(?=(?:[^"]|"[^"]*")*$)(.*)/g,
      'while $2 {'
    );

    //Traduzindo for
    birlCode = birlCode.replace(
      /(MAIS QUERO MAIS)(?=(?:[^"]|"[^"]*")*$)(.*)/g,
      'for $2 {'
    );

    //Traduzindo declaração de função
    birlCode = birlCode.replace(
      /(O[H]? O HOM[EI][M]? A[IÍ] PO[ \t]*\()(?=(?:[^"]|"[^"]*")*$)(.*)(\))/g,
      '$2 {'
    );
    //Traduzindo retorno da função
    birlCode = birlCode.replace(
      /(BORA CUMPAD[EI])(?=(?:[^"]|"[^"]*")*$)/g,
      'return'
    );
    //Traduzindo chamada de função
    birlCode = birlCode.replace(
      /(AJUDA O MALUCO TA DOENTE)(?=(?:[^"]|"[^"]*")*$)/g,
      ' '
    );
    birlCode = birlCode.replace(
      /(AJUDA O MALUCO QUE TA DOENTE)(?=(?:[^"]|"[^"]*")*$)/g,
      ' '
    );
    //Traduzindo parada no código
    birlCode = birlCode.replace(
      /(SAI FILH[OA] DA PUTA)(?=(?:[^"]|"[^"]*")*$)/g,
      'break'
    );
    //Traduzindo continuar o código
    birlCode = birlCode.replace(
      /(VAMO MONSTRO)(?=(?:[^"]|"[^"]*")*$)/g,
      'continue'
    );

    //Traduzindo const
    birlCode = birlCode.replace(
      /(FIBRA)(?=(?:[^"]|"[^"]*")*$)/g,
      'const'
    );

    //Traduzindo struct
    birlCode = birlCode.replace(
      /(MUTANTE)(?=(?:[^"]|"[^"]*")*$)/g,
      'struct'
    )

    //Traduzindo os tipos de dados
    birlCode = birlCode.replace(/(FRANGO)(?=(?:[^"]|"[^"]*")*$)/g, 'char');
    birlCode = birlCode.replace(/(MONSTRO)(?=(?:[^"]|"[^"]*")*$)/g, 'int');
    birlCode = birlCode.replace(/(MONSTRINHO)(?=(?:[^"]|"[^"]*")*$)/g, 'short');
    birlCode = birlCode.replace(/(MONSTR[ÃA]O)(?=(?:[^"]|"[^"]*")*$)/g, 'long');
    birlCode = birlCode.replace(
      /(TRAP[EÉ]ZIO DESCENDENTE)(?=(?:[^"]|"[^"]*")*$)/g,
      'double'
    );
    birlCode = birlCode.replace(
      /(TRAP[EÉ]ZIO)(?=(?:[^"]|"[^"]*")*$)/g,
      'float'
    );
    birlCode = birlCode.replace(
      /(B[IÍ]CEPS)(?=(?:[^"]|"[^"]*")*$)/g,
      'unsigned'
    );

    birlCode = birlCode.replace(
      /(TREZE MEMO)(?=(?:[^"]|"[^"]*")*$)/g,
      'bool'
    );

    //Colocando as bibliotecas
    birlCode = '#include <stdio.h>\n#include <math.h>\n#include <stdbool.h>\n\n' + birlCode;

    return birlCode;
  }

  async compile(file) {
    try {
      const compileCommand = `gcc ${file}.c -o ${file} -lm && timeout 2s ./${file} < ${file}.txt`;

      return new Promise((resolve) => {
        exec(compileCommand, (error, stdout) => {
          if (error) {
            const res = {
              code: 500,
              error: 'CODEI PRA CARALHO MAS NÃO COMPILOU!\n',
              stdout: null,
            };

            resolve(res);
          } else {
            console.log("\n"+ stdout);
            const res = { code: 200, error: null, stdout };
            resolve(res);
          }
        }).on('close', () => {
          exec('rm ' + file + '*', () => {
            
          });
        });
      });
    } catch (error) {
      const res = {
        code: 500,
        error: 'TENTEI RODAR MAS NÃO VAI DAR NÃO',
        stdout: null,
      };
      return res;
    }
  }

  async executeCode(birlCode, stdin) {
    try {
      const code = this.convertToC(birlCode);
      const fileName = 'birl-' + Date.now();
      await this.writeFile(`${fileName}.txt`, stdin);
      await this.writeFile(`${fileName}.c`, code);
      return this.compile(fileName);
    } catch (e){
      console.log(e);
      const res = {
        code: 500,
        error: 'ERRO INTERNO, MONSTRO!',
        stdout: null,
      };

      return res;
    }
  }
}

module.exports = BirlClient;
