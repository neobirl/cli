const commandsFactory = (file, plataform = process.platform) => {
	const windowsCommands = {
		compileCommand: `gcc ${file}.c -o ${file}.exe && .\\${file}.exe < ${file}.txt`,
		removeCommand: `del "${file}.*"`,
	};

	const unixCommands = {
		compileCommand: `gcc ${file}.c -o ${file} -lm && timeout 2s ./${file} < ${file}.txt`,
		removeCommand: 'rm ' + file + '*',
	};

	switch (plataform) {
		case 'win32':
			return windowsCommands;

		default:
			return unixCommands;
	}
};

export { windowsCommands, unixCommands, commandsFactory };
