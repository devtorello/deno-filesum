import { FILE_LENGTH, LINE_LENGTH } from './consts.ts';
import { randomNumber } from './deps.ts';

export async function createFile(filename: string): Promise<void> {
	const file = await Deno.open(filename, { write: true, create: true, append: true });
	for (let line = 0; line < FILE_LENGTH; line++) {
		const currentLine = [];
		for (let content = 0; content < LINE_LENGTH; content++) {
			currentLine.push(`${randomNumber({ integer: true, min: 1, max: 512 })} `);
		}
		currentLine.push('\n');
		await file.write(new TextEncoder().encode(currentLine.join('')));
	}
	file.close();
}

export async function readFile(filename: string): Promise<string[]> {
	const file = await Deno.readTextFile(filename);
	return file.split('\n');
}

export async function fileExists(filename: string): Promise<boolean> {
	try {
		await Deno.stat(filename);
		return true;
	} catch (error) {
		if (error instanceof Deno.errors.NotFound) {
			return false;
		}
		throw Error;
	}
}
