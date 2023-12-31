import {Link, useParams} from 'react-router-dom'
import AccountNav from '../components/AccountNav.tsx'
import {useEffect, useState} from 'react'
import axios from 'axios'
import PlaceImg from "../components/PlaceImg.tsx";

const PlacesPage = () => {
    const [places, setPlaces] = useState([])

    useEffect(() => {
        axios.get('/user-places').then(({data}) => {
            setPlaces(data)
        })
    }, [])
    return (
        <div className="flex flex-col items-center">
            <AccountNav/>
            <div className="text-center w-10/12 ">
                <Link
                    className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full text-center"
                    to={'/account/places/new'}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4.5v15m7.5-7.5h-15"
                        />
                    </svg>
                    Add new place
                </Link>
                <div className="mt-4 w-full">
                    {places.length > 0 &&
                        places.map((place: any) => (
                            <Link
                                to={`/account/places/${place._id}`}
                                className="bg-gray-100 my-4  p-4 rounded-2xl flex cursor-pointer"
                            >
                                <div className="flex w-32 h-32 bg-gray-300 shrink-0">
                                    <PlaceImg place={place}/>
                                </div>
                                <div className="grow-0 shrink">
                                    <h2 className="text-xl">{place.title}</h2>
                                    <p className="text-sm mt-2 ">
                                        {place.description}
                                    </p>
                                </div>
                            </Link>
                        ))}
                </div>
            </div>
        </div>
    )
}
export default PlacesPage
