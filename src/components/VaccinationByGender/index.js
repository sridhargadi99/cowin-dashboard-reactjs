// Write your code here
import {PieChart, Pie, Legend, Cell} from 'recharts'
import './index.css'

const VaccinationByGender = props => {
  const {vaccinationByGender} = props
  return (
    <div className="vaccination-by-gender-container">
      <h1 className="vaccination-by-gender-heading-style">
        Vaccination by gender
      </h1>
      <div className="pie-chart-half-style">
        <PieChart width={1000} height={300}>
          <Pie
            cx="50%"
            cy="40%"
            data={vaccinationByGender}
            startAngle={180}
            endAngle={0}
            innerRadius="40%"
            outerRadius="70%"
            dataKey="count"
          >
            <Cell name="Male" fill="#f54394" />
            <Cell name="Female" fill="#5a8dee" />
            <Cell name="Others" fill=" #2cc6c6" />
          </Pie>
          <Legend
            iconType="circle"
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
          />
        </PieChart>
      </div>
    </div>
  )
}

export default VaccinationByGender
