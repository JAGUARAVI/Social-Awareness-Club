import { useEffect, useState } from 'react';
import { Text, Link as NextLink, Grid } from '@nextui-org/react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Markdown from 'react-markdown';
import styled from 'styled-components';

import { supabase } from '../../supabase';

export default function Post(props) {

    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);
        (async () => {
            const { data } = await supabase.from('posts').select().eq('id', id) || { data: [] };
            if (!data || !data.length) return navigate('/post/notfound', { replace: true });
            setTitle(data[0].title);
            setContent(data[0].content);
            setImage(data[0].image);
        })();
    }, []);

    return (
        <Wrapper>
            <NextLink as={Link} to={-1} css={{
                mt: '-8vh',

            }}>← Go Back</NextLink>
            <Grid.Container justify='center' alignContent='center'>
                <Grid>
                    <PictureViewWrapper className='skeleton-loader'>
                        {image ? <PictureView src={image} /> : null}
                    </PictureViewWrapper>
                </Grid>
            </Grid.Container>
            <div style={{
                color: 'black',
                display: 'flex',
                flexDirection: 'column',
                gap: 30,
                margin: 16
            }}>
                <Text className='skeleton-loader skeleton-loader-heading' h2>{title}</Text>
                <Markdown className='postText skeleton-loader skeleton-loader-10l' children={content} components={{
                    p: ({ children }) => <Text size='1.2rem'>{children}</Text>,
                }} />
            </div>
        </Wrapper >
    );
}

const Wrapper = styled.div`
    margin:0;
    padding: 20px 0px;
    max-width:1234px;
    width: 100%;
    margin: auto auto;
    text-align: left;
    display: flex;
    flex-direction: column;
    margin-top: 6vw;
    gap:50px;
`
const PictureViewWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80vw !important;
    height: 40vh !important;
    max-height: 50vh !important;
    border: none;
`

const PictureView = styled.img`
    object-fit: cover;
    width: 80vw;
    height: 100%;
    max-width: 1200px;
    border-radius: 20px;
`