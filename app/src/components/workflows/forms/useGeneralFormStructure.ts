import {
  Field,
  FieldVariant,
  FormStructure,
  TextareaFieldProps,
  TextFieldProps,
} from '@/components/shared/form-builder/types'
import { logProxy } from '@/lib/proxy'
import workflowModel from '@/models/workflow.model'
import { log } from 'console'

interface useGeneralFormStructureProps {}

export const useGeneralFormStructure = ({}: useGeneralFormStructureProps) => {
  const nameField: Field<TextFieldProps> = {
    id: 'name',
    variant: FieldVariant.TEXT,
    label: 'Name',
    placeholder: 'Enter a name',
    props: {
      value: workflowModel.selectedNode?.name,
      onChange: (e) => {
        logProxy(workflowModel.selectedNode)
        workflowModel.setNodeAttribute('name', e.target.value)
      },
    },
  }

  const descriptionField: Field<TextareaFieldProps> = {
    id: 'description',
    variant: FieldVariant.TEXTAREA,
    label: 'Description',
    placeholder: 'Enter a description',
    props: {
      rows: 6,
      value: workflowModel.selectedNode?.description || '',
      onChange: (e) => workflowModel.setNodeAttribute('description', e.target.value),
    },
  }

  const structure: FormStructure = {
    title: 'General Information',
    fieldsets: [
      {
        title: '',
        rows: [
          {
            fields: [nameField],
          },
          {
            fields: [descriptionField],
          },
        ],
      },
    ],
  }

  return { structure }
}
