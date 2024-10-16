import { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material';

interface IProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  navigation?: {
    icon?: React.ReactNode;
    text: string;
    to: string;
    onClick?: () => void;
  }[][];
}

function MainDrawer({ open, setOpen, navigation }: IProps) {
  return (
    <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
      <Box sx={{ width: 250 }} role="presentation" onClick={() => setOpen(false)}>
        {navigation &&
          navigation.map((array, idx) => (
            <Fragment key={idx}>
              <List>
                {array.map(({ text, to, icon, onClick }) => (
                  <ListItem
                    component={NavLink}
                    to={to}
                    className="link"
                    key={text}
                    onClick={onClick}
                    disablePadding>
                    <ListItemButton>
                      {icon && <ListItemIcon>{icon}</ListItemIcon>}
                      <ListItemText primary={text} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
              <Divider />
            </Fragment>
          ))}
      </Box>
    </Drawer>
  );
}

export default MainDrawer;
