const fs = require('fs');

function convertCsvToJson(csvFilePath) {
    const csvData = fs.readFileSync(csvFilePath, 'utf-8');
    const rows = csvData.trim().split('\n');
    const headers = rows.shift().split(',');

    const jsonData = rows.map(row => {
        const values = row.split(',');
        const obj = {};

        headers.forEach((header, index) => {
            const keys = header.trim().split('.');
            let currentObj = obj;

            for (let i = 0; i < keys.length - 1; i++) {
                const key = keys[i];
                currentObj[key] = currentObj[key] || {};
                currentObj = currentObj[key];
            }

            currentObj[keys[keys.length - 1]] = values[index].trim();
        });

        return obj;
    });

    return jsonData;
}

module.exports = convertCsvToJson;
