# CSV_Converter

The project implements a CSV to JSON converter API using Express.js. The API takes a CSV file as input, converts its contents to JSON format, and uploads the data into a PostgreSQL database. Additionally, it calculates the age distribution of all users and prints a distribution report in the console.

Getting Started

To get a local copy up and running follow these simple steps.

Prerequisites
. Node.js
. PostgreSQL

Installation

1. Clone the repo
   git clone https://github.com/yourusername/csv-to-json-converter.git

2. Install npm packages
   npm install

3. Set up your PostgreSQL database and configure the connection in 'dbconfig.js'

Usage

1. Start the server
   npm start

2. Make HTTP get request to `http://localhost:5000/convert` with a csv file in the same project folder.
   (You can make use of the demo_dataset already provided)

3. See the results in the console

Assumptions
.The CSV file follows the specified format with the first line containing property labels.
.Each record in the CSV file contains at least name.firstName, name.lastName, and age fields.
