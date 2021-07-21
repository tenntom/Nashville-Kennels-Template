import React, { useContext, useRef, useEffect, useState } from "react"
import { EmployeeContext } from "./EmployeeProvider"
import { LocationContext } from "../location/LocationProvider"
import { AnimalContext } from "../animal/AnimalProvider"
import "./Employees.css"

export const EmployeeForm = (props) => {
    const { addEmployee, updateEmployee, employees, getEmployees } = useContext(EmployeeContext)
    const { locations, getLocations } = useContext(LocationContext)
    // const { animals, getAnimals } = useContext(AnimalContext)

    const [employee, setEmployee] = useState({})

    const editMode = props.match.params.hasOwnProperty("employeeId")

    const handleControlledInputChange = (event) => {
        const newEmployee = { ...employee }
        newEmployee[event.target.name] = event.target.value
        console.log(newEmployee)
        setEmployee(newEmployee)
    }

    const getEmployeeInEditMode = () => {
        if (editMode) {
            const employeeId = parseInt(props.match.params.employeeId)
            const selectedEmployee = employees.find(e => e.id === employeeId) || {}
            setEmployee(selectedEmployee)
        }
    }
    /*
        Get location state on initialization. Animal state not using yet.
    */
    useEffect(() => {
        //    getAnimals()
        getLocations()
    }, [])

    useEffect(() => {
        getEmployeeInEditMode()
    }, employees)


    const constructNewEmployee = () => {
        const locationId = parseInt(employee.locationId)
        // const animalId = parseInt(animal.current.value)

        if (locationId === 0) {
            window.alert("Please select a location")
        } else {
            if (editMode) {
                //Put
                updateEmployee({
                    id: employee.id,
                    name: employee.name,
                    address: employee.address,
                    location_id: locationId
                })
                    .then(() => props.history.push("/employees"))
            } else {
                //Post
                addEmployee({
                    name: employee.name,
                    address: employee.address,
                    location_id: locationId
                    // animal_id: animalId
                })
                    .then(() => props.history.push("/employees"))
            }
        }
    }

    return (
        <form className="employeeForm">
            <h2 className="employeeForm__title">New Employee</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Employee name: </label>
                    <input type="text" id="name" name="name" required autoFocus className="form-control"
                        placeholder="Employee name"
                        defaultValue={employee.name}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="employeeAddress">Employee address: </label>
                    <input type="text" id="address" name="address" required autoFocus className="form-control" placeholder="Employee address"
                        defaultValue={employee.address}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="locationId">Assign to location: </label>
                    <select defaultValue="" name="locationId" id="employeeLocation" className="form-control"
                        onChange={handleControlledInputChange}
                    >
                        <option value="0">Select a location</option>
                        {locations.map(e => (
                            <option key={e.id} value={e.id}>
                                {e.name}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            {/* TAKING THIS OUT UNTIL FORM WORKS WITHOUT IT.
            <fieldset>
                <div className="form-group">
                    <label htmlFor="location">Caretaker for: </label>
                    <select defaultValue="" name="animal" ref={animal} id="employeeAnimal" className="form-control" >
                        <option value="0">Select an animal</option>
                        {animals.map(e => (
                            <option key={e.id} value={e.id}>
                                {e.name}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset> */}
            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()
                    constructNewEmployee()
                }}
                className="btn btn-primary">
                {editMode ? "Save Updates" : "Add Employee"}
            </button>
        </form>
    )
}