import { useMemo } from 'react';
import { Avatar, Box, Card, CardContent, Typography } from '@mui/material';
import { MenuUsage, MiniDataList } from '../';
import getImageFromBuffer from '../../utils/getImageFromBuffer';
import stringAvatar from '../../utils/stringAvatar';
import { TUser } from '../../types/TUser';
import { IconType } from 'react-icons';

interface IProps {
  user: TUser;
  dropDownMenu?: {
    icon?: IconType;
    text: string;
    callback: () => void;
  }[];
}

function UserCard({ user, dropDownMenu }: IProps) {
  const { image, username, email, createdAt } = user;

  const srcImage = useMemo(() => {
    if (image) return getImageFromBuffer(image.data.data, image.mimeType);
  }, [image]);
  const avatar = useMemo(() => stringAvatar(username ?? 'A'), [username]);

  return (
    <Card>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          padding: '8px 16px',
          position: 'relative'
        }}>
        <Avatar
          src={srcImage}
          alt={username}
          sx={{
            height: '64px',
            width: '64px',
            fontSize: '4rem',
            ...avatar.sx
          }}>
          {avatar.children}
        </Avatar>
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
    </Card>
  );
}

export default UserCard;
