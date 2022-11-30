import { Link, Box } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
type TNavBar = {
  links: {
    text: string;
    href: string;
    'data-testid'?: string;
  }[];
};

function NavBar({ links }: TNavBar) {
  const location = useLocation();

  return (
    <Box
      component="aside"
      sx={{
        background: '#0c2975',
        padding: '16px',
        width: '200px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Link
        component={RouterLink}
        to="/"
        sx={{ cursor: 'pointer', marginBottom: '80px', marginTop: '40px' }}
      >
        <img src="/surelogo.svg" alt="logo"></img>
      </Link>

      {links.map(({ text, href, 'data-testid': dataTestId }) => (
        <Link
          component={RouterLink}
          key={href}
          to={href}
          color="#fff"
          underline="hover"
          aria-current={href === location.pathname ? 'page' : undefined}
          sx={{
            cursor: 'pointer',
            '&:not(:last-of-type)': {
              marginBottom: '16px',
            },
            fontWeight: href === location.pathname ? 'bold' : 'none',
          }}
          data-testid={dataTestId}
        >
          {text}
        </Link>
      ))}
    </Box>
  );
}

export default NavBar;
