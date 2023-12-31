import React, { useState } from 'react'
import styles from './Map.module.css'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useCities } from '../contexts/CitiesContext'
export const Map = () => {
    const { cities } = useCities()
    const navigate = useNavigate()
    const [mapPosition, setMapPosition] = useState([38.727881642324164, -9.140900099907554])
    const [searchParams, setSearchParams] = useSearchParams()
    const lat = searchParams.get("lat")
    const lng = searchParams.get("lng")
    console.log(cities)
    return (
        <div className={styles.mapContainer} onClick={() => navigate("form")}   >

            <MapContainer className={styles.map} center={mapPosition} zoom={13} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />


                {cities.map(city => (<Marker key={city.id} position={[city.position.lat, city.position.lng]} > <Popup> {city.notes} </Popup>   </Marker>))}

            </MapContainer>

        </div>
    )
}
{/* <Marker position={mapPosition}>
<Popup>
    A pretty CSS3 popup. <br /> Easily customizable.
</Popup>
</Marker> */}