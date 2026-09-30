import { CreateBucketCommand, S3Client } from "@aws-sdk/client-s3";

const bucketName = (globalThis as typeof globalThis & {
  process?: { env?: Record<string, string | undefined> };
}).process?.env?.BUCKET_NAME;
if (!bucketName) {
  throw new Error("BUCKET_NAME environment variable is required");
}

const region = "ca-central-1";
const client = new S3Client({ region });

const response = await client.send(
  new CreateBucketCommand({
    Bucket: bucketName,
    CreateBucketConfiguration: { LocationConstraint: region },
  }),
);

console.log(response);