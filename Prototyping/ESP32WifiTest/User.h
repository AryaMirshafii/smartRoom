//
// Created by Arya Mirshafii on 2019-05-24.
//

#ifndef ESP32WIFITEST_USER_H
#define ESP32WIFITEST_USER_H


class User {
public:
    const char* id;
    const char* firstName;
    const char* lastName;
    const char* email;
    const char* password;
    char** roomIds;

    User(char* id);
    User();


private:




};


#endif //ESP32WIFITEST_USER_H
