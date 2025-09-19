/**
 * An experiment to describe a sequence of operations clearly, without exposing intermediary variables to scope:
 * @example
 * new Chain(known + unknown)
 * 	.then((total) => Math.max(total, 1))
 * 	.then((total) => known / total)
 * 	.then((ratio) => ratio * 100)
 * 	.then((percentage) => percentage.toFixed(2)).result
 */
export class Chain<T> {
	result: T;

	constructor(initValue: T) {
		this.result = initValue;
	}

	// biome-ignore lint/suspicious/noThenProperty: literally an experiment about this
	then<U>(func: (value: T) => U): Chain<U> {
		return new Chain<U>(func(this.result));
	}
}
