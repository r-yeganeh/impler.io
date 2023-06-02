import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { commonApi } from '@libs/api';
import { notify } from '@libs/notify';
import { track } from '@libs/amplitude';
import { API_KEYS, NOTIFICATION_KEYS } from '@config';
import { IErrorObject, ICustomization } from '@impler/shared';

interface UseEditorProps {
  templateId: string;
}

interface CustomizationDataFormat {
  recordFormat: string;
  chunkFormat: string;
}

export function useEditor({ templateId }: UseEditorProps) {
  const queryClient = useQueryClient();
  const {
    reset,
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomizationDataFormat>();
  const { data: customization, isLoading: isCustomizationLoading } = useQuery<
    ICustomization,
    IErrorObject,
    ICustomization,
    string[]
  >(
    [API_KEYS.TEMPLATE_CUSTOMIZATION_GET, templateId],
    () => commonApi<ICustomization>(API_KEYS.TEMPLATE_CUSTOMIZATION_GET as any, { parameters: [templateId] }),
    {
      onSuccess(data) {
        reset({
          recordFormat: data.recordFormat,
          chunkFormat: data.chunkFormat,
        });
      },
    }
  );
  const { mutate: updateCustomization, isLoading: isUpdateCustomizationLoading } = useMutation<
    ICustomization,
    IErrorObject,
    CustomizationDataFormat,
    string[]
  >(
    [API_KEYS.TEMPLATE_CUSTOMIZATION_UPDATE, templateId],
    (data) =>
      commonApi<ICustomization>(API_KEYS.TEMPLATE_CUSTOMIZATION_UPDATE as any, {
        parameters: [templateId],
        body: data,
      }),
    {
      onSuccess(data) {
        track({
          name: 'OUTPUT FORMAT UPDATED',
          properties: {},
        });
        notify(NOTIFICATION_KEYS.OUTPUT_UPDATED);
        queryClient.setQueryData([API_KEYS.TEMPLATE_CUSTOMIZATION_GET, templateId], data);
      },
    }
  );

  const validateFormat = (data: string): boolean => {
    try {
      JSON.parse(data);

      return true;
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      throw { type: 'JSON', message: 'Not a valid JSON!' };
    }
  };
  const onSaveClick = () => {
    handleSubmit((data) => {
      const { chunkFormat, recordFormat } = data;
      try {
        validateFormat(chunkFormat);
      } catch (error) {
        setError('chunkFormat', {
          type: (error as any).type,
          message: (error as Error).message,
        });
      }

      try {
        validateFormat(recordFormat);
      } catch (error) {
        setError('recordFormat', {
          type: (error as any).type,
          message: (error as Error).message,
        });
      }
      updateCustomization({
        recordFormat,
        chunkFormat,
      });
    })();
  };

  return {
    errors,
    control,
    onSaveClick,
    handleSubmit,
    customization,
    updateCustomization,
    isCustomizationLoading,
    isUpdateCustomizationLoading,
  };
}