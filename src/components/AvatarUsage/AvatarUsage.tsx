import { useMemo } from 'react';
import { Avatar, SxProps, Theme } from '@mui/material';
import { merge } from 'lodash';
import stringAvatar from '@root/utils/stringAvatar';

interface IProps {
  src?: string;
  title: string;
  sx?: SxProps<Theme>;
}

function AvatarUsage({ src, title, sx }: IProps) {
  const avatar = useMemo(() => stringAvatar(title), [title]);
  const sxProps = useMemo(() => merge(avatar.sx, sx), [sx]);

  if (src) return <Avatar src={src} alt={title} sx={sx} />;

  return <Avatar sx={sxProps}>{avatar.children}</Avatar>;
}

export default AvatarUsage;
