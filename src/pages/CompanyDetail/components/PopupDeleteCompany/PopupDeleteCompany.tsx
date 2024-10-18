import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import api from '../../../../api';
import { ConfirmModalUsage } from '../../../../components';
import { EQueryKeys } from '../../../../enums/queryKeys.enum';
import { TCompany } from '../../../../types/TCompany';

interface IProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  id: TCompany['id'];
  title: TCompany['title'];
}

function PopupDeleteCompany({ id, title, ...rest }: IProps) {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const { mutate } = useMutation(() => api.companies.remove(id), {
    onSuccess: () => {
      toast.success(`Company "${title}" deleted successfully!`);
      queryClient.setQueryData([EQueryKeys.COMPANY, { id }], { data: null });
      navigate('/companies');
    }
  });

  return (
    <ConfirmModalUsage
      {...rest}
      title="Confirm deletion"
      text={`Are you sure you want to delete the company "${title}"`}
      onSubmit={() => mutate()}
    />
  );
}

export default PopupDeleteCompany;
