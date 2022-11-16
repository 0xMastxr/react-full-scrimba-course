import "./style.css"

import React from "react"

export default function Info() {
    return (
        <div>
            <img className="perfil-photo" src="../images/perfil-photo.jpg" />
            <h1 className="person-name">0xMastxr</h1>
            <h3 className="profission">Junior Full-Stack Web3 Developer</h3>
            <h4 className="site">https://github.com/0xMastxr</h4>
            <div className="websites">
                <a href="" target="_blank" className="email">
                    <img src="../images/email-logo.png" />
                    <p>Email</p>
                </a>
                <a href="" target="_blank" className="linkedin">
                    <img src="../images/linkedin-logo.png" />
                    <p>Linkedin</p>
                </a>
            </div>
        </div>
    )
}
