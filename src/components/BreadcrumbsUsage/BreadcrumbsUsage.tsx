import { Breadcrumbs } from '@mui/material';
import { NavLink } from 'react-router-dom';

interface IProps {
  list: {
    to?: string;
    text: string;
  }[];
}

function BreadcrumbsUsage({ list }: IProps) {
  return (
    <Breadcrumbs>
      {list.map(({ to, text }, idx) =>
        to ? (
          <NavLink className="link" to={to} key={idx}>
            {text}
          </NavLink>
        ) : (
          <p key={idx}>{text}</p>
        )
      )}
    </Breadcrumbs>
  );
}

export default BreadcrumbsUsage;
