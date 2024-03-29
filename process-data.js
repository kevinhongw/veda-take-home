// Include the fs module
const fs = require('fs');
const { parse } = require('csv-parse/sync');

// Specify the path of the CSV file
const path = 'cms_hospital_patient_satisfaction_2020.csv';

// Read the CSV file
fs.readFile(path, 'utf8', (err, data) => {
  if (err) {
    console.error('Error while reading:', err);
    return;
  }

  const parsedData = parse(data);

  const output = [];

  // remove header
  parsedData.shift();

  const set = new Set();

  parsedData.forEach((fields) => {
    if (!set.has(fields[2])) {
      const hospital = {
        id: fields[2],
        name: fields[3],
        address: fields[4],
        city: fields[5],
        state: fields[6],
        zip: fields[7],
        countyName: fields[8],
        phoneNumber: fields[9],
        hospitalType: fields[25],
        hospitalOwnership: fields[26],
        hasER: fields[27] === 'Yes',
        meetsEHRCriteria: fields[28] === 'Y',
        overallRating: fields[29],
        mortalityNationalComparison: fields[31],
        safetyOfCareNationalComparison: fields[33],
        readmissionNationalComparison: fields[35],
        patientExperienceNationalComparison: fields[37],
        effectivenessOfCareNationalComparison: fields[39],
        timelinessOfCareNationalComparison: fields[41],
        lat: Number(fields[45]),
        lon: Number(fields[46]),
      };

      output.push(hospital);

      set.add(fields[2]);
    }
  });

  console.log(`Hospital Count: ${output.length}`);

  fs.writeFileSync('hospitals.json', JSON.stringify(output), 'utf8');
});
