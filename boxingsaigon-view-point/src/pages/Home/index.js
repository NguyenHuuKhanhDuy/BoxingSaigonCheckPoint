import classNames from 'classnames/bind';
import styles from './styles.scss';
import Point from '~/components/Point';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const cx = classNames.bind(styles);
function Home() {
    const [phoneNumber, setPhoneNumber] = useState('')
    const [token, setToken] = useState(null)
    const [user, setUser] = useState({})
    const [isLoad, setIsLoad] = useState(true)
    const [isShowPoint, setIsShowPoint] = useState(false)

    useEffect(() => {
        const fetchToken = async () => {
            const body =
                'scopes=PublicApi.Access&grant_type=client_credentials&client_id=5c6dc75f-2fc1-4052-901f-43268c73dd05&client_secret=FA574711D2414211A677A3EA8F1F8EE0BBD3A791';
    
            axios
                .post('/connect/token', body, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                })
                .then((response) => {
                    setToken(response.data.access_token);
                })
                .catch((error) => {
                    console.log('Error', error);
                });
        };
        fetchToken()
    },[])
    
    const fetchCustomer = async () => {
        setIsLoad(true)
        axios.get(`/customers?contactNumber=${phoneNumber}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Retailer: 'tigris',
                },
            })
            .then((response) => {
                setUser(response.data.data[0]);
                setIsLoad(false)
                console.log(response.data.data[0])
            })
            .catch((error) => {
                console.log('Error', error);
            });
    };

    const HanleClickButton = async () => {
        setIsShowPoint(true)
        fetchCustomer()
    }

    return (
        <>
            <div className={cx('container')}>
                <div className={cx('search')}>
                    <div className={cx('title')}>Boxing Saigon Point</div>
                    <div className={cx('search-box')}>
                        <input placeholder="Input your phone number" onChange={e => setPhoneNumber(e.target.value)}/>
                        <button onClick={HanleClickButton}>Search</button>
                    </div>
                </div>
                <div className={cx('time-stone')}>
                    {isShowPoint && <Point isLoad={isLoad} user={user}/>}
                </div>
            </div>
        </>
    );
}

export default Home;
