import { NavLink } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

interface IProps {
  list: {
    text: string;
    lintText: string;
    linkTo: string;
  }[];
}

function TextLinkList({ list }: IProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
      {list.map(({ text, lintText, linkTo }) => (
        <Typography key={linkTo} sx={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
          {text}
          <Typography
            component={NavLink}
            className="link"
            to={linkTo}
            color="secondary"
            sx={{ marginLeft: 'auto' }}>
            {lintText}
          </Typography>
        </Typography>
      ))}
    </Box>
  );
}

export default TextLinkList;
