import { AsyncStorage } from "react-native";
import {
    pipe,
    reject,
    fromPairs,
    anyPass,
    isNil,
    isEmpty,
    keys,
    map,
    reduce,
    replace
} from "ramda";

const isNilOrEmpty = anyPass([isNil, isEmpty]);

export function registerKeys(keys) {
    if (isNilOrEmpty(keys)) throw new Error("valid keys are required");
    return pipe(
        reject(isNilOrEmpty),
        map(x => [x, x]),
        fromPairs
    )(keys);
}

const build = () => {
    //KEYS
    var KEYS = {};
    //DEFAULT_VALUE
    var DEFAULT_VALUE = {};

    var LOCAL_STORAGE = "LOCAL_STORAGE";

    function init(initalState) {
        if (isNilOrEmpty(initalState))
            throw new Error("valid initalState are required");
        //SAVE DEFAULT VALUE
        DEFAULT_VALUE = initalState;
        //Save KEYS
        KEYS = pipe(
            keys,
            reject(isNilOrEmpty),
            map(x => [x, x]),
            fromPairs
        )(initalState);
    }

    function use(localStorage) {
        LOCAL_STORAGE = localStorage;
    }

    function getKeys() {
        return pipe(
            keys,
            map(x => `@${LOCAL_STORAGE}:${x}`)
        )(KEYS);
    }

    async function getStore() {
        let data = await AsyncStorage.multiGet(getKeys());
        if (data != null) {
            return reduce(
                (acc, elm) => {
                    if (elm && elm[0] && elm[1]) {
                        let key = replace(`@${LOCAL_STORAGE}:`, "", elm[0]);
                        let obj = JSON.parse(elm[1]);
                        acc[key] = obj["data"];
                    }
                    return acc;
                },
                DEFAULT_VALUE,
                data
            );
        }
        return DEFAULT_VALUE;
    }

    async function set(key, value) {
        try {
            await AsyncStorage.setItem(
                `@${LOCAL_STORAGE}:${key}`,
                JSON.stringify({ data: value })
            );
            return true;
        } catch (error) {
            return false;
        }
    }

    async function get(key) {
        let value = await AsyncStorage.getItem(`@${LOCAL_STORAGE}:${key}`);
        if (value != null) {
            let obj = JSON.parse(value);
            if (obj && obj["data"]) return obj["data"];
        }
        return DEFAULT_VALUE[key];
    }

    async function clear() {
        try {
            await AsyncStorage.clear();
            return true;
        } catch (error) {
            return false;
        }
    }

    return {
        use,
        registerKeys,
        init,
        getStore,
        set,
        get,
        clear
    };
};
export default build();
