const fs = require('fs');
const path = require('path');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
var csvjson = require('csvjson');


function getDataFromCSV(pathFile) {
    return fs.readFileSync(path.join(__dirname, pathFile), {
        encoding: 'utf8'
    });
}
const options = {
    delimiter: ',', // optional
    quote: '"' // optional
};

let dataFromClientJson = csvjson.toObject(getDataFromCSV('main/from_client.csv'), options);
let dataFromSiteJson = csvjson.toObject(getDataFromCSV('main/from_site.csv'), options);


let newData = []
for (let itemC of dataFromClientJson) {
    for (let itemS of dataFromSiteJson) {
        if (itemC['דגם'] === itemS['דגם']) {
            newData.push({
                'מזהה מוצר': itemS['מזהה מוצר'],
                'שם מוצר': itemS['שם מוצר'],
                'דגם': itemS['דגם'],
                'מחיר': itemC['מחיר'],
                'הנחה': itemC['הנחה'],
                'תאריך התחלה': itemC['תאריך התחלה'],
                'תאריך סיום': itemC['תאריך סיום']
            })
        }
    }
}

// Write CSV file
const csvWriter = createCsvWriter({
    path: 'main/newfile.csv',
    header: [{
            id: 'מזהה מוצר',
            title: 'מזהה מוצר'
        },
        {
            id: 'שם מוצר',
            title: 'שם מוצר'
        },
        {
            id: 'דגם',
            title: 'דגם'
        },
        {
            id: 'מחיר',
            title: 'מחיר'
        },
        {
            id: 'הנחה',
            title: 'הנחה'
        },
        {
            id: 'תאריך התחלה',
            title: 'תאריך התחלה'
        },
        {
            id: 'תאריך סיום',
            title: 'תאריך סיום'
        }

    ]
});



csvWriter.writeRecords(newData)
    .then(() => {
        console.log('...Done');
    });