# 📂 Deno File Sum

This is an application that should sum all the numbers present on the `numbers.txt` in multithreaded processing.

I'm not sure I used the workers correctly, tho - since I needed to use promises to wait for the message sent by the
workers which were responsible to execute the partial sums. One of the only sources I found about this was this
[article](https://advancedweb.hu/how-to-use-async-await-with-postmessage), but it still was not what I needed. In short
words, I kinda followed my heart. 😅

I probably will come back in the future and correct some things too! And if you feel the need to point something that's
wrong or to give me some advice on how I approached something, feel free to contact me through twiter, devto or even
here on issues.

## 🔍 How I solved the problem

Basically, the main goal of the challenge was to process a file in a distributed manner and to sum all of the partial
results executed by workers after all of them finish the processing. This resolution was based on the steps
[Zanfranceschi provided on his article](https://dev.to/zanfranceschi/desafio-processamento-distribuido-basico-45ka).

If you want to better understand the way I interpreted this problem using
[Workers API](https://deno.land/manual/runtime/workers), feel free to read the
[article I posted on devto](https://dev.to/devtorello/deno-multithreading-somando-numeros-com-workers-38k2).

## 📝 Files Structure

Here's the explanation about the files from the project:

```
📦src                   - the folder containing all implementation files.
 ┣ 📜consts.ts          - the file were constants are being stored.
 ┣ 📜deps.ts            - the file were dependencies are declared.
 ┣ 📜distributor.ts     - the file were the workers are going to be instantiated and will receive the partial sum.
 ┣ 📜helpers.ts         - the file were helper methods were created in order to be able to create the array chunks.
 ┣ 📜file.ts            - the file were we perform file executions, such as create, read and check if it exists.
 ┣ 📜file.ts            - the file were the code the workers are going to execute was created.
 ┗ 📜main.ts            - the file were the execution logic for the processing was created.
 🧰 deno.json           - the file were the configuration specificities were created.
 🐋 Dockerfile          - application's dockerization.
 📃 numbers.txt         - file containing the numbers that should be summed up.
```

## ⚙️ How to run?

In order to run this project, you'll need to execute the following commands:

```bash
git clone git@github.com:devtorello/bexchange.git
cd deno-filesum
deno run --allow-write --allow-read --allow-hrtime src/main.ts
```

In this case, I'm afraid you're gonna need to have deno installed. 🥲
