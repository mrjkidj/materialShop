// import Navbar from "../../components/navbar/navbar"
import AboutUs from "../../components/aboutUs/aboutUs";
import Service from "../../components/service/service";
import imgMan from '../../assets/images/img_comm.svg';

const service = [
    {
        name: 'Mr. Jone Ambrose',
        date: '20 - 07 - 21',
        text: '“Lorem Ipsum has been the industry by standard dummy text ever to since the 1500s...”',
        imageUrl: imgMan,
    },
    {
        name: 'Ms. Jane Doe',
        date: '15 - 06 - 21',
        text: '“Another comment about the service...”',
        imageUrl: imgMan,
    },
    {
        name: 'Ms. Jane Doe',
        date: '15 - 06 - 21',
        text: '“Another comment about the service...”',
        imageUrl: imgMan,
    },
    {
        name: 'Ms. Jane Doe',
        date: '15 - 06 - 21',
        text: '“Another comment about the service...”',
        imageUrl: imgMan,
    },
    {
        name: 'Ms. Jane Doe',
        date: '15 - 06 - 21',
        text: '“Another comment about the service...”',
        imageUrl: imgMan,
    },

];

const HomePage = () => {
    return (
        <div>
            <AboutUs />
            <Service services={service} />
        </div>
    )
}

export default HomePage
