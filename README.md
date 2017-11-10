# direct_to_s3

Run a quick direct-to-S3 file-upload service.

## setup

```
npm i
```

### environment

You should set these variables:

```
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
DIRECT_TO_S3_BUCKET
```

### s3

You need to [setup a bucket with CORS](http://docs.aws.amazon.com/AmazonS3/latest/user-guide/add-cors-configuration.html).

```xml
<CORSConfiguration>
    <CORSRule>
        <AllowedOrigin>*</AllowedOrigin>
        <AllowedMethod>GET</AllowedMethod>
        <AllowedMethod>POST</AllowedMethod>
        <AllowedMethod>PUT</AllowedMethod>
        <MaxAgeSeconds>3000</MaxAgeSeconds>
        <AllowedHeader>*</AllowedHeader>
    </CORSRule>
</CORSConfiguration>
```

### starting

```
npm start
```