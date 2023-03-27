import {
	useFirstNameValidation,
	usePasswordValidation,
} from "../firebase/auth";

const testStateFunc = (input) => {};

describe("測試 useFirstNameValidation", () => {
	test("正常輸入，要回傳 true", () => {
		expect(useFirstNameValidation("John", testStateFunc)).toBe(true);
	});

	test("空字串，要回傳 false", () => {
		expect(useFirstNameValidation("", testStateFunc)).toBe(false);
	});
});

describe("測試 usePasswordValidation", () => {
	test("正常輸入，要回傳 true", () => {
		expect(usePasswordValidation("123456", testStateFunc)).toBe(true);
	});

	test("空字串，要回傳 false", () => {
		expect(usePasswordValidation("", testStateFunc)).toBe(false);
	});

	test("輸入少於六個字，要回傳 false", () => {
		expect(usePasswordValidation("1234", testStateFunc)).toBe(false);
	});
});
