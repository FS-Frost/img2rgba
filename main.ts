import imageJS from "image-js";

async function main() {
    if (process.argv.length !== 3) {
        console.log("Usage:");
        console.log("bun run main.ts image.png");
        process.exit(1);
    }

    const inputPath: string = process.argv[2];
    console.log("Input image:", inputPath);

    const image = await imageJS.load(inputPath)
    let rgbaBuffer = "";
    for (let y = 0; y < image.height; y++) {
        for (let x = 0; x < image.width; x++) {
            const [r, g, b] = image.getPixelXY(x, y);
            rgbaBuffer += `${r},${g},${b},255,`
        }
    }

    if (rgbaBuffer[rgbaBuffer.length - 1] === ",") {
        rgbaBuffer = rgbaBuffer.substring(0, rgbaBuffer.length - 1);
    }

    const outputPath = "out.rgba";
    await Bun.write(outputPath, rgbaBuffer);
    console.log("Output image:", outputPath);
}

await main();
