nodefb
======

my repo to test and create my facebook node.js apps

1. git clone https://github.com/rajatgupta431/nodefb.git
2. npm install
3. replace app keys with yours in the app.js file 
4. in the /members and /feeds routes in the app.js file , replace the group id with the required group ID 
5. run the app at port 3000

Instructions :
===============
1. Lines 137 and 176 should be edited to mention the required group ID 

2. Each time the script is Ran , the feeds.json and members.json file should be deleted , otherwise the new content gets appended to the end of the file , retaining the previous content. 

Instructions for Messages Part:
===============================
1. Code for inbox starts at line 185 in app.js
2. After every 6 request by the app (ie. 6*50=300 requests for api , as we fetch 50 message threads per request) , a timeout of 8 minutes is set .
3. For SEND message , please edit line 10 with your AppID in /views/index.js file .
Note: Delete the json files apart from package.json , before you run the script .
Have Fun
That's all !!! , the script is ready :)
