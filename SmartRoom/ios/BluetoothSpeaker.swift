//
//  BluetoothSpeaker.swift
//  SmartRoom
//
//  Created by Arya Mirshafii on 5/28/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

import Foundation
import AVFoundation

@objc(BluetoothSpeaker)
class BluetoothSpeaker: NSObject {
  
  @objc
  func checkBluetooth(songName: String) {
    
    do {
      let currentRoute = AVAudioSession.sharedInstance().currentRoute
      for route in currentRoute.outputs {
        print("PortType \(route.portType), Description \(route.portName)")
        if (route.portType == AVAudioSession.Port.bluetoothA2DP && route.portName == "BT Speaker"){
          print("1:::Bluetooth detected")
          print("1:::PORT NAME IS" + route.portName)
          let portDescription = route as! AVAudioSessionPortDescription
          try AVAudioSession.sharedInstance().setPreferredInput(portDescription)
          
        } else {
          print("No Bluetooth, speaker only")
          
          //AVAudioSession.sharedInstance().overrideOutputAudioPort(AVAudioSessionPortOverride.Speaker, error: nil)
         
        }
        
      }
    } catch let error {
      print("audioSession properties weren't set!", error)
    }
    
   
  }
  
  
  
  
  
  
  
  
  
 
  
  
}

