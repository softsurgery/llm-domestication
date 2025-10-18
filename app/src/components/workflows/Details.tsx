'use client'

import { cn } from '@/lib/cn'
import workflowModel from '@/models/workflow.model'
import { observer } from 'mobx-react-lite'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { FaInfoCircle } from 'react-icons/fa'
import { FormBuilder } from '../shared/form-builder/FormBuilder'
import { useGeneralFormStructure } from './forms/useGeneralFormStructure'

interface DetailsProps {
  className?: string
}

const Details = observer(({ className }: DetailsProps) => {
  const { structure } = useGeneralFormStructure({})
  return (
    <div className={cn('flex-1 rounded-lg border', className)}>
      {workflowModel.selectedNode ? (
        <div>
          <Accordion type="single" className="border-0">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <FaInfoCircle />
                  <span>General Information</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <FormBuilder structure={structure} />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>Do you offer support?</AccordionTrigger>
              <AccordionContent>
                Yes! We offer 24/7 customer support via chat and email.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>Can I use this in a project?</AccordionTrigger>
              <AccordionContent>
                Absolutely — feel free to use this in your own projects!
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      ) : (
        <p className="text-gray-500 italic">No node selected</p>
      )}
    </div>
  )
})

export default Details
