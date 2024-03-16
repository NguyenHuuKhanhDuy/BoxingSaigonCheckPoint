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

    const fetchCustomer = async () => {
        setIsLoad(true)
        axios.get(`https://huciapi.com/customer?phoneNumber=${phoneNumber}`)
            .then((response) => {
                if (typeof response.data.data === 'object'){
                    setIsLoad(false)
                    setUser(response.data.data.data)
                    return
                }

                var data = JSON.parse(response.data.data)
                console.log(data)
                setUser(data.data[0]);
                setIsLoad(false)
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
