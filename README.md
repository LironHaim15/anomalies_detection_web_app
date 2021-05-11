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
  algorithm: `simepl` or `hybrid`. Get a JSON response containing the results.

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

If for some reason you encounter an error for a missing package - please install it specifically by entering the line: `npm install package_name`.
You can use the flag `-g` to install it globally on your machine.

When the server is up and running you may navigate to the webapp on the address `localhost:8080`.

## Usage
As the client, navigate to `localhost:8080` using the browser. Enter the csv files and choose type of detector.
Press on the `Submit!` button and get the results in the frame below.

You may also send a manual HTTP-POST request to the url `localhost:8080` and get the results via JSON response.


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
    
See [Starting The Server Side](#starting-the-server-side) for more information on how to install them all.

## Program Structure

The project uses the design pattern of MVC.
Our code files are organized in 3 folders:
* `views` folder contains the main html `index.html` and another css folder with 2 css files (`dark.css` for dark theme and `light.css` for light theme).
  To change between the two themes you must do it manually on `index.html` and also in `server.js` - change the `theme`
   variable to light or dark.
* `models` folder contains `csv_parser.js` which responsible for parsing the csv data, learn the data and detect
  the anomalies using the models of the algorithms in the folder `detector`.
* `controllers` contains the `server.js` file which responsible to connect between the view and the models.

Full UML PDF can be found within the project.

## Video Demo

[Watch here](https://youtu.be/58-n3c-bOTY) ????????????????????????????


## Authors

* [Stav Lidor](https://github.com/stavLidor)
* [Liron Haim](https://github.com/LironHaim15)

## Screenshots

### FlightGear Launcher in Settings Window
[![FlightGear Launcher in Settings window](\screenshots\FGWindow.jpg "FGWindow.jpg")](https://ibb.co/gDmnK1v)

