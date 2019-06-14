package com.serverless.dal;

import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.datamodeling.*;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import org.apache.log4j.Logger;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;












@DynamoDBTable(tableName = "USERS_TABLE_NAME")
public class User {



    // get the table name from env. var. set in serverless.yml
    private static final String PRODUCTS_TABLE_NAME = System.getenv("USERS_TABLE_NAME");
    private static final String ROOMS_TABLE_NAME = System.getenv("ROOMS_TABLE_NAME");
    private static DynamoDBAdapter db_adapter;
    private final AmazonDynamoDB client;
    private final DynamoDBMapper mapper;
    private final DynamoDBMapper roomMapper;

    private Logger logger = Logger.getLogger(this.getClass());

    private String id;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String roomIds;
    private List<String> roomIdList = new ArrayList<>();

    @DynamoDBHashKey(attributeName = "id")
    @DynamoDBAutoGeneratedKey
    public String getId() {
        return this.id;
    }
    public void setId(String id) {

        this.id = id;
    }


    @DynamoDBAttribute(attributeName = "firstName")

    public String getFirstName() {
        return this.firstName;
    }
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }






    @DynamoDBAttribute(attributeName = "lastName")

    public String getLastName() {
        return this.lastName;
    }
    public void setLastName(String lastName) {

        this.lastName = lastName;
    }





    @DynamoDBAttribute(attributeName = "email")
    public String getEmail() {
        return this.email;
    }
    public void setEmail(String email) {

        this.email = email;
    }




    @DynamoDBAttribute(attributeName = "password")
    public String getPassword() {
        return this.password;
    }
    public void setPassword(String password) {
        this.password = password;
    }




    @DynamoDBAttribute(attributeName = "roomIds")
    public String getRoomIds() {
        return this.roomIds;
    }
    public void setRoomIds(String input) {



        this.roomIds = input;

    }





    public void addToRoomList(String roomId){
        this.roomIdList.add(roomId);
        this.roomIds = roomIdList.toString();
    }



    public User(){
        DynamoDBMapperConfig mapperConfig = DynamoDBMapperConfig.builder()
                .withTableNameOverride(new DynamoDBMapperConfig.TableNameOverride(PRODUCTS_TABLE_NAME))
                .build();
        // get the db adapter
        this.db_adapter = DynamoDBAdapter.getInstance();
        this.client = this.db_adapter.getDbClient();
        // create the mapper with config
        this.mapper = this.db_adapter.createDbMapper(mapperConfig);



        DynamoDBMapperConfig roomMapperConfig = DynamoDBMapperConfig.builder()
                .withTableNameOverride(new DynamoDBMapperConfig.TableNameOverride(ROOMS_TABLE_NAME))
                .build();
        // get the db adapter


        // create the mapper with config
        this.roomMapper = this.db_adapter.createDbMapper(roomMapperConfig);





    }



    public String toString() {
        return String.format("User [ID=%s, First Name=%s, Last Name=%s, Email Addr=%s, Password=%s, Room IDS = %s]",
                this.id, this.firstName, this.lastName, this.email, this.password, this.roomIds);
    }

    // methods
    public Boolean ifTableExists() {
        return this.client.describeTable(PRODUCTS_TABLE_NAME).getTable().getTableStatus().equals("ACTIVE");
    }

    public List<User> list() throws IOException {
        DynamoDBScanExpression scanExp = new DynamoDBScanExpression();
        List<User> results = this.mapper.scan(User.class, scanExp);
        for (User p : results) {
            logger.info("Products - list(): " + p.toString());
        }
        return results;
    }

    public User get(String id) throws IOException {
        User User = null;

        HashMap<String, AttributeValue> av = new HashMap<String, AttributeValue>();
        av.put(":v1", new AttributeValue().withS(id));

        DynamoDBQueryExpression<User> queryExp = new DynamoDBQueryExpression<User>()
                .withKeyConditionExpression("id = :v1")
                .withExpressionAttributeValues(av);

        PaginatedQueryList<User> result = this.mapper.query(User.class, queryExp);
        if (result.size() > 0) {
            User = result.get(0);
            logger.info("User - get(): User - " + User.toString());
        } else {
            logger.info("Users - get(): User - Not Found.");
        }
        return User;
    }

    public void save(User User) throws IOException {
        logger.info("Users - save(): " + User.toString());
        this.mapper.save(User);


    }

    public Boolean delete(String id) throws IOException {
        User user = null;

        // get user if exists


        user = get(id);



        if (user != null) {
            logger.info("Users - delete(): " + user.toString());
            this.mapper.delete(user);
        } else {
            logger.info("Users - delete(): User - does not exist.");
            return false;
        }
        return true;
    }

    public void update()throws IOException {
        DynamoDBScanExpression scanExp = new DynamoDBScanExpression();
        List<User> results = this.mapper.scan(User.class, scanExp);
        for (User user : results) {
            List<Room> roomResults = this.roomMapper.scan(Room.class, scanExp);

            for(Room room: roomResults){
                if(room.getParentUser().equals(user.id)){
                    user.addToRoomList(room.getId());
                    user.save(user);
                }
            }

        }

    }
}
