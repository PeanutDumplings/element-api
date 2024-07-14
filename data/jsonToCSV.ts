import { json2csv } from "json-2-csv";
import processed_element_data from "./output/processed_elements_data.json";
import processed_subatomic_data from "./output/processed_subatomic_data.json";
import fs from "fs";
import path from "path";

const elementCSV = json2csv(processed_element_data);
const subatomicCSV = json2csv(processed_subatomic_data);

const outputDir = "./data/output";

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

const elementOutputFile = path.join(outputDir, "processed_elements_data.csv");
const subatomicOutputFile = path.join(outputDir, "processed_subatomic_data.csv");

fs.writeFileSync(elementOutputFile, elementCSV);
fs.writeFileSync(subatomicOutputFile, subatomicCSV);

console.log(`Data written to ${elementOutputFile} and ${subatomicOutputFile}`);
