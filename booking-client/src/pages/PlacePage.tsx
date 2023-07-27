import {useParams} from 'react-router-dom'
import {useEffect, useState} from 'react'
import axios from 'axios'
import BookingWidget from '../components/BookingWidget.tsx'
import {PlaceInterface} from "../interface/Place.ts";
import PlaceGallery from "../components/PlaceGallery.tsx";
import AddressLink from "../components/AddressLink.tsx";

const PlacePage = () => {
    const {id} = useParams()
    const [place, setPlace] = useState<PlaceInterface>(null)
    useEffect(() => {
        if (!id) return

        axios
            .get(`/places/${id}`)
            .then((response) => {
                setPlace(response.data)
            })
            .catch((err) => {
                throw err
            })
    }, [id])

    if (!place) return ''


    return (
        <div className="mt-5 pt-8 -mx-8  bg-gray-100">
            <h1 className="text-3xl">{place.title}</h1>
            <AddressLink address={place.address}/>
            <PlaceGallery place={place}/>
            <div className="mt-8 gap-8 grid grid-cols-1 mb-8 px-4 md:grid-cols-[2fr_1fr]">
                <div>
                    <div className="my-4">
                        <h2 className="font-semibold text-2xl">Description</h2>
                        {place.description}
                    </div>
                    Check-in: {place.checkIn} <br/>
                    Check-out: {place.checkOut} <br/>
                    Max number of guests: {place.maxGuests}

                </div>
                <div>
                    <BookingWidget place={place}/>
                </div>
            </div>
            <div className="bg-white px-8 py-8 border-t">
                <div className="my-4">
                    <h2 className="font-semibold text-2xl">Extra info</h2>
                </div>
                <div className="text-sm text-gray-700 leading-5 my-4">{place.extraInfo}</div>
            </div>
        </div>
    )
}

export default PlacePage
