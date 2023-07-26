import PhotosUploader from '../components/PhotosUploader.tsx'
import Perks from '../components/Perks.tsx'
import {FormEvent, useEffect, useState} from 'react'
import axios from 'axios'
import AccountNav from '../AccountNav.tsx'
import {Navigate, useParams} from 'react-router-dom'

const PlacesFormPage = () => {
    const {id} = useParams()
    console.log(id)
    const [title, setTitle] = useState<string>('')
    const [address, setAddress] = useState<string>('')
    const [addedPhotos, setAddedPhotos] = useState([])
    const [description, setDescription] = useState<string>('')
    const [perks, setPerks] = useState([])
    const [extraInfo, setExtraInfo] = useState<string>('')
    const [checkIn, setCheckIn] = useState<string>('')
    const [checkOut, setCheckOut] = useState<string>('')
    const [maxGuests, setMaxGuests] = useState<number>(1)
    const [redirect, setRedirect] = useState<boolean>(false)

    useEffect(() => {
        if (!id) {
            return;
        }

        axios.get(`/places/${id}`).then(response => {
            const {data} = response;
            setTitle(data.title);
            setAddress(data.address);
            setAddedPhotos(data.photos);
            setDescription(data.description);
            setPerks(data.perks);
            setExtraInfo(data.extraInfo);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setMaxGuests(data.maxGuests);

        }).catch(err => {
            throw err
        })
    }, [id])
    const inputHeader = (inputTitle: string) => {
        return <h2 className="text-xl mt-4">{inputTitle}</h2>
    }
    const inputDescription = (inputDescription: string) => {
        return <p className="text-gray-500 text-sm">{inputDescription}</p>
    }

    const preInput = (header: string, description: string) => {
        return (
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        )
    }

    const savePlace = async (ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault()
        const placeData = {
            title,
            address,
            addedPhotos,
            description,
            perks,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests,
        }
        if (id) {
            await axios.put('/places', {id, ...placeData})
            setRedirect(true)
        } else {
            await axios.post('/places', placeData)
            setRedirect(true)
        }
    }

    if (redirect) {
        return <Navigate to={'/account/places'}/>
    }

    return (
        <div className="flex flex-col justify-center items-center">
            <AccountNav/>
            <form className="w-10/12" onSubmit={savePlace}>
                {preInput(
                    'Title',
                    'Title for your place. Should be short and catchy'
                )}
                <input
                    type="text"
                    value={title}
                    onChange={(ev) => setTitle(ev.target.value)}
                    placeholder="Title, for example: My lovely apartment"
                />
                {preInput('Address', 'Address to this place')}
                <input
                    type="text"
                    value={address}
                    onChange={(ev) => setAddress(ev.target.value)}
                    placeholder="addres"
                />
                {preInput('Photos', 'more is better')}
                <PhotosUploader
                    addedPhotos={addedPhotos}
                    onChange={setAddedPhotos}
                />
                {preInput('Description', 'description of the place')}
                <textarea
                    value={description}
                    onChange={(ev) => setDescription(ev.target.value)}
                />
                {preInput('Perks', 'select all the perks of your place')}
                <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                    <Perks selected={perks} onChange={setPerks}/>
                </div>
                {preInput('Extra info', 'house rules, etc')}
                <textarea
                    value={extraInfo}
                    onChange={(ev) => setExtraInfo(ev.target.value)}
                />
                {preInput(
                    'Check in&out times, max guests',
                    'Add check in and out times, remember to have some time window for cleaning the room between guests'
                )}
                <div className="grid gap-3 sm:grid-cols-3">
                    <div>
                        <h3 className="mt-1 -mb-2 ">Check in time</h3>
                        <input
                            type="text"
                            value={checkIn}
                            onChange={(ev) => setCheckIn(ev.target.value)}
                            placeholder="14:00"
                        />
                    </div>
                    <div>
                        <h3 className="mt-1 -mb-2 ">Check out time</h3>
                        <input
                            type="text"
                            value={checkOut}
                            onChange={(ev) => setCheckOut(ev.target.value)}
                            placeholder="11:00"
                        />
                    </div>
                    <div>
                        <h3 className="mt-1 -mb-2 ">Max number of guests</h3>
                        <input
                            type="number"
                            value={maxGuests}
                            onChange={(ev) => setMaxGuests(ev.target.value)}
                        />
                    </div>

                    <button className="primary col-start-2 my-4">Save</button>
                </div>
            </form>
        </div>
    )
}

export default PlacesFormPage
