## Create a bucket

aws s3 mb s3://bucket-policy-example-px

## Create buvcket policy

aws s3api put-bucket-policy --bucket bucket-policy-example-px --policy file://policy.json

# In the other account access the bucket

touch bootcamp.txt
aws s3 cp bootcamp.txt s3://bucket-policy-eample-px
aws s3 ls s3://bucket-policy-example-px

## Clean up

aws s3 rm s3://bucket-policy-example-px/bootcamp.txt
aws s3 rb s3://bucket-policy-example-px