import { S3 } from 'aws-sdk';
import { injectable } from 'inversify';
import config from '../../config';

@injectable()
export class AWSStorageService {
    private s3: S3;

    constructor() {
        this.s3 = new S3({
            region: config.aws.aws_region,
            accessKeyId: config.aws.aws_access_key_id,
            secretAccessKey: config.aws.aws_secret_access_key
        });
    };

    async s3Save(key: string, media: Buffer) {
        return await this.s3
            .upload({
                Bucket: config.aws.aws_S3_bucket_name,
                Body: media,
                Key: key,
                ACL: 'public-read',
            })
            .promise();
    };

    async s3Delete(key: string) {
        return await this.s3
            .deleteObject({
                Bucket: config.aws.aws_S3_bucket_name,
                Key: key
            })
            .promise();
    };

    async s3WriteFileHTML(key: string, content: any) {
        return await this.s3
            .upload({
                Bucket: config.aws.aws_S3_bucket_name,
                Body: content,
                Key: key,
                ACL: 'public-read',
                ContentType: 'text/html',
            })
            .promise();
    };

    async readFile(key: string) {
        const data = await this.s3
            .getObject({
                Bucket: config.aws.aws_S3_bucket_name,
                Key: key,
            })
            .promise();

        return data.Body;
    };
};

