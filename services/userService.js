const uploadFile = require('../utils/uploadFile')
const excelToJson = require('convert-excel-to-json');
const fs = require('fs');
const axios = require('axios');
var json2xls = require('json2xls');

const uploadWithExcel = async (excel, res) => {
    const file = `assets/${excel.name}`;
    await uploadFile(excel, res)
    setTimeout(async () => {
        const result = await excelToJson({
            source: fs.readFileSync(file),
            header: {
                rows: 1
            },
            columnToKey: {
                A: 'id_pegawai',
                B: 'nip',
                C: 'email',
                D: 'nama',
                E: 'ess_ii',
                F: 'ess_iii'
            }
        });




        for (let item in result) {
            result[item].forEach(item => {
                item.password = 'djpk.kemenkeu@2022'
                item.token = process.env.BASE_API_TOKEN
            })


            var xls = json2xls(result[item]);
            
            fs.writeFileSync(`./assets/converted_${excel.name}.xlsx`, xls, 'binary');

            for (let user of result[item]) {
                setTimeout(async () => {
                    const data = {
                        email: user.email,
                        firstName: user.nama,
                        lastName: user.nama,
                        login: user.email,
                        password: user.password,
                        "customField7": {
                            "title": user.ess_ii,
                            "href": "/api/v3/custom_options/1"
                        },
                        "customField8": {
                            "title": user.ess_iii,
                            "href": "/api/v3/custom_options/8"
                        }
                    }

                    await axios.post(`${process.env.BASE_API_URL}users`, data, {
                        auth: {
                            username: process.env.BASE_API_NAME,
                            password: process.env.BASE_API_TOKEN
                        }
                    }).then(response => console.log('success', response.data))
                    .catch(error => {
                        if (error.response) {
                            console.log("FAILED", error.response);
                        }
                    });
                }, 3000)

            }
        }



        res.status(200).send("OK");

    }, 1000)
}

module.exports = {
    uploadWithExcel
}