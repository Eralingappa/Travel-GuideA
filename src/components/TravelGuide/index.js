import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TravelPlaceList from '../TravelPlaceList'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgess: 'IN_PROGRESS',
}

class TravelGuide extends Component {
  state = {placesList: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getTravelPlaces()
  }

  renderFormattedData = data => ({
    id: data.id,
    name: data.name,
    imageUrl: data.image_url,
    description: data.description,
  })

  getTravelPlaces = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgess})
    const apiUrl = 'https://apis.ccbp.in/tg/packages'
    const response = await fetch(apiUrl)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updateList = fetchedData.packages.map(eachPackage =>
        this.renderFormattedData(eachPackage),
      )
      console.log(updateList)
      this.setState({
        placesList: updateList,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  renderLoader = () => (
    <div data-testid="loader" className="position">
      <Loader type="TailSpin" color="#000FFF" height={50} width={50} />
    </div>
  )

  renderPlacesView = () => {
    const {placesList} = this.state
    return (
      <ul className="places-list-container">
        {placesList.map(eachPlace => (
          <TravelPlaceList eachPlace={eachPlace} key={eachPlace.id} />
        ))}
      </ul>
    )
  }

  renderViewBasedOnApiStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderPlacesView()
      case apiStatusConstants.inProgess:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="travel-guide-container">
        <h1 className="main-heading"> Travel Guide</h1>
        <hr className="separator" />
        {this.renderViewBasedOnApiStatus()}
      </div>
    )
  }
}
export default TravelGuide
