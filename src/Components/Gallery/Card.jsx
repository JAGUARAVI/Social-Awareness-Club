import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

export default function GalleryCard({ image, id, title }) {
    const navigate = useNavigate();

    return (
        <Wrapper style={{ backgroundColor: '#e7e7e7', backgroundImage: `url(${image})` }} onClick={() => navigate('/post/' + id)}>
            <Title>{title}</Title>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 350px;
    height: 450px;
    object-fit: fill;
    border-radius: 20px;
    display: flex;
    margin:10px;
    justify-content: center;
    align-items: flex-end;
    `

const Title = styled.h1`
    font-style: normal;
    font-weight: 600;
    border: 5px;
    border-color: black;
    text-align: center;
    color: #FFFFFF;
    mix-blend-mode: screen;
    padding-bottom: 30px;
    `