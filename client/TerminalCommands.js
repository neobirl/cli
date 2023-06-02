const windowsCommands = {
	compileCommand: `gcc ${file}.c -o ${file}.exe && .\\${file}.exe < ${file}.txt`,
	removeCommand: `del "${file}.*"`,
};

const unixCommands = {
	compileCommand: `gcc ${file}.c -o ${file} -lm && timeout 2s ./${file} < ${file}.txt`,
	removeCommand: 'rm ' + file + '*',
};
