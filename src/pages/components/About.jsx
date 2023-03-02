import axios from "axios";
import { useState, useEffect } from "react";
import { useMutation } from "react-query";

const url = 'https://en.wikipedia.org/wiki/Redux_(JavaScript_library)'
const About = () => {
    const [state, setState] = useState(url)
    const [inputBool, setInputBool] = useState(false)

    const fetch = async () => {
        const url = `https://v1.up.railway.app/search?url=${state}`
        const res = await axios(url, { method: 'GET' })
        return res
    }

    const { data: fetchData, error, isLoading , mutate} = useMutation(fetch)

    if (fetchData) console.log(fetchData.data.data)

    useEffect(() => {
        const form = document.querySelector("form");
        form.addEventListener("submit", handleSubmit)
        return () => form.removeEventListener("submit", handleSubmit)
    })
    const handleSubmit = (e) => {
        e.preventDefault();
        setInputBool(true);
        mutate()
        setState(e.target[0].value)
        setInputBool(false);
    }
    const heading = (header) => {
        const val = header?.split('/').at(-1).replaceAll('_', " ")
        return val
    }


    return (
        <>
            <div className="container">
                <form >
                    <div className="finder" onSubmit={handleSubmit}>
                        <div className="finder__outer">
                            <div className="finder__inner">
                                <div className="finder__icon"></div>
                                <input className="finder__input"
                                    type="text"
                                    name="q"
                                    placeholder="Wikipedia url"
                                    disabled={inputBool} />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div className="container">
                {
                    isLoading &&
                    <div>Loading......</div>
                }
                {
                    error &&
                    <div>{error.message}</div>
                }
                <section>
                    <h1>{heading(state)}</h1>
                    <div className="table">
                        <table cellpadding="0" cellspacing="0" border="0">
                            <thead>
                                <tr>
                                    <th>SERIAL</th>
                                    <th>NAME</th>
                                    <th>URL</th>
                                    <th>RANK</th>
                                    <th>LINK</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                    <div className="table-content">
                        <table cellPadding="0" cellSpacing="0" border="0">
                            <tbody>
                                {fetchData && fetchData.data.data.map((element, index) =>
                                (<tr key={index}>
                                    <td style={{ width: '10%' }}>{index + 1}</td>
                                    <td style={{ width: '25%' }}>{heading(element?.OriginalUrl)}</td>
                                    <td style={{ width: '40%', overflow: 'none' }}>{element?.OriginalUrl}</td>
                                    <td style={{ width: '15%' }}>{element?.rank}</td>
                                    <td style={{ width: '10%' }}>
                                        <a style={{ textDecoration: 'none', color: '#fff' }} href={element?.OriginalUrl} target='_blank'>Link</a>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <p>Total number of links are {fetchData && fetchData.data.data.length} having rank* property</p>
                    </div>
                </section>
            </div>
        </>
    );
}

export default About;