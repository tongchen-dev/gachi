export type Extra<T,U> = T extends Record ? {
    [P in keyof U]: U[P]
} & T : {
    [k in keyof T]: T[k] extends Record ? {
        [P in keyof U]: U[P]
    } : T[k];
}