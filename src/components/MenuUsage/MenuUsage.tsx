import { Box, IconButton, Menu, MenuItem, SxProps, Theme } from '@mui/material';
import { useState } from 'react';
import { IconType } from 'react-icons';
import { MdMoreHoriz } from 'react-icons/md';

interface IProps {
  list: {
    text: string;
    icon?: IconType;
    callback: () => void;
  }[];
  sx?: SxProps<Theme>;
  sxBtn?: SxProps<Theme>;
}

function MenuUsage({ list, sx, sxBtn }: IProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  return (
    <Box sx={sx}>
      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} sx={sxBtn}>
        <MdMoreHoriz />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}>
        {list.map(({ text, icon: Icon, callback }) => (
          <MenuItem
            key={text}
            onClick={() => {
              callback();
              setAnchorEl(null);
            }}
            sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {Icon && <Icon className="p1" />}
            {text}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}

export default MenuUsage;
