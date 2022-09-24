export type Option<T> = {
    _isOption: boolean;
    value: {
        [k in keyof T]: T[k];
        [x:string]: any;
    }
}