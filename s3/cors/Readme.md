# Website 1

## Create a bucket

```sh
aws s3 mb s3://px-cors-bucket
```

## Change block public access

```sh
aws s3api put-public-access-block \
  --bucket px-cors-bucket \
  --public-access-block-configuration \
  BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false
```

## Create a bucket policy

```sh
aws s3api put-bucket-policy \
  --bucket px-cors-bucket \
  --policy file://bucket-policy.json
```

## Turn on static website hosting

```sh
aws s3api put-bucket-website \
  --bucket px-cors-bucket \
  --website-configuration file://website.json
```

## Upload our index.html file and include a resource that would be cross-origin

```sh
aws s3 cp index.html s3://px-cors-bucket/

## View the website and see if index.html is there.

http://px-cors-bucket.s3-website.us-east-1.amazonaws.com


# Website 2

## Create second bucket

```sh
aws s3 mb s3://px-cors-bucket-2
```

## Change block public access

```sh
aws s3api put-public-access-block \
--bucket px-cors-bucket-2 \
--public-access-block-configuration "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=false,RestrictPublicBuckets=false"
```

## Create a bucket policy

```sh
aws s3api put-bucket-policy --bucket px-cors-bucket-2 --policy file://bucket-policy2.json
```

## No need to make second bucket static website as it doesn't have html file.

## Upload data.json to the second bucket

```sh
aws s3 cp data.json s3://px-cors-bucket-2
```
## Now go ahead and click on first bucket's URL. you should get CORS error on Network TAB

## Apply a CORS policy

```sh
aws s3api put-bucket-cors --bucket px-cors-bucket-2 --cors-configuration file://cors.json
```

## Try again. There should be no cors error
