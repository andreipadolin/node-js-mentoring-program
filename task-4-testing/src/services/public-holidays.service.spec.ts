import axios from "axios";
import {
  getListOfPublicHolidays,
  checkIfTodayIsPublicHoliday,
  getNextPublicHolidays,
} from "./public-holidays.service";
import { validateInput, shortenPublicHoliday } from "../helpers";
import { PublicHoliday, PublicHolidayShort } from "../types";
import { PUBLIC_HOLIDAYS_API_URL } from "../config";

jest.mock("axios");
jest.mock("../helpers", () => ({
  validateInput: jest.fn(),
  shortenPublicHoliday: jest.fn(),
}));

describe("getListOfPublicHolidays", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should return an array of PublicHolidayShort", async () => {
    const year = 2024;
    const country = "US";
    const mockPublicHolidays: PublicHoliday[] = [
      {
        date: "2024-05-01",
        localName: "Labor day",
        name: "Labor day",
        countryCode: "BY",
        fixed: true,
        global: true,
        counties: ["BY", "US", "UK"],
        launchYear: 1950,
        types: ["type1", "type2"],
      },
    ];
    const mockShortenedHolidays: PublicHolidayShort[] = [
      {
        name: "Labor day",
        localName: "Labor day",
        date: "2024-05-01",
      },
    ];

    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({
      data: mockPublicHolidays,
    });
    (
      shortenPublicHoliday as jest.MockedFunction<typeof shortenPublicHoliday>
    ).mockReturnValue(mockShortenedHolidays[0]);

    const result = await getListOfPublicHolidays(year, country);

    expect(validateInput).toHaveBeenCalledWith({ year, country });
    expect(result).toEqual(mockShortenedHolidays);
  });
});

describe("checkIfTodayIsPublicHoliday", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should return true if today is a public holiday", async () => {
    const country = "PL";
    const expectedStatus = 200;

    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({
      status: expectedStatus,
    });

    const result = await checkIfTodayIsPublicHoliday(country);

    expect(result).toBe(true);
    expect(axios.get).toHaveBeenCalledWith(
      `${PUBLIC_HOLIDAYS_API_URL}/IsTodayPublicHoliday/${country}`
    );
    expect(validateInput).toHaveBeenCalledWith({ country });
  });
});

describe("getNextPublicHolidays", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should return an array of PublicHolidayShort", async () => {
    const country = "US";
    const mockPublicHolidays = [
      {
        date: "2024-05-01",
        localName: "Labor day",
        name: "Labor day",
        countryCode: "BY",
        fixed: true,
        global: true,
        counties: ["BY", "US", "UK"],
        launchYear: 1950,
        types: ["type1", "type2"],
      },
    ];
    const mockShortenedHolidays = [
      {
        name: "Labor day",
        localName: "Labor day",
        date: "2024-05-01",
      },
    ];

    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({
      data: mockPublicHolidays,
    });
    (
      shortenPublicHoliday as jest.MockedFunction<typeof shortenPublicHoliday>
    ).mockReturnValue(mockShortenedHolidays[0]);

    const result = await getNextPublicHolidays(country);

    expect(result).toEqual(mockShortenedHolidays);
    expect(axios.get).toHaveBeenCalledWith(
      `${PUBLIC_HOLIDAYS_API_URL}/NextPublicHolidays/${country}`
    );
    expect(validateInput).toHaveBeenCalledWith({ country });
    expect(shortenPublicHoliday).toHaveBeenCalledWith(mockPublicHolidays[0]);
  });

  test("should return an empty array if an error occurs", async () => {
    const country = "US";
    const errorMessage = "Error";

    (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValue(
      new Error(errorMessage)
    );

    const result = await getNextPublicHolidays(country);

    expect(result).toEqual([]);
    expect(axios.get).toHaveBeenCalledWith(
      `${PUBLIC_HOLIDAYS_API_URL}/NextPublicHolidays/${country}`
    );
    expect(validateInput).toHaveBeenCalledWith({ country });
    expect(shortenPublicHoliday).not.toHaveBeenCalled();
  });
});
