import { Card, CardBody } from '../../../components/ui/Card';
import { FormField } from '../../../components/ui/FormField';
import { Input } from '../../../components/ui/Input';
import { Radio } from '../../../components/ui/Radio';
import { Button } from '../../../components/ui/Button';
import { Textarea } from '../../../components/ui/Textarea';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, type ContactFormData } from './contactSchema';
import { useTranslation } from 'react-i18next';

export const ContactSection = () => {
  const { t } = useTranslation('common');
  
  const { control, handleSubmit, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      package: 'standard',
      message: '',
    },
  });

  const onSubmit = (data: ContactFormData) => {
    console.log('Form data:', data);
    // TODO: Send data to API
    alert(t('landing.contact.alert') + JSON.stringify(data, null, 2));
  };

  return (
    <section id="contact" className="py-24 px-4 md:px-10 bg-[#F4F7F7] scroll-mt-20">
      <div className="max-w-[784px] mx-auto flex flex-col items-center">
        <h2 className="text-3xl md:text-[40px] font-bold text-content-main mb-12 text-center">
          {t('landing.contact.title')}
        </h2>

        <Card className="shadow-lg border-transparent rounded-2xl w-full bg-white">
          <CardBody className="p-8">
            <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <FormField label={t('landing.contact.nameLabel')} required error={errors.name?.message}>
                    <Input {...field} placeholder={t('landing.contact.namePlaceholder')} className="h-10" hasError={!!errors.name} />
                  </FormField>
                )}
              />
              
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <FormField label={t('landing.contact.emailLabel')} required error={errors.email?.message}>
                    <Input {...field} placeholder={t('landing.contact.emailPlaceholder')} type="email" className="h-10" hasError={!!errors.email} />
                  </FormField>
                )}
              />
              
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <FormField label={t('landing.contact.phoneLabel')} required error={errors.phone?.message}>
                    <Input {...field} placeholder={t('landing.contact.phonePlaceholder')} type="tel" className="h-10" hasError={!!errors.phone} />
                  </FormField>
                )}
              />
              
              <Controller
                name="company"
                control={control}
                render={({ field }) => (
                  <FormField label={t('landing.contact.companyLabel')} required error={errors.company?.message}>
                    <Input {...field} placeholder={t('landing.contact.companyPlaceholder')} className="h-10" hasError={!!errors.company} />
                  </FormField>
                )}
              />

              <Controller
                name="package"
                control={control}
                render={({ field }) => (
                  <FormField label={t('landing.contact.packageLabel')} error={errors.package?.message}>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-1">
                      {['basic', 'standard', 'advanced'].map((pkg) => (
                        <label 
                          key={pkg}
                          className={`flex items-center gap-3 border rounded-lg p-3 cursor-pointer transition-colors ${field.value === pkg ? 'border-primary ring-1 ring-primary' : 'border-border hover:border-primary'}`}
                          onClick={() => field.onChange(pkg)}
                        >
                          <Radio 
                            name="package" 
                            value={pkg} 
                            inputId={`pkg-${pkg}`} 
                            checked={field.value === pkg} 
                            onChange={() => field.onChange(pkg)} 
                          />
                          <span className="text-sm font-medium text-content-main">
                            {pkg === 'basic' ? t('landing.contact.packageBasic') : pkg === 'standard' ? t('landing.contact.packageStandard') : t('landing.contact.packageAdvanced')}
                          </span>
                        </label>
                      ))}
                    </div>
                  </FormField>
                )}
              />

              <Controller
                name="message"
                control={control}
                render={({ field }) => (
                  <FormField label={t('landing.contact.messageLabel')} required error={errors.message?.message}>
                    <Textarea 
                      {...field}
                      className="min-h-[120px]"
                      placeholder={t('landing.contact.messagePlaceholder')}
                      hasError={!!errors.message}
                    />
                  </FormField>
                )}
              />

              <Button type="submit" variant="primary" className="w-full h-10 rounded-md mt-2">
                {t('landing.contact.submit')}
              </Button>
            </form>
          </CardBody>
        </Card>
      </div>
    </section>
  );
};
