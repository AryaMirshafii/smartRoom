//
// Created by Arya Mirshafii on 2019-05-24.
//

#include "User.h"
User::User(char* id) {
    this->firstName = "";
    this->lastName = "";
    this->password = "";
    this->email = "";
    this->id = id;


}
User::User() {
    this->firstName = "";
    this->lastName = "";
    this->password = "";
    this->email = "";
    this->id = "";
}
