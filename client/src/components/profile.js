import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import AuthContext from '../Context/Auth/AuthContext';

const Profile = () => {
    const { id } = useParams();
    const { userDetails, fetchUserByID } = useContext(AuthContext);
    const userTypes = {
        "S": "Student",
        "T": "Teacher"
    }

    useEffect(() => {
        if (id) fetchUserByID({ id });
    }, [id])


    useEffect(() => {
        const styleTag = document.createElement("style");
        styleTag.innerHTML = "\n.card-style1 {\n    box-shadow: 0px 0px 10px 0px rgb(89 75 128 / 9%);\n}\n.border-0 {\n    border: 0!important;\n}\n.card {\n    position: relative;\n    display: flex;\n    flex-direction: column;\n    min-width: 0;\n    word-wrap: break-word;\n    background-color: #fff;\n    background-clip: border-box;\n    border: 1px solid rgba(0,0,0,.125);\n    border-radius: 0.25rem;\n}\n\nsection {\n    padding: 120px 0;\n    overflow: hidden;\n    background: #fff;\n}\n.mb-2-3, .my-2-3 {\n    margin-bottom: 2.3rem;\n}\n\n.section-title {\n    font-weight: 600;\n    letter-spacing: 2px;\n    text-transform: uppercase;\n    margin-bottom: 10px;\n    position: relative;\n    display: inline-block;\n}\n.text-primary {\n    color: #ceaa4d !important;\n}\n.text-secondary {\n    color: #15395A !important;\n}\n.font-weight-600 {\n    font-weight: 600;\n}\n.display-26 {\n    font-size: 1.3rem;\n}\n\n@media screen and (min-width: 992px){\n    .p-lg-7 {\n        padding: 4rem;\n    }\n}\n@media screen and (min-width: 768px){\n    .p-md-6 {\n        padding: 3.5rem;\n    }\n}\n@media screen and (min-width: 576px){\n    .p-sm-2-3 {\n        padding: 2.3rem;\n    }\n}\n.p-1-9 {\n    padding: 1.9rem;\n}\n\n.bg-secondary {\n    background: #15395A !important;\n}\n@media screen and (min-width: 576px){\n    .pe-sm-6, .px-sm-6 {\n        padding-right: 3.5rem;\n    }\n}\n@media screen and (min-width: 576px){\n    .ps-sm-6, .px-sm-6 {\n        padding-left: 3.5rem;\n    }\n}\n.pe-1-9, .px-1-9 {\n    padding-right: 1.9rem;\n}\n.ps-1-9, .px-1-9 {\n    padding-left: 1.9rem;\n}\n.pb-1-9, .py-1-9 {\n    padding-bottom: 1.9rem;\n}\n.pt-1-9, .py-1-9 {\n    padding-top: 1.9rem;\n}\n.mb-1-9, .my-1-9 {\n    margin-bottom: 1.9rem;\n}\n@media (min-width: 992px){\n    .d-lg-inline-block {\n        display: inline-block!important;\n    }\n}\n.rounded {\n    border-radius: 0.25rem!important;\n}\n"

        document.body.appendChild(styleTag);
        return () => {
            document.body.removeChild(styleTag);
        };
    }, [])

    return userDetails && <section className="bg-light">
        <div className="container">
            <div className="row">
                <div className="col-lg-12 mb-4 mb-sm-5">
                    <div className="card card-style1 border-0">
                        <div className="card-body p-1-9 p-sm-2-3 p-md-6 p-lg-7">
                            <div className="row align-items-center">
                                <div className="col-lg-6 mb-4 mb-lg-0">
                                    <img
                                        src="https://bootdey.com/img/Content/avatar/avatar7.png"
                                        alt="..."
                                    />
                                </div>
                                <div className="col-lg-6 px-xl-10">
                                    <div className="bg-secondary d-lg-inline-block py-1-9 px-1-9 px-sm-6 mb-1-9 rounded">
                                        <h3 className="h2 text-white mb-0">{userDetails.first_name + " " + userDetails.last_name}</h3>
                                        <span className="text-primary">{userTypes[userDetails.type]}</span>
                                    </div>
                                    <ul className="list-unstyled mb-1-9">
                                        <li className="mb-2 mb-xl-3 display-28">
                                            <span className="display-26 text-secondary me-2 font-weight-600">
                                                Username:
                                            </span>{" "}
                                            {userDetails.username}
                                        </li>
                                        <li className="mb-2 mb-xl-3 display-28">
                                            <span className="display-26 text-secondary me-2 font-weight-600">
                                                Type:
                                            </span>{" "}
                                            {userTypes[userDetails.type]}
                                        </li>
                                        <li className="mb-2 mb-xl-3 display-28">
                                            <span className="display-26 text-secondary me-2 font-weight-600">
                                                Email:
                                            </span>{" "}
                                            {userDetails.email}
                                        </li>
                                        <li className="mb-2 mb-xl-3 display-28">
                                            <span className="display-26 text-secondary me-2 font-weight-600">
                                                Mobile:
                                            </span>{" "}
                                            {userDetails.mobile}
                                        </li>
                                        {userDetails.subject && userDetails.subject.length > 0 &&
                                            <a href={userDetails.git_link} target="_blank">
                                                <li className="mb-2 mb-xl-3 display-28">
                                                    <span className="display-26 text-secondary me-2 font-weight-600">
                                                        Subject:
                                                    </span>{" "}
                                                    {userDetails.subject}
                                                </li>
                                            </a>
                                        }
                                        {userDetails.address.length > 0 &&
                                            <li className="mb-2 mb-xl-3 display-28">
                                                <span className="display-26 text-secondary me-2 font-weight-600">
                                                    Address:
                                                </span>{" "}
                                                {userDetails.address}
                                            </li>}
                                        {userDetails.git_link && userDetails.git_link.length > 0 &&
                                            <a href={userDetails.git_link} target="_blank">
                                                <li className="mb-2 mb-xl-3 display-28">
                                                    <span className="display-26 text-secondary me-2 font-weight-600">
                                                        GitHub:
                                                    </span>{" "}
                                                    {userDetails.git_link}
                                                </li>
                                            </a>
                                        }
                                    </ul>
                                    <ul className="social-icon-style1 list-unstyled mb-0 ps-0">
                                        <li>
                                            <a href="#!">
                                                <i className="ti-twitter-alt" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#!">
                                                <i className="ti-facebook" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#!">
                                                <i className="ti-pinterest" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#!">
                                                <i className="ti-instagram" />
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
}

export default Profile