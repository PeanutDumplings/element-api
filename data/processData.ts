import fs from "fs";
import path from "path";
import jsonData from "./input/data.json";

const outputDir = "./data/output";

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Round atomic mass to 5 significant figures
jsonData.forEach((element) => {
  if (typeof element.atomicMass === "string") {
    const numberToFiveSigFigs = parseFloat(element.atomicMass).toPrecision(5);
    element.atomicMass = numberToFiveSigFigs;
  } else {
    const numberToFiveSigFigs = element.atomicMass[0].toPrecision(5);
    element.atomicMass = numberToFiveSigFigs;
  }
});

// Convert electron configuration to superscript
const superScripts: { [key: number]: string } = Object.freeze({
  0: "\u2070",
  1: "\u00B9",
  2: "\u00B2",
  3: "\u00B3",
  4: "\u2074",
  5: "\u2075",
  6: "\u2076",
  7: "\u2077",
  8: "\u2078",
  9: "\u2079",
  10: "\u00B9\u2070",
  11: "\u00B9\u00B9",
  12: "\u00B9\u00B2",
  13: "\u00B9\u00B3",
  14: "\u00B9\u2074",
});

function electronsInSubshell(electronConfiguration: string) {
  const parts = electronConfiguration.split(" ");
  const electronCounts: string[] = [];

  parts.forEach((part) => {
    if (part.includes("[")) {
      electronCounts.push(part);
    } else {
      const index = part.search(/[a-zA-Z]/);
      const shell = part.substring(0, index + 1);
      const electrons = superScripts[parseInt(part.substring(index + 1), 10)];
      electronCounts.push(shell + electrons);
    }
  });

  return electronCounts.join(" ");
}

jsonData.forEach((element) => {
  element.electronicConfiguration = electronsInSubshell(
    element.electronicConfiguration
  );
});

const jsonString = JSON.stringify(jsonData, null, 2);
const outputFile = path.join(outputDir, "processed_data.json");
fs.writeFileSync(outputFile, jsonString);

console.log(`Processed data has been written to ${outputFile}`);
