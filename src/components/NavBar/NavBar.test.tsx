import NavBar from './NavBar';
import { renderWithProviders } from '../../utils/test';

describe('NavBar', () => {
  const defaultProps = {
    links: [
      { text: 'Policyholders', href: '/policyholders' },
      { text: 'Table Example', href: '/table' },
      { text: 'You Can Do It', href: '/you-can-do-it' },
    ],
  };

  it('should render NavBar links', () => {
    const { getByText } = renderWithProviders(<NavBar {...defaultProps} />);

    expect(getByText('Policyholders')).toBeInTheDocument();
    expect(getByText('Table Example')).toBeInTheDocument();
    expect(getByText('You Can Do It')).toBeInTheDocument();
  });

  // TODO: Challenge 2
  it('should render an `href` attribute for each link', () => {
    const { getByText } = renderWithProviders(<NavBar {...defaultProps} />);

    defaultProps.links.forEach((link) => {
      expect(getByText(link.text).getAttribute('href')).toBe(link.href);
    });
  });
});
