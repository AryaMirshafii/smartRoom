package com.serverless;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
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


                room.setTemperature(body.get("temperature").asDouble());
                room.setVisitorStatus((int) body.get("visitorStatus").asInt());
                room.setLightsOn((int) body.get("lightsOn").asInt());

                room.setLatitude((float) body.get("latitude").asDouble());
                room.setLongitude((float) body.get("longitude").asDouble());
                room.setSongPlaying(body.get("songPlaying").asText());

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
            logger.error("Error in retrieving product: " + ex);

            // send the error response back
            Response responseBody = new Response("Error in retrieving room: ", input);
            return ApiGatewayResponse.builder()
                    .setStatusCode(500)
                    .setObjectBody(responseBody)
                    .setHeaders(Collections.singletonMap("X-Powered-By", "AWS Lambda & Serverless"))
                    .build();
        }
    }
}
