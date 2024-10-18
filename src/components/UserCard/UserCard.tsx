import { useMemo } from 'react';
import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { AvatarUsage, MenuUsage, MiniDataList } from '../';
import getImageFromBuffer from '../../utils/getImageFromBuffer';
import { TUser } from '../../types/user.type';
import { IconType } from 'react-icons';
import { NavLink } from 'react-router-dom';

interface IProps {
  user: TUser;
  dropDownMenu?: {
    icon?: IconType;
    text: string;
    callback: () => void;
  }[];
}

function UserCard({ user, dropDownMenu }: IProps) {
  const { id, image, username, email, createdAt } = user;

  const srcImage = useMemo(() => {
    if (image) return getImageFromBuffer(image.data.data, image.mimeType);
  }, [image]);

  return (
    <Card>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          padding: '8px 16px',
          position: 'relative'
        }}>
        <AvatarUsage
          src={srcImage}
          title={username}
          sx={{
            height: '64px',
            width: '64px',
            fontSize: '4rem'
          }}
        />
        {dropDownMenu?.length && (
          <MenuUsage
            list={dropDownMenu}
            sx={{ position: 'absolute', right: 12, top: 12 }}
            sxBtn={{ typography: 'h2' }}
          />
        )}
      </Box>
      <CardContent className="content-color">
        <Typography
          variant="h6"
          className="content-dark-color text-ellipsis"
          sx={{ textAlign: 'center' }}>
          {username}
        </Typography>
        <MiniDataList
          list={[
            { subtitle: 'Email:', value: email },
            { subtitle: 'Created at:', value: new Date(createdAt).toLocaleString() }
          ]}
          sx={{ padding: 0 }}
          sxItem={{ paddingX: 0 }}
        />
      </CardContent>
      <CardActions sx={{ marginTop: 'auto' }}>
        <Button component={NavLink} to={`/profile/${id}`} sx={{ typography: 'body1' }} size="small">
          View
        </Button>
      </CardActions>
    </Card>
  );
}

export default UserCard;
