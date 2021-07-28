import React from 'react';
import '../styles/slider.scss';
function Slider(){
    return <div className='NewsSliderBlock'>
        <div className='NewsSliderWrap'>
            <div className='News-text'>
                <div className='News_text-logo'></div>
                <div className='News_text-title'>
                    <p><span>Stan Smith</span>,</p>
                    <p>Forever!</p>
                </div>
                <div className='News_text-buy'><p>Купить</p></div>
            </div>
            <div className='News-img'></div>
            <div className='News-btn'>
                <div className='News_btn-white-circle'>
                    <span className="material-icons-outlined">arrow_forward_ios</span>
                </div>
            </div>
        </div>
    </div>
}

export default Slider;