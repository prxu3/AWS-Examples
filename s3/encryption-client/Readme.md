## Create a bucket

```sh
aws s3 mb s3://px-bucket-client
```

### Run SDK script

```sh
npx tsx encrypt.ts
```

### Cleanup

```sh
aws s3 rm s3://px-bucket-client/hello.txt
aws s3 rb s3://px-bucket-client
```