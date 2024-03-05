// Write your code here
import Loader from 'react-loader-spinner'
import {Component} from 'react'

import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'
import './index.css'

const apiUrlStatus = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class CowinDashboard extends Component {
  state = {
    activeStatus: apiUrlStatus.initial,
    last7DaysVaccinationDetails: [],
    vaccinationByAge: [],
    vaccinationByGender: [],
  }

  componentDidMount() {
    this.getCovidDetails()
  }

  convertSnakeCaseToCamelCase = data => ({
    vaccineDate: data.vaccine_date,
    dose1: data.dose_1,
    dose2: data.dose_2,
  })

  getCovidDetails = async () => {
    this.setState({activeStatus: apiUrlStatus.inProgress})

    const response = await fetch('https://apis.ccbp.in/covid-vaccination-data')
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = data.last_7_days_vaccination.map(eachData =>
        this.convertSnakeCaseToCamelCase(eachData),
      )
      this.setState({
        activeStatus: apiUrlStatus.success,
        last7DaysVaccinationDetails: updatedData,
        vaccinationByGender: data.vaccination_by_gender,
        vaccinationByAge: data.vaccination_by_age,
      })
    } else {
      this.setState({activeStatus: apiUrlStatus.failure})
    }
  }

  renderLoading = () => (
    <div className="loader-main-container">
      <div data-testid="loader" className="loader-style">
        <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
      </div>
    </div>
  )

  renderSuccessView = () => {
    const {
      last7DaysVaccinationDetails,
      vaccinationByAge,
      vaccinationByGender,
    } = this.state
    return (
      <div className="success-container">
        <VaccinationCoverage
          last7DaysVaccinationDetails={last7DaysVaccinationDetails}
        />
        <VaccinationByGender vaccinationByGender={vaccinationByGender} />
        <VaccinationByAge vaccinationByAge={vaccinationByAge} />
      </div>
    )
  }

  renderFailureView = () => (
    <div className="failure-container">
      <div className="failure-sub-container">
        <img
          className="failure-image-style"
          src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
          alt="failure view"
        />
        <h1 className="failure-heading-style">Something went wrong</h1>
      </div>
    </div>
  )

  renderAnyOneOfTheContainer = () => {
    const {activeStatus} = this.state
    switch (activeStatus) {
      case apiUrlStatus.inProgress:
        return this.renderLoading()
      case apiUrlStatus.success:
        return this.renderSuccessView()
      case apiUrlStatus.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bg-container">
        <div className="logo-container">
          <img
            className="logo-style"
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
          />
          <h1 className="logo-heading-style">Co-WIN</h1>
        </div>
        <h1 className="main-heading-style">CoWin Vaccination in India</h1>
        {this.renderAnyOneOfTheContainer()}
      </div>
    )
  }
}

export default CowinDashboard
