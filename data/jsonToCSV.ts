import { json2csv } from "json-2-csv";
import processed_data from "./output/processed_data.json";
import fs from "fs";
import path from "path";

const csv = json2csv(processed_data);

const outputDir = "./data/output";

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const outputFile = path.join(outputDir, "processed_data.csv");
fs.writeFileSync(outputFile, csv);

console.log(`Data written to ${outputFile}`);
