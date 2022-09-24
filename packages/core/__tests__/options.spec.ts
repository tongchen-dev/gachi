import {toOption, toRequestOption} from '../src/option/index';
describe('options', ()=>{
	it('values', ()=>{
		expect(toOption(-1).value).toBe(-1);
		expect(toOption(0).value).toBe(0);
		expect(toOption(1).value).toBe(1);
		expect(toOption(true).value).toBe(true);
		expect(toOption(false).value).toBe(false);
		expect(toOption({}).value).toStrictEqual({});
		expect(toOption([]).value).toStrictEqual([]);
		expect(toOption({a: 1}).value).toStrictEqual({a: 1})
		expect(toOption([1]).value).toStrictEqual([1]);
	})
})