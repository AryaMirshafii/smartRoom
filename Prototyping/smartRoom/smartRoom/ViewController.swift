//
//  ViewController.swift
//  smartRoom
//
//  Created by Arya Mirshafii on 4/16/19.
//  Copyright © 2019 aryaMirshafii. All rights reserved.
//

import UIKit
extension String {
    func toDouble() -> Double? {
        return NumberFormatter().number(from: self)?.doubleValue
    }
}
class ViewController: UIViewController {

    @IBOutlet weak var temperatureEntry: UITextField!
    var roomController:RoomController = RoomController()
    override func viewDidLoad() {
        super.viewDidLoad()
        temperatureEntry.addTarget(self, action: #selector(enterPressed), for: .editingDidEndOnExit)
    }

    @IBAction func visitorPresent(_ sender: Any) {
        roomController.setVisitorStatus(status: true)
    }
    
    @IBAction func visitorAway(_ sender: Any) {
        roomController.setVisitorStatus(status: false)
    }
    @IBAction func lightsOn(_ sender: Any) {
        roomController.setLightStatus(status: true)
    }
    
    
    @IBAction func lightsOff(_ sender: Any) {
        roomController.setLightStatus(status: false)
    }
    
    @objc func enterPressed(){
        print("ENTER HAS BEEN PRESSED")
        let temperature = temperatureEntry.text
        
        roomController.setTemperature(temperature: temperature?.toDouble() ?? 69)
        //do something with typed text if needed
        
    }
    
}

