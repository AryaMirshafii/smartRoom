//
//  RoomController.swift
//  smartRoom
//
//  Created by Arya Mirshafii on 4/17/19.
//  Copyright © 2019 aryaMirshafii. All rights reserved.
//


import Foundation
import Alamofire
import CoreLocation
import SwiftyJSON

import CoreData
class RoomController: NSObject, CLLocationManagerDelegate{
    
    private let roomURL:String = "https://wepm657hta.execute-api.us-east-1.amazonaws.com/dev/rooms"
    private let locationManager = CLLocationManager()
    
    private var currentRoom:Room = Room();
    
    private var managedObjectContext: NSManagedObjectContext?
   
    struct defaultsKeys {
        static let roomID = ""
        
    
    }
    
    
    override init() {
        super.init()
        
        if(self.fetchRoomID() == ""){
            getRoom { (status) in
                if status {
                    print("Initialized room")
                    print("ROOM ID is : " + self.fetchRoomID())
                }
            }
        }else{
            print("Room ID already saved!!!.................................")
        }
        
        
        
    }
    
    func fetchRoomID() -> String {
        let defaults = UserDefaults.standard
        if let stringOne = defaults.string(forKey: defaultsKeys.roomID) {
            // Some String Value
            return stringOne
        }
        return ""
    }
    
    func saveRoomID(ID: String) {
        let defaults = UserDefaults.standard
        defaults.set(ID, forKey: defaultsKeys.roomID)
        
    }
    
    func getLatLong()->(Int,Int){
        locationManager.delegate = self
        print("pre 12" )
        
        locationManager.distanceFilter = kCLDistanceFilterNone
        locationManager.desiredAccuracy = kCLLocationAccuracyBest
        locationManager.startUpdatingLocation()
        print("pre 1" )
        let newLatitude:Int = Int(floor((locationManager.location?.coordinate.latitude)! * 1000))
        let newLongitude:Int = Int(floor((locationManager.location?.coordinate.longitude)! * 1000))
        print("Up to here")
        print(String(newLatitude))
        print(String(newLongitude))
        
        return (newLatitude,newLongitude)
    }
    
    
    
    
    
    func getRoom(completion:@escaping (Bool) -> () ) {
        
        Alamofire.request(roomURL).responseJSON { response in
            
            
            if let myData = response.data  {
                
                do {
                    
                    let myJason = try JSON(data: myData)
                    if(!myJason.isEmpty){
                        let ID:String! = myJason[0].dictionary!["id"]?.string
                        print(myJason)
                        print("My ID is : " + ID)
                        
                        self.saveRoomID(ID: ID);
                        
                        
                        completion(true)
                        
                    }else{
                        print("NO room has been found")
                    }
                } catch {
                    print("error has happened")
                }
            }
        }
        
        
        
    }
    
    func setTemperature(temperature:Double) {
        
        self.currentRoom.setTemperature(temperature: temperature)
        self.putRoom()
    }
    
    func setVisitorStatus(status:Bool) {
        
        self.currentRoom.setVisitorStatus(status: status)
        self.putRoom()
    }
    
    func setLightStatus(status:Bool){
        
        if(status){
             self.currentRoom.lightsOn()
        }else{
            self.currentRoom.lightsOff()
        }
        
        self.putRoom()
       
    }
    
    
    
    func setLatitude(lat:Double) {
        
        self.currentRoom.setLatitude(lat: lat)
        self.putRoom()
    }
    
    func setLongitude(longitude:Double) {
        
        self.currentRoom.setLongitude(longitude: longitude)
        self.putRoom()
    }
    
    
    
    
    
