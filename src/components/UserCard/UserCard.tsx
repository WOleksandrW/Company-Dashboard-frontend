import { useMemo } from 'react';
import { Avatar, Box, Card, CardContent, Typography } from '@mui/material';
import { MiniDataList } from '../';
import getImageFromBuffer from '../../utils/getImageFromBuffer';
import stringAvatar from '../../utils/stringAvatar';
import { TUser } from '../../types/TUser';

interface IProps {
  user: TUser;
}

function UserCard({ user }: IProps) {
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
          padding: '8px 16px'
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
