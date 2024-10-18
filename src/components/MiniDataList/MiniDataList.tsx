import { useMemo } from 'react';
import { List, ListItem, SxProps, Theme, Typography } from '@mui/material';
import { merge } from 'lodash';

interface IProps {
  list: {
    subtitle: string;
    value: string | number;
  }[];
  sx?: SxProps<Theme>;
  sxItem?: SxProps<Theme>;
}

function MiniDataList({ list, sx, sxItem }: IProps) {
  const sxPropsItem = useMemo(
    () => merge({ display: 'flex', flexWrap: 'wrap', gap: '8px' }, sxItem),
    [sxItem]
  );

  return (
    <List sx={sx}>
      {list.map(({ subtitle, value }) => (
        <ListItem key={subtitle} sx={sxPropsItem}>
          <Typography className="content-dark-color">{subtitle}</Typography>
          <Typography className="text-ellipsis" sx={{ marginLeft: 'auto' }}>
            {value}
          </Typography>
        </ListItem>
      ))}
    </List>
  );
}

export default MiniDataList;
