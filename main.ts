import imageJS from "image-js";
import path from "path";

async function main() {
    if (process.argv.length !== 4) {
        printUsage();
        process.exit(1);
    }

    const inputPath: string = path.resolve(process.argv[2]);
    console.log("Input image:", inputPath);

    const inputFile = Bun.file(inputPath);
    if (!(await inputFile.exists())) {
        console.error(`ERROR: input file not found: ${inputPath}`);
        process.exit(1);
    }

    const outputPath: string = path.resolve(process.argv[3]);

    const image = await imageJS.load(inputPath);
    let rgbaBuffer = "";
    for (let y = 0; y < image.height; y++) {
        for (let x = 0; x < image.width; x++) {
            const [r, g, b] = image.getPixelXY(x, y);
            rgbaBuffer += `${r},${g},${b},255,`;
        }
    }

    if (rgbaBuffer[rgbaBuffer.length - 1] === ",") {
        rgbaBuffer = rgbaBuffer.substring(0, rgbaBuffer.length - 1);
    }

    await Bun.write(outputPath, rgbaBuffer);
    console.log("Output image:", outputPath);
}

function printUsage(): void {
    console.log("Usage:");
    console.log("bun run main.ts path/to/input.png path/to/output.rgba");
}

await main();
