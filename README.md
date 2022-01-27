#pre-requisites
node_version >= 16.3
npm

#install all dependencies
npm -i
#start project
npm start

#run findServer
address:port/findServer 

sample post data
[
    {
        "url": "http://doesNotExist.boldtech.co",
        "priority": 1
    },
    {
        "url": "http://boldtech.co",
        "priority": 7
    },
    {
        "url": "http://offline.boldtech.co",
        "priority": 2
    },
    {
        "url": "http://google.com",
        "priority": 4
    }
]
