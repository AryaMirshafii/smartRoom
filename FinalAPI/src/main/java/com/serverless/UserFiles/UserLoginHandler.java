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
public class UserLoginHandler implements RequestHandler<Map<String, Object>, ApiGatewayResponse> {
    private final Logger logger = Logger.getLogger(this.getClass());


    @Override
    public ApiGatewayResponse handleRequest(Map<String, Object> input, Context context) {

        try {
            // get the 'body' from input
            JsonNode body = new ObjectMapper().readTree((String) input.get("body"));
            String userEmail = body.get("email").toString();
            String userPassword = body.get("password").toString();

            User foundUser = new User().userLogin(userEmail, userPassword);



            if(foundUser != null){
                return ApiGatewayResponse.builder()
                        .setStatusCode(200)
                        .setObjectBody(foundUser)
                        .setHeaders(Collections.singletonMap("X-Powered-By", "AWS Lambda & Serverless"))
                        .build();
            }

            return ApiGatewayResponse.builder()
                    .setStatusCode(401)
                    .setObjectBody(null)
                    .setHeaders(Collections.singletonMap("X-Powered-By", "AWS Lambda & Serverless"))
                    .build();


        } catch (Exception ex) {
            logger.error("Error in gettinbg user login User: " + ex);
            Response responseBody = new Response("Error Finding the requested user: " + ex.toString(), input);
            return ApiGatewayResponse.builder()
                    .setStatusCode(500)
                    .setObjectBody(responseBody)
                    .setHeaders(Collections.singletonMap("X-Powered-By", "AWS Lambda & Serverless"))
                    .build();
        }
    }
}
