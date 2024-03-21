import { validateInput, shortenPublicHoliday } from "./helpers";
import { SUPPORTED_COUNTRIES } from "./config";
import { PublicHoliday, PublicHolidayShort } from "./types";

describe("validateInput: ", () => {
  test("should return true when valid input", () => {
    const input = {
      year: new Date().getFullYear(),
      country: SUPPORTED_COUNTRIES[0],
    };
    expect(validateInput(input)).toBe(true);
  });

  test("should throw error when invalid country", () => {
    const input = {
      year: new Date().getFullYear(),
      country: "Invalid Country Name",
    };
    expect(() => validateInput(input)).toThrow(
      `Country provided is not supported`
    );
  });

  test("should throw error when invalid year is provided", () => {
    const input = {
      year: new Date().getFullYear() + 1,
      country: SUPPORTED_COUNTRIES[0],
    };
    expect(() => validateInput(input)).toThrow(`Year provided not the current`);
  });
});

describe("shortenPublicHoliday ", () => {
  test("should return a shortened version of PublicHoliday", () => {
    const holiday: PublicHoliday = {
      date: "2024-12-25",
      localName: "Independence day local",
      name: "Independence day",
      countryCode: "KZ",
      fixed: true,
      global: false,
      counties: null,
      launchYear: 1935,
      types: ["type1", "type2"],
    };
    const expected: PublicHolidayShort = {
      name: "Independence day",
      localName: "Independence day local",
      date: "2024-12-25",
    };
    expect(shortenPublicHoliday(holiday)).toEqual(expected);
  });
});
