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

public class CreateRoomHandler implements RequestHandler<Map<String, Object>, ApiGatewayResponse> {

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

		  Room room = new Room();
		  //room.setId(body.get("id").asText());
		  room.setTemperature(body.get("visitorStatus").asDouble());
		  room.setVisitorStatus((int) body.get("visitorStatus").asInt());
		  room.setLightsOn((int) body.get("lightsOn").asInt());

		  room.setLatitude((float) body.get("latitude").asDouble());
		  room.setLongitude((float) body.get("longitude").asDouble());
		  room.setSongPlaying(body.get("songPlaying").asText());
		  room.setParentUser(body.get("parentUser").asText());
		  room.setName(body.get("name").asText());
		  room.save(room);

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
      				.setObjectBody(room)
      				.setHeaders(Collections.singletonMap("X-Powered-By", "AWS Lambda & Serverless"))
      				.build();

      } catch (Exception ex) {
          logger.error("Error in saving room: " + ex);

          // send the error response back
    			Response responseBody = new Response("Error in saving room: ", input);
    			return ApiGatewayResponse.builder()
    					.setStatusCode(500)
    					.setObjectBody(responseBody)
    					.setHeaders(Collections.singletonMap("X-Powered-By", "AWS Lambda & Serverless"))
    					.build();
      }
	}
}
