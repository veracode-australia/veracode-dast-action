import { InputOptions } from '@actions/core';
type GetInput = (name: string, options?: InputOptions | undefined) => string;
export type Inputs = {
    vid: string;
    vkey: string;
};
export declare const parseInputs: (getInput: GetInput) => Inputs;
export {};
