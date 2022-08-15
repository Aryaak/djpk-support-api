const axios = require('axios');

const all = async () => {
    const result = await axios.get(`${process.env.BASE_API_URL}work_packages`,  {
        auth: {
            username: process.env.BASE_API_NAME,
            password: process.env.BASE_API_TOKEN
        }
    }).then(response => response.data._embedded.elements)
    .catch(error => {
        if (error.response) {
            console.log("FAILED wp", error.response);
        }
    });


    return result
}

const remove = async (id) => {

    axios.delete(`${process.env.BASE_API_URL}work_packages/${id}`, {
       
            auth: {
                username: process.env.BASE_API_NAME,
                password: process.env.BASE_API_TOKEN
            },
        data: {
          id: id
        }
      })
      .then(() => console.log(`delete wp id ${id} success`))
      .catch((err) =>  console.log(`delete wp id ${id} failed`, err));
}

const format = async () => {
    const data = Array.from(await all());
    data.forEach(async item => {
       await remove(item.id);
    })
}

module.exports = {
    remove,
    format
}