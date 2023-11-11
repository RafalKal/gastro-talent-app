import React from "react";

export default function User(props) {
    return (
        <div className="card">
            <h2>{props.firstname} {props.lastname}</h2>
            <p>{props.email}</p>
            <p>{props.phoneNumber}</p>
            <p>{props.dateOfBirth}</p>
            <p>{props.createdAt}</p>
        </div>
    )
}