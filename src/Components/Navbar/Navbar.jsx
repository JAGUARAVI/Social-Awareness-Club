import { useEffect } from 'react';
import { useLocation, Link, useNavigate, useHref } from 'react-router-dom';
import { Navbar as NextNavbar, Text, Dropdown, Avatar } from '@nextui-org/react';
import { supabase } from '../../supabase';

function Navbar({ session }) {
    const location = useLocation();
    const navigate = useNavigate();
    const href = useHref('/#posts');

    return (
        <NextNavbar isBordered variant='sticky' shouldHideOnScroll>
            <NextNavbar.Brand>
                <Link to='/'>
                    <Text h3 b color='inherit'>
                        Social Awareness Club
                    </Text>
                </Link>
            </NextNavbar.Brand>
            <NextNavbar.Content activeColor='success' variant='underline-rounded' enableCursorHighlight>
                <NextNavbar.Link href={location.pathname === '/' ? '/#' : null} onPress={() => navigate('/')} activeClassName='active' isActive={location.pathname === '/' && (location.hash ? location.hash === '#' : true)}>
                    &nbsp;&nbsp; Home &nbsp;&nbsp;
                </NextNavbar.Link>
                <NextNavbar.Link href={location.pathname === '/' ? '/#posts' : null} onPress={() => {
                    location.pathname !== '/' ? navigate('/') : null
                }} isActive={location.hash === '#posts'}>
                    &nbsp;&nbsp; Posts &nbsp;&nbsp;
                </NextNavbar.Link>
            </NextNavbar.Content>
            {
                session ? <NextNavbar.Content>
                    <Dropdown placement='bottom-right'>
                        <NextNavbar.Item>
                            <Dropdown.Trigger>
                                <Avatar
                                    bordered
                                    as='div'
                                    color='success'
                                    size='md'
                                    src={
                                        `https://ui-avatars.com/api/?name=${encodeURIComponent(session.user.user_metadata.username || session.user.email.split('@')[0])}&rounded=true&background=random&size=128`
                                    }
                                />
                            </Dropdown.Trigger>
                        </NextNavbar.Item>
                        <Dropdown.Menu
                            aria-label='User menu actions'
                            color='secondary'
                            onAction={(key) => {
                                if (key === 'logout')
                                    supabase.auth.signOut();
                                else if (key === 'panel')
                                    navigate('/admin/');
                            }}
                        >
                            <Dropdown.Item key='profile' css={{ height: '$18' }}>
                                <Text b color='inherit' css={{ d: 'flex' }}>
                                    Signed in as
                                </Text>
                                <Text b color='inherit' css={{ d: 'flex' }}>
                                    {
                                        session.user.email
                                    }
                                </Text>
                            </Dropdown.Item>
                            <Dropdown.Item key='panel' withDivider color='success'>
                                Admin Panel
                            </Dropdown.Item>
                            <Dropdown.Item key='logout' color='error'>
                                Log Out
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </NextNavbar.Content> : null
            }
        </NextNavbar >
    );
}

export default Navbar;