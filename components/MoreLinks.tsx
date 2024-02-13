import { Dialog, Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import {
  Bars3Icon,
  BriefcaseIcon,
  CodeBracketSquareIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { Fragment, useState } from 'react'

const items = [
  {
    name: 'LinkedIn',
    description: 'View my references, work history, and experiences.',
    href: 'https://www.linkedin.com/in/sammydowds/',
    icon: BriefcaseIcon,
  },
  {
    name: 'GitHub',
    description: 'View my code.',
    href: 'https://github.com/sammydowds',
    icon: CodeBracketSquareIcon,
  },
]

export default function MoreLinks() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      <div className="flex lg:hidden">
        <button
          type="button"
          className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          onClick={() => setMobileMenuOpen(true)}
        >
          <span className="sr-only">Open main menu</span>
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <Popover.Group className="hidden lg:flex lg:gap-x-12">
        <Popover className="relative">
          <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50 p-1">
            Links
            <ChevronDownIcon
              className="h-5 w-5 flex-none text-gray-400"
              aria-hidden="true"
            />
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute right-3 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-sm bg-white shadow-lg ring-1 ring-gray-900/5">
              <div className="p-3">
                {items.map((item) => (
                  <div
                    key={item.name}
                    className="group relative flex items-center gap-x-6 rounded-sm p-4 text-sm leading-6 hover:bg-gray-50"
                  >
                    <div className="flex h-11 w-11 flex-none items-center justify-center rounded-sm bg-gray-50 group-hover:bg-white">
                      <item.icon
                        className="h-6 w-6 text-gray-600 group-hover:text-oklahoma-blue"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="flex-auto">
                      <a
                        href={item.href}
                        className="block font-semibold text-gray-900"
                        target="_blank"
                      >
                        {item.name}
                        <span className="absolute inset-0" />
                      </a>
                      <p className="mt-1 text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>
      </Popover.Group>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              More Links
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {items.map((item) => {
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-2">
                        <div>
                          <item.icon
                            className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                            aria-hidden="true"
                          />
                        </div>
                        <div>{item.name}</div>
                      </div>
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  )
}
