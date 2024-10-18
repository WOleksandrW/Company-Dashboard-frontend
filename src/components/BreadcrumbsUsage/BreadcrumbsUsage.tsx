import { Breadcrumbs, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

interface IProps {
  list: {
    to?: string;
    text: string;
  }[];
}

function BreadcrumbsUsage({ list }: IProps) {
  return (
    <Breadcrumbs maxItems={2} sx={{ maxWidth: '100%' }}>
      {list.map(({ to, text }, idx) =>
        to ? (
          <Typography component={NavLink} className="link" to={to} key={idx}>
            {text}
          </Typography>
        ) : (
          <Typography key={idx} className="text-ellipsis" sx={{ maxWidth: '150px' }}>
            {text}
          </Typography>
        )
      )}
    </Breadcrumbs>
  );
}

export default BreadcrumbsUsage;
