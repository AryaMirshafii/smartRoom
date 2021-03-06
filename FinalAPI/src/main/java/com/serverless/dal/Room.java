package com.serverless.dal;


import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.datamodeling.*;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapperConfig.TableNameOverride;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.apache.log4j.Logger;


@DynamoDBTable(tableName = "ROOMS_TABLE_NAME")
public class Room {



    // get the table name from env. var. set in serverless.yml
    private static final String ROOMS_TABLE_NAME = System.getenv("ROOMS_TABLE_NAME");
    private static final String USERS_TABLE_NAME = System.getenv("USERS_TABLE_NAME");

    private static DynamoDBAdapter db_adapter;
    private final AmazonDynamoDB client;
    private final DynamoDBMapper mapper;
    private final DynamoDBMapper userMapper;
    private HashMap<String, List<String>> userRoomMap = new HashMap<>();
    private Logger logger = Logger.getLogger(this.getClass());


    private String id;
    private String name;
    private double temperature;
    private int visitorStatus;
    private int lightsOn;
    private double latitude;
    private double longitude;
    private String songPlaying;
    private String parentUser;


    @DynamoDBHashKey(attributeName = "id")
    @DynamoDBAutoGeneratedKey
    public String getId() {
        return this.id;
    }
    public void setId(String id) {
        this.id = id;
    }


    @DynamoDBAttribute(attributeName = "temperature")

    public double getTemperature() {
        return this.temperature;
    }
    public void setTemperature(double temp) {
        this.temperature = temp;
    }


    @DynamoDBAttribute(attributeName = "name")

    public String getName() {
        return this.name;
    }
    public void setName(String name) {
        this.name = name;
    }






    @DynamoDBAttribute(attributeName = "visitorStatus")
    public int getVisitorStatus() {
        return this.visitorStatus;
    }
    public void setVisitorStatus(int status) {
        this.visitorStatus = status;
    }





    @DynamoDBAttribute(attributeName = "lightsOn")
    public int getLightsOn() {
        return this.lightsOn;
    }
    public void setLightsOn(int lightStatus) {
        this.lightsOn = lightStatus;
    }




    @DynamoDBAttribute(attributeName = "latitude")
    public double getLatitude() {
        return this.latitude;
    }
    public void setLatitude(double lat) {
        this.latitude = lat;
    }


    @DynamoDBAttribute(attributeName = "longitude")
    public double getLongitude() {
        return this.longitude;
    }
    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    @DynamoDBAttribute(attributeName = "songPlaying")
    public String getSongPlaying() {
        return this.songPlaying;
    }
    public void setSongPlaying(String newSong) {
        this.songPlaying = newSong;
    }

    @DynamoDBAttribute(attributeName = "parentUser")
    public String getParentUser() {
        return this.parentUser;
    }
    public void setParentUser(String user) {
        this.parentUser = user;
    }






    public Room() {
        // build the mapper config
        DynamoDBMapperConfig mapperConfig = DynamoDBMapperConfig.builder()
                .withTableNameOverride(new DynamoDBMapperConfig.TableNameOverride(ROOMS_TABLE_NAME))
                .build();
        // get the db adapter
        this.db_adapter = DynamoDBAdapter.getInstance();
        this.client = this.db_adapter.getDbClient();
        // create the mapper with config
        this.mapper = this.db_adapter.createDbMapper(mapperConfig);







        DynamoDBMapperConfig userConfig = DynamoDBMapperConfig.builder()
                .withTableNameOverride(new DynamoDBMapperConfig.TableNameOverride(USERS_TABLE_NAME))
                .build();
        // get the db adapter
        this.db_adapter = DynamoDBAdapter.getInstance();
        // create the mapper with config
        this.userMapper = this.db_adapter.createDbMapper(userConfig);
    }

    public String toString() {
        return String.format("Room [id=%s, temperature=%s, visitorStatus=%s, lightsOn=%s, latitude=$%f, " +
                        "longitude=$%f, songPlaying=%s parentUser=%s] ", this.id, this.temperature,
                this.visitorStatus, this.lightsOn, this.latitude, this.longitude, this.songPlaying, this.parentUser );
    }

    // methods
    public Boolean ifTableExists() {
        return this.client.describeTable(ROOMS_TABLE_NAME).getTable().getTableStatus().equals("ACTIVE");
    }

    public List<Room> list() throws IOException {
        DynamoDBScanExpression scanExp = new DynamoDBScanExpression();
        List<Room> results = this.mapper.scan(Room.class, scanExp);
        for (Room room : results) {
            logger.info("Room - list(): " + room.toString());
        }
        return results;
    }

    public Room get(String id) throws IOException {
        Room room = null;

        HashMap<String, AttributeValue> av = new HashMap<String, AttributeValue>();
        av.put(":v1", new AttributeValue().withS(id));

        DynamoDBQueryExpression<Room> queryExp = new DynamoDBQueryExpression<Room>()
                .withKeyConditionExpression("id = :v1")
                .withExpressionAttributeValues(av);

        PaginatedQueryList<Room> result = this.mapper.query(Room.class, queryExp);
        if (result.size() > 0) {
            room = result.get(0);
            logger.info("Room - get(): room - " + room.toString());
        } else {
            logger.info("Rooms - get(): room - Not Found.");
        }
        return room;
    }

    public void save(Room room) throws IOException {
        logger.info("Rooms - save(): " + room.toString());
        this.mapper.save(room);


    }

    public Boolean delete(String id) throws IOException {
        Room room = null;

        // get product if exists
        room = get(id);
        if (room != null) {
            logger.info("Rooms - delete(): " + room.toString());
            this.mapper.delete(room);
        } else {
            logger.info("Rooms - delete(): room - does not exist.");
            return false;
        }
        return true;
    }



    public void updateUsers()throws IOException {
        DynamoDBScanExpression scanExp = new DynamoDBScanExpression();
        List<User> results = this.userMapper.scan(User.class, scanExp);
        List<Room> roomResults = this.mapper.scan(Room.class, scanExp);
        for (User user : results) {


            /*

            if(this.parentUser.equals(user.getId())){
                List<String> listToadd = new ArrayList<>();
                if(this.userRoomMap.containsKey(this.parentUser)){
                    listToadd  = this.userRoomMap.get(this.parentUser);
                    listToadd.add(this.id);
                    //this.userRoomMap.get(this.parentUser).add(this.id);
                }else{

                    listToadd.add(this.id);

                }
                this.userRoomMap.put(this.parentUser, listToadd);
                user.addToRoomList(this.userRoomMap.get(this.parentUser));
                user.save(user);

            */





            for(Room room: roomResults){
                if(room.getParentUser().equals(user.getId())){
                    user.addToRoomList(room.getId());
                    user.save(user);
                }
            }
        }





    }

}

