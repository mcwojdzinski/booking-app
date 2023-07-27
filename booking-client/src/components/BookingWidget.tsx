import differenceInCalendarDays from "date-fns/differenceInCalendarDays";
import {PlaceInterface} from "../interface/Place.ts";
import {useState} from "react";
import axios from "axios";
import {Navigate} from "react-router-dom";

const BookingWidget = ({place}: { place: PlaceInterface }) => {
    const [checkIn, setCheckIn] = useState<string>('')
    const [checkOut, setCheckOut] = useState<string>('')
    const [numberOfGuests, setNumberOfGuests] = useState<number | string>(1)
    const [name, setName] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [redirect, setRedirect] = useState('')
    let numberOfNights = 0

    const createBook = async () => {
        const data = {place: place._id, checkIn, checkOut, numberOfGuests, name, phone, price: numberOfNights * place.price}
        const response = await axios.post('/booking', data)

        const bookingId: string = response.data._id;
        setRedirect(`/account/bookings/${bookingId}`)
    }

    if (checkIn && checkOut) {
        numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn))
    }

    if (redirect) {
        return <Navigate to={redirect}/>
    }
    return (
        <div className="bg-white shadow p-4 rounded-2xl">
            <div className="text-2xl text-center">
                Price: {place.price} / per night
            </div>
            <div className="border rounded-2xl mt-4">
                <div className="flex">
                    <div className="py-4 px-4 border-r">
                        <label>Check in:</label>
                        <input type="date" value={checkIn} onChange={(ev => setCheckIn(ev.target.value))}/>
                    </div>

                    <div className="py-4 px-4 ">
                        <label>Check out:</label>
                        <input type="date" value={checkOut} onChange={(ev => setCheckOut(ev.target.value))}/>
                    </div>
                </div>
                <div className="py-3 px-4 border-t">
                    <label>Number of guests: </label>
                    <input type="number" value={numberOfGuests}
                           onChange={(ev => setNumberOfGuests(ev.target.value))}/>
                </div>
                {numberOfNights > 0 && (
                    <div className="py-3 px-4 border-t">
                        <label>Your full name: </label>
                        <input type="text" value={name}
                               onChange={(ev => setName(ev.target.value))}/>
                        <label>Phone number: </label>
                        <input type="tel" value={phone}
                               onChange={(ev => setPhone(ev.target.value))}/>
                    </div>
                )}
            </div>
            <button onClick={createBook} className="primary mt-4">Book this place {numberOfNights > 0 && (
                <>
                    <span> $ {numberOfNights * place.price}</span>
                </>
            )}</button>
        </div>
    )
}

export default BookingWidget
