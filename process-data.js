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

  // Split the data into lines

  const parsedData = parse(data);
  // const lines = data.split('\n');

  // Initialize the output array
  const output = [];

  // lines.shift();
  parsedData.shift();

  // Loop through each line and split it into fields

  const set = new Set();

  console.log(parsedData[1]);

  parsedData.forEach((fields) => {
    // lines.forEach((line) => {
    // const fields = line.split(',');

    // if (!set.has(line['Facility ID'])) {
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
        lat: Number(fields[45]),
        lon: Number(fields[46]),
      };

      output.push(hospital);
      // output.push(line);

      set.add(fields[2]);
    }
  });

  // Log the output array
  console.log(output.length);

  fs.writeFileSync('hospitals.json', JSON.stringify(output), 'utf8');
  // fs.writeFileSync('hospitals.csv', output.join('\n'), 'utf8', function (err) {
  //   if (err) {
  //     console.log('Some error occured - file either not saved or corrupted file saved.');
  //   } else {
  //     console.log("It's saved!");
  //   }
  // });
});
