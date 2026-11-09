# Website 1

## Create a bucket

```sh
aws s3 mb <your-bucket-name>
```

## Change block public access

```sh
aws s3api put-public-access-block \
  --bucket <your-bucket-name> \
  --public-access-block-configuration \
  BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false
```

## Create a bucket policy

```sh
aws s3api put-bucket-policy \
  --bucket <your-bucket-name> \
  --policy file://bucket-policy.json
```

## Turn on static website hosting

```sh
aws s3api put-bucket-website \
  --bucket <your-bucket-name> \
  --website-configuration file://website.json
```

## Upload our index.html file and include a resource that would be cross-origin

```sh
aws s3 cp index.html s3://<your-bucket-name>/
```

## View the website and see if index.html is there.

http://<bucket-name>.s3-website.ca-central-1.amazonaws.com
or with hyphen, depending on the region
http://<bucket-name>.s3-website-ca-central-1.amazonaws.com


# Website 2

## Create second bucket

```sh
aws s3 mb <your-bucket-name-2>
```

## Change block public access

```sh
aws s3api put-public-access-block \
--bucket <your-bucket-name-2> \
--public-access-block-configuration "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=false,RestrictPublicBuckets=false"
```

## Create a bucket policy

```sh
aws s3api put-bucket-policy --bucket <your-bucket-name-2> --policy file://bucket-policy2.json
```

## No need to make second bucket static website as it doesn't have html file.

## Upload data.json to the second bucket

```sh
aws s3 cp data.json s3://<your-bucket-name-2>
```
## Now go ahead and click on first bucket's URL. you should get CORS error on Network TAB

## Apply a CORS policy

```sh
aws s3api put-bucket-cors --bucket <your-bucket-name-2> --cors-configuration file://cors.json
```

## Try again. There should be no cors error
