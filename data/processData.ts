import fs from "fs";
import path from "path";
import jsonData from "./input/data.json";

const outputDir = "./data/output";

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Round atomic mass to 5 significant figures
// jsonData.forEach((element) => {
//   if (typeof element.atomicMass === "string") {
//     const numberToFiveSigFigs = parseFloat(element.atomicMass).toPrecision(5);
//     element.atomicMass = numberToFiveSigFigs;
//   } else {
//     const numberToFiveSigFigs = element.atomicMass[0].toPrecision(5);
//     element.atomicMass = numberToFiveSigFigs;
//   }
// });

// Convert electron configuration to superscript

// const superScripts = Object.freeze({
//   0: "\u2070",
//   1: "\u00B9",
//   2: "\u00B2",
//   3: "\u00B3",
//   4: "\u2074",
//   5: "\u2075",
//   6: "\u2076",
//   7: "\u2077",
//   8: "\u2078",
//   9: "\u2079",
// });

function electronsInSubshell(electronConfiguration: string) {
  const parts = electronConfiguration.split(" ");
  const electronCounts: string[] = [];

  parts.forEach((p) => {
    if (p.includes("[")) return;
    const noShellLetter = p.replace(/\D/g, "");
    const electronsInSubshell = parseInt(
      noShellLetter.toString().slice(1),
      10
    ).toString();

    electronCounts.push(electronsInSubshell.toString());
  });

  return electronCounts;
}

let electronConfiguration = "[Xe] 4f14 5d10 6s2 6p6";
console.log(electronsInSubshell(electronConfiguration)); // Output: [14, 10, 2, 6]

// jsonData.forEach((element) => {
//   console.log(element.electronicConfiguration);
// });

// const jsonString = JSON.stringify(jsonData, null, 2);
// const outputFile = path.join(outputDir, "processed_data.json");
// fs.writeFileSync(outputFile, jsonString);

// console.log(`Processed data has been written to ${outputFile}`);
