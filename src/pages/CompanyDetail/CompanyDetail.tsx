import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Box, IconButton, Typography } from '@mui/material';
import api from '../../api';
import useQueryCurrUser from '../../hooks/useQueryCurrUser';
import { BreadcrumbsUsage, EmptyMessage } from '../../components';
import { CompanyDataSection, PopupDeleteCompany, UpdateCompanyForm } from './components';
import { EQueryKeys, ERole } from '../../types/enums';

import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import mapPlaceholder from '../../assets/images/map-placeholder.png';

function CompanyDetail() {
  const { id } = useParams();

  const { data: userData } = useQueryCurrUser();

  const [isEdit, setIsEdit] = useState(false);
  const [open, setOpen] = useState(false);

  const { data: companyData } = useQuery(
    [EQueryKeys.COMPANY, { id: +id! }],
    () => api.companies.getOne(+id!),
    {
      select: ({ data }) => data
    }
  );

  const canEdit = useMemo(() => {
    if (!companyData || !userData) return false;
    return (
      companyData.user.id === userData.id ||
      userData.role === ERole.ADMIN ||
      userData.role === ERole.SUPER
    );
  }, [companyData, userData]);

  return (
    <>
      <BreadcrumbsUsage
        list={[
          { to: '/', text: 'Home' },
          { to: '/companies', text: 'Companies list' },
          { text: 'Company' }
        ]}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
        {companyData ? (
          <>
            {!isEdit && canEdit && (
              <Box sx={{ display: 'flex', alignSelf: 'flex-end', gap: '12px' }}>
                <IconButton size="large" onClick={() => setIsEdit(true)}>
                  <FaEdit />
                </IconButton>
                <IconButton size="large" onClick={() => setOpen(true)}>
                  <FaTrashAlt />
                </IconButton>
              </Box>
            )}
            {isEdit && canEdit ? (
              <UpdateCompanyForm company={companyData} onClose={() => setIsEdit(false)} />
            ) : (
              <CompanyDataSection company={companyData} />
            )}
            <Box
              sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
              <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
                Google map
              </Typography>
              <Box
                component="img"
                src={mapPlaceholder}
                alt={companyData.address}
                sx={{ width: '100%', maxWidth: '900px' }}
              />
            </Box>
            <PopupDeleteCompany open={open} setOpen={setOpen} {...companyData} />
          </>
        ) : (
          <EmptyMessage message="No company data" />
        )}
      </Box>
    </>
  );
}

export default CompanyDetail;
