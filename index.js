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

// Method 2 (without nested loops)
// let barCode = 'דגם';
// const dataFromSiteJsonAsMap = new Map();

// dataFromSiteJson.forEach(data => {
//     dataFromSiteJsonAsMap.set(data[barCode], data)
// })

// dataFromClientJson.forEach(e => {
//     if (dataFromSiteJsonAsMap.has(e[barCode])) {
//         const elementForUpdate = {
//             ...dataFromSiteJsonAsMap.get(e[barCode])
//         };
//         elementForUpdate['מחיר'] = e['מחיר'];
//         elementForUpdate['הנחה'] = e['הנחה'];
//         elementForUpdate['תאריך התחלה'] = e['תאריך התחלה'];
//         elementForUpdate['תאריך סיום'] = e['תאריך סיום'];

//         dataFromSiteJsonAsMap.set(elementForUpdate[barCode], elementForUpdate);
//     }
// })

// let newData = Array.from(dataFromSiteJsonAsMap.values());

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