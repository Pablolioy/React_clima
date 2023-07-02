import { useState } from "react"
import { getWeather, getLocation } from "../js/Services"

function Buscador() {
    const handelData = (lat, long) => {
        if (latitud && longitud) {

            async function query() {
                const prevData = [];
                const getquery = await getWeather(latitud, longitud)
                getquery.hourly.time.map((info, i) => {
                    return prevData[i] = [info, getquery.hourly.temperature_2m[i]]
                })
                setData(prevData)
            }
            query()
            console.log(data.length)
        }

        console.log(lat, long)
        // const lat = document.getElementById("latitud")
        // const long = document.getElementById("longitud")

    }

    const handelChange = ({ target }) => {
        async function query() {
            const info = await getLocation(target.value)
            setcitys(info.results)
            console.log(citys)
        }

        query()
    }

    const handelSubmit = (e) => {
        e.preventDefault()
        setLatitud(e.target[0].value)
        setLongitud(e.target[1].value)
        console.log(latitud, longitud)
        handelData(latitud, longitud)
    }

    const [data, setData] = useState([])
    const [citys, setcitys] = useState(null)
    const [latitud, setLatitud] = useState(0)
    const [longitud, setLongitud] = useState(0)

    return (
        <>
            <form onSubmit={handelSubmit}>
                <label htmlFor="latitud">Latitud</label>
                <input id="latitud" step="0.00001" type="number" defaultValue={latitud} min={-90} max={90} />
                <label htmlFor="longitud">Longitud</label>
                <input id="longitud" step="0.00001" type="number" defaultValue={longitud} min={-90} max={90} />
                <label htmlFor="city">Ciudad</label>
                <input id="city" type="text" onChange={handelChange} />
                {citys &&
                    <ul>
                        {
                            citys.map((info, i) => {
                                return (<button
                                    key={i}
                                    type="submit"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        setLatitud(info.latitude)
                                        setLongitud(info.longitude)
                                        console.log(latitud, longitud)
                                        handelData(latitud, longitud)
                                        }
                                    }
                                >{info.name + " " + info.admin1 + " " + info.latitude + " " + info.longitude}</button>)
                            })
                        }
                    </ul>
                }

                <button type="submit">Buscar</button>
            </form>
            {data &&
                data.map((info, i) => {
                    return (<h3 key={i}>{info[0] + " " + info[1] + "°"}</h3>)
                })
            }
        </>
    )
}

export default Buscador