import { useNavigate, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { NavigationMenu as PRNavigationMenu } from 'primereact/navigationmenu';
import { Menu as PRMenu } from 'primereact/menu';
import { User, CaretDown } from '@phosphor-icons/react';
import { cn } from '../../../lib/utils';
import { Avatar } from '../../ui/Avatar';
import type { RootState } from '../../../store';
import { logout } from '../../../store/slices/authSlice';
import { useTranslation } from 'react-i18next';

// Wrapper based on PrimeReact
function NavigationMenu({ className, ...props }: any) {
  return (
    <PRNavigationMenu
      className={cn(
        'flex items-center w-full justify-between h-16 px-6 bg-white border-b border-divide',
        className
      )}
      {...props}
    />
  );
}

function NavMenuTrigger({ children, className, hasDropdown = true, to }: any) {
  const content = (
    <>
      {children}
      {hasDropdown && <CaretDown weight="bold" className="w-[10px] h-[10px] ml-1 opacity-70" />}
    </>
  );

  const baseClasses = 'inline-flex items-center justify-center px-3 h-full cursor-pointer select-none no-underline bg-transparent outline-none text-[13px] transition-colors border-b-[3px] font-medium';
  
  if (to) {
    return (
      <NavLink
        to={to}
        className={({ isActive }) => cn(
          baseClasses,
          isActive ? 'border-primary text-primary' : 'border-transparent text-content-sub hover:text-content-main',
          className
        )}
      >
        {content}
      </NavLink>
    );
  }

  return (
    <div
      className={cn(
        baseClasses,
        'border-transparent text-content-sub hover:text-content-main',
        className
      )}
    >
      {content}
    </div>
  );
}

export const StaffNavbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation('common');
  
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <header className="shrink-0 relative z-50">
      <NavigationMenu
        className={cn(
          'flex items-center w-full justify-between h-14 px-8 bg-white border-b border-divide shadow-sm'
        )}
      >
        {/* Left Side: Logo & Links */}
        <div className="flex items-center h-full flex-1">
          <div className="flex items-center mr-8">
            <img src="/logo.png" alt="TMA Logo" className="h-8 object-contain" />
          </div>

          <nav className="hidden md:flex items-center space-x-2 h-full flex-1 justify-start">
            <NavMenuTrigger>{t('staffNavbar.account')}</NavMenuTrigger>
            <NavMenuTrigger to="/staff/stations" hasDropdown={false}>{t('staffNavbar.stations')}</NavMenuTrigger>
            <NavMenuTrigger to="/staff/invoices">{t('staffNavbar.invoices')}</NavMenuTrigger>
            <NavMenuTrigger>{t('staffNavbar.shifts')}</NavMenuTrigger>
            <NavMenuTrigger>{t('staffNavbar.customers')}</NavMenuTrigger>
            <NavMenuTrigger>{t('staffNavbar.allocation')}</NavMenuTrigger>
            <NavMenuTrigger>{t('staffNavbar.tools')}</NavMenuTrigger>
            <NavMenuTrigger to="/staff/reports">{t('staffNavbar.reports')}</NavMenuTrigger>
            <div className="ml-4 text-[13px] font-medium text-content-sub hover:text-content-main cursor-pointer">
              {t('staffNavbar.guide')}
            </div>
          </nav>
        </div>

        {/* Right Side: Profile */}
        <div className="flex items-center space-x-4">
          <PRMenu.Root>
            <PRMenu.Trigger className="flex items-center focus:outline-none cursor-pointer border-none bg-transparent p-0 m-0 rounded-full">
              <Avatar 
                shape="circle" 
                className="h-8 w-8 border border-border hover:opacity-80 transition-opacity bg-grey-neutral-60" 
                image={user?.avatar}
              >
                <User className="h-5 w-5 text-content-sub" weight="fill" />
              </Avatar>
            </PRMenu.Trigger>
            <PRMenu.Portal>
              <PRMenu.Positioner className="z-50 outline-none">
                <PRMenu.Popup className="min-w-[12rem] bg-white rounded-lg shadow-md border border-border p-1 outline-none mt-1">
                  <div className="px-4 py-2 border-b border-divide mb-1">
                    <p className="text-sm font-semibold text-content-main truncate">{user?.name || 'Staff User'}</p>
                    <p className="text-xs text-content-sub truncate">{user?.email || 'staff@example.com'}</p>
                  </div>
                  <PRMenu.List className="m-0 p-0 list-none">
                    <PRMenu.Item className="py-2 px-4 text-sm text-content-main hover:bg-grey-primary-50 rounded-md cursor-pointer outline-none transition-colors data-[highlighted]:bg-grey-primary-50">
                      {t('navbar.myAccount')}
                    </PRMenu.Item>
                    <PRMenu.Item 
                      className="py-2 px-4 text-sm text-alert hover:bg-red-60 rounded-md cursor-pointer outline-none transition-colors data-[highlighted]:bg-red-60 font-medium"
                      onSelect={() => {
                        dispatch(logout());
                        navigate('/login');
                      }}
                    >
                      {t('navbar.logout')}
                    </PRMenu.Item>
                  </PRMenu.List>
                </PRMenu.Popup>
              </PRMenu.Positioner>
            </PRMenu.Portal>
          </PRMenu.Root>
        </div>
      </NavigationMenu>
    </header>
  );
};
