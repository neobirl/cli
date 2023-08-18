
# NeoBIRL

<div align=center>
<img src="https://raw.githubusercontent.com/neobirl/docs/main/assets/birl-logo.png" width=250/>
</div>

## 📋 Índice

- [Introdução](#introdução)
- [Como Funciona](#como-funciona)
- [Executando o Projeto](#executando-o-projeto)
	- [Linux](#linux)
- [ToDo](#todo)
- [Contribuidores](#contribuidores)


## Introdução

NeoBIRL (Neo-<b>B</b>ambam's "<b>I</b>t's show time" <b>R</b>ecursive <b>L</b>anguage) nada mais é do que uma linguagem humorística, OAG (Orientada a Gambiarra), Go Horse e baseada na semi-falecida <a href="https://github.com/birl-language/" target="_blank">BIRL Language</a>. NeoBIRL funciona do mesmo modo que sua antecessora, mas com algumas funcionalidades a mais. Pretendemos dar continuidade para a linguagem mais TREZE já criada!

## Como funciona

Primeiramente, executamos a CLI com os argumentos:
- O arquivo (Neo)BIRL;
- Os valores de ENTRADA (caso haja algum).

```C
/*codigo.birl*/

HORA DO SHOW
  CE QUER VER ESSA PORRA? ("Hello, Mutante!\n");
  BORA CUMPADE 0;
BIRL
```

```bash
$ ./cli.js codigo.birl
```

O código é traduzido para C por meio de uma função de expressões regulares e, após isso, compilado e executado. 
```
SAÍDA:

Hello, Mutante!
```
Caso haja algum valor de entrada, podemos executar da seguinte maneira:
```C
/* codigo.birl */
HORA DO SHOW
    MONSTRO X;
    QUE QUE CE QUER MONSTRAO? ("%d", &X);
    CE QUER VER ESSA PORRA?("%d", X*2);
    BORA CUMPADE 0;
BIRL
```
```bash
# ./cli.js <codigo> <valor de entrada>
$ ./cli.js codigo.birl 2

# SAÍDA:

4
```



## Executando o Projeto
### Antes de tudo, é necessário que se tenha instalado o <a href="https://nodejs.org/" target="_blank">Node.js</a> e o <a href="https://gcc.gnu.org/" target="_blank">GCC</a>.
#### Linux

```bash 
# Clone o repositório
$ git clone https://github.com/neobirl/cli && cd cli

# Conceda as permissões
$ chmod +x cli.js

# Crie um alias
$ alias birl="`pwd`/cli.js"

#BIRL
$ birl example.birl

# Saída:
Hello, Mutante!
```

## ToDo
- [x] Remover Herobrine;
- [ ] Criar scripts de instalação; 
- [ ] Escrever tutoriais para o Windows e MacOS;
- [ ] Adicionar JSDoc;
- [ ] Afastar completamente BIRL da linguagem de quem sobe em árvore (vide C).

## Contribuidores

Caso queira contribuir, é só abrir um PR bonitinho.

<h4>Nosso sincero obrigado a @lcfpadilha, @akafts e toda a comunidade codebuilder do Brasil.</h4>
