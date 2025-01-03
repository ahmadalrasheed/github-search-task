import React from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { NavItem } from "../navItem";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";

interface NavigationItem {
  name: string;
  path: string;
  icon: any;
}

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  navigation: NavigationItem[];
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  sidebarOpen,
  setSidebarOpen,
  navigation,
  currentPath,
  onNavigate,
}) => {
  return (
    <>
      {/* Mobile Sidebar Dialog */}
      <Dialog
        open={sidebarOpen}
        onClose={setSidebarOpen}
        className="relative z-50 lg:hidden"
      >
        <DialogBackdrop className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0" />
        <div className="fixed inset-0 flex">
          <DialogPanel className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full">
            <TransitionChild>
              <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                <button
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  className="-m-2.5 p-2.5"
                >
                  <span className="sr-only">Close sidebar</span>
                  <XMarkIcon
                    aria-hidden="true"
                    className="h-6 w-6 text-white"
                  />
                </button>
              </div>
            </TransitionChild>

            {/* Mobile Sidebar Content */}
            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-600 px-6 pb-4">
              <div className="flex h-16 shrink-0 items-center">
                <img
                  alt="Your Company"
                  src="https://tailwindui.com/plus/img/logos/mark.svg?color=white"
                  className="h-8 w-auto"
                />
              </div>
              <nav className="flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                  <li>
                    <ul role="list" className="-mx-2 space-y-1">
                      {navigation.map((item) => (
                        <NavItem
                          key={item.name}
                          name={item.name}
                          path={item.path}
                          icon={item.icon}
                          isActive={currentPath === item.path}
                          onNavigate={onNavigate}
                        />
                      ))}
                    </ul>
                  </li>
                  <li className="mt-auto">
                    <NavItem
                      name="Settings"
                      path="/dashboard/settings"
                      icon={Cog6ToothIcon}
                      isActive={currentPath === "/dashboard/settings"}
                      onNavigate={onNavigate}
                    />
                  </li>
                </ul>
              </nav>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-600 px-6 pb-4">
          <div className="flex h-16 shrink-0 items-center">
            <img
              alt="Your Company"
              src="https://tailwindui.com/plus/img/logos/mark.svg?color=white"
              className="h-8 w-auto"
            />
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <NavItem
                      key={item.name}
                      name={item.name}
                      path={item.path}
                      icon={item.icon}
                      isActive={currentPath === item.path}
                      onNavigate={onNavigate}
                    />
                  ))}
                </ul>
              </li>
              <li className="mt-auto">
                <NavItem
                  name="Settings"
                  path="/dashboard/settings"
                  icon={Cog6ToothIcon}
                  isActive={currentPath === "/dashboard/settings"}
                  onNavigate={onNavigate}
                />
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};
