import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Box, IconButton } from '@mui/material';
import api from '@root/api';
import useQueryCurrUser from '@root/hooks/useQueryCurrUser';
import { BreadcrumbsUsage, EmptyMessage } from '@root/components';
import {
  CompanyDataSection,
  MapSection,
  PopupDeleteCompany,
  UpdateCompanyForm
} from './components';
import { EQueryKeys } from '@root/enums/queryKeys.enum';
import { ERole } from '@root/enums/role.enum';
import { ERouterPaths } from '@root/enums/routerPaths.enum';

import { FaEdit, FaTrashAlt } from 'react-icons/fa';

function CompanyDetail() {
  const { id } = useParams();
  const companyId = Number(id);

  const { data: userData } = useQueryCurrUser();

  const [isEdit, setIsEdit] = useState(false);
  const [open, setOpen] = useState(false);

  const { data: companyData } = useQuery(
    [EQueryKeys.COMPANY, { id: companyId }],
    () => api.companies.getOne(companyId),
    {
      enabled: !isNaN(companyId),
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
          { to: ERouterPaths.HOME, text: 'Home' },
          { to: ERouterPaths.COMPANIES, text: 'Companies list' },
          { text: companyData?.title ?? `Company #${id}` }
        ]}
      />
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px'
        }}>
        {companyData ? (
          <>
            {!isEdit && canEdit && (
              <Box sx={{ display: 'flex', alignSelf: 'flex-end', gap: '12px' }}>
                <IconButton size="large" onClick={() => setIsEdit(true)}>
                  <FaEdit />
                </IconButton>
                <IconButton color="error" size="large" onClick={() => setOpen(true)}>
                  <FaTrashAlt />
                </IconButton>
              </Box>
            )}
            {isEdit && canEdit ? (
              <UpdateCompanyForm company={companyData} onClose={() => setIsEdit(false)} />
            ) : (
              <CompanyDataSection company={companyData} />
            )}
            <MapSection address={companyData.address} />
            <PopupDeleteCompany open={open} setOpen={setOpen} {...companyData} />
          </>
        ) : (
          <EmptyMessage sx={{ flex: 1, justifyContent: 'center' }} message="Ccompany not found" />
        )}
      </Box>
    </>
  );
}

export default CompanyDetail;
