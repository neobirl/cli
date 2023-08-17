export class Converter {
  #birlCode = "";

  constructor(birlCode) {
    this.#birlCode = birlCode;
  }

  convertToC() {
    if (!this.#birlCode) return "";

    //Traduzindo a MAIN
    this.#birlCode = this.#birlCode.replace(
      /(HORA DO SHOW)(?=(?:[^"]|"[^"]*")*$)/g,
      "int main (void) {"
    );
    //Traduzindo o BIRL
    this.#birlCode = this.#birlCode.replace(
      /(BIRL)(?=(?:[^"]|"[^"]*")*$)/g,
      "}"
    );
    //Traduzindo printf
    this.#birlCode = this.#birlCode.replace(
      /(CE QUER VER ESSA PORRA[\?]?)(?=(?:[^"]|"[^"]*")*$)/g,
      "printf"
    );
    //Traduzindo scanf
    this.#birlCode = this.#birlCode.replace(
      /(QUE QUE CE QUER MONSTR[AÃ]O[\?]?)(?=(?:[^"]|"[^"]*")*$)/g,
      "scanf"
    );
    //Traduzindo if
    this.#birlCode = this.#birlCode.replace(
      /(ELE QUE A GENTE QUER[\?]?)(?=(?:[^"]|"[^"]*")*$)(.*)/g,
      "if $2 {"
    );
    //Traduzindo else
    this.#birlCode = this.#birlCode.replace(
      /(N[AÃ]O VAI DAR N[AÃ]O)(?=(?:[^"]|"[^"]*")*$)/g,
      "} else {"
    );
    //Traduzindo else if
    this.#birlCode = this.#birlCode.replace(
      /(QUE NUM VAI DAR O QUE[\?]?)(?=(?:[^"]|"[^"]*")*$)(.*)/g,
      "} else if $2 {"
    );
    this.#birlCode = this.#birlCode.replace(
      /(QUE N[AÃ]O VAI DAR O QUE[\?]?)(?=(?:[^"]|"[^"]*")*$)(.*)/g,
      "} else if $2 {"
    );

    //Traduzindo Switch
    this.#birlCode = this.#birlCode.replace(
      /(DERRUBAR ARVORES)(?=(?:[^"]|"[^"]*")*$)(.*)/g,
      "switch $2 {"
    );

    // Traduzindo case
    this.#birlCode = this.#birlCode.replace(
      /(ARVORE)(?=(?:[^"]|"[^"]*")*$)(.*)/g,
      "case $2:"
    );

    // Traduzindo default
    this.#birlCode = this.#birlCode.replace(
      /(IBERAPUERA)(?=(?:[^"]|"[^"]*")*$)/g,
      "default:"
    );

    //Traduzindo while
    this.#birlCode = this.#birlCode.replace(
      /(NEGATIVA BAMBAM)(?=(?:[^"]|"[^"]*")*$)(.*)/g,
      "while $2 {"
    );

    //Traduzindo for
    this.#birlCode = this.#birlCode.replace(
      /(MAIS QUERO MAIS)(?=(?:[^"]|"[^"]*")*$)(.*)/g,
      "for $2 {"
    );

    //Traduzindo declaração de função
    this.#birlCode = this.#birlCode.replace(
      /(O[H]? O HOM[EI][M]? A[IÍ] PO[ \t]*\()(?=(?:[^"]|"[^"]*")*$)(.*)(\))/g,
      "$2 {"
    );
    //Traduzindo retorno da função
    this.#birlCode = this.#birlCode.replace(
      /(BORA CUMPAD[EI])(?=(?:[^"]|"[^"]*")*$)/g,
      "return"
    );
    //Traduzindo chamada de função
    this.#birlCode = this.#birlCode.replace(
      /(AJUDA O MALUCO TA DOENTE)(?=(?:[^"]|"[^"]*")*$)/g,
      " "
    );
    this.#birlCode = this.#birlCode.replace(
      /(AJUDA O MALUCO QUE TA DOENTE)(?=(?:[^"]|"[^"]*")*$)/g,
      " "
    );
    //Traduzindo parada no código
    this.#birlCode = this.#birlCode.replace(
      /(SAI FILH[OA] DA PUTA)(?=(?:[^"]|"[^"]*")*$)/g,
      "break"
    );
    //Traduzindo continuar o código
    this.#birlCode = this.#birlCode.replace(
      /(VAMO MONSTRO)(?=(?:[^"]|"[^"]*")*$)/g,
      "continue"
    );

    //Traduzindo const
    this.#birlCode = this.#birlCode.replace(
      /(FIBRA)(?=(?:[^"]|"[^"]*")*$)/g,
      "const"
    );

    //Traduzindo struct
    this.#birlCode = this.#birlCode.replace(
      /(MUTANTE)(?=(?:[^"]|"[^"]*")*$)/g,
      "struct"
    );

    //Traduzindo os tipos de dados
    this.#birlCode = this.#birlCode.replace(
      /(FRANGO)(?=(?:[^"]|"[^"]*")*$)/g,
      "char"
    );
    this.#birlCode = this.#birlCode.replace(
      /(MONSTRO)(?=(?:[^"]|"[^"]*")*$)/g,
      "int"
    );
    this.#birlCode = this.#birlCode.replace(
      /(MONSTRINHO)(?=(?:[^"]|"[^"]*")*$)/g,
      "short"
    );
    this.#birlCode = this.#birlCode.replace(
      /(MONSTR[ÃA]O)(?=(?:[^"]|"[^"]*")*$)/g,
      "long"
    );
    this.#birlCode = this.#birlCode.replace(
      /(TRAP[EÉ]ZIO DESCENDENTE)(?=(?:[^"]|"[^"]*")*$)/g,
      "double"
    );
    this.#birlCode = this.#birlCode.replace(
      /(TRAP[EÉ]ZIO)(?=(?:[^"]|"[^"]*")*$)/g,
      "float"
    );
    this.#birlCode = this.#birlCode.replace(
      /(B[IÍ]CEPS)(?=(?:[^"]|"[^"]*")*$)/g,
      "unsigned"
    );

    this.#birlCode = this.#birlCode.replace(
      /(TREZE MEMO)(?=(?:[^"]|"[^"]*")*$)/g,
      "bool"
    );

    //Colocando as bibliotecas
    this.#birlCode =
      "#include <stdio.h>\n#include <math.h>\n#include <stdbool.h>\n\n" +
      this.#birlCode;

    return this.#birlCode;
  }
}
