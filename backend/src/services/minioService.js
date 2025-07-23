const { Client } = require('minio')
const fs = require('fs')
const path = require('path')

const minioClient = new Client({
  endPoint: process.env.MINIO_ENDPOINT,
  port: parseInt(process.env.MINIO_PORT),
  useSSL: false,
  accessKey: process.env.MINIO_ACCESS_KEY,
  secretKey: process.env.MINIO_SECRET_KEY,
})

const BUCKET = process.env.MINIO_BUCKET_NAME

async function uploadParaMinio(localFilePath, nomeNoBucket) {
  const exists = await minioClient.bucketExists(BUCKET)
  if (!exists) {
    await minioClient.makeBucket(BUCKET)
  }

  await minioClient.fPutObject(BUCKET, nomeNoBucket, localFilePath, {
    'Content-Type': 'application/pdf',
  })

  return `${process.env.MINIO_PUBLIC_URL}/${BUCKET}/${nomeNoBucket}`
}

async function uploadBufferParaMinio(buffer, nomeNoBucket, contentType = 'application/octet-stream') {
  const exists = await minioClient.bucketExists(BUCKET)
  if (!exists) {
    await minioClient.makeBucket(BUCKET)
  }

  await minioClient.putObject(BUCKET, nomeNoBucket, buffer, { 'Content-Type': contentType })

  return `${process.env.MINIO_PUBLIC_URL}/${BUCKET}/${nomeNoBucket}`
}

// Adicione no seu minioService.js
async function gerarUrlTemporaria(nomeNoBucket, tempoEmSegundos = 60) {
  return await minioClient.presignedGetObject(
    process.env.MINIO_BUCKET_NAME,
    nomeNoBucket,
    tempoEmSegundos
  );
}

module.exports = {
  uploadParaMinio,
  uploadBufferParaMinio,
  gerarUrlTemporaria
};