    private func postRoom(){
        if (verifyUrl()) {
            
            
            
            
            let body: NSMutableDictionary? = [
                "temperature": "\(currentRoom.getTemperature())",
                "visitorStatus": "\(currentRoom.getVisitorStatus())",
                "lightsOn": "\(currentRoom.getLightStatus())",
                "latitude": "\(currentRoom.getLatitude())",
                "longitude": "\(currentRoom.getLongitude())",
                "songPlaying": "testing"
                
            ]
            
            let url = NSURL(string: self.roomURL as String)
            var request = URLRequest(url: url! as URL)
            request.httpMethod = "POST"
            request.setValue("application/json", forHTTPHeaderField: "Content-Type")
            let data = try! JSONSerialization.data(withJSONObject: body!, options: JSONSerialization.WritingOptions.prettyPrinted)
            
            let json = NSString(data: data, encoding: String.Encoding.utf8.rawValue)
            if let json = json {
                print(json)
            }
            request.httpBody = json!.data(using: String.Encoding.utf8.rawValue)
            let alamoRequest = Alamofire.request(request as URLRequestConvertible)
            alamoRequest.validate(statusCode: 200..<300)
            alamoRequest.responseString { response in
                
                switch response.result {
                case .success:
                    print("Posted sucessfully")
                case .failure( _):
                    
                    print("Could not post room data")
                }
            }
            
        }
    }
    
    
    private func putRoom(){
        
        
        if(verifyUrl()){
            let urlString = roomURL + "/" +  (fetchRoomID() ?? "")
            print("MY URL STRING IS " + urlString)
            Alamofire.request(urlString).responseJSON { response in
                debugPrint("All Response Info: \(response)")
                if let data = response.result.value {
                    let json = JSON(data)
                    
                    
                    //let params = [ "songList": previousSong + " @" +  songtoAdd,"locationName": previousLocation] as [String : Any]
                    //let params = [ "songList": songArray,"locationName": previousLocation] as [String : Any]
                    
                    print("MY TEMP IS " +  String(self.currentRoom.getTemperature()))
                    let params = ["temperature": self.currentRoom.getTemperature(),"visitorStatus" : self.currentRoom.getVisitorStatus(), "lightsOn": self.currentRoom.getLightStatus(), "latitude": self.currentRoom.getLatitude(),"longitude": self.currentRoom.getLongitude(), "songPlaying": "Under the bridge" ] as [String : Any]
                    
                    print("......................................................................")
                    //print(params)
                    
                    
                    
                    Alamofire.request(urlString, method: .put, parameters: params, encoding: JSONEncoding.default)
                        .responseJSON { response in
                            debugPrint(response)
                            print("it worked!!!")
                    }
 
                    
                }
            }
        }
 
        /**
        
        let urlString = roomURL + "/" +  (fetchRoomID() ?? "")
        let body: NSMutableDictionary? = [
            "temperature": "\(currentRoom.getTemperature())",
            "visitorStatus": "\(currentRoom.getVisitorStatus())",
            "lightsOn": "\(currentRoom.getLightStatus())",
            "latitude": "\(currentRoom.getLatitude())",
            "longitude": "\(currentRoom.getLongitude())",
            "songPlaying": "testing"
            
        ]
        
        let url = NSURL(string: urlString as String)
        var request = URLRequest(url: url! as URL)
        request.httpMethod = "PUT"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        let data = try! JSONSerialization.data(withJSONObject: body!, options: JSONSerialization.WritingOptions.prettyPrinted)
        
        let json = NSString(data: data, encoding: String.Encoding.utf8.rawValue)
        if let json = json {
            print(json)
        }
        request.httpBody = json!.data(using: String.Encoding.utf8.rawValue)
        let alamoRequest = Alamofire.request(request as URLRequestConvertible)
        alamoRequest.validate(statusCode: 200..<300)
        alamoRequest.responseString { response in
            
            switch response.result {
            case .success:
                print("PUT sucessfully")
            case .failure( _):
                
                print("Could not PUT room data")
            }
        }
        
        */
        
        
    }
    
    
    
    private func verifyUrl () -> Bool {
        
        
        let url: NSURL = NSURL(string: roomURL)!
        let request: NSURLRequest = NSURLRequest(url: url as URL)
        var response: URLResponse?
        
        let data =  try? NSURLConnection.sendSynchronousRequest(request as URLRequest, returning: &response) as NSData?
        guard data != nil else {
            print("No connection to the server!")
            return false;
        }
        
        if let httpResponse = response as? HTTPURLResponse {
            print("error \(httpResponse.statusCode)")
        }
        print("Connected to server!")
        return true;
    }
}



