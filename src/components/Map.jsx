import React, { useEffect, useState } from 'react'
import styles from './Map.module.css'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet'
import { useCities } from '../contexts/CitiesContext'

export const Map = () => {
    const { cities } = useCities()

    const [mapPosition, setMapPosition] = useState([38.727881642324164, -9.140900099907554])
    const [searchParams, setSearchParams] = useSearchParams()
    const lat = searchParams.get("lat")
    const lng = searchParams.get("lng")

    useEffect(() => {
        if (lat && lng) {
            setMapPosition([lat, lng])

        }

    }, [lat, lng])


    return (
        <div className={styles.mapContainer}    >

            <MapContainer className={styles.map} center={mapPosition} zoom={13} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />


                {cities.map(city => (<Marker key={city.id} position={[city.position.lat, city.position.lng]} > <Popup> {city.notes} </Popup>   </Marker>))}

                <ChangeCenter position={mapPosition} />

                <DetectClick />
            </MapContainer>

        </div>
    )
}


function ChangeCenter({ position }) {
    const map = useMap()
    map.setView(position);
    return null
}


function DetectClick() {
    const navigate = useNavigate()
    useMapEvents({
        click: (e) => {
            console.log(e)
            navigate("form?lat=" + e.latlng.lat + "&lng=" + e.latlng.lng + "")
        },
    })
    return null
}