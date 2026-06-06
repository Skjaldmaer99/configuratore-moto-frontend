import * as z from "zod"
import { formSchema } from '@/lib/form-schema'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form"
import { motion } from "motion/react"
import { Check } from "lucide-react"
import { Field, FieldGroup, FieldContent, FieldLabel, FieldDescription, FieldError, FieldSeparator } from "@/components/ui/field"
import {
    FormHeader,
    FormFooter,
    StepFields,
    PreviousButton,
    NextButton,
    SubmitButton,
    MultiStepFormContent } from "@/components/multi-step-viewer";
import { MultiStepFormProvider } from "@/hooks/use-multi-step-viewer";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import type { ControllerFieldState, ControllerRenderProps } from 'react-hook-form';
           import { FileUpload } from '@/components/form-fields/file-upload'
import { Checkbox } from "@/components/ui/checkbox"

//------------------------------
type Schema = z.infer<typeof formSchema>;



export function GeneratedForm() {
    
  const form = useForm<Schema>({
    resolver: zodResolver(formSchema as any),
  });
  const { formState: { isSubmitting, isSubmitSuccessful } } = form;

  const handleSubmit = form.handleSubmit(async (data: Schema) => {
    try {
      // TODO: implement form submission
      console.log(data);
      form.reset();
    } catch (error) {
      // TODO: handle error
    }
  });
  const stepsFields = [
      { 
        fields: ["select-146","input-ebc","select-1d9","input-146","textarea-de4"],
        component: <>
                
        <Controller
          name="select-146"
          control={form.control}
          render={({ field, fieldState }) => {
          const options = [{"value":"yamaha","label":"Yamaha"},{"value":"honda","label":"Honda"},{"value":"ktm","label":"KTM"},{"value":"kawasaki","label":"Kawasaki"},{"value":"aprilia","label":"Aprilia"},{"value":"ducati","label":"Ducati"}];
          return (
            <Field data-invalid={fieldState.invalid} className="gap-1 col-span-full">
              <FieldLabel htmlFor="select-146">Brand *</FieldLabel>
              
              <Select
                value={field.value}
                onValueChange={field.onChange}
                
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleziona il brand" />
                </SelectTrigger>
                <SelectContent>
                  {options.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}}
        />

        <Controller
          name="input-ebc"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1 col-span-full">
            <FieldLabel htmlFor="input-ebc">Modello *</FieldLabel>
              <Input
                {...field}
                id="input-ebc"
                type="text"
                onChange={(e) => {
                field.onChange(e.target.value)
                }}
                aria-invalid={fieldState.invalid}
                placeholder="Inserisci il modello"
                
              />
              
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="select-1d9"
          control={form.control}
          render={({ field, fieldState }) => {
          const options = [{"value":"sport","label":"Sport"},{"value":"naked","label":"Naked"},{"value":"option-3","label":"Option 3"},{"value":"option-4","label":"Option 4"}];
          return (
            <Field data-invalid={fieldState.invalid} className="gap-1 col-span-full">
              <FieldLabel htmlFor="select-1d9">Seleziona la categoria *</FieldLabel>
              
              <Select
                value={field.value}
                onValueChange={field.onChange}
                
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleziona la categoria" />
                </SelectTrigger>
                <SelectContent>
                  {options.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}}
        />

        <Controller
          name="input-146"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1 col-span-full">
            <FieldLabel htmlFor="input-146">Prezzo base *</FieldLabel>
              <Input
                {...field}
                id="input-146"
                type="number"
                onChange={(e) => {
                field.onChange(e.target.valueAsNumber)
                }}
                aria-invalid={fieldState.invalid}
                placeholder="Inserisci il prezzo base"
                
              />
              
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

          <Controller
              name="textarea-de4"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1 col-span-full">
                <FieldLabel htmlFor="textarea-de4">Descrizione </FieldLabel>
                  <Textarea
                    {...field}
                    aria-invalid={fieldState.invalid}
                    id="textarea-de4"
                    placeholder="Descrizione"
                    
                  />
                  
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
                  </>
      }
      ,
      { 
        fields: ["input-65f","input-cec","input-aac","fileupload-848"],
        component: <>
                
        <Controller
          name="input-65f"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1 col-span-full">
            <FieldLabel htmlFor="input-65f">Nome Colore *</FieldLabel>
              <Input
                {...field}
                id="input-65f"
                type="text"
                onChange={(e) => {
                field.onChange(e.target.value)
                }}
                aria-invalid={fieldState.invalid}
                placeholder="Inserisci il nome del colore"
                
              />
              
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="input-cec"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1 col-span-full">
            <FieldLabel htmlFor="input-cec">Codice colore </FieldLabel>
              <Input
                {...field}
                id="input-cec"
                type="text"
                onChange={(e) => {
                field.onChange(e.target.value)
                }}
                aria-invalid={fieldState.invalid}
                placeholder="Inserisci il codice esadecimale"
                
              />
              
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="input-aac"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1 col-span-full">
            <FieldLabel htmlFor="input-aac">Prezzo extra *</FieldLabel>
              <Input
                {...field}
                id="input-aac"
                type="number"
                onChange={(e) => {
                field.onChange(e.target.valueAsNumber)
                }}
                aria-invalid={fieldState.invalid}
                placeholder="Inserisci il prezzo extra"
                
              />
              
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="fileupload-848"
          control={form.control}
          render={({ field, fieldState }) => (
            <div>
              <Field data-invalid={fieldState.invalid} className="gap-1 col-span-full">
                <FieldLabel htmlFor="fileupload-848">Immagine colore moto </FieldLabel>
                <FieldDescription>Select a file to upload from your device</FieldDescription>
                <FileUpload
                  {...field}
                  setValue={form.setValue}
                  name="fileupload-848"
                  placeholder="PNG or JPEG (max. 3MB)"
                  accept={`image/png, image/jpeg`}
                  maxFiles={1}
                  maxSize={3242880}
                  
                />
              </Field>
              {Array.isArray(fieldState.error) ? (
                fieldState.error?.map((error, i) => (
                  <p
                    key={i}
                    role="alert"
                    data-slot="field-error"
                    className="text-destructive text-sm"
                  >
                    {error.message}
                  </p>
                ))
              ) : (
                <FieldError errors={[fieldState.error]} />
              )}
            </div>
          )}
        />
                  </>
      }
      ,
      { 
        fields: ["input-68a","input-879","input-297","input-fba","input-1f7","select-4ae","select-4f4","input-03d"],
        component: <>
                
        <Controller
          name="input-68a"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1 col-span-full">
            <FieldLabel htmlFor="input-68a">Nome variante cilindrata *</FieldLabel>
              <Input
                {...field}
                id="input-68a"
                type="text"
                onChange={(e) => {
                field.onChange(e.target.value)
                }}
                aria-invalid={fieldState.invalid}
                placeholder="Enter your text"
                
              />
              
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="input-879"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1 col-span-full">
            <FieldLabel htmlFor="input-879">cc *</FieldLabel>
              <Input
                {...field}
                id="input-879"
                type="number"
                onChange={(e) => {
                field.onChange(e.target.valueAsNumber)
                }}
                aria-invalid={fieldState.invalid}
                placeholder="Enter your text"
                
              />
              
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="input-297"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1 col-span-full">
            <FieldLabel htmlFor="input-297">Tipo di motore *</FieldLabel>
              <Input
                {...field}
                id="input-297"
                type="text"
                onChange={(e) => {
                field.onChange(e.target.value)
                }}
                aria-invalid={fieldState.invalid}
                placeholder="Tipo di motore"
                
              />
              
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="input-fba"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1 col-span-full">
            <FieldLabel htmlFor="input-fba">N di cilindri *</FieldLabel>
              <Input
                {...field}
                id="input-fba"
                type="number"
                onChange={(e) => {
                field.onChange(e.target.valueAsNumber)
                }}
                aria-invalid={fieldState.invalid}
                placeholder="Enter your text"
                
              />
              
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="input-1f7"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1 col-span-full">
            <FieldLabel htmlFor="input-1f7">Cavalli vapore *</FieldLabel>
              <Input
                {...field}
                id="input-1f7"
                type="text"
                onChange={(e) => {
                field.onChange(e.target.value)
                }}
                aria-invalid={fieldState.invalid}
                placeholder="Cavalli vapore"
                
              />
              
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="select-4ae"
          control={form.control}
          render={({ field, fieldState }) => {
          const options = [{"value":"manuale","label":"Manuale"},{"value":"semi-automatico","label":"Semi-automatico"},{"value":"automatico","label":"Automatico"},{"value":"dct","label":"DCT"}];
          return (
            <Field data-invalid={fieldState.invalid} className="gap-1 col-span-full">
              <FieldLabel htmlFor="select-4ae">Cambio *</FieldLabel>
              
              <Select
                value={field.value}
                onValueChange={field.onChange}
                
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleziona il tipo di cambio" />
                </SelectTrigger>
                <SelectContent>
                  {options.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}}
        />

        <Controller
          name="select-4f4"
          control={form.control}
          render={({ field, fieldState }) => {
          const options = [{"value":"benzina","label":"Benzina"},{"value":"diesel","label":"Diesel"},{"value":"elettrica","label":"Elettrica"}];
          return (
            <Field data-invalid={fieldState.invalid} className="gap-1 col-span-full">
              <FieldLabel htmlFor="select-4f4">Tipo di alimentazione *</FieldLabel>
              
              <Select
                value={field.value}
                onValueChange={field.onChange}
                
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Tipo di alimentazione" />
                </SelectTrigger>
                <SelectContent>
                  {options.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}}
        />

        <Controller
          name="input-03d"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1 col-span-full">
            <FieldLabel htmlFor="input-03d">Prezzo extra *</FieldLabel>
              <Input
                {...field}
                id="input-03d"
                type="number"
                onChange={(e) => {
                field.onChange(e.target.valueAsNumber)
                }}
                aria-invalid={fieldState.invalid}
                placeholder="Prezzo extra"
                
              />
              
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
                  </>
      }
      ,
      { 
        fields: ["checkbox-d2f","checkbox-d22"],
        component: <>
                <Controller
          name="checkbox-d2f" 
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1 col-span-full">
              <div className="flex items-center gap-2 mb-1">
                <Checkbox
                  id="checkbox-d2f"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  aria-invalid={fieldState.invalid}
                  
                />
                <FieldLabel htmlFor="checkbox-d2f">Optional 1 </FieldLabel>
                
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
<Controller
          name="checkbox-d22" 
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1 col-span-full">
              <div className="flex items-center gap-2 mb-1">
                <Checkbox
                  id="checkbox-d22"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  aria-invalid={fieldState.invalid}
                  
                />
                <FieldLabel htmlFor="checkbox-d22">Accessorio 1 </FieldLabel>
                
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
                  </>
      }
      ];

  if (isSubmitSuccessful) {
    return (
      <div className="p-2 sm:p-5 md:p-8 w-full rounded-md gap-2 border">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, stiffness: 300, damping: 25 }}
          className="h-full py-6 px-3"
        >
          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 0.3,
              type: "spring",
              stiffness: 500,
              damping: 15,
            }}
            className="mb-4 flex justify-center border rounded-full w-fit mx-auto p-2"
          >
            <Check className="size-8" />
          </motion.div>
          <h2 className="text-center text-2xl text-pretty font-bold mb-2">
            Thank you
          </h2>
          <p className="text-center text-lg text-pretty text-muted-foreground">
            Form submitted successfully, we will get back to you soon
          </p>
        </motion.div>
      </div>
    );
  }
  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col p-2 md:p-5 w-full mx-auto rounded-md max-w-3xl gap-2 border">
        <MultiStepFormProvider
          stepsFields={stepsFields}
          onStepValidation={async (step) => {
            const isValid = await form.trigger(step.fields);
            return isValid;
          }}>
          <MultiStepFormContent>
            <FormHeader />
            <StepFields />
            <FormFooter>
                <PreviousButton>
                  <ChevronLeft />
                  Previous
                </PreviousButton>
                <NextButton>
                  Next <ChevronRight />
                </NextButton>
                <SubmitButton 
                  type="submit"
                  disabled={isSubmitting} 
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </SubmitButton>
              </FormFooter>
            </MultiStepFormContent>
          </MultiStepFormProvider>
        </form>
    </div>
  )
}
