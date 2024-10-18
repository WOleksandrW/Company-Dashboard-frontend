import { List, ListItem, SxProps, Theme, Typography } from '@mui/material';

interface IProps {
  list: {
    subtitle: string;
    value: string | number;
  }[];
  sx?: SxProps<Theme>;
  sxItem?: SxProps<Theme>;
}

function MiniDataList({ list, sx, sxItem }: IProps) {
  return (
    <List sx={sx}>
      {list.map(({ subtitle, value }) => (
        <ListItem key={subtitle} sx={{ display: 'flex', flexWrap: 'wrap', gap: '8px', ...sxItem }}>
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
