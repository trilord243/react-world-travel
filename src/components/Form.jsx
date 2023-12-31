// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useUrlPosition } from "../hooks/useUrl.Position";
import Message from "./Message";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {

  const navigate = useNavigate();

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



  useEffect(() => {
    async function getCityName() {
      try {
        setGeoCodignError("");
        setIsLoadingGeoLocation(true);
        const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`);
        const data = await res.json();

        if (!data.countryCode) throw new Error("That doesn't seem to be a city. Click somewhere else 😉")

        setCityName(data.city || data.locality || "");
        setCountry(data.countryName || "");



      } catch (error) {
        setGeoCodignError(error.message);

      } finally {
        setIsLoadingGeoLocation(false);
      }
    }
    getCityName();

  }, [lat, lng]);


  if (geoCodignError) return <Message type='error' > {geoCodignError} </Message>
  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}></span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
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

export default Form;
