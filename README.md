#Getting started

##Description
This is a command line tool which is able to search for the most highly ranked developers by city location.

##Issues faced
To make the tool more flexible I decided to allow optional parameters to determine number of top developers and which language to search. Then, I discovered that I could not search for c++ with the library node-github which I was using as a client for the Github API. As a simple solution to make better usage of the time I had, I decided to bring the library into this project and make the fix I needed in order to be able to search for languages with the parameter separator "+".

##Steps:

1. npm install
2. Setup .env file with appropriate github token
3. Follow running instructions

##Running:
1. ./bin/most-ranked-devs.js -h - For Help
2. ./bin/most-ranked-devs.js <city> [options] - Most common usage
3. options:
  1. <city> **Select a city to search for most highly ranked developers by city**
  2. -n, --number [number] **Select number for top users**
  3. -l, --language [language] **Select an alternative programming language** 

##Running as global module
1. **It is also possible to install as a global package with `npm install -g .`**
2. most-ranked-devs -h **For Help**
3. most-ranked-devs <city> [options] **Most common usage**
4. npm uninstall -g most-ranked-devs **Uninstalling**

##Default options (If no parameters are passed)

1. language=JavaScript
2. number=3
3. location=Ulm