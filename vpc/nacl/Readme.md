## Create NACL

```sh
aws ec2 create-network-acl --vpc-id vpc-077b444ee7c3abe22
```

## Get AMI for Amazon Linux 2
Grab the latest

```sh
aws ec2 describe-images \
--owners amazon \
--filters "Name=name,Values=amzn2-ami-hvm-*-x86_64-gp2" "Name=state,Values=available" \
--query "Images[?starts_with(Name, 'amzn2')]|sort_by(@, &CreationDate)[-1].ImageId" \
--region us-east-1 \
 --output text
```