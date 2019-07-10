package com.serverless.RoomFiles;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.serverless.ApiGatewayResponse;
import com.serverless.Response;
import com.serverless.dal.Room;
import org.apache.log4j.Logger;
import java.util.Collections;
import java.util.Map;

public class PutRoomHandler implements RequestHandler<Map<String, Object>, ApiGatewayResponse>{
    private final Logger logger = Logger.getLogger(this.getClass());

    @Override
    public ApiGatewayResponse handleRequest(Map<String, Object> input, Context context) {

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

                room.setTemperature(inputTemperature);
                room.setVisitorStatus(inputVisitorStatus);
                room.setLightsOn(inputLightsOn);
                room.setLatitude((float) inputLatitutde);
                room.setLongitude((float) inputLongitude);
                room.setSongPlaying(inputSongPlaying);
                room.setParentUser(inputParentUser);
                room.setName(inputRoomName);
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
}
