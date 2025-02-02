import './index.css'

const TravelPlaceList = props => {
  const {eachPlace} = props

  const {name, description, imageUrl} = eachPlace

  return (
    <li className="place-container">
      <img src={imageUrl} className="place-image" alt={name} />
      <h1 className="heading">{name}</h1>
      <p className="description">{description}</p>
    </li>
  )
}
export default TravelPlaceList
