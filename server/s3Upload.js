const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
require('dotenv').config();

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

const uploadFile = async (fileBuffer, fileName) => {
    const params = {
        Bucket: process.env.AWS_S3_BUCKET,
        Key: fileName,
        Body: fileBuffer,
        ContentType: 'application/pdf',  
    };

    try {
        const data = await s3Client.send(new PutObjectCommand(params));
        return data;
    } catch (err) {
        console.error('Error uploading file:', err);
        throw err;
    }
};

module.exports = { uploadFile };
