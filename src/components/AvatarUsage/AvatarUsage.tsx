import { Avatar, SxProps, Theme } from '@mui/material';
import stringAvatar from '@root/utils/stringAvatar';
import { useMemo } from 'react';

interface IProps {
  src?: string;
  title: string;
  sx?: SxProps<Theme>;
}

function AvatarUsage({ src, title, sx }: IProps) {
  const avatar = useMemo(() => stringAvatar(title), [title]);

  if (src) return <Avatar src={src} alt={title} sx={sx} />;

  return <Avatar sx={{ ...avatar.sx, ...sx }}>{avatar.children}</Avatar>;
}

export default AvatarUsage;
