# What's is this?
Provides a few tools for working with AsyncStorage is become more convenient.

**Why React Native Asyncstorage Helpers?**
- **Supports all types of data:** Not only "string" data, you can get or save multi-types of data. Such as int, float, object ...
- **Default data:** Supports get all values with default data. Some values are undefined, you can setup default value for them.  

# Installation

First of all, you will have to add dependence to your application.
Source can be loaded via [npm](https://www.npmjs.com/package/react-native-asyncstorage-helpers) or [downloaded](https://github.com/quangdh/react-native-asyncstorage-helpers.git) from this repo.
```
# npm package
# npm install --save react-native-asyncstorage-helpers
```

# Usage

I would recommend to create a separate file called AsyncStorageConfig.js where we will keep configuration for your storage map.
```
/
 - AsyncStorageConfig.js
 - index.js
```
and content of AsyncStorageConfig.js will look like: 
```
import AsyncStorageHelper from "react-native-asyncstorage-helpers";

AsyncStorageHelper.init({
    "KEY_1": DEFAULT_VALUE_1,
    "KEY_2": DEFAULT_VALUE_2,
    "KEY_3": DEFAULT_VALUE_3,
    ...
});

AsyncStorageHelper.use("APP_STORAGE_NAME");

```

Continue, you need import file AsyncStorageConfig.js in file index.js

```
import "./AsyncStorageConfig"
```

# Methods

**get()**
```
async AsyncStorageHelper.get(KEY_1 : string);
```
Fetches an item for a key and returns a Promise object. If result is undefined, this function will return default value what is defined in file AsyncStorageConfig.js.

**getKeys()**
```
async AsyncStorageHelper.getKeys();
```
Gét all keys known and returns a Promise object. If one of results is undefined, this function will return default value what is defined in file AsyncStorageConfig.js.

**set()**
```
async AsyncStorageHelper.set(KEY_1 : string, value : any);
```
Sets the value for a key and returns a Promise object.

**clear()**

```
async AsyncStorageHelper.clear();
```

This function is the same the native function. Erases all AsyncStorage for all clients, libraries, etc. Returns a Promise object.

