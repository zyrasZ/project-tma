import { Card, CardBody, CardHeader, CardContent } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { cn } from '../../../lib/utils';
import { useTranslation } from 'react-i18next';

export const PricingSection = () => {
  const { t } = useTranslation('common');

  const TIERS = [
    {
      name: t('landing.pricing.tiers.basic.name'),
      price: t('landing.pricing.tiers.basic.price'),
      period: t('landing.pricing.tiers.basic.period'),
      features: t('landing.pricing.tiers.basic.features', { returnObjects: true }) as string[],
      highlight: false,
    },
    {
      name: t('landing.pricing.tiers.standard.name'),
      price: t('landing.pricing.tiers.standard.price'),
      period: t('landing.pricing.tiers.standard.period'),
      features: t('landing.pricing.tiers.standard.features', { returnObjects: true }) as string[],
      highlight: true,
    },
    {
      name: t('landing.pricing.tiers.advanced.name'),
      price: t('landing.pricing.tiers.advanced.price'),
      period: t('landing.pricing.tiers.advanced.period'),
      features: t('landing.pricing.tiers.advanced.features', { returnObjects: true }) as string[],
      highlight: false,
    },
  ];

  return (
    <section id="pricing" className="py-24 px-4 md:px-10 bg-white scroll-mt-20">
      <div className="w-full max-w-[1424px] mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-center text-content-main mb-16">
          {t('landing.pricing.title')}
        </h2>
        
        <div className="flex flex-col lg:flex-row justify-center gap-8">
          {TIERS.map((tier, idx) => (
            <Card 
              key={idx} 
              padding="xl"
              className={cn(
                'flex-1 min-w-[300px] lg:min-w-[400px] max-w-[453.33px] h-[640px] flex flex-col mx-auto w-full border-none !rounded-2xl',
                tier.highlight 
                  ? 'bg-[#1E2020] border !border-[#C0C4C4] text-white shadow-2xl relative z-10' 
                  : 'bg-[#E6EFEF] text-content-main'
              )}
            >
              <CardBody className="h-full flex flex-col p-0">
                <CardHeader className="p-0 border-none bg-transparent">
                  <div className={cn("text-lg font-semibold mb-2", tier.highlight ? "text-white" : "text-content-sub")}>
                    {tier.name}
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col p-0 mt-0">
                  <div className="mb-6">
                    <div className="text-[40px] font-bold leading-tight">{tier.price}</div>
                    {tier.period && (
                      <div className={cn('text-sm mt-1', tier.highlight ? 'text-gray-400' : 'text-content-sub')}>
                        {tier.period}
                      </div>
                    )}
                  </div>
                  
                  <div className="mb-8 mt-2">
                    <Button 
                      variant="primary" 
                      className="w-full justify-center h-[48px] rounded-lg font-bold"
                    >
                      {t('landing.pricing.cta')}
                    </Button>
                  </div>

                  <div className="flex-1 space-y-4 pt-6 border-t border-[#C0C4C4]/30">
                    {tier.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-0.5">
                          {/* Circle with check icon to match Figma */}
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="10" cy="10" r="9.5" stroke={tier.highlight ? "white" : "#18A0A0"}/>
                            <path d="M6 10L9 13L14 7" stroke={tier.highlight ? "white" : "#18A0A0"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <span className="leading-tight text-sm md:text-base">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
