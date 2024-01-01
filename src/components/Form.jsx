// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import styles from "./Form.module.css";
import Button from "./Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useUrlPosition } from "../hooks/useUrl.Position";
import Message from "./Message";
import Spinner from "./Spinner";
import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../contexts/CitiesContext";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}
export default function Form() {

  const [emoji, setEmoji] = useState("");
  const navigate = useNavigate();
  const { createCity, isLoading } = useCities();
  const [lat, lng] = useUrlPosition()
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isLoadingGeoLocation, setIsLoadingGeoLocation] = useState(false);
  const [geoCodignError, setGeoCodignError] = useState("");

  const handleBackClick = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cityName || !date) return;
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: {
        lat,
        lng
      }
    }
    await createCity(newCity);
    navigate("/app/cities");
  }

  useEffect(() => {

    if (!lat && !lng) return;
    async function getCityName() {
      try {
        setGeoCodignError("");
        setIsLoadingGeoLocation(true);
        const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`);
        const data = await res.json();

        if (!data.countryCode) throw new Error("That doesn't seem to be a city. Click somewhere else 😉")

        setCityName(data.city || data.locality || "");
        setCountry(data.countryName || "");
        setEmoji(convertToEmoji(data.countryCode));



      } catch (error) {
        setGeoCodignError(error.message);

      } finally {
        setIsLoadingGeoLocation(false);
      }
    }
    getCityName();

  }, [lat, lng]);

  if (isLoadingGeoLocation) return <Spinner />;
  if (!lat && !lng) return <Message type='error' > You need to select a location first </Message>
  if (geoCodignError) return <Message type='error' > {geoCodignError} </Message>
  return (
    <form className={`${styles.form}  ${isLoading ? styles.loading : ""}`} onSubmit={handleSubmit}  >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}> {emoji} </span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker id="date" onChange={date => setDate(date)} selected={date} dateFormat='dd/MM/yyyy' />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type='primary'>Save</Button>
        <Button type='back' onClick={handleBackClick}>&larr; Back</Button>
      </div>
    </form>

  );
}
