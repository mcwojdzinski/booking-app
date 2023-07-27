import {useEffect, useState} from "react";
import axios from "axios";

const IndexPage = () => {
    const [places, setPlaces] = useState([])

    useEffect(() => {
        axios.get('/places').then(response => {
            setPlaces(response.data)
        }).catch(err => {
            throw err
        })
    }, [])

    return <div
        className="mt-8 grid gap-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">{places.length > 0 && places.map(place => (
        <div>
            <div className="bg-gray-500 rounded-2xl flex mb-2"> {place.photos?.[0] && (
                <img className="rounded-2xl object-cover aspect-square"
                     src={`http://localhost:4000/uploads/${place.photos?.[0]}`}/>
            )}</div>
            <h2 className="font-semibold truncate">{place.title}</h2>
            <h3 className="text-sm text-gray-500">{place.address}</h3>
            <div className="mt-2">
                <span className="font-bold">${place.price}</span> per night
            </div>
        </div>
    ))}</div>
}

export default IndexPage
