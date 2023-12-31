import React, { useEffect, useState } from 'react'
import styles from './Map.module.css'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet'
import { useCities } from '../contexts/CitiesContext'
import { useGeolocation } from '../hooks/useGeolocation'
import Button from './Button'
import { useUrlPosition } from '../hooks/useUrl.Position'

export const Map = () => {
    const { cities } = useCities()
    const { isLoading: isLoadingPosition, position: geoLocation, getPosition } = useGeolocation()

    const [mapPosition, setMapPosition] = useState([38.727881642324164, -9.140900099907554])


    const [lat, lng] = useUrlPosition()
    useEffect(() => {
        if (lat && lng) {
            setMapPosition([lat, lng])

        }

    }, [lat, lng])

    useEffect(() => {

        if (geoLocation) {
            setMapPosition([geoLocation.lat, geoLocation.lng])
        }

    }, [geoLocation])

    return (
        <div className={styles.mapContainer}    >
            {!geoLocation && <Button type='position' onClick={getPosition} >  {isLoadingPosition ? "Loading" : "Use yout position"}      </Button>}


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

            navigate("form?lat=" + e.latlng.lat + "&lng=" + e.latlng.lng + "")
        },
    })
    return null
}