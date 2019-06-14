package com.serverless.UserFiles;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.serverless.ApiGatewayResponse;
import com.serverless.Response;
import com.serverless.dal.User;
import com.serverless.dal.User;
import org.apache.log4j.Logger;

import java.util.*;
import java.util.logging.Handler;


public class ListUsersHandler implements RequestHandler<Map<String, Object>, ApiGatewayResponse> {

    private final Logger logger = Logger.getLogger(this.getClass());

    @Override
    public ApiGatewayResponse handleRequest(Map<String, Object> input, Context context) {
        try {
            // get all products
            List<User> users = new User().list();

            // send the response back


            return ApiGatewayResponse.builder()
                    .setStatusCode(200)
                    .setObjectBody(users)
                    .setHeaders(Collections.singletonMap("X-Powered-By", "AWS Lambda & Serverless"))
                    .build();
        } catch (Exception ex) {
            logger.error("Error in listing Users: " + ex);

            // send the error response back
            Response responseBody = new Response("Error in listing Users: " + ex.toString(), input);
            return ApiGatewayResponse.builder()
                    .setStatusCode(500)
                    .setObjectBody(responseBody)
                    .setHeaders(Collections.singletonMap("X-Powered-By", "AWS Lambda & Serverless"))
                    .build();
        }
    }




}

