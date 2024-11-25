import Logo from '../assets/img/cine-zone.svg'

const Footer : React.FC = () => {
    return (
        <footer className='mb-[1rem]'>
            <figure className='flex justify-center mt-[5rem] phone:mt-[3rem]'>
                <img src={Logo} className='phone:w-24 phone:mb-9 phone:ml-5' alt="" />
            </figure>
            <div className='flex justify-between'>
                <p className='text-[#a0a0a0] mx-[5rem] text-[0.8rem] phone:text-[0.7rem]'>© Copyright 2019 - Lift Media</p>
                <p className='text-[#a0a0a0] mr-[3rem] text-[0.8rem] phone:text-[0.7rem]'>© 2019 Lift Media. All Rights Reserved. </p>
            </div>
        </footer>
    )
}

export default Footer;