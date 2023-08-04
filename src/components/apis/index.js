import axios from "axios";
import moment from "moment";

export const getCountries = () => {
  const options = {
    method: "GET",
    url: "https://country-list5.p.rapidapi.com/countrylist/",
    headers: {
      "X-RapidAPI-Key": "2d6914f529msh1428a59d17ec56cp1e9b91jsn93acb72061d5",
      "X-RapidAPI-Host": "country-list5.p.rapidapi.com",
    },
  };
  return axios.request(options);
};

export const getReportByCountry = (iso3, date) => {
  const options = {
    method: "GET",
    url: "https://covid-19-statistics.p.rapidapi.com/reports",
    params: {
      iso: iso3,
      date: date,
    },
    headers: {
      "X-RapidAPI-Key": "2d6914f529msh1428a59d17ec56cp1e9b91jsn93acb72061d5",
      "X-RapidAPI-Host": "covid-19-statistics.p.rapidapi.com",
    },
  };
  return axios.request(options);
  // axios.get(
  //   `https://api.covid19api.com/dayone/country/${slug}?from=2021-01-01T00:00:00&to=${moment()
  //     .utc(0)
  //     .format()}`
  // );
};

export const getMapDataByCountryId = (countryId) =>
  import(
    `@highcharts/map-collection/countries/${countryId}/${countryId}-all.geo.json`
  );
