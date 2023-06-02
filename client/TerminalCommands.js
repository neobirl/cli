const windowsCommands = {
	compileCommand: `gcc ${file}.c -o ${file}.exe && .\\${file}.exe < ${file}.txt`,
	removeCommand: `del "${file}.*"`,
};
