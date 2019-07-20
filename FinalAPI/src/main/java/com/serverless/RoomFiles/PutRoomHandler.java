package com.serverless.RoomFiles;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.serverless.ApiGatewayResponse;
import com.serverless.Notifications.NotificationHandler;
import com.serverless.Response;
import com.serverless.dal.Room;
import org.apache.log4j.BasicConfigurator;
import org.apache.log4j.Logger;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import javapns.*;
import javapns.communication.exceptions.CommunicationException;
import javapns.communication.exceptions.KeystoreException;
import javapns.notification.PushNotificationPayload;
import javapns.notification.PushedNotification;
import javapns.notification.ResponsePacket;
import org.apache.log4j.Priority;
import org.json.JSONException;

public class PutRoomHandler implements RequestHandler<Map<String, Object>, ApiGatewayResponse>{
    private final Logger logger = Logger.getLogger(this.getClass());

    @Override
    public ApiGatewayResponse handleRequest(Map<String, Object> input, Context context) {

        NotificationHandler snsHandler = new NotificationHandler();

        try {
            // get the 'pathParameters' from input
            Map<String,String> pathParameters =  (Map<String,String>)input.get("pathParameters");
            String roomID = pathParameters.get("id");

            // get the Product by id
            Room room = new Room().get(roomID);

            // send the response back
            if (room != null) {


                JsonNode body = new ObjectMapper().readTree((String) input.get("body"));

                double inputTemperature = (body.get("temperature") != null)? body.get("temperature").asDouble(): room.getTemperature();
                int inputVisitorStatus = (body.get("visitorStatus") != null)? body.get("visitorStatus").asInt(): room.getVisitorStatus();
                int inputLightsOn =  (body.get("lightsOn") != null)?  body.get("lightsOn").asInt():  room.getLightsOn();
                double inputLatitutde = (body.get("latitude") != null)? body.get("latitude").asDouble(): room.getLatitude();
                double inputLongitude = (body.get("longitude") != null)? body.get("longitude").asDouble(): room.getLatitude();
                String inputSongPlaying = (body.get("songPlaying") != null)? body.get("songPlaying").asText(): room.getSongPlaying();
                String inputParentUser = (body.get("parentUser") != null)? body.get("parentUser").asText(): room.getParentUser();
                String inputRoomName = (body.get("name") != null)? body.get("name").asText(): room.getName();
                sendPushNotification();
                room.setTemperature(inputTemperature);
                room.setVisitorStatus(inputVisitorStatus);
                room.setLightsOn(inputLightsOn);
                room.setLatitude((float) inputLatitutde);
                room.setLongitude((float) inputLongitude);
                room.setSongPlaying(inputSongPlaying);
                room.setParentUser(inputParentUser);
                room.setName(inputRoomName);


                if(inputVisitorStatus == 1){
                    logger.log(Priority.DEBUG, "Sending message");
                    snsHandler.sendIntruderMessage(room.getName());
                }else{
                    logger.log(Priority.DEBUG, "Not Sending message");
                }

                room.save(room);
                room.updateUsers();


                room.save(room);

                return ApiGatewayResponse.builder()
                        .setStatusCode(200)
                        .setObjectBody(room)
                        .setHeaders(Collections.singletonMap("X-Powered-By", "AWS Lambda & Serverless"))
                        .build();
            } else {
                return ApiGatewayResponse.builder()
                        .setStatusCode(404)
                        .setObjectBody("Room with id: '" + roomID + "' not found.")
                        .setHeaders(Collections.singletonMap("X-Powered-By", "AWS Lambda & Serverless"))
                        .build();
            }
        } catch (Exception ex) {
            logger.error("Error in retrieving room: " + ex);

            // send the error response back
            Response responseBody = new Response("Error in retrieving room:  " + ex.toString(), input);
            return ApiGatewayResponse.builder()
                    .setStatusCode(500)
                    .setObjectBody(responseBody)
                    .setHeaders(Collections.singletonMap("X-Powered-By", "AWS Lambda & Serverless"))
                    .build();
        }
    }

    private void sendPushNotification(){
        BasicConfigurator.configure();
        try {

            PushNotificationPayload payload = PushNotificationPayload.complex();
            payload.addAlert("test notification");
            payload.addBadge(1);
            payload.addSound("default");
            payload.addCustomDictionary("id", "1");
            System.out.println(payload.toString());
            List< PushedNotification > NOTIFICATIONS = Push.payload(payload, "src/main/resources/smartRoom.p12", "1234", false, "040A319BEC378001534802032193728462CC4D2B28CF6760");
            for (PushedNotification NOTIFICATION: NOTIFICATIONS) {
                if (NOTIFICATION.isSuccessful()) {
                    /* APPLE ACCEPTED THE NOTIFICATION AND SHOULD DELIVER IT */
                    logger.log(Priority.INFO, "PUSH NOTIFICATION SENT SUCCESSFULLY TO: " +
                            NOTIFICATION.getDevice().getToken());
                    /* STILL NEED TO QUERY THE FEEDBACK SERVICE REGULARLY */
                } else {
                    String INVALIDTOKEN = NOTIFICATION.getDevice().getToken();
                    /* ADD CODE HERE TO REMOVE INVALIDTOKEN FROM YOUR DATABASE */
                    /* FIND OUT MORE ABOUT WHAT THE PROBLEM WAS */
                    Exception THEPROBLEM = NOTIFICATION.getException();
                    THEPROBLEM.printStackTrace();

                    logger.log(Priority.ERROR, "THE ISSUE WAS WITH " + THEPROBLEM);
                    /* IF THE PROBLEM WAS AN ERROR-RESPONSE PACKET RETURNED BY APPLE, GET IT */
                    ResponsePacket THEERRORRESPONSE = NOTIFICATION.getResponse();
                    if (THEERRORRESPONSE != null) {
                        System.out.println(THEERRORRESPONSE.getMessage());
                    }
                }
            }
        } catch (Exception e) {
            logger.log(Priority.DEBUG,e);
        }
    }
}
