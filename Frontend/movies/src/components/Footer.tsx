import Logo from '../assets/img/cine-zone.svg'

const Footer : React.FC = () => {
    return (
        <footer className='mb-[1rem]'>
            <figure className='flex justify-center mt-[5rem] '>
                <img src={Logo} alt="" />
            </figure>
            <div className='flex justify-between'>
                <p className='text-[#a0a0a0] mx-[5rem] text-[0.8rem]'>© Copyright 2019 - Lift Media</p>
                <p className='text-[#a0a0a0] mr-[3rem] text-[0.8rem]'>© 2019 Lift Media. All Rights Reserved. </p>
            </div>
        </footer>
    )
}

export default Footer;