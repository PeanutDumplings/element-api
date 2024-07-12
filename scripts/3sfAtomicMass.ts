import json from "./input/data.json";
console.log(json);

json.forEach((element) => {
  console.log(element.atomicMass);
});
