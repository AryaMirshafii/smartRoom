package com.serverless.UserFiles;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.serverless.ApiGatewayResponse;
import com.serverless.Response;
import com.serverless.dal.User;
import org.apache.log4j.Logger;
import java.util.*;

public class CreateUserHandler implements RequestHandler<Map<String, Object>, ApiGatewayResponse> {

    private final Logger logger = Logger.getLogger(this.getClass());

    @Override
    public ApiGatewayResponse handleRequest(Map<String, Object> input, Context context) {

        try {
            // get the 'body' from input
            JsonNode body = new ObjectMapper().readTree((String) input.get("body"));

            // create the Product object for post


            /**
             * private String id;
             *     private double temperature;
             *     private boolean visitorStatus;
             *     private boolean lightsOn;
             *     private double latitude;
             *     private double longitude;
             */








            User User = new User();
            //User.setId(body.get("id").asText());
            User.setFirstName(body.get("firstName").toString());
            User.setLastName( body.get("lastName").toString());
            User.setEmail(body.get("email").toString());

            User.setPassword(body.get("password").toString());

            User.setRoomIds(body.get("roomIds").toString());

            User.save(User);

            /**

             Product product = new Product();
             // product.setId(body.get("id").asText());
             product.setName(body.get("name").asText());
             product.setPrice((float) body.get("price").asDouble());
             product.save(product);

             */

            // send the response back
            return ApiGatewayResponse.builder()
                    .setStatusCode(200)
                    .setObjectBody(User)
                    .setHeaders(Collections.singletonMap("X-Powered-By", "AWS Lambda & Serverless"))
                    .build();

        } catch (Exception ex) {
            logger.error("Error in saving User: " + ex);

            // send the error response back
            Response responseBody = new Response("Error in saving User: " + ex.toString(), input);
            return ApiGatewayResponse.builder()
                    .setStatusCode(500)
                    .setObjectBody(responseBody)
                    .setHeaders(Collections.singletonMap("X-Powered-By", "AWS Lambda & Serverless"))
                    .build();
        }
    }
}
