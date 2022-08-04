type MessageContent = {
    line: string,
    name: string
}

self.onmessage  = ({ data: { line, name } }: MessageEvent<MessageContent>): void => {
    const sum = line
        .split(' ')
        .map(num => Number(num))
        .reduce((a, b) => {
            return a + b;
        });

    self.postMessage({ sum, name });
    self.close();
}
