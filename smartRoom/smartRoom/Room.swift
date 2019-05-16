//
//  Room.swift
//  smartRoom
//
//  Created by Arya Mirshafii on 4/17/19.
//  Copyright © 2019 aryaMirshafii. All rights reserved.
//

import Foundation


class Room{
    private var roomTemperature:Double = 0.0;
    private var visitor_status = 0;
    private var lights_on = 0;
    private var latitude:Double = 0.0;
    private var longitude:Double = 0.0;
    init(){
        
    }
    func setTemperature(temperature:Double) {
        self.roomTemperature = temperature;
    }
    
    func setVisitorStatus(status:Bool) {
        if(status){
            self.visitor_status = 1;
        }else{
            self.visitor_status = 0;
        }
        
    }
    
    func lightsOn(){
        self.lights_on = 1;
    }
    func lightsOff(){
        self.lights_on = 0;
    }
    
    
    func setLatitude(lat:Double) {
        self.latitude = lat;
    }
    
    func setLongitude(longitude:Double) {
        self.longitude = longitude;
    }
    
    func getTemperature()->Double{
        return self.roomTemperature
    }
    
    
    func getVisitorStatus()->Int{
        return self.visitor_status
    }
    
    func getLightStatus()->Int{
        return self.lights_on
    }
    
    func getLatitude()->Double{
        return self.latitude;
    }
    
    func getLongitude()->Double{
        return self.longitude;
    }
}
