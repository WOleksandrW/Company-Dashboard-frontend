import { useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import { ImageBlock, MiniDataList } from '../../../../components';
import getImageFromBuffer from '../../../../utils/getImageFromBuffer';
import { TCompany } from '../../../../types/TCompany';

interface IProps {
  company: TCompany;
}

function CompanyDataSection({ company }: IProps) {
  const { image, title, service, address, capital, createdAt, updatedAt } = company;

  const imgSrc = useMemo(() => {
    if (image) return getImageFromBuffer(image.data.data, image.mimeType);
  }, [image]);

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
          gap: '32px',
          '@media (max-width: 768px)': {
            gap: '20px'
          },
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
      </Box>
    </Box>
  );
}

export default CompanyDataSection;
