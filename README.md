# debug-proxy

Simple debugging proxy with [hoxy](https://github.com/greim/hoxy).


## Usage

You can specify config as json object or array in a .json file:  

```js
[
    {
        "phase": "request",
        "hostname": "example.org",
        "url": "/scripts/*.js",
        "strategy": "overlay",
        "docroot": "/path/to/local/project"
    },
    // etc.
]

```  

Mentioned options in config are, in fact, options of **hoxy**, so they have the same format.  
Then you can run proxy as next:
```sh
$ npm start -- --config /path/to/config.json --port PORT
```
or
```sh
$ node debug-proxy --config /path/to/config.json --port PORT
```
