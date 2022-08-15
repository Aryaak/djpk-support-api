const uploadFile = async (file) => {
    const attach = file;
    attach.mv(`./assets/${file.name}`, (err) => {
        if(err){
            throw err;
        }

        return 'OK';
    });
}

module.exports = uploadFile
