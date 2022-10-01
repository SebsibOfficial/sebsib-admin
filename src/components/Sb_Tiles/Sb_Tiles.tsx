import './Sb_Tiles.css'

interface Props {
    number: Number,
    label: String
}

export default function Sb_Tiles(props:Props) {
    return (
        <div className='tile_container'>
            <div className='tile_class'>
                {props.number}
            </div>
            <p>{props.label}</p>
        </div>
    )
}