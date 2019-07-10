//
//  BluetoothSpeaker.swift
//  SmartRoom
//
//  Created by Arya Mirshafii on 5/28/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

import Foundation
import AVFoundation
import Alamofire

@objc(BluetoothSpeaker)
class BluetoothSpeaker: NSObject {
  private var ConnectedToBluetooth = false;
  @objc
  func checkBluetooth(){
    
    do {
      let currentRoute = AVAudioSession.sharedInstance().currentRoute
      for route in currentRoute.outputs {
        print("PortType \(route.portType), Description \(route.portName)")
        if (route.portType == AVAudioSession.Port.bluetoothA2DP && route.portName == "BT Speaker"){
          print("1:::Bluetooth detected")
          print("1:::PORT NAME IS" + route.portName)
          let portDescription = route as! AVAudioSessionPortDescription
          try AVAudioSession.sharedInstance().setPreferredInput(portDescription)
          ConnectedToBluetooth =  true;
          return;
        } else {
          print("No Bluetooth, speaker only")
        }
        
      }
    } catch let error {
      print("audioSession properties weren't set!", error)
    }
    
    ConnectedToBluetooth =  false;
  }
  
  @objc(updateRoom:roomId:)
  func updateRoom(songName:String, roomId: String){
    checkBluetooth();
    if(ConnectedToBluetooth && !roomId.isEmpty){
      let urlString = "https://fr47hclryb.execute-api.us-east-1.amazonaws.com/dev/rooms/" + roomId
      let params = [ "songPlaying": songName] as [String : String]
      Alamofire.request(urlString, method: .put, parameters: params, encoding: JSONEncoding.default)
        .responseJSON { response in
          debugPrint(response)
          print("it worked!!!")
      }
    }
  }
}



