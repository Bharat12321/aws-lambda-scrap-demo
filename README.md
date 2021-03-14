# Steps to setup and run this app

Demo Lambda function to test scraping api :

POST: https://uvv3dl7xb3.execute-api.us-east-1.amazonaws.com/scrap-test1

Sample Request Body:
```sh
{
    "url":"https://www.designmycodes.com/examples/angular-crud-app.html"
}
```

##  install aws-cli more info here:
https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html

## install the npm packages
- npm install axios
- npm install html-metadata-parser

add keys inside .aws folder in your home directory and also change the config file accordingly
- aws_access_key_id, 
- aws_secret_access_key

Now Run following commands.

Clone the repo

```sh
git clone https://github.com/Bharat12321/aws-lambda-scrap-demo.git
```

Change to project directory

```sh
cd aws-lambda-scrap-demo folder
```

Create role by this command:

```sh
aws iam create-role --role-name lambda-ex --assume-role-policy-document file://trust-policy.json
```

Attach role policy

```sh
aws iam attach-role-policy --role-name lambda-ex2 --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole
```

Add files in zip archive

```sh
zip -r function.zip .
```

Create function

```sh
aws lambda create-function --function-name scrap-test2 --zip-file fileb://function.zip --handler index.handler --runtime nodejs12.x --role <generated arn>
```


If existing lambda functin to update then run this

```sh
aws lambda update-function-code --function-name scrap-one --zip-file fileb://function.zip
```

Now add an apigateway for your API

https://us-east-1.console.aws.amazon.com/apigateway/main/apis?region=us-east-1


