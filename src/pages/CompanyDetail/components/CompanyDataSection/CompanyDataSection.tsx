import { useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import { AvatarUsage, ImageBlock, MiniDataList } from '@root/components';
import getImageFromBuffer from '@root/utils/getImageFromBuffer';
import { TCompany } from '@root/types/company.type';
import { NavLink } from 'react-router-dom';

interface IProps {
  company: TCompany;
}

function CompanyDataSection({ company }: IProps) {
  const { image, title, service, address, capital, createdAt, updatedAt, user } = company;

  const imgSrc = useMemo(
    () => (image ? getImageFromBuffer(image.data.data, image.mimeType) : undefined),
    [image]
  );

  const imgSrcUser = useMemo(
    () => (user.image ? getImageFromBuffer(user.image.data.data, user.image.mimeType) : undefined),
    [user.image]
  );

  return (
    <Box
      component="section"
      sx={{
        width: 'min(800px, 100%)',
        display: 'flex',
        justifyContent: 'space-between',
        gap: '32px',
        '@media (max-width: 768px)': {
          alignItems: 'center',
          gap: '20px'
        },
        '@media (max-width: 640px)': {
          flexDirection: 'column',
          gap: '12px'
        }
      }}>
      <ImageBlock
        imgSrc={imgSrc}
        altText={title}
        sx={{
          height: '300px',
          width: 'min(300px, 100%)',
          '@media (max-width: 768px)': {
            maxHeight: '240px',
            maxWidth: '240px'
          },
          '@media (max-width: 640px)': {
            maxHeight: '280px',
            maxWidth: '280px'
          }
        }}
      />
      <Box
        sx={{
          width: 'min(400px, 100%)',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          '@media (max-width: 640px)': {
            gap: '12px'
          }
        }}>
        <Typography
          variant="h2"
          className="text-ellipsis content-dark-color"
          sx={{ fontWeight: 'bold', textAlign: 'center' }}>
          {title}
        </Typography>
        <MiniDataList
          list={[
            { subtitle: 'Service:', value: service },
            { subtitle: 'Address:', value: address },
            { subtitle: 'Capital:', value: capital },
            { subtitle: 'Created at:', value: new Date(createdAt).toLocaleString() },
            { subtitle: 'Updated at:', value: new Date(updatedAt).toLocaleString() }
          ]}
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            columnGap: '20px',
            padding: '8px 16px'
          }}>
          <Typography variant="body1" className="content-dark-color">
            Owner:
          </Typography>
          <Box
            component={NavLink}
            to={`/profile/${user.id}`}
            className="link"
            sx={{
              maxWidth: '220px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
            <AvatarUsage src={imgSrcUser} title={user.username} sx={{ fontSize: '2.4rem' }} />
            <Typography variant="h6" className="text-ellipsis">
              {user.username}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default CompanyDataSection;
