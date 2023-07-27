import {PlaceInterface} from "../interface/Place.ts";

interface PlaceImgInterface {
    place: PlaceInterface,
    index?: number,
    className?: string
}

const PlaceImg = ({place, index, className}: PlaceImgInterface) => {
    if (!place.photos?.length) return ''
    if (!className) {
        className = 'object-cover'
    }
    return (
        <img
            className={className}
            src={`http://localhost:4000/uploads/${place.photos[0]}`}
            alt="zdjecie"
        />
    )
}

export default PlaceImg