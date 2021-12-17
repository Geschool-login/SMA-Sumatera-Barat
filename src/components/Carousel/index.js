import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.css"
import LogoEmpty from "./assets/logo-empty.png"


function Index() {
    const [logos, setLogos] = useState([])

    const getLogos = async () => {
        try {
            let response = await axios.get('_api/main/stats')
            setLogos(response.data.items)
        } catch(e) {
            console.log(e.message)
        }
    }

    useEffect(() => {
        getLogos()
    }, [])

    const carouselProperties = {
        slidesToShow: 3,
        // infinite: true,
        centerMode: false,
        // centerPadding: "170px",
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                    centerMode: false,
                },
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 3,
                    centerMode: false,
                },
            },
        ],
    };

    return (
        <Slider {...carouselProperties}
            autoplay
            autoplaySpeed={2000}
        >
            {
                logos.map((item) => (
                    <div className="item mr-3">
                        <div className="col-xs-4 d-flex flex-column align-items-center">
                            {item.icon === '' ? <img src={LogoEmpty} alt="" className="img-responsive mb-3 logo-img" /> : <img src={`https://smasumbar.geschool.net${item.icon}`} alt="" className="img-responsive mb-3 logo-img" />}
                            <p>{item.name}</p>
                        </div>
                    </div>
                ))
            }
        </Slider>
    )
}

export default Index;
