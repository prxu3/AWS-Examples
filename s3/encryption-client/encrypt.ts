import { constants, generateKeyPairSync } from 'node:crypto';
import {
    buildClient,
    CommitmentPolicy,
    RawRsaKeyringNode,
} from '@aws-crypto/client-node';
import {
    GetObjectCommand,
    PutObjectCommand,
    S3Client,
} from '@aws-sdk/client-s3';

// Like the Ruby example, this creates a fresh key pair each run.
// Persist the keys securely if you need to decrypt objects in later runs.
const { publicKey, privateKey } = generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: { type: 'spki', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
});

const keyring = new RawRsaKeyringNode({
    keyName: 'encryption-client-example',
    keyNamespace: 'example',
    rsaKey: { publicKey, privateKey },
    padding: constants.RSA_PKCS1_OAEP_PADDING,
    oaepHash: 'sha256',
});

const { encrypt, decrypt } = buildClient(
    CommitmentPolicy.REQUIRE_ENCRYPT_REQUIRE_DECRYPT,
);

const s3 = new S3Client({ region: 'us-east-1' });
const bucket = 'px-bucket-client';
const objectKey = 'hello.txt';

async function main(): Promise<void> {
    try {
        // Encrypt locally, then upload the encrypted message.
        const { result: ciphertext } = await encrypt(
            keyring,
            Buffer.from('handshake', 'utf8'),
        );

        const putResponse = await s3.send(
            new PutObjectCommand({
                Bucket: bucket,
                Key: objectKey,
                Body: ciphertext,
            }),
        );

        console.log('PUT');
        console.log(putResponse);

        // Download and decrypt with the RSA key pair.
        const encryptedObject = await s3.send(
            new GetObjectCommand({ Bucket: bucket, Key: objectKey }),
        );

        if (!encryptedObject.Body) {
            throw new Error('S3 returned an empty object body');
        }

        const downloadedCiphertext = await encryptedObject.Body.transformToByteArray();
        const { plaintext } = await decrypt(keyring, downloadedCiphertext);

        console.log('GET WITH KEY');
        console.log(Buffer.from(plaintext).toString('utf8'));

        // Fetch the same object without the encryption client: it remains ciphertext.
        const rawObject = await s3.send(
            new GetObjectCommand({ Bucket: bucket, Key: objectKey }),
        );

        if (!rawObject.Body) {
            throw new Error('S3 returned an empty object body');
        }

        const rawCiphertext = await rawObject.Body.transformToByteArray();

        console.log('GET WITHOUT KEY');
        console.log(Buffer.from(rawCiphertext).toString('base64'));
    } finally {
        s3.destroy();
    }
}

main().catch((error: unknown) => {
    console.error(error);
    process.exitCode = 1;
});