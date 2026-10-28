import { ChargingStation, GasPump, Receipt, Buildings, UserSwitch, ChartPieSlice } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

export const FeaturesSection = () => {
  const { t } = useTranslation('common');

  const FEATURES = [
    {
      icon: <ChargingStation size={48} className="text-primary mb-4 transition-transform duration-300 hover:scale-110" weight="duotone" />,
      title: t('landing.features.items.f1_title'),
      description: t('landing.features.items.f1_desc'),
    },
    {
      icon: <GasPump size={48} className="text-primary mb-4 transition-transform duration-300 hover:scale-110" weight="duotone" />,
      title: t('landing.features.items.f2_title'),
      description: t('landing.features.items.f2_desc'),
    },
    {
      icon: <Receipt size={48} className="text-primary mb-4 transition-transform duration-300 hover:scale-110" weight="duotone" />,
      title: t('landing.features.items.f3_title'),
      description: t('landing.features.items.f3_desc'),
    },
    {
      icon: <Buildings size={48} className="text-primary mb-4 transition-transform duration-300 hover:scale-110" weight="duotone" />,
      title: t('landing.features.items.f4_title'),
      description: t('landing.features.items.f4_desc'),
    },
    {
      icon: <UserSwitch size={48} className="text-primary mb-4 transition-transform duration-300 hover:scale-110" weight="duotone" />,
      title: t('landing.features.items.f5_title'),
      description: t('landing.features.items.f5_desc'),
    },
    {
      icon: <ChartPieSlice size={48} className="text-primary mb-4 transition-transform duration-300 hover:scale-110" weight="duotone" />,
      title: t('landing.features.items.f6_title'),
      description: t('landing.features.items.f6_desc'),
    },
  ];

  return (
    <section id="features" className="py-24 px-4 md:px-10 bg-[#fafafa] scroll-mt-20">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-content-main mb-20">
          {t('landing.features.title')}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {FEATURES.map((feature, idx) => (
            <div 
              key={idx} 
              className="flex flex-col gap-5 px-8 py-10 rounded-2xl min-h-[296px] border border-transparent hover:bg-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-2 cursor-pointer"
            >
              {feature.icon}
              <h3 className="text-xl font-bold text-content-main mb-1">
                {feature.title}
              </h3>
              <p className="text-content-sub leading-relaxed text-[15px]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
