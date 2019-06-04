package com.serverless.UserFiles;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.serverless.ApiGatewayResponse;
import com.serverless.Response;
import com.serverless.dal.User;
import org.apache.log4j.Logger;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Map;

public class PutUserHandler implements RequestHandler<Map<String, Object>, ApiGatewayResponse>{
    private final Logger logger = Logger.getLogger(this.getClass());

    @Override
    public ApiGatewayResponse handleRequest(Map<String, Object> input, Context context) {

        try {
            // get the 'pathParameters' from input
            Map<String,String> pathParameters =  (Map<String,String>)input.get("pathParameters");
            String UserID = pathParameters.get("id");

            // get the Product by id
            User User = new User().get(UserID);

            // send the response back
            if (User != null) {


                JsonNode body = new ObjectMapper().readTree((String) input.get("body"));



                //User.setId(body.get("id").asText());
                User.setFirstName(body.get("firstName").toString());
                User.setLastName( body.get("lastName").toString());
                User.setEmail(body.get("email").toString());

                User.setPassword(body.get("password").toString());

                User.setRoomIds(body.get("roomIds").toString());

                User.save(User);




                return ApiGatewayResponse.builder()
                        .setStatusCode(200)
                        .setObjectBody(User)
                        .setHeaders(Collections.singletonMap("X-Powered-By", "AWS Lambda & Serverless"))
                        .build();
            } else {
                return ApiGatewayResponse.builder()
                        .setStatusCode(404)
                        .setObjectBody("User with id: '" + UserID + "' not found.")
                        .setHeaders(Collections.singletonMap("X-Powered-By", "AWS Lambda & Serverless"))
                        .build();
            }
        } catch (Exception ex) {
            logger.error("Error in retrieving product: " + ex);

            // send the error response back
            Response responseBody = new Response("Error in retrieving User: +" + ex.toString(), input);
            return ApiGatewayResponse.builder()
                    .setStatusCode(500)
                    .setObjectBody(responseBody)
                    .setHeaders(Collections.singletonMap("X-Powered-By", "AWS Lambda & Serverless"))
                    .build();
        }
    }
}