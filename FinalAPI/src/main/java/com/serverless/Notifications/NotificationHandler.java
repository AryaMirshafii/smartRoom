package com.serverless.Notifications;
import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Region;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.sns.AmazonSNS;
import com.amazonaws.services.sns.AmazonSNSClient;
import com.amazonaws.services.sns.model.*;
import com.serverless.Configurations;
import org.apache.log4j.Logger;
import org.apache.log4j.Priority;

public class NotificationHandler {

    private AmazonSNS snsClient;
    private final Logger logger = Logger.getLogger(this.getClass());

    public NotificationHandler(){

        BasicAWSCredentials basicAwsCredentials = new BasicAWSCredentials(Configurations.accessKey,
                Configurations.secretKey);
        snsClient = new AmazonSNSClient(basicAwsCredentials);
        Region region = Region.getRegion(Regions.US_EAST_1);
        snsClient.setRegion(region);

    }
    public void sendIntruderMessage(String roomName){

        final PublishRequest publishRequest = new PublishRequest(
                Configurations.platformApplicationArn, Configurations.generateIntruderMessage(roomName));

        final PublishResult publishResponse = snsClient.publish(publishRequest);

        logger.log(Priority.DEBUG, "The response is: " + publishResponse.toString());
    }
}
