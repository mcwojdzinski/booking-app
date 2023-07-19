import {Link, useParams} from 'react-router-dom'
import {ChangeEvent, FormEvent, useState} from 'react'
import Perks from '../components/Perks.tsx'
import axios from "axios";

const PlacesPage = () => {
    const {action}: { action: string | undefined } = useParams()
    const [title, setTitle] = useState<string>('')
    const [address, setAddress] = useState<string>('')
    const [addedPhotos, setAddedPhotos] = useState([])
    const [photoLink, setPhotoLink] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [perks, setPerks] = useState([])
    const [extraInfo, setExtraInfo] = useState<string>('')
    const [checkIn, setCheckIn] = useState<string>('')
    const [checkOut, setCheckOut] = useState<string>('')
    const [maxGuests, setMaxGuests] = useState<number>(1)

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

    const uploadPhotoByLink = async (ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault()
        const {data: filename} = await axios.post('/upload-by-link', {link: photoLink})

        setAddedPhotos(prev => {
            return [...prev, filename]
        })
        setPhotoLink('')
    }

    const uploadPhoto = (ev: ChangeEvent<HTMLInputElement>) => {
        const files: FileList = ev.target.files;
        const data: FormData = new FormData()

        for (let i = 0; i < files.length; i++) {
            data.append('photos', files[i])
        }

        axios.post('/upload', data, {
            headers: {'Content-type': 'multipart/form-data'}
        }).then(response => {
            const {data: filenames} = response
            setAddedPhotos(prev => {
                return [...prev, ...filenames]
            })
        }).catch(err => {
            throw new err;
        })
    }

    return (
        <div>
            {action !== 'new' && (
                <div className="text-center">
                    <Link
                        className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full text-center"
                        to={'/account/places/new'}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M12 4.5v15m7.5-7.5h-15"
                            />
                        </svg>
                        Add new place
                    </Link>
                </div>
            )}
            {action === 'new' && (
                <div className="flex justify-center items-center">
                    <form className="w-full">
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
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={photoLink}
                                onChange={(ev) => setPhotoLink(ev.target.value)}
                                placeholder="Add using a link ...jpg"
                            />
                            <button onClick={uploadPhotoByLink}
                                    className="text-white bg-primary grow px-4 rounded-2xl">
                                Add&nbsp;photo
                            </button>
                        </div>
                        <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                            {addedPhotos.length > 0 && addedPhotos.map(link => (
                                <div className="h-32 flex">
                                    <img src={`http://localhost:4000/uploads/${link}`} alt="Place image"
                                         className="rounded-2xl w-full object-cover "/>
                                </div>
                            ))}
                            <label
                                className="h-32 cursor-pointer flex gap-1 justify-center items-center border bg-transparent rounded-2xl p-8 text-2xl text-gray-600">
                                <input type="file" multiple className="hidden" onChange={uploadPhoto}/>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-12 h-12"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                                    />
                                </svg>
                                Upload
                            </label>
                        </div>
                        {preInput('Description', 'description of the place')}
                        <textarea
                            value={description}
                            onChange={(ev) => setDescription(ev.target.value)}
                        />
                        {preInput(
                            'Perks',
                            'select all the perks of your place'
                        )}
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
                                    onChange={(ev) =>
                                        setCheckIn(ev.target.value)
                                    }
                                    placeholder="14:00"
                                />
                            </div>
                            <div>
                                <h3 className="mt-1 -mb-2 ">Check out time</h3>
                                <input
                                    type="text"
                                    value={checkOut}
                                    onChange={(ev) =>
                                        setCheckOut(ev.target.value)
                                    }
                                    placeholder="11:00"
                                />
                            </div>
                            <div>
                                <h3 className="mt-1 -mb-2 ">
                                    Max number of guests
                                </h3>
                                <input
                                    type="number"
                                    value={maxGuests}
                                    onChange={(ev) =>
                                        setMaxGuests(ev.target.value)
                                    }
                                />
                            </div>

                            <button className="primary my-4">Save</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    )
}
export default PlacesPage