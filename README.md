#Getting started

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