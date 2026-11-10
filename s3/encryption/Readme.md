## Create a bucket

```sh
aws s3 mb s3://px-bucket-encryption
```

### Create a file

```sh
echo "Hello World" > hello.txt
aws s3 cp hello.txt s3://px-bucket-encryption
```

### Create KMS key

```sh

```

### Put object with encryption of KMS

```sh
aws s3api put-object \
--bucket px-bucket-encryption \
--key hello.txt \
--body hello.txt \
--server-side-encryption "aws:kms" \
--ssekms-key-id ""
```

### Put object with SSE-C
https://catalog.us-east-1.prod.workshops.aws/workshops/aad9ff1e-b607-45bc-893f-121ea5224f24/en-US/s3/serverside/ssec

```sh
openssl rand -out ssec.key 32

aws s3 cp hello.txt s3://px-bucket-encryption/hello.txt
--sse-c AES256
--sse-c-key fileb://ssec.key

aws s3 cp s3://px-bucket-encryption/hello.txt hello.txt --sse-c AES256 --sse-c-key fileb://ssec.key
```