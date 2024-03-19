import axios from "axios";

const NAGER_DATE_API_URL = "https://date.nager.at/api/v3";

describe("End-to-end: Nager.Date API", () => {
  test("GET /NextPublicHolidays/{countryCode} returns the next public holidays for the selected country", async () => {
    const countryCode = "GB";

    const response = await axios.get(
      `${NAGER_DATE_API_URL}/NextPublicHolidays/${countryCode}`
    );

    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
    expect(response.data.length).toBeGreaterThan(0);
  });

  test("GET /Version returns api version", async () => {
    const response = await axios.get(`${NAGER_DATE_API_URL}/Version`);
    console.log("response.data :>> ", response.data);
    expect(response.status).toBe(200);
    expect(response.data.name).toBe("Nager.Date");
    expect(response.data.version).toBeTruthy();
  });
});
