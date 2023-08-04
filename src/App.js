import React, { useEffect, useMemo } from "react";
import { sortBy } from "lodash";
import CountrySelector from "./components/CountrySelector";
import { getCountries, getReportByCountry } from "./components/apis";
import Summary from "./components/Summary";
import Highlight from "./components/Highlight";
import { Container, Typography } from "@material-ui/core";
import "@fontsource/roboto";
import moment from "moment";
import "moment/locale/vi";

moment.locale("vi");

const App = () => {
  const [countries, setCountries] = React.useState([]);
  const [selectedISO, setISO] = React.useState("");
  const [selectedISO3, setISO3] = React.useState("");
  const [report, setReport] = React.useState([]);
  const [date, setDate] = React.useState();

  useEffect( () => {
    getCountries().then((res) => {
      const { data } = res;
      const countries = sortBy(data.country, "name");
      setCountries(countries);
      setISO("vn");
      setISO3("vnm");
    });
  }, []);
  const handleOnChange = React.useCallback((e) => {
    setISO3(e.target.options[e.target.selectedIndex].id);
    setISO(e.target.value);
  }, []);

  useEffect(() => {
    if (selectedISO3) {
      getReportByCountry(selectedISO3, date).then((res) => {
        setReport(res.data.data);
      });
    }
  }, [selectedISO3, countries, date]);

  const summary = useMemo(() => {
    if (report && report.length) {
      const latestData = report[report.length - 1];
      return [
        {
          title: "Số ca nhiễm",
          count: latestData.confirmed || 0,
          type: "confirmed",
        },
        {
          title: "Khỏi",
          count: latestData.recovered || latestData.active || 0,
          type: "recovered",
        },
        {
          title: "Tử vong",
          count: latestData.deaths || 0,
          type: "death",
        },
      ];
    }
    return [];
  }, [report]);

  return (
    <Container style={{ marginTop: 20 }}>
      <Typography variant="h2" component="h2">
        Số liệu COVID-19
      </Typography>
      <Typography>{moment().format("LLL")}</Typography>
      <CountrySelector
        handleOnChange={handleOnChange}
        countries={countries}
        value={selectedISO}
      />
      <Highlight summary={summary} />
      <Summary countryId={selectedISO} report={report} setDate={setDate} />
    </Container>
  );
};

export default App;
