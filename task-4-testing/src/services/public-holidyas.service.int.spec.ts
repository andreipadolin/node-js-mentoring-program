import {
  getListOfPublicHolidays,
  checkIfTodayIsPublicHoliday,
  getNextPublicHolidays,
} from "./public-holidays.service";

describe("Integration tests for public-holidays.service", () => {
  test("getListOfPublicHolidays should return an array of PublicHolidayShort", async () => {
    const year = 2024;
    const country = "GB";
    const result = await getListOfPublicHolidays(year, country);

    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: expect.any(String),
          localName: expect.any(String),
          date: expect.any(String),
        }),
      ])
    );
  });

  test("checkIfTodayIsPublicHoliday should return a boolean", async () => {
    const country = "GB";
    const result = await checkIfTodayIsPublicHoliday(country);

    expect(typeof result).toBe("boolean");
  });

  test("getNextPublicHolidays should return an array of PublicHolidayShort", async () => {
    const country = "GB";
    const result = await getNextPublicHolidays(country);

    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: expect.any(String),
          localName: expect.any(String),
          date: expect.any(String),
        }),
      ])
    );
  });
});
