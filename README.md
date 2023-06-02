# CLI da NeoBIRL

## 📋 Índice

- [Introdução](#introdução)
- [Como Funciona](#como-funciona)
- [Executando o Projeto](#executando-o-projeto)
- [ToDo](#todo)
- [Contribuidores](#contribuidores)


## Introdução

NeoBIRL (Neo-<b>B</b>ambam's "<b>I</b>t's show time" <b>R</b>ecursive <b>L</b>anguage) nada mais é do que uma linguagem humorística, OAG (Orientada a Gambiarra), Go Horse e baseada na semi-falecida <a href="https://github.com/birl-language/" target="_blank">BIRL Language</a>. NeoBIRL funciona do mesmo modo que sua antecessora, mas com algumas funcionalidades a mais. Pretendemos dar continuidade para a linguagem mais TREZE já criada!

## Como funciona

Primeiramente, executamos a CLI com os argumentos:
- O arquivo (Neo)BIRL;
- Os valores de ENTRADA.

```C
/*codigo.birl*/

HORA DO SHOW
  CE QUER VER ESSA PORRA? ("Hello, Mutante!\n");
  BORA CUMPADE 0;
BIRL
```

```bash
$ ./birl-cli.js codigo.birl "algumvalor"
```

O código é traduzido para C por meio de uma função de expressões regulares e, após isso, compilado e executado. 

```
SAÍDA:

Hello, Mutante!
```

## Executando o Projeto

1. <b>Esteja em um ambiente Unix</b> (MacOS/Linux), a função "exec" executará comandos para ambientes de Unix. Caso esteja usando Windows, se vire e vá instalar um Linux da vida ou modifique o código para que ele rode no Windows. 
2. Tenha o Node.js e o <b>GCC</b> instalados.
```bash 
$ git clone https://github.com/neobirl/cli && cd cli
$ chmod +x birl-cli.js
$ npm run hello:world

#Executará o comando './birl-cli.js ./example.birl ""
Hello, Mutante!
```

## ToDo

- [x] Fazer essa bagaça rodar no Windows;
- [ ] Escrever testes.

## Contribuidores

Caso queira contribuir, é só abrir um PR bonitinho. <b>Mas faça suas alterações antes no código do <a href="https://github.com/neobirl/server">servidor.</a></b>

<h4>Nosso sincero obrigado a @lcfpadilha, @akafts e toda a comunidade codebuilder do Brasil.</h4>
