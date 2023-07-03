import { useEffect, useState } from "react"
import { getWeather, getLocation } from "../js/Services"

function Buscador() {

    const [data, setData] = useState(null)
    const [citys, setcitys] = useState(null)
    const [latitud, setLatitud] = useState(0)
    const [longitud, setLongitud] = useState(0)


    useEffect(() => {
        if(!latitud && !longitud) return
            async function query() {
            const prevData = [];
            const getquery = await getWeather(latitud, longitud)
            console.log(getquery)
            getquery.hourly.time.map((info, i) => {
                return prevData[i] = [getquery.latitude, getquery.longitude, info, getquery.hourly.temperature_2m[i]]
                }
            )
            setData(getquery)
        }
        query()
    }, [latitud, longitud])




    const handelChange = ({ target }) => {
        async function query() {
            const info = await getLocation(target.value)
            setcitys(info.results)
        }
        query()
    }

    const handelSubmit = (e) => {
        e.preventDefault()
        setLatitud(e.target[0].value)
        setLongitud(e.target[1].value)
    }



    return (
        <>
            <form onSubmit={handelSubmit}>
                <label htmlFor="latitud">Latitud</label>
                <input name="latitud" id="latitud" required step="00.01" type="number" min={-90} max={90} />
                <label htmlFor="longitud">Longitud</label>
                <input name="longitud" id="longitud" required step="00.01" type="number" min={-90} max={90} />
                <label htmlFor="city">Ciudad</label>
                <input id="city" type="text" onChange={handelChange} />
                {citys &&
                    <ul>
                        {
                            citys.map((info, i) => {
                                return (<button
                                    key={i}
                                    type="button"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        setLatitud(info.latitude)
                                        setLongitud(info.longitude)
                                        setcitys([])
                                    }
                                    }
                                >{info.name + " " + info.admin1 + " " + info.latitude + " " + info.longitude}</button>)
                            })
                        }
                    </ul>
                }

                <button type="submit">Buscar</button>
            </form>
            {data}
            
        </>
    )
}

export default Buscador