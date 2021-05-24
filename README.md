# Anomalies Detection Web Application

## About
Our anomalies detection web application allows you to upload your data files to our server, choose one of two detection
algorithms, and output with anomalies shall be displayed (or sent via JSON).

The web app runs locally with port 8080. Project developed in Node.JS Express.

### Features
* In-Browser features:
  * Upload learn CSV file with proper data (without anomalies).
  * Upload test CSV file with data you wish to test for anomalies.
  * Choice between two types of anomalies detection: Simple Detector or Hybrid Detector.


* Make an HTTP-POST request of FormData including the `learn` and `test` csv file, and also the desired detection 
  algorithm: `simple` or `hybrid`. Get a JSON response containing the results.
  
* About the detection algorithms:
  * Simple Detector - detects anomalies which are far from the regression line of two correlated features, with
    correlation above 0.9. The line is learned from the train data csv.
  * Hybrid Detector - same as the Simple Detector but also detects data points outside the min-circle for features of
  correlation between 0.5 and 0.9.
    
## Table of contents
> * [Anomalies Detection Web Application](#anomalies-detection-web-application)
>   * [About](#about)
>   * [Features](#features)
>   * [Table of contents](#table-of-contents)
>   * [Starting The Server Side](#starting-the-server-side)
>   * [Usage](#usage)
>   * [Requirements](#requirements)
>   * [Program Structure](#program-structure)
>   * [Video Demo](#video-demo)
>   * [Authors](#authors)
>   * [Screenshots](#screenshots)
---
## Starting The Server Side

Download and install Node.js from the [official website](https://nodejs.org/en/download/).
Download the project from this git page, save it on your computer.
Navigate to the project directory and open the terminal. Enter the command `node -v` or `nmp -v` just to make sure 
Node.js is installed, the version of Node.js should be printed.

Enter the command:
```
npm install
```
This should install in the project file all the dependencies packages according to `package.json` file.
To run the server from the project directory enter the command:
```
nodemon controllers/server.js
```
The `controllers/server.js` is the path to the server file. (you could use `node` instead of `nodemon`).
> For your convenience, a batch file to start the server is also included in the project, Just launch `start.bat`  and the server should be ready!

If for some reason you encounter an error for a missing package - please install it specifically by entering the line: `npm install package_name`.
You can use the flag `-g` to install it globally on your machine.

When the server is up and running you may navigate to the webapp on the address `localhost:8080`.

In order to shut down the server, press `Ctrl + C` in the terminal of the running server.

## Usage
As the client, navigate to `localhost:8080` using the browser. Enter the csv files and choose type of detector (only CSV
files will be accepted). Also, both csv files' first line must contain the names of the features (columns).
Press on the `Submit!` button and get the results in the frame below.
 > IMPORTANT: The csv files must be encoded with new line of `\n`. If your files are encoded otherwise, please convert
> them before you upload them. Alternatively you can change the code in the `models/csv_parser.js` to support other encodings.

You may also send a manual HTTP-POST request to the url `localhost:8080` and get the results via JSON response. In this case,
the data must be sent in FormData.


## Requirements

* Node.js (developed and tested with v14.16.1)  
* Installed packaged through npm:
    * express
    * express-fileupload
    * node-fetch
    * node-json2html
    * nodemon
    * smallest-enclosing-circle
    * upload
    * body-parser
    * form-data
    * n-readlines
    * path
    
See [Starting The Server Side](#starting-the-server-side) for more information on how to install them all.

## Program Structure

The project uses the design pattern of MVC.
Our code files are organized in 3 folders:
* `views` folder contains the main html `index.html`,`results.html` where the results are injected, and dedicated html 
  files for errors. Also, another css folder with 2 css files (`dark.css` for dark theme and `light.css` for light theme).
  To change between the two themes you must do it manually on each html file in the views' folder.
* `models` folder contains `csv_parser.js` which is responsible for parsing the csv data, learn the data and detect
  the anomalies using the models of the algorithms in the folder `detector`.
* `controllers` contains the `server.js` file which responsible to connect between the view and the models.

The two web app features use the same code. The core of the application, where the learning and detection are performed,
is in function that handles the case of '/' POST request, which is responded by a JSON containing the results.
The HTML page with the `Submit!` button performs a POST request to '/detect', and the function that handles this case 
utilises the existing code by creating a fetch request to '/'.

Full UML PDF can be found within the project and a picture in the [Screenshots](#screenshots) below.

## Video Demo
 
[Watch here](https://youtu.be/aPOpYeg4YPg)


## Authors

* [Stav Lidor](https://github.com/stavLidor)
* [Liron Haim](https://github.com/LironHaim15)

## Screenshots

### Home Screen (dark)
<img src="https://github.com/LironHaim15/anomalies_detection_web_app/blob/master/screenshots/dark_empty.jpg" alt="Home Screen"/>

### Anomalies Result Screen (dark)
<img src="https://github.com/LironHaim15/anomalies_detection_web_app/blob/master/screenshots/dark_ano.jpg" alt="Anomalies Result Screen"/>

### Home Screen (light)
<img src="https://github.com/LironHaim15/anomalies_detection_web_app/blob/master/screenshots/light_ano.jpg" alt="Home Screen"/>

### UML
<img src="https://github.com/LironHaim15/anomalies_detection_web_app/blob/master/screenshots/UML.png" alt="UML"/>
