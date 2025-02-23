import React from 'react'
import weddingVenue from '../../assets/wedding-venue.jpeg'

const GeneralCard = () => {
    return (
        <div className='general-card'>
            <img className='general-image overla' src={weddingVenue} />
            <div className='text-left p-5'>
                <p className='general-heading font-medium mb-3'>WEDDING VENUE</p>
                <p className='font-bold'>Pousada Palácio Estoi
                </p>
                <p className='text-[12px] font-medium'>Faro District, Portugal
                </p>
            </div>
        </div>
    )
}

export default GeneralCard