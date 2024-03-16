import classNames from 'classnames/bind';
import styles from './styles.scss';
import React, { useState, useEffect } from 'react';

const cx = classNames.bind(styles);
function Point({ isLoad, user }) {
    const [pointNextLevel, setPointNextLevel] = useState();
    const array = [70, 30, 10, 200];

    useEffect(() => {
        if (typeof user === 'undefined') {
            return;
        }
        let userPoint = user.rewardPoint;
        let currentClosest = array[0];
        let diff = Math.abs(currentClosest - userPoint);
        for (let num of array) {
            if (num > userPoint && Math.abs(num - userPoint) < diff) {
                currentClosest = num;
                diff = Math.abs(num - userPoint);
            }
        }
        setPointNextLevel(currentClosest - user.rewardPoint);
    }, [isLoad]);

    return (
        <>
            <div className={cx('point-box')}>
                {!isLoad && typeof user !== 'undefined' ? (
                    <>
                        <div className={cx('name')}>
                            Hi <span>{user.name}</span>, hiện tại số điểm của bạn là {user.rewardPoint} điểm
                        </div>
                        <div className={cx('rest-point')}>
                            Hãy tích thêm {pointNextLevel} điểm để lên hạng tiếp theo
                        </div>
                    </>
                ) : !isLoad && typeof user === 'undefined' ? (
                    <div className={cx('name')}>Không tìm thấy thông tin khách hàng. Vui lòng thử lại</div>
                ) : (
                    <div className={cx('loader')}></div>
                )}
            </div>
        </>
    );
}

export default Point;
