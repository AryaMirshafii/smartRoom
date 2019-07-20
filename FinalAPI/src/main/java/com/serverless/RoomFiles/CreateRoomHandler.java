package com.serverless.RoomFiles;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.serverless.ApiGatewayResponse;
import com.serverless.Notifications.NotificationHandler;
import com.serverless.Response;
import com.serverless.dal.Room;
import com.serverless.dal.User;
import org.apache.log4j.Logger;
import org.apache.log4j.Priority;

import java.net.UnknownServiceException;
import java.util.Collections;
import java.util.Map;

public class CreateRoomHandler implements RequestHandler<Map<String, Object>, ApiGatewayResponse> {

	private final Logger logger = Logger.getLogger(this.getClass());

	@Override
	public ApiGatewayResponse handleRequest(Map<String, Object> input, Context context) {

		NotificationHandler snsHandler = new NotificationHandler();
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
		  int visitorStatus = (int) body.get("visitorStatus").asInt();
		  //room.setId(body.get("id").asText());
		  room.setTemperature(body.get("visitorStatus").asDouble());
		  room.setVisitorStatus((int) body.get("visitorStatus").asInt());
		  room.setLightsOn((int) body.get("lightsOn").asInt());

		  room.setLatitude((float) body.get("latitude").asDouble());
		  room.setLongitude((float) body.get("longitude").asDouble());
		  room.setSongPlaying(body.get("songPlaying").asText());
		  room.setParentUser(body.get("parentUser").asText());
		  room.setName(body.get("name").asText());




		  if(visitorStatus == 1){
		  	logger.log(Priority.DEBUG, "Sending message");
		  	snsHandler.sendIntruderMessage(room.getName());
		  }else{
              logger.log(Priority.DEBUG, "Not Sending message");
          }

          room.save(room);
          room.updateUsers();


          return ApiGatewayResponse.builder()
      				.setStatusCode(200)
      				.setObjectBody(room)
      				.setHeaders(Collections.singletonMap("X-Powered-By", "AWS Lambda & Serverless"))
      				.build();

      } catch (Exception ex) {
          logger.error("Error in saving room: " + ex);

          // send the error response back
    			Response responseBody = new Response("Error in saving room: " + ex, input);
    			return ApiGatewayResponse.builder()
    					.setStatusCode(500)
    					.setObjectBody(responseBody)
    					.setHeaders(Collections.singletonMap("X-Powered-By", "AWS Lambda & Serverless"))
    					.build();
      }
	}
}
