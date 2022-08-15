const workPackageService = require('../services/workPackageService')

const remove = async (req) => {
   workPackageService.remove(req.params.id)
}

const format = async () => {
   workPackageService.format()
}


module.exports = {
    remove,
    format
}