const userService = require('../services/userService')

const uploadWithExcel = async (req, res) => {
    const excel = req.files.excel;
    userService.uploadWithExcel(excel, res)
}

module.exports = {
    uploadWithExcel
}