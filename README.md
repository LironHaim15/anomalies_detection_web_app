# FlightGear Simulator Control App

## About
Our anomalies detection web application allows you to upload your data files to our server, choose one of two detection
algorithms, and output with anomalies shall be displayed (or sent via JSON).

The web app runs locally with port 8080. Project developed in Node.JS Express.
### Features
* Upload learn CSV file with proper data (without anomalies).
* Upload test CSV file with data you wish to test for anomalies.
* Choice between two types of anomalies detection: Simple Detector or Hybrid Detector.

## Table of contents
> * [FlightGear Simulator Control App](#flightgear-simulator-control-app)
    >   * [About](#about)
>   * [Features](#features)
>   * [Table of contents](#table-of-contents)
>   * [Installation](#installation)
>   * [Usage](#usage)
      >  [Preparations](#preparations)
>     * [Getting Started](#getting-started)
>     * [Using The Features](#using-the-features)
>   * [Requirements](#requirements)
>   * [Plugins (DLL) Requirements](#plugins-dll-requirements)
>   * [Limitations](#limitations)
>   * [Program Structure](#program-structure)
>   * [GitHub Links](#github-links)
>   * [Video Demo](#video-demo)
>   * [Authors](#authors)
>   * [Screenshots](#screenshots)
---
## Starting The Server Side



Download the project from GitHub. The compiled program is in the folder `FlightGear Simulator Control App` (you may copy this folder where ever you desire). Make sure the following files are in that folder:

>* OxyPlot.dll
>* OxyPlot.Wpf.dll
>* OxyPlot.Wpf.xml
>* OxyPlot.xml
>* FlightGear Simulator Control App.exe
>* FlightGear Simulator Control App.exe.config
>* FlightGear Simulator Control App.pdb
>* README

Launch `FlightGear Simulator Control App.exe`.

screenshots folder and exaple for `input.txt`, `output.txt` files are also inside for further assitance and understanding.

## Usage

### Preparations
You should make sure you have the following files and instelled programs before you continue any further:
* Instelled FlightGear application (you can from get it from the [official website](https://www.flightgear.org/download/)).
* `playback_small.xml` file saved in the `...\\data\\protocol\\` folder of the FlightGear directory. (`playback_small.xml` file is provided with this project)
* CSV file containing a proper flight data.
* CSV file containing a flight data that you want to analyze.


### Getting Started
Launch `FlightGear Simulator Control App.exe`.

After launching you should be in the main window. Press on the `Settings` button and load your CSV file of the proper flight data to the "Normal CSV" field, the CSV file of the analysis flight to "Test CSV" field, and finally provide the the FlightGear installation drictory on your computer. Then press 'Continue' and the Settings window should be closed.  
Once closed, the 'Connect' and 'Load Detection Algo' buttons should be functional.

Before connectiong, Run the FlightGear Launcher and go to the 'Settings' tab. In the 'Additional Settings' catagory at the end of the page, enter these two lines in the text box:

```
--generic=socket,in,10,127.0.0.1,5400,tcp,playback_small
--fdm=null
```

>(the first line establishes a one way TCP socket with the port 5400 and ip of Local Host 127.0.0.1, these can be changed here at your wish. It also directs FG to the `playback_small.xml`. The paramater '10' indicates the amount of lines in the data file that represent a single second.
the second line disables the FG controlable simulator.)

Start FlightGear by pressing the 'Fly!' button in the launcher.

Now go back to our app window, click on the 'Connect' button. insert ip 127.0.0.1 and port 5400 (is inserted by default but you can change it if according to what you entered in the FG settings). If the connection is established successfully the window will close.

Now the app is connected to FG and you can start your flight by pressing the play button.
See the next bullets in order to learn how to use the app features.
In order to disconnet from FligtGear press 'Disconnet' button.

Screenshots of the mentioned windows are provided below for further understanding.

### Using The Features
* Playbar - controls the flight playback and its speed like any media playbar.
* Anlayzing Data Features - choose a desired feaute from the list and the graphs will be displayed
* Joystick and Dashboard are viewable and not interactive.
* Load Detection alogorithm by pressing the 'Load Detection Algo' button, browse for suitable dll file and load it by pressing 'Load'. If the dll was loaded successfully the window will close. Once loaded, if there are any anomalies detected, they will be displayed in the anomalies list. Press any anomaly to jump in time to the moment it occurs. Anomalies are highlighted in red in graph.
* You can load new detection algorithm at any time.
* For more details, you can press, drag and zoom in & out the graph. TIP: double-click on the mouse wheel when curser is on the graph to reset the graph's view.


## Requirements

.Net Framework 4.7.2 and above.
Tested with FlightGear 2020.3.6 (but any other version should work fine).


## Plugins (DLL) Requirements

DLL must have the namespace `AlgorithmNS` and a class named `Algorithm`. This class has to contain a method called `getAnomaliesReport` that gets no arguments and returns void.

This method reads a text file named `input.txt` which is located in the app directory, and use its content to learn the data and find anomalies. The `input.txt` is build this way:
* first line: "1"
    * second line: the features names divided by `','`. The names order should be as they show in the `playback_small.xml` file.
    * third lines and beyond: the content of whole learn data csv file. Each feature data is in the same order as the names above. The new line after the data ends should have the word `done` alone.
    * next lines after `done` will be the same as the learn data only now with the test data. And also after the data ends, write `done` in a new line.
* next line after `done` of the test date, will be "3".
* next line: "4".
* next line: "6".

`getAnomaliesReport` method must create another text file called `output.txt` and it must contain atleast 2 pairs lines, one line with the string "ThresholdEnd.", and another line with the string "ThresholdEnd.".

Between these two lines there should be a list of every most correlated features that the plugin has found, after their names (in the same line seperated by commas) there should be a list of points that will create the shape on the graph that seperates anomalies from proper samples. For example, linear graph will be represented by 2 points, the circle of the HybridDetector we provided is represented by 100 points. each point is written in new-line. after the last point there should be a new-line with `done` and then the next pair of correlated features. Like the next format (will show a squre using 4 points):

>"name_of_feature1" + "," + "name_of_feature2"  
x_value1 + "," + y_value1  
x_value2 + "," + y_value2   
x_value3 + "," + y_value3  
x_value4 + "," + y_value4  
"done"


After "ThresholdEnd." there should be another pair of lines, one with the string "ResultsEnd.", and another line with the string "ResultsEnd.".

Between these two lines there should be a list of anomalies with the next format:
>"line_number" + "\t" + "name_of_feature1" + "," + "name_of_feature2"

"line_number" should be a number. "/t" means TAB character.

(each line ends with '\n' so the next line with be the next anomaly)

Our program reads that `output.txt`, parse and store the anomalies.

An example of `input.txt` & `output.txt` files is included in the project.


## Limitations

* Our app support stream and anlysis of only data in frequency on 10 lines per second.


## Program Structure

Used design pattern: MVVM.
Our code files are orginized in 4 main places:
* View related files are located in the main folder of the project.
* ViewModels files are located in ViewModels folder.
* Models files are located in Models folder.
* `Line.cs`, `Point.cs` and `anomaly_detection_util.cs` are located in the folder forGrph.

Full UML can be found within the project and a picture version is down below among the screenshots.

In addition, the folder plugins is provided with 2 anomalies detection algorithms: `CS_SimpleDetector.dll` and `CS_HybridDetector.dll` (each of them specific requires the other dll file that is inside that folder.)


## GitHub Links
[FlightGear Simulator Control App]()


## Video Demo

[Watch here](https://youtu.be/58-n3c-bOTY)


## Authors

* [Stav Lidor](https://github.com/stavLidor)
* [Liron Haim](https://github.com/LironHaim15)

## Screenshots

### FlightGear Launcher in Settings Window
[![FlightGear Launcher in Settings window](\screenshots\FGWindow.jpg "FGWindow.jpg")](https://ibb.co/gDmnK1v)

### Main Window
[![Main window](\screenshots\MainWindow.jpg "MainWindow.jpg")](https://ibb.co/tX77F8f)

### Settings Window
[![Settings window](\screenshots\SettingsWindow.jpg "SettingsWindow.jpg")](https://ibb.co/c36XHxd)

### Connect Window
[![Connect window](\screenshots\ConnectWindow.jpg "ConnectWindow.jpg")](https://ibb.co/d5sjQmD)

### Load Plugin Window
[![Load window](\screenshots\LoadWindow.jpg "LoadWindow.jpg")](https://ibb.co/d5sjQmD)

### The App With All The Features
[![InAction](\screenshots\InAction.jpg "InAction.jpg")](https://ibb.co/sKSqHcT)

### UML
[![UML](\screenshots\UML.png "UML.png")](https://ibb.co/mCyp5QR)

